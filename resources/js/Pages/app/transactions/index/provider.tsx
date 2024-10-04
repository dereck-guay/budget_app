import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Tabs } from '@/components/ui/tabs';
import TransactionForm from '@/forms/TransactionForm';
import { Budget } from '@/types/models/budgets';
import { Transaction } from '@/types/models/transactions';
import { router } from '@inertiajs/react';
import { FC, useState } from 'react';
import { TransactionPageContext } from './context';

type TransactionsPageProviderProps = FC<{
    children: React.ReactNode;
    transactions: Transaction[];
    budgets: Budget[];
}>;

const TransactionsPageProvider: TransactionsPageProviderProps = ({
    children,
    transactions,
    budgets,
}) => {
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

    function deleteTransaction(transaction: Transaction) {
        router.post(
            route('generic.delete', {
                entity: 'Transaction',
            }),
            {
                ids: transaction.id,
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
                deleteTransaction,
                viewTransaction,
            }}
        >
            <Sheet open={isTransactionFormOpen} onOpenChange={toggleTransactionFormOpen}>
                <Tabs defaultValue="table">{children}</Tabs>

                <SheetContent className="min-w-[30vw]">
                    <SheetHeader>
                        <SheetTitle>New Transaction</SheetTitle>
                    </SheetHeader>

                    <TransactionForm transaction={selectedTransaction} budgets={budgets} />
                </SheetContent>
            </Sheet>
        </TransactionPageContext.Provider>
    );
};

export default TransactionsPageProvider;
