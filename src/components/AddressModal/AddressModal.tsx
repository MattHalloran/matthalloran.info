import { useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import QRCode from '../../assets/qr-60pc.png';
import useOnClickOutside from '../../utils/useOnClickOutside';
import { AddressModalProps } from '../types';
import { copyBoxStyle, modalStyle } from '../styles';

const address = '$mdhalloran';

export const AddressModal = ({
    open,
    onClose
}: AddressModalProps) => {
    const ref = useRef();
    const [copied, setCopied] = useState(false);

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
        <Box ref={ref} sx={{ ...modalStyle(open) }}>
            <Box sx={{
                padding: "10px",
                background: "#0e1e3e",
                borderRadius: "10px 10px 0 0",
            }}>
                <img
                    src={QRCode} alt="Donate ADA QR code"
                    style={{
                        height: "250px",
                        border: "1px solid black",
                    }}
                />
            </Box>
            <Typography id='modal-title' variant="h3" component="h2">Donate ADA?</Typography>
            <Typography variant="h5">🥺👉👈</Typography>
            <Typography variant="h5">1. Scan QR code or press address to copy</Typography>
            <Typography variant="h5">2. Send ADA to address with your wallet</Typography>
            <Box onClick={copyAddress} sx={{ ...copyBoxStyle(copied) }}>{address}</Box>
            {copied ? (<Box mb={1}>🎉 Copied! 🎉</Box>) : null}
        </Box>
    );
}