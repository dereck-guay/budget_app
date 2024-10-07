import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import BudgetForm from '@/forms/BudgetForm';
import { Budget } from '@/types/models/budgets';
import { Head, router } from '@inertiajs/react';
import { FC, useState } from 'react';
import { BudgetPageContext } from './context';

type BudgetPageProviderProps = FC<{
    children: React.ReactNode;
    budgets: Budget[];
}>;

const BudgetPageProvider: BudgetPageProviderProps = ({ children, budgets }) => {
    const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
    const [isBudgetFormOpen, setIsBudgetFormOpen] = useState(false);

    function editBudget(budget: Budget) {
        setSelectedBudget(budget);
        setIsBudgetFormOpen(true);
    }

    function viewBudget(budget: Budget) {
        router.visit(
            route('budget.show', {
                budget: budget.id,
            }),
        );
    }

    function toggleIsBudgetFormOpen(isOpen: boolean) {
        if (!isOpen) {
            setSelectedBudget(null);
        }

        setIsBudgetFormOpen(isOpen);
    }

    return (
        <BudgetPageContext.Provider
            value={{
                budgets,
                selectedBudget,
                editBudget,
                viewBudget,
            }}
        >
            <Head title="Budgets" />
            <Sheet open={isBudgetFormOpen} onOpenChange={toggleIsBudgetFormOpen}>
                {children}
                <SheetContent className="min-w-[30vw]">
                    <SheetHeader>
                        <SheetTitle>New Budget</SheetTitle>
                    </SheetHeader>
                    <BudgetForm budget={selectedBudget} />
                </SheetContent>
            </Sheet>
        </BudgetPageContext.Provider>
    );
};

export default BudgetPageProvider;
