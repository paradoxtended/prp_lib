---@meta
--[[
    https://github.com/overextended/ox_lib

    This file is licensed under LGPL-3.0 or higher <https://www.gnu.org/licenses/lgpl-3.0.en.html>

    Copyright © 2025 Linden <https://github.com/thelindat>

    This code is basically Linden's code, we've just edited some lines to our preferencies, but 99% of the code is Linden's ox_lib code
]]

if not _VERSION:find('5.4') then
    error('Lua 5.4 must be enabled in the resource manifest!', 2)
end

local prp_lib = 'prp_lib'

if prp and prp.name == prp_lib then
    error(("Cannot load prp_lib more than once.\n\tRemove any duplicate entries from '@%s/fxmanifest.lua'"):format(GetCurrentResourceName()))
end

local export = exports[prp_lib]

-----------------------------------------------------------------------------------------------
-- Module
-----------------------------------------------------------------------------------------------

function noop() end

local function loadModule(self, module)
    local dir = ('imports/%s'):format(module)
    local chunk = LoadResourceFile(prp_lib, ('%s/%s.lua'):format(dir, context))
    local shared = LoadResourceFile(prp_lib, ('%s/shared.lua'):format(dir))

    if shared then
        chunk = (chunk and ('%s\n%s'):format(shared, chunk)) or shared
    end

    if chunk then
        local fn, err = load(chunk, ('@@prp_lib/imports/%s/%s.lua'):format(module, context))

        if not fn or err then
            if shared then
                lib.print.warn(("An error occurred when importing '@prp_lib/imports/%s'.\nThis is likely caused by improperly updating prp_lib.\n%s'")
                    :format(module, err))
                fn, err = load(shared, ('@@prp_lib/imports/%s/shared.lua'):format(module))
            end

            if not fn or err then
                return error(('\n^1Error importing module (%s): %s^0'):format(dir, err), 3)
            end
        end

        local result = fn()
        self[module] = result or noop
        return self[module]
    end
end

-----------------------------------------------------------------------------------------------
-- API
-----------------------------------------------------------------------------------------------

local function call(self, index, ...)
    local module = rawget(self, index)

    if not module then
        self[index] = noop
        module = loadModule(self, index)

        if not module then
            local function method(...)
                return export[index](nil, ...)
            end

            if not ... then
                self[index] = method
            end

            return method
        end
    end

    return module
end

local prp = setmetatable({
    name = prp_lib,
    context = IsDuplicityVersion() and 'server' or 'client',
}, {
    __index = call,
    __call = call,
})

_ENV.prp = prp

for i = 1, GetNumResourceMetadata(cache.resource, 'prp_lib') do
    local name = GetResourceMetadata(cache.resource, 'prp_lib', i - 1)

    if not rawget(prp, name) then
        local module = loadModule(prp, name)

        if type(module) == 'function' then pcall(module) end
    end
end