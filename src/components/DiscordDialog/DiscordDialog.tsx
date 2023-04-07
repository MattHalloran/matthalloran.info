import { ContentCopy as CopyIcon } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import { LargeDialog } from 'components/LargeDialog/LargeDialog';
import { useCallback, useState } from 'react';
import { buttonProps, noSelect } from 'styles';
import { DiscordDialogProps } from '../types';

const discordName = 'MattHalloran#7583';

export const DiscordDialog = ({
    open,
    onClose
}: DiscordDialogProps) => {
    const [copied, setCopied] = useState(false);

    const copyName = useCallback(() => {
        navigator.clipboard.writeText(discordName);
        setCopied(true);
        setTimeout(() => setCopied(false), 5000);
    }, [discordName]);

    const handleClose = useCallback(() => {
        setCopied(false);
        onClose();
    }, [onClose]);

    return (
        <LargeDialog
            id="donate-dialog"
            isOpen={open}
            onClose={handleClose}
            sxs={{
                paper: {
                    background: copied ? "#1c7602" : "#1e3558",
                    transition: "background 0.2s ease-in-out",
                }
            }}
        >
            <Stack direction="column" spacing={1} m={2} sx={{ ...noSelect, alignItems: 'center', textAlign: 'center' }}>
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
        </LargeDialog>
    );
}