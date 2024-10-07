import { DataTable } from '@/components/dataware/DataTable';
import {
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuSeparator,
} from '@/components/ui/context-menu';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';
import { useTransactionPageContext } from '../context';

const TransactionsTable = () => {
    const { transactions, editTransaction, deleteTransaction, viewTransaction } =
        useTransactionPageContext();

    return (
        <DataTable
            data={transactions}
            contextMenu={(row, table) => {
                return (
                    <ContextMenuContent>
                        <ContextMenuLabel>{row.original.title}</ContextMenuLabel>
                        <ContextMenuSeparator />
                        <ContextMenuItem onClick={() => viewTransaction(row.original)}>
                            View
                        </ContextMenuItem>
                        <ContextMenuItem onClick={() => editTransaction(row.original)}>
                            Edit
                        </ContextMenuItem>
                        <ContextMenuItem onClick={() => deleteTransaction(row.original)}>
                            Delete
                        </ContextMenuItem>
                    </ContextMenuContent>
                );
            }}
            columns={[
                {
                    header: 'Budget',
                    accessorKey: 'budget',
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
                },
                {
                    header: 'Transaction',
                    accessorKey: 'title',
                    cell: ({ row }) => (
                        <Link
                            href={route('transaction.show', {
                                transaction: row.original.id,
                            })}
                            className="inline-flex items-center gap-2 hover:underline"
                        >
                            {row.getValue('title')}
                        </Link>
                    ),
                },
                {
                    header: 'Amount',
                    accessorKey: 'amount',
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
                },
                {
                    header: 'Date',
                    accessorKey: 'date',
                    cell: ({ row }) => {
                        return format(new Date(row.original.date), 'MMM. Mo yyyy, h:mm bb');
                    },
                },
            ]}
        />
    );
};

export default TransactionsTable;
