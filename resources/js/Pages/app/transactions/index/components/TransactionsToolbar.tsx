import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SheetTrigger } from '@/components/ui/sheet';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { router } from '@inertiajs/react';
import { FileSpreadsheet, PlusCircle } from 'lucide-react';

const TrasactionsToolbar = () => {
    const queryParams = new URLSearchParams(window.location.search);

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
                <Input
                    onChange={(e) => handleSearchChange(e.target.value)}
                    defaultValue={queryParams.get('keywords') ?? ''}
                    size="sm"
                    className="bg-background"
                    placeholder="Search transactions..."
                />

                <div>
                    <TabsList>
                        <TabsTrigger value="table">Table</TabsTrigger>
                        <TabsTrigger value="calendar">Calendar</TabsTrigger>
                    </TabsList>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button size="sm" variant={'outline'}>
                    <FileSpreadsheet className="mr-1 size-4" />
                    Export
                </Button>
                <SheetTrigger asChild>
                    <Button size="sm">
                        <PlusCircle className="mr-1 size-4" />
                        New Transaction
                    </Button>
                </SheetTrigger>
            </div>
        </div>
    );
};

export default TrasactionsToolbar;
