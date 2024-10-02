import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { Transaction } from '@/types/models/transactions';
import { Head } from '@inertiajs/react';
import { FC } from 'react';
import TransactionsTable from './components/TransactionsTable';
import TransactionsToolbar from './components/TransactionsToolbar';
import TransactionsPageProvider from './provider';

type TransactionsPageProps = FC<{
    transactions: Transaction[];
}>;

const TransactionsPage: TransactionsPageProps = ({ transactions }) => {
    console.log(transactions);
    return (
        <TransactionsPageProvider transactions={transactions}>
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
                            Calendar
                            {/* <TransactionsCalendar /> */}
                        </TabsContent>
                    </CardContent>
                </Card>
            </div>
        </TransactionsPageProvider>
    );
};

export default TransactionsPage;
