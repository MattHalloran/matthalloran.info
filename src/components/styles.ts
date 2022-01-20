import { SxProps } from "@mui/material"
import { CSSProperties } from "@mui/styles";

export const copyBoxStyle = (copied: boolean): SxProps => ({
    border: '1px solid',
    borderRadius: '12px',
    borderColor: copied ? '#33e433': 'white',
    color: copied ? '#33e433': 'white',
    height: '1.5em',
    textAlign: 'center',
    verticalAlign: 'middle',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    margin: 1,
}) as CSSProperties;

export const modalStyle = (open: boolean): SxProps => ({
    display: open ? "auto" : "none",
    background: "#2450a5",
    color: "white",
    transition: "1.1s ease-in-out",
    boxShadow: "-1rem 1rem 1rem rgba(0, 0, 0, 0.2)",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    border: "1px solid white",
    width: "calc(min(400px, 90vw))",
    maxHeight: "calc(min(700px, 90vh))",
    zIndex: "100",
    margin: 1,
}) as CSSProperties;