import { DataTable } from '@/components/dataware/DataTable';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuSeparator,
} from '@/components/ui/context-menu';
import { Link } from '@inertiajs/react';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';
import { useTransactionPageContext } from '../context';

const TransactionsTable = () => {
    const { transactions, editTransaction, deleteTransactions, viewTransaction } =
        useTransactionPageContext();

    return (
        <DataTable
            contextMenu={(row, table) => {
                const selectedRows = table.getSelectedRowModel().rows;
                const isMultiple = selectedRows.length > 1;

                return (
                    <ContextMenuContent>
                        <ContextMenuLabel>
                            {isMultiple
                                ? `${selectedRows.length} Transactions`
                                : row.getValue('title')}
                        </ContextMenuLabel>
                        <ContextMenuSeparator />
                        {!isMultiple && (
                            <ContextMenuItem onClick={() => viewTransaction(row.original)}>
                                View
                            </ContextMenuItem>
                        )}
                        {!isMultiple && (
                            <ContextMenuItem onClick={() => editTransaction(row.original)}>
                                Edit
                            </ContextMenuItem>
                        )}
                        <ContextMenuItem
                            onClick={() => deleteTransactions(selectedRows.map((r) => r.original))}
                        >
                            Delete
                        </ContextMenuItem>
                    </ContextMenuContent>
                );
            }}
            data={transactions}
            columns={[
                {
                    id: 'select',
                    header: ({ table }) => (
                        <div className="flex w-1 items-center whitespace-nowrap">
                            <Checkbox
                                checked={
                                    table.getIsAllPageRowsSelected() ||
                                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                                }
                                onCheckedChange={(value) =>
                                    table.toggleAllPageRowsSelected(!!value)
                                }
                                aria-label="Select all"
                            />
                        </div>
                    ),
                    cell: ({ row }) => (
                        <div className="flex w-1 items-center whitespace-nowrap">
                            <Checkbox
                                checked={row.getIsSelected()}
                                onCheckedChange={(value) => row.toggleSelected(!!value)}
                                aria-label="Select row"
                            />
                        </div>
                    ),
                },
                {
                    header: 'Budget',
                    cell: ({ row }) => (
                        <Link
                            href={route('budget.show', {
                                budget: row.original.budget.id,
                            })}
                            className="inline-flex items-center gap-2 hover:underline"
                        >
                            {row.original.budget.title}
                        </Link>
                    ),
                    accessorKey: 'budget',
                },
                {
                    header: ({ column }) => {
                        return (
                            <Button
                                className="w-full justify-start"
                                variant="ghost"
                                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                            >
                                Transaction
                                <CaretSortIcon className="ml-2 h-4 w-4" />
                            </Button>
                        );
                    },
                    cell: ({ row }) => (
                        <Link
                            href={route('transaction.show', {
                                transaction: row.original.id,
                            })}
                            className="ml-4 inline-flex items-center gap-2 hover:underline"
                        >
                            {row.getValue('title')}
                        </Link>
                    ),
                    accessorKey: 'title',
                },
                {
                    header: 'Amount',
                    cell: ({ row }) => {
                        const amount = Number(row.getValue('amount'));
                        return (
                            <div
                                className={`flex items-center gap-2 ${amount > 0 ? 'text-primary' : 'text-destructive'}`}
                            >
                                {amount > 0 ? (
                                    <ArrowDownToLine className="size-4" />
                                ) : (
                                    <ArrowUpFromLine className="size-4" />
                                )}
                                ${Math.abs(amount)}
                            </div>
                        );
                    },
                    accessorKey: 'amount',
                },
                {
                    cell: ({ row }) => {
                        return format(new Date(row.original.date), 'MMM. Mo yyyy, h:mm bb');
                    },
                    header: 'Date',
                },
            ]}
        />
    );
};

export default TransactionsTable;
