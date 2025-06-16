import React, { useEffect, useState } from 'react'
import { useNuiEvent } from '../../../hooks/useNuiEvent';
import type { ContextMenuProps } from '../../../typings/context';
import { fetchNui } from '../../../utils/fetchNui';
import ContextButton from './components/ContextButton';
import './index.css'

const openMenu = (id: string | undefined) => {
  fetchNui<ContextMenuProps>('openContext', { id: id, back: true });
};

const ContextMenu: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [contextMenu, setContextMenu] = useState<ContextMenuProps>({
        title: '',
        options: { '': { description: '', metadata: [] } },
    });

    const closeContext = () => {
        if (contextMenu.canClose === false) return;
        fetchNui('closeContext');

        const wrapper = document.querySelector('.wrapper-context');
        if (wrapper === null) return;

        // @ts-expect-error
        wrapper.style.animation = 'fly-out-context 150ms forwards';

        setTimeout(() => setVisible(false), 150);
    };

    // Hides the context menu on ESC
    useEffect(() => {
        if (!visible) return;

        const keyHandler = (e: KeyboardEvent) => {
        if (['Escape'].includes(e.code)) closeContext();
        };

        window.addEventListener('keydown', keyHandler);

        return () => window.removeEventListener('keydown', keyHandler);
    }, [visible]);

    useNuiEvent('hideContext', () => closeContext());

    useNuiEvent<ContextMenuProps>('showContext', async (data) => {
        if (visible) {
            setVisible(false);
            await new Promise((resolve) => setTimeout(resolve, 100));
        }
        setContextMenu(data);
        setVisible(true);
    });

    return (
        visible && (
            <div className="container-context">
                <div className="wrapper-context">
                    <div className="header-context">
                        {contextMenu.menu && (
                            <div onClick={() => openMenu(contextMenu.menu)} className="back-context button-context"><i className="fa-solid fa-chevron-left"></i></div>
                        )}
                        <p className="title-context">{contextMenu.title}</p>
                        {contextMenu.canClose !== false && (
                            <div onClick={closeContext} className="exit-context button-context"><i className="fa-solid fa-xmark"></i></div>
                        )}
                    </div>
                    <div className="main-context">
                        {Object.entries(contextMenu.options).map((option, index) => (
                            <ContextButton option={option} key={`context-item-${index}`} />
                        ))}
                    </div>
                </div>
            </div>
        )
    );
};

export default ContextMenu