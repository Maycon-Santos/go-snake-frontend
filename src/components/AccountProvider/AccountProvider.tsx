import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Account } from "@/services/account";

interface UserProviderProps extends PropsWithChildren {
  account: Account;
}

interface UserContextValue {
  account: Account;
}

const UserContext = createContext<UserContextValue>({
  account: {} as Account,
});

export const AccountProvider: React.FC<UserProviderProps> = (props) => {
  const { account, children } = props;

  return (
    <UserContext.Provider value={{ account }}>{children}</UserContext.Provider>
  );
};

export const useAccount = () => {
  return useContext(UserContext);
};
