import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Alert,
  FormInput,
  FormRowSelect,
  SubmitButton,
} from "../../components";
import { useAppContext } from "../../context/appContext";
const initialValues = {
  accType: "Credit Card/HELOC",
  balance: "0.00",
};
const MakeAccount = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const {
    showAlert,
    isLoading,
    user: { name },
    createAccount,
  } = useAppContext();

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { accType, balance } = values;
    createAccount(accType, balance);
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <section>
      <div className="content-container">
        <form className="form-outline" onSubmit={handleSubmit}>
          <h2 className="create-account-head">Create an Account, {name}</h2>
          <hr className="account-rule" />
          {showAlert && <Alert />}
          <div className="has-account">
            <FormRowSelect
              name="accType"
              labelText="Account Type"
              list={["Credit Card/HELOC", "Car Loan", "Home Loan"]}
              value={values.accType}
              handleChange={handleChange}
            />
            <FormInput
              type="number"
              name="balance"
              labelText="New Account Balance"
              step=".01"
              min="0"
              value={values.balance}
              handleChange={handleChange}
            />
            <SubmitButton text="Create Account" isLoading={isLoading} />
          </div>
        </form>
      </div>
    </section>
  );
};

export default MakeAccount;
