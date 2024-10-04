import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SheetTrigger } from '@/components/ui/sheet';
import { router } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';

const BudgetToolbar = () => {
    const queryParams = new URLSearchParams(window.location.search);

    return (
        <div className="flex justify-between">
            <div className="flex items-center gap-2">
                <Input
                    placeholder="Search budgets..."
                    size="sm"
                    className="bg-background"
                    defaultValue={queryParams.get('keywords') ?? ''}
                    onChange={(e) =>
                        router.reload({
                            data: {
                                keywords: e.target.value,
                            },
                        })
                    }
                />
            </div>
            <div className="flex items-center gap-2">
                <SheetTrigger asChild>
                    <Button size="sm">
                        <PlusCircle className="mr-1 size-4" />
                        New Budget
                    </Button>
                </SheetTrigger>
            </div>
        </div>
    );
};

export default BudgetToolbar;
