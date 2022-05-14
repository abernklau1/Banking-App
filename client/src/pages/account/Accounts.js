import { useAppContext } from "../../context/appContext";
import { MainAccountTable, AccountTable } from "../../components/index";
//import { useEffect } from "react";

const Accounts = () => {
  const { accounts } = useAppContext();
  return (
    <section className="account-sections content-container">
      <header>
        <h2>Accounts</h2>
      </header>
      <MainAccountTable />
      {Object.entries(accounts)
        .filter(([key, value]) => {
          return (
            value.accType !== "Prime Share Account" &&
            value.accType !== "Basic Checking"
          );
        })
        .map(([key, value], index) => {
          console.log(value.accType);
          return (
            <AccountTable
              account={{
                account: value.accType,
                accountType: value.accType,
                accountBalance: value.balance,
              }}
              key={index}
            />
          );
        })}
    </section>
  );
};

// {Object.entries(accounts).filter(([key, value]) => {
//   return value.accType !== "Prime Share Account" || value.accType !== "Basic Checking";
// }).map(([key, value], index) => {
//   return (
//     <AccountTable
//       account={{
//         account: value.accType,
//         accountType: value.accType,
//         accountBalance: value.balance,
//       }}
//       key={index}
//     />
//   );
// })}

export default Accounts;
