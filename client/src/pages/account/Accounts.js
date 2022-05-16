import { SearchBar, AccountsContainer } from "../../components/index";

const Accounts = () => {
  return (
    <section className="account-sections content-container">
      <header>
        <h2>Accounts</h2>
        <SearchBar />
      </header>
      <AccountsContainer />
    </section>
  );
};

export default Accounts;
