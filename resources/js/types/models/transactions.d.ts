import { Budget } from './budgets';

export type Transaction = {
    id: number;
    user_id: number;

    from_account_id: number | null;
    to_account_id: number | null;

    budget_id: number | null;
    budget: Budget;

    title: string;
    amount: string;
    date: string;

    created_at: string;
    updated_at: string;
};
