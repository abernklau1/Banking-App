import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Alert, FormInput, SubmitButton } from "../../components";
import { useAppContext } from "../../context/appContext";

const MakeAccount = () => {
  const navigate = useNavigate();
  const {
    showAlert,
    isLoading,
    user: { name },
    createAccount,
    account,
  } = useAppContext();
  const [hasAccount] = useState(account ? true : false);
  const handleSubmit = (e) => {
    e.preventDefault();
    createAccount();
  };

  useEffect(() => {
    if (account) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }
  }, [account, navigate]);

  return (
    <section>
      <div className="content-container">
        <form className="form-outline" onSubmit={handleSubmit}>
          <h2 className="create-account-head">Create an Account, {name}</h2>
          <hr className="account-rule" />
          {showAlert && <Alert />}
          {hasAccount ? (
            <div className="has-account">
              <FormInput type="" />
              <SubmitButton text="Create Account" isLoading={isLoading} />
            </div>
          ) : (
            <div className="no-account">
              <p>
                You have yet to create an account! Let's create one for you!
              </p>
              <SubmitButton text="Create Account" isLoading={isLoading} />
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default MakeAccount;