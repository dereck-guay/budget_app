import { Head } from '@inertiajs/react';
import { FC } from 'react';
import { Transaction } from '../../../types/models/transactions';

type TransactionShowProps = FC<{
    transaction: Transaction;
}>;

const TransactionShow: TransactionShowProps = ({ transaction }) => {
    return (
        <div>
            <Head title={transaction.title} />
            {transaction.title}
        </div>
    );
};

export default TransactionShow;
