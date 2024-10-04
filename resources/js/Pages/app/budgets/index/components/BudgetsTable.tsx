import { DataTable } from '@/components/dataware/DataTable';
import {
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuSeparator,
} from '@/components/ui/context-menu';
import { Progress } from '@/components/ui/progress';
import { deleteEntity } from '@/lib/helpers';
import { Link } from '@inertiajs/react';
import { useBudgetPageContext } from '../context';

const BudgetsTable = () => {
    const { budgets, editBudget, viewBudget } = useBudgetPageContext();

    return (
        <DataTable
            data={budgets}
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
                            <ContextMenuItem onClick={() => viewBudget(row.original)}>
                                View
                            </ContextMenuItem>
                        )}
                        {!isMultiple && (
                            <ContextMenuItem onClick={() => editBudget(row.original)}>
                                Edit
                            </ContextMenuItem>
                        )}
                        <ContextMenuItem
                            onClick={() =>
                                deleteEntity('Budget', row.original.id, route('budget.index'))
                            }
                        >
                            Delete
                        </ContextMenuItem>
                    </ContextMenuContent>
                );
            }}
            columns={[
                {
                    header: 'Budget',
                    accessorKey: 'title',
                    cell: ({ row }) => (
                        <Link
                            href={route('budget.show', {
                                budget: row.original.id,
                            })}
                            className="inline-flex items-center gap-2 hover:underline"
                        >
                            {row.original.title}
                        </Link>
                    ),
                },
                {
                    header: 'Progress',
                    accessorKey: 'transactions',
                    cell: ({ row }) => {
                        const transactions = row.original.transactions ?? [];
                        const spent = transactions.reduce(
                            (prev, acc) => prev + Number(acc.amount),
                            0,
                        );

                        return (
                            <div className="flex items-center gap-2">
                                <span className="w-16">${spent}</span>
                                <Progress value={(spent / Number(row.original.amount)) * 100} />
                                <span className="w-16">${row.original.amount}</span>
                            </div>
                        );
                    },
                },
            ]}
        />
    );
};

export default BudgetsTable;
