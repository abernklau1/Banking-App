import { useAppContext } from "../../context/appContext";
import { AccountTable } from "../../components/index";
//import { useEffect } from "react";

const Accounts = () => {
  const {
    account: { savings, checking, totalBalance },
    //getAccount,
  } = useAppContext();

  // useEffect(() => {
  //   getAccount();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
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
      {/* {Object.entries(accounts).map(([key, value], index) => {
        return (
          <AccountTable
            account={{
              account: value.account,
              accountType: value.accountType,
              accountBalance: value.accountBalance,
            }}
            key={index}
          />
        );
      })} */}
    </section>
  );
};

export default Accounts;
