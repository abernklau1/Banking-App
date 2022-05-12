import { useAppContext } from "../../context/appContext";
import { AccountTable } from "../../components/index";

const Accounts = () => {
  const {
    account: { savings, checking, totalBalance },
  } = useAppContext();
  return (
    <section className="account-sections content-container">
      <header>
        <h2>Accounts</h2>
      </header>
      <AccountTable
        savings={{
          account: "Savings",
          accountType: "Prime Share Account",
          accountBalance: savings,
        }}
        checking={{
          account: "Checking",
          accountType: "Basic Checking",
          accountBalance: checking,
        }}
        accountTotal={totalBalance}
      />
    </section>
  );
};

export default Accounts;
