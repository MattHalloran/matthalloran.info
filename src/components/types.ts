export interface ModalProps {
    open: boolean;
    onClose: () => void;
}

export interface DonateDialogProps extends ModalProps { }

export interface DiscordDialogProps extends ModalProps { }

export interface LargeDialogProps {
    children: JSX.Element | null | undefined | (JSX.Element | null | undefined)[];
    id: string;
    isOpen: boolean;
    onClose: () => any;
    sxs?: {
        paper?: { [x: string]: any };
    }
};
