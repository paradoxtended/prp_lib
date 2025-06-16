import React from 'react';
import './index.css'
import type { NotificationProps } from '../../typings/notification';
import { useNuiEvent } from '../../hooks/useNuiEvent';

// Config for colors, colors have to be in HEX type
const Config = {
    success: {
        background: '#2a641be0',
        border: '#37c513a0',
        title: '#a8a8a8',
        corners: '#37ec09'
    },
    error: {
        background: '#c51313a0',
        border: '#660c0c50',
        title: '#a8a8a8',
        corners: '#eb0f0f'
    },
    inform: {
        background: '#011822',
        border: '#21aeeb50',
        title: '#a8a8a8',
        corners: '#07acee'
    }
};

function createCorner(type: string, data: { corners: string; }, parent: HTMLElement) {
    const corner = document.createElement('div');
    corner.className = `corner-${type}`;
    corner.style.borderColor = data.corners;

    parent.appendChild(corner);
}

const Notifications: React.FC = () => {
    useNuiEvent<NotificationProps>('notify', (data) => {
        if (!data.title && !data.description) return;

        const container = document.querySelector('.container');
        if (container === null) return;

        const config = Config[data.type || 'error'];
        if (!config) return;

        // Create a wrapper for notification
        const wrapper = document.createElement('div');
        wrapper.className = 'wrapper';
        wrapper.style.backgroundColor = config.background;
        wrapper.style.borderColor = config.border;

        const corners = document.createElement('div');
        corners.className = 'corners';

        // Create borders
        const types = [ 'left-up', 'left-down', 'right-up', 'right-down' ];
        types.map((type) => createCorner(type, config, corners))

        if (data.title) {
            const title = document.createElement('p');
            title.className = 'title';
            title.style.color = config.title;
            title.textContent = data.title;

            wrapper.appendChild(title);
        }

        const description = document.createElement('p');
        description.className = 'description';
        description.textContent = data.description;

        wrapper.append(corners, description);
        container.appendChild(wrapper);

        wrapper.style.animation = 'fly-in 0.5s forwards';

        setTimeout(() => {
            wrapper.style.animation = 'fly-out 0.5s forwards';

            setTimeout(() => wrapper.remove(), 500)
        }, data.duration || 5000)
    });

    return (
        <div className='container'></div>
    )
}

export default Notifications;