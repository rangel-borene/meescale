import { createContext, ReactNode, useContext, useState } from 'react';

type AccountContextType = {
    selectedAccount: string;
    setAccount: (account: string) => void;
};

const AccountContext = createContext<AccountContextType>({} as AccountContextType);

export const AccountProvider = ({ children }: { children: ReactNode }) => {
    const [selectedAccount, setSelectedAccount] = useState('Conta Pessoal');

    return (
        <AccountContext.Provider value={{ selectedAccount, setAccount: setSelectedAccount }}>
            {children}
        </AccountContext.Provider>
    );
};

export const useAccount = () => useContext(AccountContext);