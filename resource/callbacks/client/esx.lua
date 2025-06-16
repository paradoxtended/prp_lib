lib.locale()

---@diagnostic disable: duplicate-set-field
---@diagnostic disable: duplicate-doc-field

if GetResourceState('es_extended') ~= 'started' then return end

Framework = { name = 'es_extended' }
local sharedObject = exports['es_extended']:getSharedObject()
Framework.object = sharedObject

AddEventHandler('esx:setPlayerData', function(key, val, last)
    if GetInvokingResource() == 'es_extended' then
        sharedObject.PlayerData[key] = val
        if OnPlayerData then
            OnPlayerData(key, val, last)
        end
    end
end)

RegisterNetEvent('esx:playerLoaded', function(xPlayer)
    sharedObject.PlayerData = xPlayer
    sharedObject.PlayerLoaded = true
end)

RegisterNetEvent('esx:onPlayerLogout', function()
    sharedObject.PlayerLoaded = false
    sharedObject.PlayerData = {}
end)

prp.isPlayerLoaded = sharedObject.IsPlayerLoaded

prp.onPlayerLoaded = function(cb)
    if prp.isPlayerLoaded() then
        cb()
    end

    AddEventHandler('esx:playerLoaded', cb)
end

prp.onPlayerLogout = function(cb)
    AddEventHandler('esx:onPlayerLogout', cb)
end

prp.getJob = function()
    if not prp.isPlayerLoaded() then
        return false
    end

    return sharedObject.GetPlayerData().job.name
end

function prp.getJobGrade()
    return sharedObject.GetPlayerData().job.grade
end

prp.hasItem = function(name)
    local inventory = sharedObject.GetPlayerData().inventory

    for _, v in pairs(inventory) do
        if v.name == name then
            return true
        end
    end

    return false
end

prp.getIdentifier = function()
    local playerData = sharedObject.GetPlayerData()
    return playerData.identifier
end

prp.getCharacterName = function()
    local playerData = sharedObject.GetPlayerData()
    return (playerData.firstName or playerData.firstname) .. ' ' .. (playerData.lastName or playerData.lastname)
end

prp.getInventory = function()
    return sharedObject.GetPlayerData().inventory
end

---@param name 'hunger' | 'thirst'
---@return integer
prp.getStatus = function(name)
    local status = 0
    TriggerEvent('esx_status:getStatus', name, function(stats) status = stats.val end)

    return status
end

---@param values table<'hunger' | 'thirst', integer>
prp.setStatus = function(values)
    for name, value in pairs(values) do
        if value > 0 then TriggerEvent('esx_status:add', name, value) else TriggerEvent('esx_status:remove', name, -value) end
    end
end

prp.spawnVehicle = sharedObject.Game.SpawnVehicle

prp.spawnLocalVehicle = sharedObject.Game.SpawnLocalVehicle

prp.deleteVehicle = sharedObject.Game.DeleteVehicle

prp.getPlayersInArea = sharedObject.Game.GetPlayersInArea