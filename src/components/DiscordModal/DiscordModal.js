import React, { useRef, useState } from 'react';
import useOnClickOutside from '../../utils/useOnClickOutside';

function DiscordModal({
    open,
    onClose
}) {
    const ref = useRef();
    const [copied, setCopied] = useState(false);
    const discordName = 'MattHalloran#7583';

    const copyName = () => {
        navigator.clipboard.writeText(discordName);
        setCopied(true);
    }

    const closeModal = () => {
        setCopied(false);
        onClose();
    }

    useOnClickOutside(ref, closeModal);

    return (
            <div ref={ref} class={`modal ${open ? '' : 'closed'}`}>
                <h2 id='modal-title'>Add me on Discord!</h2>
                <h4 id='modal-description'>1. Press name to copy</h4>
                <h4 id='modal-description'>2. Paste name in "Add Friends" page in Discord</h4>
                <div class={`wallet-div ${copied ? 'copied' : ''}`} onClick={copyName}>{discordName}</div>
                {copied ? <span class='copied-text'>🎉Copied!🎉</span> : ''}
            </div>
    );
}

export { DiscordModal };