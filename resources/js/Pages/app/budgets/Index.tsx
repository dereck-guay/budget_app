import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Budget } from '@/types/models/budgets';
import { PlusCircle } from 'lucide-react';
import { FC } from 'react';

type BudgetsIndexProps = FC<{
    budgets: Budget[];
}>;

const BudgetsIndex: BudgetsIndexProps = ({ budgets }) => {
    return (
        <Sheet>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <div></div>
                    <div className="flex items-center gap-2">
                        <SheetTrigger asChild>
                            <Button size="sm">
                                <PlusCircle className="mr-1 size-4" />
                                New Budget
                            </Button>
                        </SheetTrigger>
                    </div>
                </div>

                <div className="grid grid-cols-2">
                    {budgets.map((budget) => (
                        <Card key={budget.id}>
                            <CardHeader>
                                <CardTitle className="flex justify-between">
                                    <div>{budget.title}</div>
                                    <div>${budget.amount}</div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent></CardContent>
                        </Card>
                    ))}
                </div>
            </div>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>New Budget</SheetTitle>
                </SheetHeader>
                <div>Form Here</div>
            </SheetContent>
        </Sheet>
    );
};

export default BudgetsIndex;
