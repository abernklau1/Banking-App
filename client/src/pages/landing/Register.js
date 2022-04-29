import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput, Logo, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { user, isLoading, showAlert, displayAlert, setupUser } =
    useAppContext();

  const toggleMember = () => {
    setValues({
      ...values,
      isMember: !values.isMember,
    });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      setupUser({
        currentUser,
        endPoint: "login",
        alertText: "Login Successful! Redirecting...",
      });
    } else {
      setupUser({
        currentUser,
        endPoint: "register",
        alertText: "User Registered! Redirecting...",
      });
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <section className="register-form">
      <div className="content-container">
        <form className="register" onSubmit={handleSubmit}>
          <Logo />
          <h3>{values.isMember ? "Login" : "Register"}</h3>
          {showAlert && <Alert />}
          {!values.isMember && (
            <FormInput
              type="text"
              name="name"
              value={values.name}
              handleChange={handleChange}
            />
          )}
          <FormInput
            type="email"
            name="email"
            value={values.email}
            handleChange={handleChange}
          />
          <FormInput
            type="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
          />

          <button type="submit" className="btn" disabled={isLoading}>
            Submit
          </button>
          <p>
            {values.isMember ? "Not a member yet?" : "Already a member?"}
            <button type="button" onClick={toggleMember} className="member-btn">
              {values.isMember ? "Register" : "Login"}
            </button>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
