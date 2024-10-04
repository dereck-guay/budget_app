import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Account } from '@/types/models/accounts';
import { createContext, FC, useContext } from 'react';

const AccountPageContext = createContext<Account[] | null>(null);

export function useAccountPage() {
    const context = useContext(AccountPageContext);
    if (!context) throw Error('useAccountPage must be used within AccountPageContext');

    return context;
}

type AccountPageProps = FC<{
    accounts: Account[];
}>;

const AccountPage: AccountPageProps = ({ accounts }) => {
    return (
        <AccountPageContext.Provider value={accounts}>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Accounts</CardTitle>
                        <CardDescription>Here you can manage and create accounts.</CardDescription>
                    </CardHeader>
                    <CardContent>You have no accounts.</CardContent>
                </Card>
            </div>
        </AccountPageContext.Provider>
    );
};

export default AccountPage;
