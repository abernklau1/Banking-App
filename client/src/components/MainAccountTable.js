import { useAppContext } from "../context/appContext";
import AccountTable from "./AccountTable";

const MainAccountTable = () => {
  const { mainAccount } = useAppContext();

  const savings = mainAccount[0];
  const checking = mainAccount[1];
  const total = parseFloat((savings.balance + checking.balance).toFixed(2));
  return (
    <AccountTable
      header="Insured Accounts"
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
      accountTotal={total}
    />
  );
};

export default MainAccountTable;
