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

  if (!accounts || accounts.length === 0) {
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
      {accounts.map((account) => {
        return <AccountTable account1={account} key={account._id} />;
      })}
      {numOfPages > 1 && <PageBtnContainer />}
    </div>
  );
};
export default AccountsContainer;
