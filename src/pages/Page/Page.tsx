import { PageProps } from 'pages/types';
import { useEffect } from 'react';

export const Page = ({
    title,
    children
}: PageProps) => {
    useEffect(() => { document.title = title }, [title]);
    return children;
};