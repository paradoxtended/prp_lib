import React from 'react';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';
import type { ProgressbarProps } from '../../typings/progress';
import './index-circle.css'

const CircleProgressbar: React.FC = () => {
    let value: number, interval: NodeJS.Timeout;

    useNuiEvent<ProgressbarProps>('circleProgress', (data) => {
        const container = document.querySelector('.container-progressCircle');
        if (container === null) return;

        container.innerHTML = '';
        value = 0;

        // Creating progress elements
        const wrapper = document.createElement('div');
        wrapper.className = 'wrapper-progressCircle';

        const progressText = document.createElement('p');
        progressText.className = 'title-progressCircle';
        progressText.textContent = data.label;

        const progressValue = document.createElement('p');
        progressValue.className = 'progress-text-progressCircle';
        progressValue.textContent = `0%`;

        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar-progressCircle';

        const progress = document.createElement('div');
        progress.className = 'progress-progressCircle';

        progressBar.append(progress, progressValue);

        wrapper.append(progressText, progressBar);

        container.appendChild(wrapper);

        wrapper.style.animation = 'fly-in-progressbar 1s forwards';

        progress.style.setProperty('--percent', value + '%');
        progress.style.setProperty('--progress-color', '#84cc16');

        interval = setInterval(() => {
            if (value > 99) {
                clearInterval(interval);
                hideProgress(true);
                return;
            }

            value += 1;
            progressValue.textContent = value + '%';
            progress.style.setProperty('--percent', value + '%');
        }, data.duration / 100);
    });

    function hideProgress(completed: boolean) {
        const wrapper = document.querySelector('.wrapper-progressCircle');
        if (wrapper === null) return;

        fetchNui('progressComplete');

        if (completed) {
            // @ts-expect-error
            wrapper.style.animation = 'fly-out-progressbar 1s forwards';
            setTimeout(() => wrapper.remove(), 1000)

            return
        }

        clearInterval(interval);
        
        const progress = document.querySelector('.progress-progressCircle');
        // @ts-expect-error
        progress.style.setProperty('--progress-color', '#dc2626');
        // @ts-expect-error
        progress.style.filter = 'drop-shadow(0 0 5px #dc2626)';

        const text = document.querySelector('.progress-text-progressCircle');
        // @ts-expect-error
        text.style.color = '#dc2626';
        // @ts-expect-error
        text.style.background = '#450a0a';

        setTimeout(() => {
            // @ts-expect-error
            wrapper.style.animation = 'fly-out-progressbar 1s forwards';
            setTimeout(() => wrapper.remove(), 1000)
        }, 50);
    };

    useNuiEvent('progressCancel', () => hideProgress(false));

    return (
        <div className="container-progressCircle"></div>
    );
};

export default CircleProgressbar