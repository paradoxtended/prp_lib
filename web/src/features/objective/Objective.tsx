import React from "react"
import { useNuiEvent } from "../../hooks/useNuiEvent"
import type { ObjectiveProps } from "../../typings/objective"
import './index.css'

const Objective: React.FC = () => {
    useNuiEvent('showObjective', (data: ObjectiveProps) => {
        const objective = document.getElementById('objective') as HTMLElement;

        if (objective === null) return;

        objective.classList.remove('hidden');
        document.getElementsByClassName('objective-title')[0].textContent = data.title;
        document.getElementsByClassName('objective-content')[0].textContent = data.content;
    });

    useNuiEvent('hideObjective', () => {
        const objective = document.getElementById('objective') as HTMLElement;

        if (objective === null) return;

        objective.classList.add('hidden');
    })

    return (
        <div id="objective" className="hidden">
            <p className="objective-title">Cash Exchange</p>
            <p className="objective-content">Grab bags from inside the vault<br />1/10</p>
        </div>
    )
}

export default Objective