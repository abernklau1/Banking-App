import React from "react";
import { useAppContext } from "../context/appContext";
import { Loading, AccountTable, PageBtnContainer } from "./index";
import { useEffect } from "react";
const AccountsContainer = () => {
  const {
    accounts,
    getAccounts,
    isLoading,
    page,
    totalAccounts,
    search,
    numOfPages,
  } = useAppContext();

  useEffect(() => {
    getAccounts();
    // eslint-disable-next-line
  }, [page, search, numOfPages]);

  if (accounts.length === 0) {
    return <h3>No accounts to display...</h3>;
  }

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <div>
      <h3 className="accounts-found">
        {totalAccounts} account{accounts.length > 1 && "s"} found
      </h3>
      {Object.entries(accounts)
        .filter(([key, value]) => {
          return (
            (value.accType !== "Prime Share Account" &&
              value.accType !== "Basic Checking") ||
            search
          );
        })
        .map(([key, value], index) => {
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
      {numOfPages > 1 && <PageBtnContainer />}
    </div>
  );
};
export default AccountsContainer;
