import { ArrowLeftRight, Grid2X2 } from 'lucide-react';
import { FC } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

type AppLayoutProps = FC<{
    children: React.ReactNode;
}>;

const AppLayout: AppLayoutProps = ({ children }) => {
    return (
        <div className="flex">
            <Sidebar>
                <Sidebar.Link href="/" matcher="/">
                    <Grid2X2 className="size-5" />
                    Dashboard
                </Sidebar.Link>
                <Sidebar.Link
                    href="/app/transactions"
                    matcher="/app/transactions"
                >
                    <ArrowLeftRight className="size-5" />
                    Transactions
                </Sidebar.Link>
            </Sidebar>
            <div className="grow bg-muted/40 p-4">
                <Navbar />
                <main className="">{children}</main>
            </div>
        </div>
    );
};

export default AppLayout;
