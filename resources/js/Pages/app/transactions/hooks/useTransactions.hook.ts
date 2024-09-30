import { Transaction } from '@/types/models/transactions';
import { createContext, Dispatch, SetStateAction, useContext } from 'react';

type TransactionsContext = [
    Transaction[],
    Dispatch<SetStateAction<Transaction[]>>,
];

export const TransactionsContext = createContext<TransactionsContext>(
    [] as unknown as TransactionsContext,
);

const useTransactions = () => {
    const [transactions, _setTransactions] = useContext(TransactionsContext);
    return transactions;
};

export default useTransactions;
