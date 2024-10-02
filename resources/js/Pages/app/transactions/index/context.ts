import { Transaction } from '@/types/models/transactions';
import { createContext, useContext } from 'react';

type TransactionPageContext = {
    transactions: Transaction[];
    selectedTransaction: Transaction | null;
    editTransaction: (transaction: Transaction) => void;
    deleteTransactions: (transactions: Transaction[]) => void;
    viewTransaction: (transaction: Transaction) => void;
};

export const TransactionPageContext = createContext<TransactionPageContext | null>(null);

export function useTransactionPageContext() {
    const context = useContext(TransactionPageContext);

    if (!context) {
        throw new Error('TransactionPageContext must be used inside its provider.');
    }

    return context;
}
