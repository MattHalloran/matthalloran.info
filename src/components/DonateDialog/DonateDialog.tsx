import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { CloseIcon, CopyIcon } from "assets/icons";
import QRCode from "assets/qr-ada.png";
import { LargeDialog } from "components/LargeDialog/LargeDialog";
import { useCallback, useMemo, useState } from "react";
import { buttonProps, noSelect } from "styles";
import { DonateDialogProps } from "../types";

type CryptoInfo = {
    address?: string;
    addressDisplay?: string;
    handle?: string;
    symbol?: string;
    qrCode?: string;
};

const cryptoInfo: Record<string, CryptoInfo> = {
    BTC: {
        address: "bc1qlv6sz7xcd8dpzmklnmlls6nazynx44ymhfrwhl",
        addressDisplay: "bc1q...whl",
        symbol: "₿",
    },
    ADA: {
        address: "addr1qxmd7082f6nrx4468lya90208pnr8ahr770amfch7alm6584rksxwqykx6y2kxtaavcnasskw97k3qhlnffs46sgvqvqr060pc",
        addressDisplay: "addr1...qr060pc",
        handle: "$vrooli",
        symbol: "₳",
        qrCode: QRCode,
    },
    ETH: {
        address: "0xBba1D847961d0e0B58BC557D329a4B7DEeD81345",
        addressDisplay: "0xBba1...1345",
        symbol: "Ξ",
    },
    SOL: {
        address: "BL7DXV3YPFd7tjzKtTQxmvorCWfGwjfARKP274nbSRH3",
        addressDisplay: "BL7D...SRH3",
        symbol: "◎",
    },
    Coinbase: {
        handle: "mdhalloran.cb.id",
    },
};

export const DonateDialog = ({
    open,
    onClose,
}: DonateDialogProps) => {
    const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);
    const [copied, setCopied] = useState<boolean>(false);

    const openLink = useCallback((link: string) => { window.open(link, "_blank", "noopener,noreferrer"); }, []);

    const handleClose = useCallback(() => {
        setSelectedCrypto(null);
        setCopied(false);
        onClose();
    }, [onClose]);

    const copyToClipboard = useCallback((text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 5000);
    }, []);

    const mainOptions = useMemo(() => (
        <>
            <Typography id='modal-title' variant="h4" component="h2" mb={2}>Support Me?👉👈</Typography>
            <Typography variant="body1" component="h3">Building a utopia is my full-time job.</Typography>
            <Typography variant="body1" component="h3">Can you help me fund Vrooli before it becomes sustainable?</Typography>
            <Stack direction="column" spacing={1} mt={2} mb={2} sx={{ ...noSelect, alignItems: "center" }}>
                <Button onClick={() => openLink("https://ko-fi.com/matthalloran")} sx={{ ...buttonProps }}>USD ($)</Button>
                {Object.entries(cryptoInfo).map(([key, { symbol }]) => (
                    <Button key={key} onClick={() => setSelectedCrypto(key)} sx={{ ...buttonProps }}>
                        {symbol ? `${key} (${cryptoInfo[key].symbol})` : key}
                    </Button>
                ))}
            </Stack>
        </>
    ), []);

    const selectedCryptoOptions = useMemo(() => {
        if (!selectedCrypto) return null;
        const { address, addressDisplay, handle, qrCode } = cryptoInfo[selectedCrypto] || {};

        return (
            <>
                {qrCode && (
                    <>
                        <Box mb={2} sx={{ borderRadius: 2 }}>
                            <img src={qrCode} alt={`${selectedCrypto} QR code`} style={{ height: "225px", border: "1px solid black" }} />
                        </Box>
                        <Stack direction="column" spacing={1} mt={2} mb={4} sx={{ alignItems: "center" }}>
                            <Typography variant="body1">1. Scan QR code or press address/handle to copy</Typography>
                            <Typography variant="body1">2. Send {selectedCrypto} to address/handle with your wallet</Typography>
                        </Stack>
                    </>
                )}
                <Stack direction="column" spacing={2} mt={qrCode ? 4 : 0} mb={2} sx={{ alignItems: "center" }}>
                    {handle && (
                        <Button onClick={() => copyToClipboard(handle)} startIcon={<CopyIcon />} sx={{ ...buttonProps }}>
                            Handle - {handle}
                        </Button>
                    )}
                    {address && (
                        <Button onClick={() => copyToClipboard(address)} startIcon={<CopyIcon />} sx={{ ...buttonProps }}>
                            Address - {addressDisplay}
                        </Button>
                    )}
                </Stack>
                {copied ? <Typography variant="h6" component="h4" textAlign="center" mb={1}>🎉 Copied! 🎉</Typography> : null}
            </>
        );
    }, [selectedCrypto, copied, copyToClipboard]);

    return (
        <LargeDialog
            id="donate-dialog"
            isOpen={open}
            onClose={handleClose}
            sxs={{
                paper: {
                    background: (copied && selectedCrypto) ? "#1c7602" : "#1e3558",
                    transition: "background 0.2s ease-in-out",
                },
            }}
        >
            <Box sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                <IconButton
                    onClick={handleClose}
                    sx={{ paddingTop: 1, paddingRight: 2 }}
                >
                    <CloseIcon fill="white" width={36} height={36} />
                </IconButton>
            </Box>
            <Box p={2} sx={{ textAlign: "center" }}>
                {selectedCrypto ? selectedCryptoOptions : mainOptions}
            </Box>
        </LargeDialog>
    );
};
