import { Dialog, Slide, SlideProps, useTheme } from "@mui/material";
import { forwardRef } from "react";
import { LargeDialogProps } from "../types";

const UpTransition = forwardRef<unknown, SlideProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const LargeDialog = ({
    children,
    id,
    isOpen,
    onClose,
    sxs,
}: LargeDialogProps) => {
    const { palette } = useTheme();

    return (
        <Dialog
            id={id}
            open={isOpen}
            onClose={onClose}
            scroll="paper"
            TransitionComponent={UpTransition}
            sx={{
                zIndex: 1000,
                '& > .MuiDialog-container': {
                    '& > .MuiPaper-root': {
                        zIndex: 1000,
                        margin: { xs: 0, sm: 2, md: 4 },
                        minWidth: { xs: '100vw', sm: 'unset' },
                        maxWidth: { xs: '100vw', sm: 'calc(100vw - 64px)' },
                        bottom: { xs: 0, sm: 'auto' },
                        paddingBottom: 'env(safe-area-inset-bottom)',
                        top: { xs: 'auto', sm: undefined },
                        position: { xs: 'absolute', sm: 'relative' },
                        display: { xs: 'block', sm: 'inline-block' },
                        background: palette.background.default,
                        color: 'white',
                        '& > .MuiDialogContent-root': {
                            position: 'relative',
                        },
                        ...(sxs?.paper ?? {})
                    },
                }
            }}
        >
            {children}
        </Dialog>
    )
}