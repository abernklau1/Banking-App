import { TableHead, TableRow } from "./index";

const AccountTable = (props) => {
  return (
    <div className="account-container">
      <table>
        <TableHead col1="Account" col2="Account Type" col3="Balance" />
        <tbody>
          {/* eslint-disable-next-line array-callback-return */}
          {Object.entries(props).map(([key, value], index) => {
            if (key !== "accountTotal") {
              return (
                <TableRow
                  col1={value.account}
                  col2={value.accountType}
                  col3={value.accountBalance}
                  key={index}
                />
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AccountTable;
