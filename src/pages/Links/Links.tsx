import { useCallback, useMemo, useState } from 'react';
import { Button, Box, Stack, Tooltip, Typography } from '@mui/material';
import { noSelect } from 'styles'
import vrooli from '../../assets/Vrooli-logo.png';
import email from '../../assets/email.svg';
import discord from '../../assets/discord.svg';
import github from '../../assets/github.svg';
import goodreads from '../../assets/goodreads.svg';
import linkedin from '../../assets/linkedin.svg';
import twitter from '../../assets/twitter.svg';
import youtube from '../../assets/youtube.svg';
import { AddressModal } from '../../components/AddressModal/AddressModal';
import { DiscordModal } from '../../components/DiscordModal/DiscordModal';

export const Links = () => {
    const [addressModalOpen, setAddressModalOpen] = useState(false);
    const [discordModalOpen, setDiscordModalOpen] = useState(false);

    const openLink = useCallback((link: string) => { window.open(link, '_blank', 'noopener,noreferrer') }, []);

    // 2D array of [image, alt/tooltip, link?, onClick?]
    const iconNavData = [
        [twitter, "Follow me on Twitter", "https://twitter.com/mdhalloran", null],
        [discord, "Add me on Discord", null, () => setDiscordModalOpen(true)],
        [github, "Check out my GitHub", "https://github.com/MattHalloran", null],
        [linkedin, "Connect with me on LinkedIn", "https://linkedin.com/in/matthew-halloran/", null],
        [email, "Shoot me an email", "mailto:matthalloran8@gmail.com", null],
        [goodreads, "See what books inspired me", "https://goodreads.com/matthalloran", null],
        [youtube, "Subscribe to the Vrooli YouTube account", "https://youtube.com/channel/UC4qvcwbFxx06vBD3wKjXscg", null],
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

    const buttonProps = {
        height: "48px",
        background: "white",
        color: "black",
        borderRadius: "10px",
        width: "20em",
        display: "block",
        marginBottom: "5px",
        transition: "0.3s ease-in-out",
        '&:hover': {
            filter: `brightness(120%)`,
            color: 'white',
            border: '1px solid white',
        }
    }

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
                <AddressModal open={addressModalOpen} onClose={() => setAddressModalOpen(false)} />
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
                    <Button onClick={() => openLink("https://discord.gg/WTGNukDQ")} sx={{ ...buttonProps }}>Vrooli - Discord</Button>
                    <Button onClick={() => openLink("https://cardano.ideascale.com/a/pmd/3070972-48088?")} sx={{ ...buttonProps }}>Project Catalyst Proposals</Button>
                    <Button onClick={() => openLink("https://ko-fi.com/matthalloran")} sx={{ ...buttonProps }}>Donate - Paypal/Stripe</Button>
                    <Button onClick={() => setAddressModalOpen(true)} sx={{ ...buttonProps }}>Donate - ADA</Button>
                </Stack>

                <Stack direction="row" spacing={1} sx={{ ...noSelect, justifyContent: 'space-evenly' }}>
                    {iconNav}
                </Stack>
            </Box>
        </Box>
    );
}