import {
    ArrowLeftRight,
    ChartNoAxesCombined,
    ChartPie,
    Grid2X2,
    RotateCw,
} from 'lucide-react';
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
                <Sidebar.Link href={route('dashboard.index')} matcher="/app">
                    <Grid2X2 className="size-5 transition-transform" />
                    Dashboard
                </Sidebar.Link>
                <Sidebar.Link
                    href={route('budget.index')}
                    matcher="/app/budgets*"
                >
                    <ChartPie className="size-5" />
                    Budgets
                </Sidebar.Link>
                <Sidebar.Link
                    href={route('transaction.index')}
                    matcher="/app/transactions*"
                >
                    <ArrowLeftRight className="size-5" />
                    Transactions
                </Sidebar.Link>
                <Sidebar.Link
                    href={`/app/subscriptions`}
                    matcher="/app/subscriptions*"
                >
                    <RotateCw className="size-5" />
                    Subscriptions
                </Sidebar.Link>
                <Sidebar.Link
                    href="/app/investments"
                    matcher="/app/investments"
                >
                    <ChartNoAxesCombined className="size-5" />
                    Investments
                </Sidebar.Link>
            </Sidebar>
            <div className="grow bg-muted/40 p-4">
                <Navbar />
                <main className="pt-4">{children}</main>
            </div>
        </div>
    );
};

export default AppLayout;
