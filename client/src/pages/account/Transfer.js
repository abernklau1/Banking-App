import {
  FormInput,
  SubmitButton,
  Alert,
  FormRowSelect,
} from "../../components/index";
import { useAppContext } from "../../context/appContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  account: "Prime Share Account",
  amount: "0.00",
};

const Transfer = () => {
  const [values, setValues] = useState(initialState);
  const {
    showAlert,
    displayAlert,
    transferMoney,
    transferred,
    transferNavigate,
    mainAccount,
  } = useAppContext();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (transferred) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
      transferNavigate();
    }
  }, [navigate, transferred, transferNavigate]);

  return (
    <section className="account-sections content-container">
      <header>
        <h2>Transfer</h2>
      </header>
      <div className="transfers">
        <form className="form-outline" onSubmit={handleSubmit}>
          {showAlert && <Alert />}
          <FormRowSelect
            labelText="To Account"
            name="account"
            value={values.account}
            handleChange={handleChange}
            list={[
              `Prime Share Account (Available: $${mainAccount[0].balance - 5})`,
              `Basic Checking (Available: $${mainAccount[1].balance - 5})`,
            ]}
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
