import {
  Alert,
  FormInput,
  FormRowSelect,
  SubmitButton,
} from "../../components";
import { useAppContext } from "../../context/appContext";
import { useState } from "react";

const MakeAccount = () => {
  const [deleting, setDeleting] = useState(false);
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
    isPaying,
    makePayment,
    payment,
    deleteAccount,
  } = useAppContext();

  const handleDelete = () => {
    setDeleting(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isPaying && !balance) {
      displayAlert();
      return;
    }
    if (isPaying) {
      makePayment();
    } else if (isPaying && deleting) {
      deleteAccount();
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
          <h2 className="create-account-head">
            {isPaying
              ? `Make a Payment, ${name}`
              : `Create an Account, ${name}`}
          </h2>
          <hr className="account-rule" />
          {showAlert && <Alert />}
          <div className="has-account">
            {!isPaying ? (
              <>
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
              </>
            ) : (
              <FormInput
                type="number"
                name="payment"
                labelText="Payment Amount"
                step=".01"
                min="0"
                value={payment}
                handleChange={handleAccountInput}
              />
            )}
            <SubmitButton text="Create Account" isLoading={isLoading} />
            {isPaying && (
              <SubmitButton
                text="Pay and Remove"
                isLoading={isLoading}
                onClick={handleDelete}
              />
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default MakeAccount;
