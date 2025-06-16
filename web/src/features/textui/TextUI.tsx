import React from 'react';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import type { TextUiProps } from '../../typings/textui';
import './index.css'

const TextUI: React.FC = () => {
    useNuiEvent<TextUiProps[]>('textUi', (data) => {
        if (!Array.isArray(data)) {
            console.error("Param 'data' must be an array, recieved:", typeof(data));
            return;
        };

        const container = document.querySelector('.container-textUi');
        if (container === null) return;

        container.innerHTML = '';

        data.forEach((ui: TextUiProps) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'wrapper-textUi';

            if (ui.key) {
                const keybind = document.createElement('div');
                keybind.className = 'keybind-textUi';
                keybind.textContent = ui.key;

                wrapper.appendChild(keybind);
            };

            const text = document.createElement('p');
            text.className = 'text-textUi';
            text.textContent = ui.text;

            wrapper.appendChild(text);

            container.appendChild(wrapper);
        });

        // @ts-expect-error
        container.style.animation = 'flyIn-textUi 0.5s forwards';
    });

    useNuiEvent('textUiHide', () => {
        const container = document.querySelector('.container-textUi');
        if (container === null) return;

        // @ts-expect-error
        container.style.animation = 'flyOut-textUi 0.5s forwards';
        setTimeout(() => container.innerHTML = '', 500);
    });

    return (
        <div className="container-textUi"></div>
    );
};

export default TextUI