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
  TRANSFER_BEGIN,
  TRANSFER_SUCCESS,
  TRANSFER_ERROR,
  CLEAR_VALUES,
  GET_ACCOUNT_BEGIN,
  GET_ACCOUNT_SUCCESS,
} from "./actions";

import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.alertText || "Please provide starred values",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  if (action.type === SETUP_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      account: action.payload.account,
      userLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
      isSignedIn: action.payload.isSignedIn,
    };
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.alertText,
    };
  }

  if (action.type === TOGGLE_LOGOUT) {
    return { ...state, showLogout: !state.showLogout };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      userLocation: "",
      isSignedIn: false,
    };
  }

  if (action.type === TOGGLE_SIDEBAR) {
    return { ...state, showSidebar: !state.showSidebar };
  }

  if (action.type === SETUP_ACCOUNT_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === SETUP_ACCOUNT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      account: action.payload.account,
      showAlert: true,
      alertType: "success",
      alertText: "Account Created! Redirecting...",
    };
  }

  if (action.type === SETUP_ACCOUNT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === GET_ACCOUNT_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }

  if (action.type === GET_ACCOUNT_SUCCESS) {
    return { ...state, isLoading: false, account: action.payload.account };
  }

  if (action.type === TRANSFER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === TRANSFER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      account: action.payload.account,
      showAlert: true,
      alertType: "success",
      alertText: "Transfer Successful!",
    };
  }

  if (action.type === TRANSFER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === CLEAR_VALUES) {
    return { ...state };
  }
  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
