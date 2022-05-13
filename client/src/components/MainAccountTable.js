import { useAppContext } from "../context/appContext";
import AccountTable from "./AccountTable";

const MainAccountTable = () => {
  const { accounts } = useAppContext();

  const savings = accounts[0];
  const checking = accounts[1];
  return (
    <AccountTable
      savings={{
        account: "PRIME SHARE ACCOUNT",
        accountType: "Prime Share Account",
        accountBalance: savings.balance,
      }}
      checking={{
        account: "BASIC CHECKING",
        accountType: "Basic Checking",
        accountBalance: checking.balance,
      }}
      accountTotal={savings.balance + checking.balance}
    />
  );
};

export default MainAccountTable;
