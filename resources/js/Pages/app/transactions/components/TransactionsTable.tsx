import { DataTable } from '@/components/dataware/DataTable';
import { Checkbox } from '@/components/ui/checkbox';
import { Transaction } from '@/types/models/transactions';
import { format } from 'date-fns';
import { FC } from 'react';

type TransactionsTableProps = FC<{
    transactions: Transaction[];
}>;

const TransactionsTable: TransactionsTableProps = ({ transactions }) => {
    return (
        <DataTable
            data={transactions}
            columns={[
                {
                    id: 'select',
                    header: ({ table }) => (
                        <div className="flex w-1 items-center whitespace-nowrap">
                            <Checkbox
                                checked={
                                    table.getIsAllPageRowsSelected() ||
                                    (table.getIsSomePageRowsSelected() &&
                                        'indeterminate')
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
                                onCheckedChange={(value) =>
                                    row.toggleSelected(!!value)
                                }
                                aria-label="Select row"
                            />
                        </div>
                    ),
                    enableSorting: false,
                    enableHiding: false,
                },
                {
                    cell: ({ row }) => {
                        const transaction = row.original;
                        return <div>{transaction.amount}</div>;
                    },
                    header: 'Amount',
                },
                {
                    cell: ({ row }) => {
                        const transaction = row.original;
                        return <div>{transaction.title}</div>;
                    },
                    header: 'Transaction',
                },
                {
                    cell: ({ row }) => {
                        return format(
                            new Date(row.original.date),
                            'MMM. Mo yyyy, h:mm bb',
                        );
                    },
                    header: 'Date',
                },
            ]}
        />
    );
};

export default TransactionsTable;
