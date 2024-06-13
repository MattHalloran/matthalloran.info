import { Box, Button, Stack, Tooltip, Typography } from "@mui/material";
import vrooli from "assets/Vrooli-logo.png";
import { EmailIcon, GitHubIcon, GoodreadsIcon, SvgComponent, XIcon, YouTubeIcon } from "assets/icons";
import { DonateDialog } from "components";
import { useMemo, useState } from "react";
import { buttonProps, noSelect } from "styles";

const VrooliLink = "https://vrooli.com";

export const Links = () => {
    document.title = "Links | Matt Halloran";

    const [donateDialogOpen, setDonateDialogOpen] = useState(false);

    // 2D array of [image, alt/tooltip, link?, onClick?]
    const iconNavData: [SvgComponent, string, string][] = [
        [XIcon, "Follow me on Twitter", "https://twitter.com/mdhalloran"],
        [GitHubIcon, "Check out my GitHub", "https://github.com/MattHalloran"],
        [EmailIcon, "Shoot me an email", "mailto:matthalloran8@gmail.com"],
        [GoodreadsIcon, "See what books inspired me", "https://goodreads.com/matthalloran"],
        [YouTubeIcon, "Subscribe to the Vrooli YouTube account", "https://youtube.com/@vrooli"],
    ];
    const iconProps = {
        width: "24px",
        height: "24px",
    };
    const iconNav = useMemo(() => {
        return iconNavData.map(([Icon, alt, link], index) => {
            return (
                <Tooltip key={`nav-item-${index}`} title={alt}>
                    <Box
                        component="a"
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ cursor: "pointer" }}
                    >
                        <Icon fill="white" />
                    </Box>
                </Tooltip>
            );
        });
    }, [iconProps, iconNavData]);

    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
        }}>
            <Box id='main-container' sx={{
                backgroundColor: "rgba(106,122,161,0.4)",
                backdropFilter: "blur(24px)",
                maxWidth: "800px",
                borderRadius: 2,
                textAlign: "center",
                padding: "1em",
            }}>
                <DonateDialog open={donateDialogOpen} onClose={() => setDonateDialogOpen(false)} />

                <Box id='main-info'>
                    <Box
                        component='a'
                        href={VrooliLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            ...noSelect,
                            display: "contents",
                            width: "100%",
                        }}
                    >
                        <img
                            id="main-logo"
                            src={vrooli}
                            alt="Vrooli Logo"
                            style={{
                                height: "100px",
                                marginLeft: "auto",
                                marginRight: "auto",
                                display: "block",
                                marginBottom: "8px",
                                cursor: "pointer",
                            }}
                        />
                    </Box>
                    <Typography variant="h3" component="h1" mb={1}>Matt Halloran</Typography>
                    <Typography variant="body1" mb={1}>💻 Developer  🤔 Philosopher  💭 Dreamer</Typography>
                    <Typography variant="body1">Hello! I'm building an open-source autonomous agent swarm.</Typography>
                    <Typography variant="body1" mb={1}>Check out Vrooli for more info!</Typography>
                </Box>

                <Stack direction="column" spacing={1} mb={2} mt={2} sx={{ ...noSelect, alignItems: "center" }}>
                    <Button component="a" href={VrooliLink} target="_blank" rel="noopener noreferrer" sx={{ ...buttonProps, marginBottom: 0 }}>Vrooli</Button>
                    <Button onClick={() => setDonateDialogOpen(true)} sx={{ ...buttonProps }}>Donate</Button>
                </Stack>
                <Typography
                    variant="body1"
                    color="#aaf1f9"
                    component="a"
                    href="https://matthalloran8.medium.com/the-next-generation-of-global-collaboration-a4839766e29e"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        cursor: "pointer",
                        textDecoration: "none",
                    }}
                >Let&#x27;s change the world together🕊️</Typography>
                <Stack direction="row" spacing={1} mt={2} sx={{ ...noSelect, justifyContent: "space-evenly" }}>
                    {iconNav}
                </Stack>
            </Box>
        </Box >
    );
};
