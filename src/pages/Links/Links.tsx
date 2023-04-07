import { Box, Button, Stack, Tooltip, Typography, keyframes } from '@mui/material';
import vrooli from 'assets/Vrooli-logo.png';
import Blob1 from 'assets/blob1.svg';
import Blob2 from 'assets/blob2.svg';
import discord from 'assets/discord.svg';
import email from 'assets/email.svg';
import github from 'assets/github.svg';
import goodreads from 'assets/goodreads.svg';
import twitter from 'assets/twitter.svg';
import youtube from 'assets/youtube.svg';
import { DiscordModal, DonateModal } from 'components';
import { useCallback, useMemo, useState } from 'react';
import Particles from 'react-tsparticles';
import { buttonProps, noSelect } from 'styles';

// Animation for blob1
// Moves up and grows, then moves down to the right and shrinks.
// Then it moves to the left - while continuing to shrink- until it reaches the starting position.
const blob1Animation = keyframes`
    0% {
        transform: translateY(0) scale(0.5);
        filter: hue-rotate(0deg) blur(150px);
    }
    33% {
        transform: translateY(-160px) scale(0.9) rotate(-120deg);
        filter: hue-rotate(30deg) blur(150px);
    }
    66% {
        transform: translate(50px, 0px) scale(0.6) rotate(-200deg);
        filter: hue-rotate(60deg) blur(150px);
    }
    100% {
        transform: translate(0px, 0px) scale(0.5) rotate(0deg);
        filter: hue-rotate(0deg) blur(150px);
    }
`;

// Animation for blob2
// Moves to the right and changes hue, then moves back to the left and turns its original color.
const blob2Animation = keyframes`
    0% {
        transform: translateX(0) scale(1);
        filter: hue-rotate(0deg) blur(50px);
    }
    50% {
        transform: translateX(150px) scale(1.2);
        filter: hue-rotate(-50deg) blur(50px);
    }
    100% {
        transform: translateX(0) scale(1);
        filter: hue-rotate(0deg) blur(50px);
    }
`;

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
        <>
            {/* Constellation */}
            <Particles
                id="tsparticles"
                canvasClassName="tsparticles-canvas"
                options={{
                    fullScreen: { enable: true, zIndex: 0 },
                    fpsLimit: 60,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: "push",
                            },
                            onHover: {
                                enable: true,
                                mode: "repulse",
                            },
                            resize: true,
                        },
                        modes: {
                            bubble: {
                                distance: 400,
                                duration: 2,
                                opacity: 0.8,
                                size: 40,
                            },
                            push: {
                                quantity: 4,
                            },
                            repulse: {
                                distance: 50,
                                duration: 5,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#ffffff",
                        },
                        links: {
                            color: "#ffffff",
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
                        },
                        collisions: {
                            enable: true,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outMode: "bounce",
                            random: false,
                            speed: 0.3,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800,
                            },
                            value: 100,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            random: true,
                            value: 5,
                        },
                    },
                    detectRetina: true,
                }}
            />
            {/* Blob 1 */}
            <Box sx={{
                position: 'fixed',
                pointerEvents: 'none',
                bottom: -300,
                left: -175,
                width: '100%',
                height: '100%',
                zIndex: 2,
                opacity: 0.5,
                transition: 'opacity 1s ease-in-out',
            }}>
                <Box
                    component="img"
                    src={Blob1}
                    alt="Blob 1"
                    sx={{
                        width: '100%',
                        height: '100%',
                        animation: `${blob1Animation} 20s linear infinite`,
                    }}
                />
            </Box>
            {/* Blob 2 */}
            <Box sx={{
                position: 'fixed',
                pointerEvents: 'none',
                top: -154,
                right: -175,
                width: '100%',
                height: '100%',
                zIndex: 2,
                opacity: 0.5,
                transition: 'opacity 1s ease-in-out',
            }}>
                <Box
                    component="img"
                    src={Blob2}
                    alt="Blob 2"
                    sx={{
                        width: '100%',
                        height: '100%',
                        animation: `${blob2Animation} 20s linear infinite`,
                    }}
                />
            </Box>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}>
                <Box id='main-container' sx={{
                    backgroundColor: 'rgba(106,122,161,0.4)',
                    backdropFilter: 'blur(24px)',
                    maxWidth: "800px",
                    borderRadius: 2,
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
        </>
    );
}