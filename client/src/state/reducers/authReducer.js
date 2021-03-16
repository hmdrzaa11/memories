import * as actionTypes from "../action-types";
const INITIAL_STATE = {
  loading: false,
  user: null,
  error: "",
};

let authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SIGN_UP:
      return {
        loading: true,
        error: null,
        user: null,
      };
    case actionTypes.SIGN_UP_SUCCESS:
      return {
        loading: false,
        error: null,
        user: action.payload,
      };
    case actionTypes.SIGN_UP_FAILED:
      return {
        loading: false,
        user: null,
        error: action.payload,
      };
    case actionTypes.SIGN_IN:
      return {
        loading: true,
        error: null,
        user: null,
      };
    case actionTypes.SIGN_IN_SUCCESS:
      return {
        loading: false,
        error: null,
        user: action.payload,
      };
    case actionTypes.SIGN_IN_FAILED:
      return {
        loading: false,
        error: action.payload,
        user: null,
      };
    case actionTypes.LOGOUT:
      return {
        loading: false,
        error: null,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
