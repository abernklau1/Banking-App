import { useAppContext } from "../../context/appContext";

const Accounts = () => {
  const { savings, checking, totalBalance } = useAppContext();
  return (
    <section>
      <div className="account-container">
        <header>
          <h2>Accounts</h2>
        </header>
        <table>
          <thead>
            <tr>
              <th>Account</th>
              <th className="balance">Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Savings</td>
              <td className="balance">${savings}</td>
            </tr>
            <tr>
              <td>Checking</td>
              <td className="balance">${checking}</td>
            </tr>
            <tr>
              <td>Total</td>
              <td className="balance">${totalBalance}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Accounts;
