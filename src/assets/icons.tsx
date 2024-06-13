export interface SvgProps {
    fill?: string;
    iconTitle?: string;
    id?: string;
    style?: {
        [key: string]: string | number | null,
    } & {
        [key: `&:${string}`]: { [key: string]: string | number | null },
        [key: `@media ${string}`]: { [key: string]: string | number | null },
    };
    onClick?: () => unknown;
    width?: number | string | null;
    height?: number | string | null;
}

export type SvgComponent = (props: SvgProps) => JSX.Element;

export interface SvgBaseProps {
    props: SvgProps;
    children: React.ReactNode;
}

export const SvgBase = ({ props, children }: SvgBaseProps): JSX.Element => (
    <svg
        id={props.id}
        style={props.style}
        // Defaults width/height to 24px. "unset" is used to scale to max. NOTE: width/height must be set for icons
        // to show in Safari, so we but a high value here instead of undefined
        width={!props.width ? "24px" : props.width === "unset" ? "5000px" : props.width}
        height={!props.height ? "24px" : props.height === "unset" ? "5000px" : props.height}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        {children}
    </svg>
);

export const SvgPath = ({ d, props }: Pick<SvgBaseProps, "props"> & { d: string }): JSX.Element => (
    <svg
        id={props.id}
        style={props.style}
        // Defaults width/height to 24px. "unset" is used to scale to max. NOTE: width/height must be set for icons
        // to show in Safari, so we but a high value here instead of undefined
        width={!props.width ? "24px" : props.width === "unset" ? "5000px" : props.width}
        height={!props.height ? "24px" : props.height === "unset" ? "5000px" : props.height}
        pointerEvents="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            // Disable pointer events so that events are tied to the parent svg (which has the id)
            pointerEvents="none"
            style={{
                fill: props.fill ?? "currentColor",
                fillOpacity: 1,
            }}
            d={d}
        />
    </svg>
);

export const CloseIcon = (props: SvgProps) => (
    <SvgPath
        props={props}
        d="M4.24 3.17a1.07 1.07 0 0 0-.76.31 1.07 1.07 0 0 0 0 1.51l7 7.01-7 7a1.07 1.07 0 0 0 0 1.52 1.07 1.07 0 0 0 1.51 0l7.01-7 7 7a1.07 1.07 0 0 0 1.52 0 1.07 1.07 0 0 0 0-1.51l-7-7.01 7-7a1.07 1.07 0 0 0 0-1.52 1.07 1.07 0 0 0-.76-.31 1.07 1.07 0 0 0-.75.31l-7.01 7-7-7a1.07 1.07 0 0 0-.76-.31z"
    />
);

export const CopyIcon = (props: SvgProps) => (
    <SvgPath
        props={props}
        d="m14.54924 3.31493-8.50847.0231c-.55078 0-1.38787.91324-1.3881 1.46402l-.00494 11.05193c.0027.39652 1.59702.39734 1.60926.0017.00073-.0237-.01815-10.68716-.01815-10.68716 0-.21776.05788-.27399.27563-.27399 9.36737 0 5.39934-.0033 8.03147-.0033.39508 0 .41284-1.57172.0033-1.57625zM9.4161 6.10267c-.98106 0-1.79247.81483-1.79247 1.79412V18.8926c0 .97929.81318 1.79247 1.79247 1.79247h8.1437c.9793 0 1.79247-.81318 1.79247-1.79247V7.8968c0-.97929-.81141-1.79412-1.79247-1.79412zm0 1.59606h8.1437c.1205 0 .19476.0758.19476.19806V18.8926c0 .12226-.0725.19641-.19476.19641H9.4161c-.12226 0-.19641-.07415-.19641-.1964V7.89678c0-.12226.07592-.19806.19641-.19806z"
    />
);

export const EmailIcon = (props: SvgProps) => (
    <SvgPath
        props={props}
        d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"
    />
);

export const GitHubIcon = (props: SvgProps) => (
    <SvgPath
        props={props}
        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
    />
);

export const GoodreadsIcon = (props: SvgProps) => (
    <SvgPath
        props={props}
        d="m5.111 18.907h.129c.585 0 1.176 0 1.762.005.074 0 .143-.019.166.098.328 1.636 1.383 2.559 2.9 2.995 1.241.356 2.495.366 3.749.084 1.558-.347 2.582-1.327 3.136-2.831.369-1.008.494-2.053.508-3.117.005-.272.014-2.203-.009-2.475l-.041-.014c-.037.07-.079.136-.115.206-1.019 2.02-2.826 3.159-4.861 3.239-4.75.188-7.812-2.672-7.932-8.259-.023-1.111.083-2.198.383-3.267.95-3.333 3.44-5.541 7.097-5.569 2.826-.019 4.681 1.814 5.359 3.295.023.052.06.108.11.089v-2.888h2.043c0 13.139.005 15.572.005 15.572-.005 3.68-1.232 6.736-4.75 7.603-3.205.792-7.332.225-9.039-2.681-.369-.633-.544-1.327-.599-2.086zm6.747-17.194c-2.421-.023-5.004 1.908-5.304 6.272-.189 2.766.683 5.728 3.298 6.966 1.273.605 3.427.703 4.995-.408 2.195-1.556 2.891-4.547 2.527-7.219-.448-3.333-2.205-5.625-5.516-5.611z"
    />
);


export const XIcon = (props: SvgProps) => (
    <SvgPath
        props={props}
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
    />
);

export const YouTubeIcon = (props: SvgProps) => (
    <SvgPath
        props={props}
        d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"
    />
);