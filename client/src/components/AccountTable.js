import { TableHead, TableRow, TotalRow } from "./index";

const AccountTable = ({ account1, header, accountTotal, account2 }) => {
  return (
    <div className="account-container">
      <table>
        <TableHead
          col1={header ? "Insured Accounts" : "Account"}
          col2="Account Type"
          col3="Balance"
        />
        <tbody>
          <TableRow
            col1={account1.accType}
            col2={account1.accType}
            col3={account1.balance}
            key={account1._id}
          />
          {!accountTotal && <TotalRow id={account1._id} />}
          {account2 && (
            <TableRow
              col1={account2.accType}
              col2={account2.accType}
              col3={account2.balance}
              key={account2._id}
            />
          )}
          {accountTotal && <TotalRow total={accountTotal} />}
        </tbody>
      </table>
    </div>
  );
};

export default AccountTable;
