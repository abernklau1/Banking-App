import { useAppContext } from "../context/appContext";
import AccountTable from "./AccountTable";

const MainAccountTable = () => {
  const {
    user: { mainAccount },
  } = useAppContext();

  const savings = mainAccount[0];
  const checking = mainAccount[1];
  const total = parseFloat((savings.balance + checking.balance).toFixed(2));
  return (
    <AccountTable
      header="Insured Accounts"
      account1={{
        accType: "Prime Share Account",
        balance: savings.balance,
      }}
      account2={{
        accType: "Basic Checking",
        balance: checking.balance,
      }}
      accountTotal={total}
    />
  );
};

export default MainAccountTable;
