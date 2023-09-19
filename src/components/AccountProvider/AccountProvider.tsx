import { Account } from "@/lib/account";
import { PropsWithChildren, createContext, useContext } from "react";

interface UserProviderProps extends PropsWithChildren {
  account: Account;
}

const UserContext = createContext<Account>({
  username: "",
});

export const AccountProvider: React.FC<UserProviderProps> = (props) => {
  const { account, children } = props;

  return (
    <UserContext.Provider value={account}>{children}</UserContext.Provider>
  );
};

export const useUser = (): Account => {
  return useContext(UserContext);
};
