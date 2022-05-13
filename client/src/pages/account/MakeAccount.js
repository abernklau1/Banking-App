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
  accountType: "Credit Card//HELOC",
  newAccountBalance: "0.00",
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
    createAccount();
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
              name="accountType"
              labelText="Account Type"
              list={["Credit Card/HELOC", "Car Loan", "Home Loan"]}
              value={values.accountType}
              handleChange={handleChange}
            />
            <FormInput
              type="number"
              name="newAccountBalance"
              labelText="New Account Balance"
              step=".01"
              min="0"
              value={values.newAccountBalance}
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
