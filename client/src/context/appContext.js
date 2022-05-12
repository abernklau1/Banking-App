import { useReducer, useContext, createContext } from "react";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  TOGGLE_SIDEBAR,
  TOGGLE_LOGOUT,
  SETUP_ACCOUNT_SUCCESS,
  SETUP_ACCOUNT_ERROR,
  SETUP_ACCOUNT_BEGIN,
  GET_ACCOUNT_BEGIN,
  GET_ACCOUNT_SUCCESS,
  TRANSFER_BEGIN,
  TRANSFER_ERROR,
  TRANSFER_SUCCESS,
  CLEAR_VALUES,
} from "./actions";
import reducer from "./reducer";
import axios from "axios";

let user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const userLocation = localStorage.getItem("location");
const signedIn = localStorage.getItem("signedIn");
//const account = localStorage.getItem("account");

user = JSON.parse(user);

const initialState = {
  isLoading: false,
  showAlert: false,
  alertType: "",
  alertText: "",
  user: user ? user : null,
  token: token,
  userLocation: userLocation || "",
  isSignedIn: signedIn || false,
  showLogout: false,
  showSidebar: false,
  routingNumber: "#00000000",
  accounts: user ? user.accounts : null,
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({ baseURL: "/api/v1" });

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = (alertText) => {
    if (alertText) {
      dispatch({ type: DISPLAY_ALERT, payload: alertText });
    } else {
      dispatch({ type: DISPLAY_ALERT });
    }

    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 1000);
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const addUserToLocalStorage = ({
    user,
    token,
    location,
    isSignedIn,
    //account,
  }) => {
    //if (user || token || location || isSignedIn) {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
    localStorage.setItem("signedIn", isSignedIn);
    //}
    // if (account) {
    //   localStorage.setItem("account", JSON.stringify(account));
    // }
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("location");
    localStorage.removeItem("signedIn");
    //localStorage.removeItem("account");
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const {
        data: { user, token, location },
      } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser);

      // const authFetch = axios.create({ baseURL: "/api/v1" });

      // authFetch.interceptors.request.use(
      //   (config) => {
      //     config.headers.common["authorization"] = `Bearer ${token}`;
      //     return config;
      //   },
      //   (error) => {
      //     return Promise.reject(error);
      //   }
      // );
      // let account = undefined;
      // if (endPoint === "login") {
      //   const { data } = await authFetch("/user-account");
      //   ({ account } = data);
      // }

      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
          alertText,
          isSignedIn: true,
          //account,
        },
      });
      addUserToLocalStorage({
        user,
        token,
        location,
        isSignedIn: true,
        //account,
      });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { alertText: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const toggleLogout = () => {
    dispatch({ type: TOGGLE_LOGOUT });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const createAccount = async (currentUser) => {
    dispatch({ type: SETUP_ACCOUNT_BEGIN });
    try {
      const {
        data: { user },
      } = await authFetch.post(`/user-account`, currentUser);
      // const { account } = data;
      dispatch({ type: SETUP_ACCOUNT_SUCCESS, payload: { user } });
      addUserToLocalStorage({ user });
    } catch (error) {
      if (error.status === 401) return;
      dispatch({
        type: SETUP_ACCOUNT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const getAccount = async () => {
    dispatch({ type: GET_ACCOUNT_BEGIN });
    try {
      const { data: account } = await authFetch("/user-account");
      dispatch({ type: GET_ACCOUNT_SUCCESS, payload: account });
      addUserToLocalStorage({ account });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const transferMoney = async ({ details }) => {
    dispatch({ type: TRANSFER_BEGIN });
    try {
      const { account: toAccount, amount } = details;
      const { data } = await authFetch.patch("/user-account/transfer", {
        toAccount,
        amount,
      });
      const { updateAccount: account } = data;
      addUserToLocalStorage({ account });
      dispatch({ type: TRANSFER_SUCCESS, payload: { account } });
    } catch (error) {
      dispatch({
        type: TRANSFER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleLogout,
        logoutUser,
        toggleSidebar,
        createAccount,
        getAccount,
        transferMoney,
        clearValues,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
