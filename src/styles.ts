import { SxProps } from "@mui/material"
import { CSSProperties } from "@mui/styles";

/**
 * Disables text highlighting
 */
 export const noSelect: SxProps = {
    WebkitTouchCallout: 'none', /* iOS Safari */
    WebkitUserSelect: 'none', /* Safari */
    MozUserSelect: 'none',
    msUserSelect: 'none', /* Internet Explorer/Edge */
    userSelect: 'none', /* Non-prefixed version, currently
    supported by Chrome, Edge, Opera and Firefox */
} as CSSProperties;

export const buttonProps: SxProps = {
    height: "48px",
    background: "white",
    color: "black",
    borderRadius: "10px",
    width: "20em",
    display: "flex",
    marginBottom: "5px",
    transition: "0.3s ease-in-out",
    '&:hover': {
        filter: `brightness(120%)`,
        color: 'white',
        border: '1px solid white',
    }
} as CSSProperties