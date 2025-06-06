import { useNuiEvent } from '../../../hooks/useNuiEvent';
import { fetchNui } from '../../../utils/fetchNui';
import type { AlertProps } from '../../../typings/alert';
import { useEffect, useRef, useState } from 'react';
import './index.css'
import React from 'react';

// Function to handle text typing effect
let currentTypeInterval: any = null; // Track the current typing interval

function typeText(element: HTMLElement, text: string, speed: number = 30) {
    // Clear any ongoing typing animation
    if (currentTypeInterval) {
        clearTimeout(currentTypeInterval);
        currentTypeInterval = null;
    };

    element.innerHTML = '';
    element.classList.add('typing-alert');

    const processedText = text.replace(/  \n /g, '[[BR]]');
    const characters = processedText.split('');

    let i = 0;
    function type() {
        if (i < characters.length) {
            if (processedText.substring(i, i + 6) === '[[BR]]') {
                element.innerHTML += '<br />';
                i += 6;
            } else {
                const char = characters[i] === '<' ? '&lt;' :
                             characters[i] === '>' ? '&gt;' :
                             characters[i];
                element.innerHTML += char;
                i++;
            }
            currentTypeInterval = setTimeout(type, speed);
        } else {
            element.classList.remove('typing-alert');
        }
    }

    type();
};

const AlertDialog: React.FC = () => {
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const [opened, setOpened] = useState(false);
    const [dialogData, setDialogData] = useState<AlertProps>({
        header: '',
        content: '',
    });
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;

        const rotateY = ((x / width) - 0.5) * 15; // -10 to +10 deg
        const rotateX = ((0.5 - y / height)) * 15; // -10 to +10 deg

        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
    };

    const closeAlert = (button?: string) => {
        const container = document.querySelector('.container-alert') as HTMLDivElement;
        if (container === null) return;

        container.style.animation = 'flyOut-alert 250ms forwards';
        setTimeout(() => setOpened(false), 250);
        
        if (button)
            fetchNui('closeAlert', button);
    };

    useNuiEvent('sendAlert', (data: AlertProps) => {
        setDialogData(data);
        setOpened(true);
    });

    useNuiEvent('closeAlertDialog', () => closeAlert());

    useEffect(() => {
        if (descriptionRef.current) {
            typeText(descriptionRef.current, dialogData.content);
        }
    }, [opened]);

    return (
        opened &&
            <div className="container-alert"
            style={{ transform: `translate(-50%, -50%) rotateY(${rotation.y}deg) rotateX(${rotation.x}deg)` }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}>
                <div className="corners-alert">
                    <div className="corner left-up"></div>
                    <div className="corner left-down"></div>
                    <div className="corner right-up"></div>
                    <div className="corner right-down"></div>
                </div>

                <div className="wrapper-alert">
                    <p className="title">{dialogData.header}</p>
                    <p className="description" ref={dialogData.typing ? descriptionRef : null}>
                        {dialogData.typing !== true &&
                            dialogData.content.split('  \n ').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    {index < dialogData.content.split('  \n ').length - 1 && <br />}
                                </React.Fragment>
                            ))
                        }
                    </p>
                    <div className="buttons-alert">
                        {dialogData.cancel !== false && <button onClick={() => closeAlert('cancel')} className="cancel">{dialogData?.labels?.cancel || 'Cancel'}</button>}
                        <button onClick={() => closeAlert('confirm')} className="confirm">{dialogData?.labels?.confirm || 'Confirm'}</button>
                    </div>
                </div>
            </div>
    );
};

export default AlertDialog