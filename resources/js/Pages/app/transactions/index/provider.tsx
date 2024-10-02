import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Tabs } from '@/components/ui/tabs';
import TransactionForm from '@/pages/forms/TransactionForm';
import { Transaction } from '@/types/models/transactions';
import { router } from '@inertiajs/react';
import { FC, useState } from 'react';
import { TransactionPageContext } from './context';

type TransactionsPageProviderProps = FC<{
    children: React.ReactNode;
    transactions: Transaction[];
}>;

const TransactionsPageProvider: TransactionsPageProviderProps = ({ children, transactions }) => {
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);

    function toggleTransactionFormOpen() {
        if (!isTransactionFormOpen) {
            setSelectedTransaction(null);
        }

        setIsTransactionFormOpen((prev) => !prev);
    }

    function editTransaction(transaction: Transaction) {
        setSelectedTransaction(transaction);
        setIsTransactionFormOpen(true);
    }

    function deleteTransactions(transactions: Transaction[]) {
        router.post(
            route('generic.delete', {
                entity: 'Transaction',
            }),
            {
                ids: transactions.map((t) => t.id).join(','),
            },
            {
                onSuccess: () => router.visit(route('transaction.index')),
            },
        );
    }

    function viewTransaction(transaction: Transaction) {
        router.visit(
            route('transaction.show', {
                transaction: transaction.id,
            }),
        );
    }

    return (
        <TransactionPageContext.Provider
            value={{
                transactions,
                selectedTransaction,
                editTransaction,
                deleteTransactions,
                viewTransaction,
            }}
        >
            <Sheet open={isTransactionFormOpen} onOpenChange={toggleTransactionFormOpen}>
                <Tabs defaultValue="table">{children}</Tabs>

                <SheetContent className="min-w-[30vw]">
                    <SheetHeader>
                        <SheetTitle>New Transaction</SheetTitle>
                    </SheetHeader>

                    <TransactionForm transaction={selectedTransaction} />
                </SheetContent>
            </Sheet>
        </TransactionPageContext.Provider>
    );
};

export default TransactionsPageProvider;
