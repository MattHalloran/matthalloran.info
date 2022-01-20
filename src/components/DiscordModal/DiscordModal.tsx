import { useCallback, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import useOnClickOutside from '../../utils/useOnClickOutside';
import { DiscordModalProps } from '../types';
import { copyBoxStyle, modalStyle } from '../styles';

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
    }, [discordName]);

    const closeModal = useCallback(() => {
        setCopied(false);
        onClose();
    }, [onClose]);

    useOnClickOutside(ref, closeModal);

    return (
            <Box ref={ref} sx={{...modalStyle(open)}}>
                <Typography id='modal-title' variant="h3" component="h2">Add me on Discord!</Typography>
                <Typography variant="h5">1. Press name to copy</Typography>
                <Typography variant="h5">2. Paste name in "Add Friends" page on Discord</Typography>
                <Box onClick={copyName} sx={{...copyBoxStyle(copied)}}>{discordName}</Box>
                {copied ? (<Box mb={1}>🎉 Copied! 🎉</Box>) : null}
            </Box>
    );
}