import {
  Alert,
  FormInput,
  FormRowSelect,
  SubmitButton,
} from "../../components";
import { useAppContext } from "../../context/appContext";

const MakeAccount = () => {
  const {
    showAlert,
    isLoading,
    displayAlert,
    user: { name },
    createAccount,
    accType,
    accTypeList,
    balance,
    handleChange,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!balance) {
      displayAlert();
      return;
    }
    createAccount();
  };

  const handleAccountInput = (e) => {
    const { name, value } = e.target;
    handleChange({ name, value });
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
              list={accTypeList}
              value={accType}
              handleChange={handleAccountInput}
            />
            <FormInput
              type="number"
              name="balance"
              labelText="New Account Balance"
              step=".01"
              min="0"
              value={balance}
              handleChange={handleAccountInput}
            />
            <SubmitButton text="Create Account" isLoading={isLoading} />
          </div>
        </form>
      </div>
    </section>
  );
};

export default MakeAccount;
