import { Links, Page } from './pages';

export const Routes = () => {
    const title = (page: string) => `${page} | Matt Halloran`;
    // Only one route in this case, so no need for a Switch or Route
    return (
        <Page title={title('Links')}>
            <Links />
        </Page>
    );
}