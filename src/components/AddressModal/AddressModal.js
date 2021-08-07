import React, { useRef, useState } from 'react';
import QRCode from '../../assets/qr-60pc.png';
import useOnClickOutside from '../../utils/useOnClickOutside';

function AddressModal({
    open,
    onClose
}) {
    const ref = useRef();
    const [copied, setCopied] = useState(false);
    const address = 'addr1qxmd7082f6nrx4468lya90208pnr8ahr770amfch7alm6584rksxwqykx6y2kxtaavcnasskw97k3qhlnffs46sgvqvqr060pc';

    const copyAddress = () => {
        navigator.clipboard.writeText(address);
        setCopied(true);
    }

    const closeModal = () => {
        setCopied(false);
        onClose();
    }

    useOnClickOutside(ref, closeModal);

    return (
            <div ref={ref} class={`modal ${open ? '' : 'closed'}`}>
                <div class='modal-qr-div'>
                    <img class="qr-img" src={QRCode} alt="" />
                </div>
                <h2 id='modal-title'>Donate ADA🥺👉👈</h2>
                <h4 id='modal-description'>1. Scan QR code or press address to copy</h4>
                <h4 id='modal-description'>2. Send ADA to address with your wallet</h4>
                <div class={`wallet-div ${copied ? 'copied' : ''}`} onClick={copyAddress}>{address}</div>
                {copied ? '🎉Copied!🎉' : ''}
            </div>
    );
}

export { AddressModal };