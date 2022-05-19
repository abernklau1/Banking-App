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
  TRANSFER_NAVIGATE,
  HANDLE_CHANGE,
  CLEAR_SEARCH,
  CHANGE_PAGE,
  SET_MAKE_PAYMENT,
  MAKE_PAYMENT_BEGIN,
  MAKE_PAYMENT_SUCCESS,
  MAKE_PAYMENT_ERROR,
  DELETE_ACCOUNT_BEGIN,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_ERROR,
} from "./actions";
import reducer from "./reducer";
import axios from "axios";

let user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const userLocation = localStorage.getItem("location");
const signedIn = localStorage.getItem("signedIn");

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
  mainAccount: user ? user.mainAccount : null,
  accounts: [],
  accType: "Credit Card/HELOC",
  accTypeList: ["Credit Card/HELOC", "Car Loan", "Home Loan"],
  balance: 0,
  transferred: undefined,
  search: "",
  page: 1,
  numOfPages: 1,
  totalAccounts: 0,
  isPaying: false,
  payAccountId: "",
  payment: 0,
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
      dispatch({ type: DISPLAY_ALERT, payload: { alertText } });
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

  const addUserToLocalStorage = ({ user, token, location, isSignedIn }) => {
    if (token && isSignedIn) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      localStorage.setItem("location", location);
      localStorage.setItem("signedIn", isSignedIn);
    } else if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("location");
    localStorage.removeItem("signedIn");
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const {
        data: { user, token, location },
      } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser);

      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
          alertText,
          isSignedIn: true,
          mainAccount: user.mainAccount,
        },
      });
      addUserToLocalStorage({
        user,
        token,
        location,
        isSignedIn: true,
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

  const createAccount = async () => {
    dispatch({ type: SETUP_ACCOUNT_BEGIN });
    try {
      const { accType, balance } = state;
      await authFetch.post(`/user-account`, { accType, balance });
      dispatch({ type: SETUP_ACCOUNT_SUCCESS });
      clearValues();
    } catch (error) {
      if (error.status === 401) return;
      dispatch({
        type: SETUP_ACCOUNT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getAccounts = async () => {
    const { page, search } = state;
    let url = `/user-account?page=${page}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_ACCOUNT_BEGIN });
    try {
      const {
        data: { accounts, numOfPages, totalAccounts },
      } = await authFetch(url);

      dispatch({
        type: GET_ACCOUNT_SUCCESS,
        payload: { accounts, totalAccounts, numOfPages },
      });
    } catch (error) {
      //logoutUser();
    }
    clearAlert();
  };

  const setMakePayment = (id) => {
    dispatch({ type: SET_MAKE_PAYMENT, payload: { id } });
  };

  const makePayment = async (id) => {
    dispatch({ type: MAKE_PAYMENT_BEGIN });
    try {
      const { payment } = state;
      authFetch.patch(`/user-account/${state.payAccountId}`, {
        payment,
      });
      dispatch({ type: MAKE_PAYMENT_SUCCESS });
    } catch (error) {
      dispatch({
        type: MAKE_PAYMENT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const deleteAccount = async () => {
    dispatch({ type: DELETE_ACCOUNT_BEGIN });
    try {
      await authFetch.delete(`/user-account/${state.payAccountId}`);
      dispatch({ type: DELETE_ACCOUNT_SUCCESS });
    } catch (error) {
      dispatch({
        type: DELETE_ACCOUNT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const transferMoney = async ({ details }) => {
    dispatch({ type: TRANSFER_BEGIN });
    try {
      const { account: toAccount, amount } = details;
      const {
        data: { user },
      } = await authFetch.patch("/user-account/transfer", {
        toAccount,
        amount,
      });
      dispatch({ type: TRANSFER_SUCCESS, payload: { user } });
      addUserToLocalStorage({ user });
    } catch (error) {
      dispatch({
        type: TRANSFER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const transferNavigate = () => {
    dispatch({ type: TRANSFER_NAVIGATE });
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearSearch = () => {
    dispatch({ type: CLEAR_SEARCH });
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
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
        getAccounts,
        transferMoney,
        clearValues,
        transferNavigate,
        handleChange,
        clearSearch,
        changePage,
        setMakePayment,
        makePayment,
        deleteAccount,
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
