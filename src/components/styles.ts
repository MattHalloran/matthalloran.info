import { SxProps } from "@mui/material"
import { CSSProperties } from "@mui/styles";

export const modalStyle = (open: boolean): SxProps => ({
    display: open ? "auto" : "none",
    background: "#2450a5",
    color: "white",
    boxShadow: "-1rem 1rem 1rem rgba(0, 0, 0, 0.2)",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    border: "4px solid white",
    width: "calc(min(400px, 90vw))",
    zIndex: "100",
    margin: 0,
    padding: 1,
}) as CSSProperties;