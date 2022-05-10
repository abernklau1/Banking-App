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
} from "./actions";
import reducer from "./reducer";
import axios from "axios";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const userLocation = localStorage.getItem("location");
const signedIn = localStorage.getItem("signedIn");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertType: "",
  alertText: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || "",
  isSignedIn: signedIn || false,
  showLogout: false,
  showSidebar: false,
  routingNumber: "#00000000",
  accNumber: "",
  savings: 0,
  checking: 0,
  totalBalance: 0,
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

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, token, location, isSignedIn }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
    localStorage.setItem("signedIn", isSignedIn);
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
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );
      const { user, token, location } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
          alertText,
          isSignedIn: true,
        },
      });
      addUserToLocalStorage({ user, token, location, isSignedIn: true });
      console.log(state.token);
      if (endPoint === "register") {
        dispatch({ type: SETUP_ACCOUNT_BEGIN });
      }
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
      const { data } = await authFetch.post(`/user-account`);
      console.log(data);
      dispatch({ type: SETUP_ACCOUNT_SUCCESS });
    } catch (error) {
      if (error.status === 401) return;
      dispatch({
        type: SETUP_ACCOUNT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
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
