-- This code is basically ox_lib text ui script, everything is copied here, so you don't have to edit anything in ox_lib files

--[[
    https://github.com/overextended/ox_lib

    This file is licensed under LGPL-3.0 or higher <https://www.gnu.org/licenses/lgpl-3.0.en.html>

    Copyright © 2025 Linden <https://github.com/thelindat>
]]

---@class TextUIOptions
---@field key string
---@field text string

local isOpen = false

---@param options TextUIOptions[]
function prp.showTextUI(options)
    if not options or type(options) ~= 'table' then
        error('expected table, received: %s', type(options))
    end

    SendNUIMessage({
        action = 'textUi',
        data = options
    })

    isOpen = true
end

function prp.hideTextUI()
    SendNUIMessage({
        action = 'textUiHide'
    })

    isOpen = false
end

---@return boolean, string | nil
function prp.isTextUIOpen()
    return isOpen
end