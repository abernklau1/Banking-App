import { AccountTable } from "../../components/index";
import { useAppContext } from "../../context/appContext";

const Transfer = () => {
  const {
    account: { savings, checking, totalBalance },
  } = useAppContext();
  return (
    <section className="account-sections content-container">
      <header>
        <h2>Transfer</h2>
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

export default Transfer;
