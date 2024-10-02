import { Budget } from '@/types/models/budgets';
import { FC } from 'react';

type BudgetShowProps = FC<{
    budget: Budget;
}>;

const BudgetShow: BudgetShowProps = ({ budget }) => {
    return <div>{budget.title}</div>;
};

export default BudgetShow;
