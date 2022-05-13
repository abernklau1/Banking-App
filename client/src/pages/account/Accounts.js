import { useAppContext } from "../../context/appContext";
import { MainAccountTable } from "../../components/index";
//import { useEffect } from "react";

const Accounts = () => {
  const {
    user: { accounts },
  } = useAppContext();
  return (
    <section className="account-sections content-container">
      <header>
        <h2>Accounts</h2>
      </header>
      <MainAccountTable />
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
