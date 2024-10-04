import { Transaction } from './transactions';

export type Budget = {
    id: number;
    title: string;
    amount: string;
    created_at: string;
    updated_at: string;
    transactions?: Transaction[];
};
