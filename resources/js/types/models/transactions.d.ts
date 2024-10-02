import { Budget } from './budgets';

export type Transaction = {
    id: number;
    user_id: number;
    budget_id: number;
    budget: Budget;
    title: string;
    amount: string;
    date: string;
    created_at: string;
    updated_at: string;
};
