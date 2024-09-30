import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Transaction } from '@/types/models/transactions';
import { FileSpreadsheet, Filter, PlusCircle } from 'lucide-react';
import { FC, useState } from 'react';
import TransactionsTable from './components/TransactionsTable';
import { TransactionsContext } from './hooks/useTransactions.hook';

type TransactionIndexProps = FC<{
    transactions: Transaction[];
}>;

const TransactionIndex: TransactionIndexProps = ({ transactions }) => {
    const [trans, setTrans] = useState(transactions);

    return (
        <TransactionsContext.Provider value={[trans, setTrans]}>
            <Tabs defaultValue="table">
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                            <Input
                                size="sm"
                                className="bg-background"
                                placeholder="Search transactions..."
                            />

                            <div>
                                <TabsList>
                                    <TabsTrigger value="table">
                                        Table
                                    </TabsTrigger>
                                    <TabsTrigger value="calendar">
                                        Calendar
                                    </TabsTrigger>
                                </TabsList>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button size="sm" variant={'outline'}>
                                <Filter className="mr-1 size-4" />
                                Filters
                            </Button>
                            <Button size="sm" variant={'outline'}>
                                <FileSpreadsheet className="mr-1 size-4" />
                                Export
                            </Button>
                            <Button size="sm">
                                <PlusCircle className="mr-1 size-4" />
                                New Transaction
                            </Button>
                        </div>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Transactions</CardTitle>
                            <CardDescription>
                                Here you can see and manage all your past
                                transactions.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <TabsContent value="table">
                                <TransactionsTable transactions={trans} />
                            </TabsContent>
                            <TabsContent value="calendar">Calendar</TabsContent>
                        </CardContent>
                    </Card>
                </div>
            </Tabs>
        </TransactionsContext.Provider>
    );
};

export default TransactionIndex;
