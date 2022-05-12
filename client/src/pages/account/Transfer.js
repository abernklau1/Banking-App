import {
  AccountTable,
  FormInput,
  SubmitButton,
  Alert,
} from "../../components/index";
import { useAppContext } from "../../context/appContext";
import {
  useState,
  //useEffect
} from "react";

const initialState = {
  account: "",
  amount: "",
};

const Transfer = () => {
  const [values, setValues] = useState(initialState);
  const {
    account: { savings, checking, totalBalance },
    showAlert,
    displayAlert,
    transferMoney,
    //getAccount,
  } = useAppContext();

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { account, amount } = values;
    if (!account || !amount) {
      displayAlert();
      return;
    }

    const details = { account, amount };
    transferMoney({ details, alertText: "Transfer Successful!" });
  };

  // useEffect(() => {
  //   getAccount();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <section className="account-sections content-container">
      <header>
        <h2>Transfer</h2>
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
      <div className="transfers">
        <form className="form-outline" onSubmit={handleSubmit}>
          {showAlert && <Alert />}
          <FormInput
            name="account"
            value={values.account}
            labelText="To Account"
            handleChange={handleChange}
            list="accounts"
          />
          <datalist id="accounts">
            <option>Savings</option>
            <option>Checking</option>
          </datalist>
          <FormInput
            type="number"
            name="amount"
            value={values.amount}
            labelText="Amount"
            handleChange={handleChange}
            step=".01"
          />
          <SubmitButton text="Transfer" />
        </form>
      </div>
    </section>
  );
};

export default Transfer;
