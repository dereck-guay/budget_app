import { Budget } from '@/types/models/budgets';
import { createContext, useContext } from 'react';

type BudgetPageContext = {
    budgets: Budget[];
    selectedBudget: Budget | null;
    editBudget: (budget: Budget) => void;
    viewBudget: (budget: Budget) => void;
};

export const BudgetPageContext = createContext<BudgetPageContext | null>(null);

export function useBudgetPageContext() {
    const context = useContext(BudgetPageContext);

    if (!context) {
        throw new Error('BudgetPageContext must be used inside its provider');
    }

    return context;
}
