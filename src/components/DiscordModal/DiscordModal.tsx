import { useCallback, useRef, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import useOnClickOutside from 'utils/useOnClickOutside';
import { DiscordModalProps } from '../types';
import { buttonProps, noSelect } from 'styles';
import { modalStyle } from '../styles';
import { ContentCopy as CopyIcon } from '@mui/icons-material';

const discordName = 'MattHalloran#7583';

export const DiscordModal = ({
    open,
    onClose
}: DiscordModalProps) => {
    const ref = useRef();
    const [copied, setCopied] = useState(false);

    const copyName = useCallback(() => {
        navigator.clipboard.writeText(discordName);
        setCopied(true);
        setTimeout(() => setCopied(false), 5000);
    }, [discordName]);

    const closeModal = useCallback(() => {
        setCopied(false);
        onClose();
    }, [onClose]);

    useOnClickOutside(ref, closeModal);

    return (
        <Box ref={ref} sx={{
            ...modalStyle(open),
            background: copied ? "#3b8f23" : "#174ea7",
            transition: "background 0.2s ease-in-out",
        }}>
            <Stack direction="column" spacing={1} mb={2} sx={{ ...noSelect, alignItems: 'center' }}>
                <Typography id='modal-title' variant="h4" component="h2">Add me on Discord!</Typography>
                <Typography variant="h6">1. Press name to copy</Typography>
                <Typography variant="h6">2. Paste name in "Add Friends" page on Discord</Typography>
                <Button
                    onClick={copyName}
                    startIcon={<CopyIcon />}
                    sx={{ ...buttonProps }}
                >{discordName}</Button>
            </Stack>
            {copied ? <Typography variant="h6" component="h4" textAlign="center" mb={1}>🎉 Copied! 🎉</Typography> : null}
        </Box>
    );
}