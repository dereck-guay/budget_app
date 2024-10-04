import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { Budget } from '@/types/models/budgets';
import { Transaction } from '@/types/models/transactions';
import { Head } from '@inertiajs/react';
import { FC } from 'react';
import TransactionsCalendar from './components/TransactionsCalendar';
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
                        <TabsContent value="table">
                            <TransactionsTable />
                        </TabsContent>
                        <TabsContent value="calendar">
                            <TransactionsCalendar />
                        </TabsContent>
                    </CardContent>
                </Card>
            </div>
        </TransactionsPageProvider>
    );
};

export default TransactionsPage;
