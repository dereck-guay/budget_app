import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Budget } from '@/types/models/budgets';
import { FC } from 'react';
import BudgetsTable from './components/BudgetsTable';
import BudgetToolbar from './components/BudgetToolbar';
import BudgetPageProvider from './provider';

type BudgetsIndexProps = FC<{
    budgets: Budget[];
}>;

const BudgetsIndex: BudgetsIndexProps = ({ budgets }) => {
    return (
        <BudgetPageProvider budgets={budgets}>
            <div className="flex flex-col gap-2">
                <BudgetToolbar />
                <Card>
                    <CardHeader>
                        <CardTitle>Budgets</CardTitle>
                        <CardDescription>Here you can manage and create budgets.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <BudgetsTable />
                    </CardContent>
                </Card>
            </div>
        </BudgetPageProvider>
    );
};

export default BudgetsIndex;
