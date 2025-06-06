import React from 'react';
import type { ContextMenuProps, Option } from '../../../../typings/context';
import { fetchNui } from '../../../../utils/fetchNui';
import { isIconUrl } from '../../../../utils/isIconUrl';
import '../index.css'

const openMenu = (id: string | undefined) => {
    fetchNui<ContextMenuProps>('openContext', { id: id, back: false });
};

const clickContext = (id: string) => {
    fetchNui('clickContext', id);
};

const ContextButton: React.FC<{
    option: [string, Option]
}> = ({ option }) => {
    const button = option[1];
    const buttonKey = option[0];
    
    return (
        <div className={`option-context button-context ${button.disabled && 'disabled-context'}`}
        onClick={() =>
              !button.disabled
                ? button.menu
                  ? openMenu(button.menu)
                  : clickContext(buttonKey)
                : null
            }>
            <div className="option-content-context">
                <div className="title-context">
                    {button?.icon && (
                        typeof button.icon === 'string' && isIconUrl(button.icon) ? (
                            <img src={button.icon} className='iconImage-context' alt="Missing img" />
                        ) : 
                        button.icon.startsWith('fa') ? (
                            <i className={`${button.icon} fa-fw`}></i>
                        ) : (
                            <i className={`fas fa-${button.icon} fa-fw`}></i>
                        )
                    )}
                    <p className="text-context">{button.title}</p>
                </div>
                {button.arrow && (
                    <div className="arrow-context"><i className="fa-solid fa-chevron-right"></i></div>
                )}
                {button.description && (
                    <p className="description-context">{button.description}</p>
                )}
                {button.progress !== undefined && (
                    <div className="progress-bar-context"><div className="progress-context" style={{ width: button.progress + '%' }}></div></div>
                )}
                {Array.isArray(button.metadata) ? (
                    <div className='metadata-wrapper-context'>
                        {button.metadata.map(
                            (
                                metadata: string | { label?: string; value?: any; progress?: number; },
                                index: number
                            ) => (
                                <React.Fragment key={`context-metadata-${index}`}>
                                    {typeof metadata === 'string' ? <p className="label-context">{metadata}</p> : <p className="label-context">{metadata?.label && metadata?.value ? metadata.label + ': ' : metadata?.label && metadata.label } <span className="value-context">{metadata?.value ?? ''}</span></p>}
                                    {typeof metadata === 'object' && metadata.progress !== undefined && (
                                        <div className="metadata-progressbar-context"><div className="metadata-progress-context" style={{ width: metadata.progress + '%' }}></div></div>
                                    )}
                                </React.Fragment>
                            )
                        )}
                    </div>
                ) : (
                    <>
                        {typeof button.metadata === 'object' && 
                            Object.entries(button.metadata).map((metadata: { [key: string]: any }, index) => (
                                <div className='metadata-wrapper-context' key={`context-metadata-${index}`}>
                                    <p className="label-context" key={`context-metadata-${index}`}>
                                        {metadata[0]}: {metadata[1]}
                                    </p>
                                </div>
                            ))
                        }
                    </>
                )}
            </div>
        </div>
    );
}

export default ContextButton