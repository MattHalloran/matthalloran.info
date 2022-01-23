import { useCallback, useMemo, useRef, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import useOnClickOutside from 'utils/useOnClickOutside';
import { DonateModalProps } from '../types';
import { modalStyle } from '../styles';
import { buttonProps, noSelect } from 'styles';
import { ContentCopy as CopyIcon } from '@mui/icons-material';
import QRCode from 'assets/qr-60pc.png';

const address = 'addr1qxmd7082f6nrx4468lya90208pnr8ahr770amfch7alm6584rksxwqykx6y2kxtaavcnasskw97k3qhlnffs46sgvqvqr060pc';
const addressDisplay = 'addr1...qr060pc';
const handle = '$vrooli';

export const DonateModal = ({
    open,
    onClose
}: DonateModalProps) => {
    const ref = useRef();
    const [adaOptionSelected, setAdaOptionSelected] = useState(false);
    const [copied, setCopied] = useState<boolean>(false);

    const openLink = useCallback((link: string) => { window.open(link, '_blank', 'noopener,noreferrer') }, []);

    const closeModal = useCallback(() => {
        setAdaOptionSelected(false);
        setCopied(false);
        onClose();
    }, [onClose]);

    useOnClickOutside(ref, closeModal);

    const copyHandle = () => {
        navigator.clipboard.writeText(handle);
        setCopied(true);
        setTimeout(() => setCopied(false), 5000);
    }

    const copyAddress = () => {
        navigator.clipboard.writeText(address);
        setCopied(true);
        setTimeout(() => setCopied(false), 5000);
    }

    const mainOptions = useMemo(() => (
        <>
            <Typography id='modal-title' variant="h4" component="h2">Support the Project</Typography>
            <Stack direction="column" spacing={1} mb={2} sx={{ ...noSelect, alignItems: 'center' }}>
                <Typography variant="body1" component="h3">The development of Vrooli has so far has been funded by a combination of my life's savings and a grant from Project Catalyst. Would you be so kind as to help fund the project before it becomes sustainable?</Typography>
                <Button onClick={() => setAdaOptionSelected(true)} sx={{ ...buttonProps }}>Donate - ₳</Button>
                <Button onClick={() => openLink("https://ko-fi.com/matthalloran")} sx={{ ...buttonProps }}>Donate - Paypal/Stripe</Button>
            </Stack>
        </>
    ), [setAdaOptionSelected, openLink]);

    const adaDonateOptions = useMemo(() => (
        <>
            <Box sx={{
                padding: "10px",
                background: "#0e1e3e",
                borderRadius: "10px 10px 0 0",
            }}>
                <img
                    src={QRCode} alt="Donate ₳ QR code"
                    style={{
                        height: "250px",
                        border: "1px solid black",
                    }}
                />
            </Box>
            <Stack direction="column" spacing={1} mb={2} sx={{ alignItems: 'center' }}>
                <Typography id='modal-title' variant="h4" component="h2">Donate ₳? 🥺👉👈</Typography>
                <Typography variant="h6">1. Scan QR code or press address/handle to copy</Typography>
                <Typography variant="h6">2. Send ADA to address/handle with your wallet</Typography>
                <Button
                    onClick={copyHandle}
                    startIcon={<CopyIcon />}
                    sx={{ ...buttonProps }}
                >Handle - {handle}</Button>
                <Button
                    onClick={copyAddress}
                    startIcon={<CopyIcon />}
                    sx={{ ...buttonProps }}
                >Address - {addressDisplay}</Button>
            </Stack>
            {copied ? <Typography variant="h6" component="h4" textAlign="center" mb={1}>🎉 Copied! 🎉</Typography> : null}
        </>
    ), [copied]);

    return (
        <Box ref={ref} sx={{
            ...modalStyle(open),
            background: (copied && adaOptionSelected) ? "#3b8f23" : "#174ea7",
            transition: "background 0.2s ease-in-out",
        }}>
            {adaOptionSelected ? adaDonateOptions : mainOptions}
        </Box>
    );
}