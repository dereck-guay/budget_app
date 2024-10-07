import DateRangePicker from '@/components/dataware/fields/DateRangePicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SheetTrigger } from '@/components/ui/sheet';
import { router } from '@inertiajs/react';
import { endOfMonth, startOfMonth } from 'date-fns';
import { FileSpreadsheet, PlusCircle } from 'lucide-react';

const TrasactionsToolbar = () => {
    const queryParams = new URLSearchParams(window.location.search);

    const currentDate = new Date();
    const firstDay = startOfMonth(currentDate);
    const lastDay = endOfMonth(currentDate);

    function handleSearchChange(value: string) {
        router.reload({
            data: {
                keywords: value,
            },
        });
    }

    return (
        <div className="flex justify-between">
            <div className="flex items-center gap-2">
                <DateRangePicker
                    size="sm"
                    defaultValue={{
                        from: firstDay,
                        to: lastDay,
                    }}
                />
                <Input
                    onChange={(e) => handleSearchChange(e.target.value)}
                    defaultValue={queryParams.get('keywords') ?? ''}
                    size="sm"
                    className="bg-background"
                    placeholder="Search transactions..."
                />
            </div>
            <div className="flex items-center gap-2">
                <Button size="sm" variant={'outline'}>
                    <FileSpreadsheet className="mr-1 size-4" />
                    Export
                </Button>
                <SheetTrigger asChild>
                    <Button size="sm" variant={'destructive'}>
                        <PlusCircle className="mr-1 size-4" />
                        New Expense
                    </Button>
                </SheetTrigger>
                <SheetTrigger asChild>
                    <Button size="sm">
                        <PlusCircle className="mr-1 size-4" />
                        New Income
                    </Button>
                </SheetTrigger>
            </div>
        </div>
    );
};

export default TrasactionsToolbar;
