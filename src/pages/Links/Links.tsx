import { Box, Button, Stack, Tooltip, Typography } from '@mui/material';
import vrooli from 'assets/Vrooli-logo.png';
import discord from 'assets/discord.svg';
import email from 'assets/email.svg';
import github from 'assets/github.svg';
import goodreads from 'assets/goodreads.svg';
import twitter from 'assets/twitter.svg';
import youtube from 'assets/youtube.svg';
import { DiscordModal, DonateModal } from 'components';
import { useCallback, useMemo, useState } from 'react';
import { buttonProps, noSelect } from 'styles';

export const Links = () => {
    const [donateModalOpen, setDonateModalOpen] = useState(false);
    const [discordModalOpen, setDiscordModalOpen] = useState(false);

    const openLink = useCallback((link: string) => { window.open(link, '_blank', 'noopener,noreferrer') }, []);

    // 2D array of [image, alt/tooltip, link?, onClick?]
    const iconNavData = [
        [twitter, "Follow me on Twitter", "https://twitter.com/mdhalloran", null],
        [discord, "Add me on Discord", null, () => setDiscordModalOpen(true)],
        [github, "Check out my GitHub", "https://github.com/MattHalloran", null],
        [email, "Shoot me an email", "mailto:matthalloran8@gmail.com", null],
        [goodreads, "See what books inspired me", "https://goodreads.com/matthalloran", null],
        [youtube, "Subscribe to the Vrooli YouTube account", "https://youtube.com/@vrooli", null],
    ]
    const iconProps = {
        width: '24px',
        height: '24px',
    }
    const iconNav = useMemo(() => {
        return iconNavData.map(([img, alt, link, onClick], index) => {
            return (
                <Tooltip key={`nav-item-${index}`} title={alt}>
                    <Box onClick={() => onClick ? onClick() : openLink(link)}>
                        <img src={img} alt={alt} {...iconProps} />
                    </Box>
                </Tooltip>
            )
        })
    }, [iconProps, iconNavData, openLink])

    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
        }}>
            <Box id='main-container' sx={{
                background: "#072781",
                maxWidth: "800px",
                borderRadius: 2,
                boxShadow: "0 0 35px 0 rgba(0,0,0,0.5)",
                textAlign: "center",
                padding: "1em",
            }}>
                <DonateModal open={donateModalOpen} onClose={() => setDonateModalOpen(false)} />
                <DiscordModal open={discordModalOpen} onClose={() => setDiscordModalOpen(false)} />

                <Box id='main-info'>
                    <Box sx={{
                        ...noSelect,
                        display: 'contents'
                    }}>
                        <img
                            id="main-logo"
                            src={vrooli}
                            onClick={() => openLink("https://vrooli.com")}
                            alt="Vrooli Logo"
                            style={{
                                height: '100px',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                display: 'block',
                                marginBottom: '8px',
                                cursor: 'pointer',
                            }}
                        />
                    </Box>
                    <Typography variant="h3" component="h1" mb={1}>Matt Halloran</Typography>
                    <Typography variant="body1">💻 Developer  🤔 Philosopher  💭 Dreamer</Typography>
                    <Typography
                        variant="body1"
                        mb={2}
                        color="#aaf1f9"
                        onClick={() => openLink("https://matthalloran8.medium.com/the-next-generation-of-global-collaboration-a4839766e29e")}
                        sx={{ cursor: 'pointer' }}
                    >Let&#x27;s change the world together</Typography>
                </Box>

                <Stack direction="column" spacing={1} mb={2} sx={{ ...noSelect, alignItems: 'center' }}>
                    <Button onClick={() => openLink("https://vrooli.com")} sx={{ ...buttonProps, marginBottom: 0 }}>Vrooli - Website</Button>
                    <Button onClick={() => openLink("https://discord.gg/VyrDFzbmmF")} sx={{ ...buttonProps }}>Vrooli - Discord</Button>
                    <Button onClick={() => openLink("https://docs.google.com/document/d/1zHYdjAyy01SSFZX0O-YnZicef7t6sr1leOFnynQQOx4/edit?usp=sharing")} sx={{ ...buttonProps }}>Vrooli - White Paper</Button>
                    <Button onClick={() => setDonateModalOpen(true)} sx={{ ...buttonProps }}>Donate</Button>
                </Stack>

                <Stack direction="row" spacing={1} sx={{ ...noSelect, justifyContent: 'space-evenly' }}>
                    {iconNav}
                </Stack>
            </Box>
        </Box>
    );
}