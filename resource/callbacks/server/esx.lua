lib.locale()

---@diagnostic disable: duplicate-set-field
---@diagnostic disable: duplicate-doc-field

if GetResourceState('es_extended') ~= 'started' then return end

Framework = { name = 'es_extended' }
local sharedObject = exports['es_extended']:getSharedObject()
Framework.object = sharedObject
---@class Player
---@field source number
---@field xPlayer any
local player = {}

Framework.getPlayerFromId = function(id)
    local player = setmetatable({}, { __index = player })
    player.xPlayer = sharedObject.GetPlayerFromId(id)
    
    if not player.xPlayer then return end
    
    player.source = id

    return player
end

function Framework.getPlayerFromIdentifier(identifier)
    local player = setmetatable({}, { __index = player })
    player.xPlayer = sharedObject.GetPlayerFromIdentifier(identifier)

    if not player.xPlayer then return end

    player.source = player.xPlayer.source

    return player
end

Framework.registerUsableItem = sharedObject.RegisterUsableItem

Framework.getPlayers = sharedObject.GetExtendedPlayers

function Framework.getItemLabel(item)
    return exports.ox_inventory:Items()[item]?.label or 'ITEM_NOT_FOUND'
end

function Framework.getItems()
    return exports.ox_inventory:Items()
end

function player:hasGroup(name)
    return self.xPlayer.getGroup() == name
end

function player:hasOneOfGroups(groups)
    if type(groups) == 'table' and table.type(groups) == 'array' then
        for _, group in ipairs(groups) do
            if group == self.xPlayer.getGroup() then
                return true
            end
        end
    end

    return groups[self.xPlayer.getGroup()] or false
end

function player:addItem(name, count, metadata)
    count = count or 1

    if not self:canCarryItem(name, count) then
        return false
    end

    return exports.ox_inventory:AddItem(self.source, name, count, metadata)
end

function player:removeItem(name, count)
    count = count or 1
    self.xPlayer.removeInventoryItem(name, count)
end

function player:canCarryItem(name, count)
    return self.xPlayer.canCarryItem(name, count)
end

function player:getItemCount(name)
    return self.xPlayer.getInventoryItem(name)?.count or 0
end

function player:hasItem(name)
    return self:getItemCount(name) > 0
end

function player:getAccountMoney(account)
    return self.xPlayer.getAccount(account).money
end

function player:addAccountMoney(account, amount)
    self.xPlayer.addAccountMoney(account, amount)
end

function player:removeAccountMoney(account, amount)
    self.xPlayer.removeAccountMoney(account, amount)
end

function player:getJob()
    return self.xPlayer.getJob().name, self.xPlayer.getJob().label
end

function player:hasOneOfJobs(jobs)
    if type(jobs) == 'table' and table.type(jobs) == 'array' then
        for _, job in ipairs(jobs) do
            if job == self.xPlayer.getJob().name then
                return true
            end
        end
    end

    return jobs[self.xPlayer.getJob().name] or false
end

function player:getJobGrade()
    return self.xPlayer.getJob().grade, self.xPlayer.getJob().grade_label
end

function player:setJob(name, grade)
    return self.xPlayer.setJob(name, grade)
end

function player:getIdentifier()
    return self.xPlayer.getIdentifier()
end

function player:getFirstName()
    return self.xPlayer.get('firstName')
end

function player:getLastName()
    return self.xPlayer.get('lastName')
end

function player:updateNames(firstname, lastname)
    if not firstname and not lastname then return end

    if firstname then
        local edit = firstname:gsub("^%l", string.upper)
        self.xPlayer.setName(('%s %s'):format(edit, self.xPlayer.get('lastName')))
        self.xPlayer.set('firstName', edit)
    end

    if lastname then
        local edit = lastname:gsub("^%l", string.upper)
        self.xPlayer.setName(('%s %s'):format(self.xPlayer.get('firstName'), edit))
        self.xPlayer.set('lastName', edit)
    end

    MySQL.query.await("UPDATE users SET firstname = ?, lastname = ? WHERE identifier = ?", { self.xPlayer.get('firstName'), self.xPlayer.get('lastName'), self.xPlayer.getIdentifier() })
end

return Framework