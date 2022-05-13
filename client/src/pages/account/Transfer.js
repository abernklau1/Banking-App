import {
  FormInput,
  SubmitButton,
  Alert,
  FormRowSelect,
  MainAccountTable,
} from "../../components/index";
import { useAppContext } from "../../context/appContext";
import { useState } from "react";

const initialState = {
  account: "Prime Share Account",
  amount: "0.00",
};

const Transfer = () => {
  const [values, setValues] = useState(initialState);
  const { showAlert, displayAlert, transferMoney } = useAppContext();

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
      displayAlert("Please provide all values");
      return;
    }

    const details = { account, amount };
    transferMoney({ details, alertText: "Transfer Successful!" });
  };

  return (
    <section className="account-sections content-container">
      <header>
        <h2>Transfer</h2>
      </header>
      <MainAccountTable />
      <div className="transfers">
        <form className="form-outline" onSubmit={handleSubmit}>
          {showAlert && <Alert />}
          <FormRowSelect
            labelText="To Account"
            name="account"
            value={values.account}
            handleChange={handleChange}
            list={["Prime Share Account", "Checking"]}
          />
          <FormInput
            type="number"
            name="amount"
            value={values.amount}
            labelText="Amount"
            handleChange={handleChange}
            step=".01"
            min="0"
          />
          <SubmitButton text="Transfer" />
        </form>
      </div>
    </section>
  );
};

export default Transfer;
