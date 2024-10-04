import DataCalendar from '@/components/dataware/DataCalendar';
import { EventInput } from '@fullcalendar/core/index.js';
import { useTransactionPageContext } from '../context';

const TransactionsCalendar = () => {
    const { transactions, editTransaction, deleteTransactions, viewTransaction } =
        useTransactionPageContext();

    return (
        <DataCalendar
            events={transactions}
            transform={(transaction) => {
                const event: EventInput = {
                    title: `${transaction.title}`,
                    date: transaction.date,
                    start: transaction.date,
                };

                if (Number(transaction.amount) <= 0) {
                    event.classNames = ['destructive-pin-color'];
                }

                return event;
            }}
        />
    );
};

export default TransactionsCalendar;
