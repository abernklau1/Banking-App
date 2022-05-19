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
      accounts: action.payload.user.accounts,
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
      showAlert: true,
      alertType: "success",
      alertText: "New Account Created!",
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
    return {
      ...state,
      isLoading: false,
      accounts: action.payload.accounts,
      totalAccounts: action.payload.totalAccounts,
      numOfPages: action.payload.numOfPages,
    };
  }

  if (action.type === SET_MAKE_PAYMENT) {
    const account = state.accounts.find(
      (account) => account._id === action.payload.id
    );
    const { _id, accType, balance } = account;
    return {
      ...state,
      isPaying: true,
      payAccountId: _id,
      accType,
      balance,
    };
  }

  if (action.type === MAKE_PAYMENT_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === MAKE_PAYMENT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Payment Successful!",
    };
  }

  if (action.type === MAKE_PAYMENT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === DELETE_ACCOUNT_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === DELETE_ACCOUNT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Account Removed!",
    };
  }

  if (action.type === DELETE_ACCOUNT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === TRANSFER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === TRANSFER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      //mainAccount: action.payload.user.mainAccount,
      transferred: true,
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

  if (action.type === TRANSFER_NAVIGATE) {
    return {
      ...state,
      transferred: undefined,
    };
  }

  if (action.type === HANDLE_CHANGE) {
    return { ...state, page: 1, [action.payload.name]: action.payload.value };
  }

  if (action.type === CLEAR_SEARCH) {
    return { ...state, search: "" };
  }

  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload.page };
  }

  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
