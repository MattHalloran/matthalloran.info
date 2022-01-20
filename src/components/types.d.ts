export interface ModalProps {
    open: boolean;
    onClose: () => void;
}

export interface AddressModalProps extends ModalProps {}

export interface DiscordModalProps extends ModalProps {}
