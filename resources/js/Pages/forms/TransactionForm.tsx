import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SheetClose } from '@/components/ui/sheet';
import { Transaction } from '@/types/models/transactions';
import { router, usePage } from '@inertiajs/react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import DateTimePicker from '../../components/dataware/Fields/DateTimePicker';

type TransactionFormProps = FC<{
    transaction: Transaction | null;
}>;

const TransactionForm: TransactionFormProps = ({ transaction }) => {
    const { errors } = usePage().props;

    const form = useForm<Transaction>({
        defaultValues: {
            title: transaction?.title,
            amount: transaction?.amount,
            date: transaction?.date,
        },
    });

    function onSubmit(data: Transaction) {
        if (transaction) {
            router.put(
                route('transaction.update', {
                    transaction: transaction.id,
                }),
                data,
                {
                    onSuccess: () => router.visit(route('transaction.index')),
                },
            );

            return;
        }

        router.post(route('transaction.store'), data, {
            onSuccess: () => router.visit(route('transaction.index')),
        });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-3 gap-4"
            >
                <div className="col-span-3">
                    <Label>Title</Label>
                    <Input
                        placeholder="Transaction date and time"
                        {...form.register('title')}
                    />
                    {errors.title && (
                        <small className="text-destructive">
                            {errors.title}
                        </small>
                    )}
                </div>

                <div className="col-span-3">
                    <Label>Amount</Label>
                    <Input
                        type="number"
                        placeholder="Transaction date and time"
                        {...form.register('amount')}
                    />
                    {errors.amount && (
                        <small className="text-destructive">
                            {errors.amount}
                        </small>
                    )}
                </div>

                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="col-span-3">
                            <FormLabel>Date</FormLabel>
                            <DateTimePicker field={field} hasTime />
                            {errors.date && (
                                <small className="text-destructive">
                                    {errors.date}
                                </small>
                            )}
                        </FormItem>
                    )}
                />

                <div className="col-span-full mt-4 flex gap-2">
                    <Button>{transaction ? 'Save' : 'Create'}</Button>
                    <SheetClose asChild>
                        <Button type="button" variant={'ghost'}>
                            No, cancel
                        </Button>
                    </SheetClose>
                </div>
            </form>
        </Form>
    );
};

export default TransactionForm;
