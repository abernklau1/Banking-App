import { TableHead, TableRow, TotalRow } from "./index";

const AccountTable = (props) => {
  return (
    <div className="account-container">
      <table>
        <TableHead
          col1={props.header ? "Insured Accounts" : "Account"}
          col2="Account Type"
          col3="Balance"
        />
        <tbody>
          {/* eslint-disable-next-line array-callback-return */}
          {Object.entries(props).map(([key, value], index) => {
            if (key !== "accountTotal" && key !== "header") {
              console.log(value.account);
              return (
                <>
                  <TableRow
                    col1={value.account}
                    col2={value.accountType}
                    col3={value.accountBalance}
                    key={index}
                  />
                  {!props.accountTotal && <TotalRow id={value._id} />}
                </>
              );
            }
          })}
          {props.accountTotal && <TotalRow total={props.accountTotal} />}
        </tbody>
      </table>
    </div>
  );
};

export default AccountTable;
