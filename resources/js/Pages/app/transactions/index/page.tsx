import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Budget } from '@/types/models/budgets';
import { Transaction } from '@/types/models/transactions';
import { Head } from '@inertiajs/react';
import { FC } from 'react';
import TransactionsTable from './components/TransactionsTable';
import TransactionsToolbar from './components/TransactionsToolbar';
import TransactionsPageProvider from './provider';

type TransactionsPageProps = FC<{
    transactions: Transaction[];
    budgets: Budget[];
}>;

const TransactionsPage: TransactionsPageProps = ({ transactions, budgets }) => {
    return (
        <TransactionsPageProvider transactions={transactions} budgets={budgets}>
            <Head title="Transactions" />

            <div className="flex flex-col gap-2">
                <TransactionsToolbar />
                <Card>
                    <CardHeader>
                        <CardTitle>Transactions</CardTitle>
                        <CardDescription>
                            Here you can see and manage all your past transactions.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <TransactionsTable />
                    </CardContent>
                </Card>
            </div>
        </TransactionsPageProvider>
    );
};

export default TransactionsPage;
