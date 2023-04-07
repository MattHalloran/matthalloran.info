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
import { DiscordDialog, DonateDialog } from 'components';
import { useMemo, useState } from 'react';
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

const VrooliLink = "https://vrooli.com";
const DiscordLink = "https://discord.gg/VyrDFzbmmF";
const WhitePaperLink = "https://docs.google.com/document/d/13Nag4UFxfuz-rVofhNEtqhZ63wOklzPjpbanGv_Po0Y/edit?usp=sharing";

export const Links = () => {
    const [donateDialogOpen, setDonateDialogOpen] = useState(false);
    const [discordDialogOpen, setDiscordDialogOpen] = useState(false);

    // 2D array of [image, alt/tooltip, link?, onClick?]
    const iconNavData: [any, string, string | null, (() => any) | null][] = [
        [twitter, "Follow me on Twitter", "https://twitter.com/mdhalloran", null],
        [discord, "Add me on Discord", null, () => setDiscordDialogOpen(true)],
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
                    <Box
                        component={typeof link === 'string' ? 'a' : 'div'}
                        href={typeof link === 'string' ? link : undefined}
                        onClick={() => onClick ? onClick() : window.open(link ?? '', '_blank', 'noopener,noreferrer')}
                        sx={{
                            cursor: 'pointer',
                        }}
                    >
                        <img src={img} alt={alt} {...iconProps} />
                    </Box>
                </Tooltip>
            )
        })
    }, [iconProps, iconNavData])

    return (
        <>
            {/* Constellation */}
            <Particles
                id="tsparticles"
                options={{
                    fullScreen: { enable: true, zIndex: 0 },
                    fpsLimit: 60,
                    interactivity: {
                        events: {
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
                    <DonateDialog open={donateDialogOpen} onClose={() => setDonateDialogOpen(false)} />
                    <DiscordDialog open={discordDialogOpen} onClose={() => setDiscordDialogOpen(false)} />

                    <Box id='main-info'>
                        <Box
                            component='a'
                            href={VrooliLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                ...noSelect,
                                display: 'contents'
                            }}
                        >
                            <img
                                id="main-logo"
                                src={vrooli}
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
                            color="#aaf1f9"
                            component="a"
                            href="https://matthalloran8.medium.com/the-next-generation-of-global-collaboration-a4839766e29e"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ cursor: 'pointer' }}
                        >Let&#x27;s change the world together</Typography>
                    </Box>

                    <Stack direction="column" spacing={1} mb={2} mt={2} sx={{ ...noSelect, alignItems: 'center' }}>
                        <Button component="a" href={VrooliLink} target="_blank" rel="noopener noreferrer" sx={{ ...buttonProps, marginBottom: 0 }}>Vrooli - Website</Button>
                        <Button component="a" href={DiscordLink} target="_blank" rel="noopener noreferrer" sx={{ ...buttonProps }}>Vrooli - Discord</Button>
                        <Button component="a" href={WhitePaperLink} target="_blank" rel="noopener noreferrer" sx={{ ...buttonProps }}>Vrooli - White Paper</Button>
                        <Button onClick={() => setDonateDialogOpen(true)} sx={{ ...buttonProps }}>Donate</Button>
                    </Stack>

                    <Stack direction="row" spacing={1} sx={{ ...noSelect, justifyContent: 'space-evenly' }}>
                        {iconNav}
                    </Stack>
                </Box>
            </Box >
        </>
    );
}