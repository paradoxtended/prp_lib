import React from 'react';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';
import type { ProgressbarProps } from '../../typings/progress';
import './index.css'

const Progressbar: React.FC = () => {
    let progressBox: HTMLElement | null, progressId: HTMLElement, progressBarId: HTMLElement, progressValueId: HTMLElement, animationId: number;

    useNuiEvent<ProgressbarProps>('progress', (data) => {
        const container = document.querySelector('.container-progressbar');
        if (container === null) return;

        container.innerHTML = '';

        // Creating progress elements
        const wrapper = document.createElement('div');
        wrapper.className = 'wrapper-progressbar';

        const header = document.createElement('div');
        header.className = 'header-progressbar';

        const progressText = document.createElement('p');
        progressText.className = 'title-progressbar';
        progressText.textContent = data.label;

        const progressValue = document.createElement('p');
        progressValue.className = 'progress-text-progressbar';
        progressValue.textContent = '0%';
        progressValueId = progressValue;

        header.append(progressText, progressValue);

        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar-progressbar';
        progressBarId = progressBar;

        const progress = document.createElement('div');
        progress.className = 'progress-progressbar';
        progress.style.width = '0%';
        progress.style.transition = `width ${data.duration}ms linear`;
        progressId = progress;

        progressBar.appendChild(progress);

        wrapper.append(header, progressBar);
        progressBox = wrapper;

        container.appendChild(wrapper);

        wrapper.style.animation = 'fly-in-progressbar 1s forwards';

        setTimeout(() => {
            progress.style.width = '100%';
        }, 50)

        function trackProgress() {
            const barWidth = progressBar.getBoundingClientRect().width;
            const progressWidth = progress.getBoundingClientRect().width;

            const percent = Math.min(100, Math.round((progressWidth / barWidth) * 100));
            progressValue.textContent = percent + '%';

            if (percent < 100) {
                animationId = requestAnimationFrame(trackProgress);
            }

            if (percent == 100) 
                hideProgress(true)
        }

        animationId = requestAnimationFrame(trackProgress);
    });

    const hideProgress = (completed: boolean) => {
        if (!progressBox) return;
        const progress = progressBox;

        setTimeout(() => progress.style.animation = 'fly-out-progressbar 1s forwards', 50);

        if (!completed) {
            cancelAnimationFrame(animationId);
            const barWidth = progressBarId.getBoundingClientRect().width;
            const progressWidth = progressId.getBoundingClientRect().width;
            const percent = Math.min(100, (progressWidth / barWidth) * 100);

            // Stop animation and keep current width
            progressId.style.transition = 'none';
            progressId.style.width = `${percent}%`;

            progressId.style.backgroundColor = '#dc2626';
            progressId.style.filter = 'drop-shadow(0 0 5px #ef4444)';
            progressValueId.style.color = '#dc2626';
        }

        setTimeout(() => {
            if (progressBox === progress) {
                progress.remove(); 
                progressBox = null;
            };
        }, 1050)

        fetchNui('progressComplete');
    };

    useNuiEvent('progressCancel', () => hideProgress(false));

    return (
        <div className="container-progressbar"></div>
    )
}

export default Progressbar