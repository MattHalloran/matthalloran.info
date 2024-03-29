import { ContentCopy as CopyIcon } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import QRCode from "assets/qr-60pc.png";
import { LargeDialog } from "components/LargeDialog/LargeDialog";
import { useCallback, useMemo, useState } from "react";
import { buttonProps, noSelect } from "styles";
import { DonateDialogProps } from "../types";

const address = "addr1qxmd7082f6nrx4468lya90208pnr8ahr770amfch7alm6584rksxwqykx6y2kxtaavcnasskw97k3qhlnffs46sgvqvqr060pc";
const addressDisplay = "addr1...qr060pc";
const handle = "$vrooli";

export const DonateDialog = ({
    open,
    onClose,
}: DonateDialogProps) => {
    const [adaOptionSelected, setAdaOptionSelected] = useState(false);
    const [copied, setCopied] = useState<boolean>(false);

    const openLink = useCallback((link: string) => { window.open(link, "_blank", "noopener,noreferrer"); }, []);

    const handleClose = useCallback(() => {
        setAdaOptionSelected(false);
        setCopied(false);
        onClose();
    }, [onClose]);

    const copyHandle = () => {
        navigator.clipboard.writeText(handle);
        setCopied(true);
        setTimeout(() => setCopied(false), 5000);
    };

    const copyAddress = () => {
        navigator.clipboard.writeText(address);
        setCopied(true);
        setTimeout(() => setCopied(false), 5000);
    };

    const mainOptions = useMemo(() => (
        <>
            <Typography id='modal-title' variant="h4" component="h2" mb={2}>Support the Project</Typography>
            <Stack direction="column" spacing={1} mb={2} sx={{ ...noSelect, alignItems: "center" }}>
                <Typography variant="body1" component="h3" mb={2}>The development of Vrooli is mostly funded my life's savings. Would you be so kind as to help fund the project before it becomes sustainable?</Typography>
                <Button onClick={() => openLink("https://ko-fi.com/matthalloran")} sx={{ ...buttonProps }}>Donate - Paypal/Stripe</Button>
                <Button onClick={() => setAdaOptionSelected(true)} sx={{ ...buttonProps }}>Donate - ₳</Button>
            </Stack>
        </>
    ), [setAdaOptionSelected, openLink]);

    const adaDonateOptions = useMemo(() => (
        <>
            <Box mb={1} sx={{
                padding: "10px",
            }}>
                <img
                    src={QRCode} alt="Donate ₳ QR code"
                    style={{
                        height: "225px",
                        border: "1px solid black",
                    }}
                />
            </Box>
            <Stack direction="column" spacing={2} mb={2} sx={{ alignItems: "center" }}>
                <Typography id='modal-title' variant="h4" component="h2">Donate ₳? 🥺👉👈</Typography>
                <Typography variant="body1">1. Scan QR code or press address/handle to copy</Typography>
                <Typography variant="body1">2. Send ADA to address/handle with your wallet</Typography>
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
        <LargeDialog
            id="donate-dialog"
            isOpen={open}
            onClose={handleClose}
            sxs={{
                paper: {
                    background: (copied && adaOptionSelected) ? "#1c7602" : "#1e3558",
                    transition: "background 0.2s ease-in-out",
                },
            }}
        >
            <Box p={2} sx={{ textAlign: "center" }}>
                {adaOptionSelected ? adaDonateOptions : mainOptions}
            </Box>
        </LargeDialog>
    );
};
