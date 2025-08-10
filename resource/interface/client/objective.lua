local isOpen = false

---@param title string
---@param content string
function prp.showObjective(title, content)
    if not title or not content then return end
    
    isOpen = true
    SendNUIMessage({
        action = 'showObjective',
        data = {
            title = title,
            content = content
        }
    })
end

function prp.hideObjective()
    isOpen = false
    SendNUIMessage({ action = 'hideObjective' })   
end

function prp.isObjectiveActive()
    return isOpen
end