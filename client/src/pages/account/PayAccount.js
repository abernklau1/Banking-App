import { useAppContext } from "../../context/appContext";
import { AccountTable } from "../../components/index";

const PayAccount = () => {
  const { accounts } = useAppContext();
  return (
    <section>
      <h2>Which account do you wish to pay?</h2>
      <div className="accounts">
        {accounts.map((account) => {
          return (
            <AccountTable
              key={account._id}
              account={{
                account: account.accType,
                accountType: account.accType,
                accountBalance: account.balance,
              }}
            />
          );
        })}
      </div>
    </section>
  );
};

export default PayAccount;
