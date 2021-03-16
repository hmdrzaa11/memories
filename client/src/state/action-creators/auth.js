import axios from "axios";
import * as actionTypes from "../action-types";

export let signupAction = (formData, history) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.SIGN_UP });
    let { data } = await axios.post("/api/v1/users/signup", formData);
    dispatch({ type: actionTypes.SIGN_UP_SUCCESS, payload: data.user });
    history.push("/");
  } catch (error) {
    dispatch({
      type: actionTypes.SIGN_UP_FAILED,
      payload: error.response.data.message,
    });
  }
};

export let signinAction = (formData, history) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.SIGN_IN });
    let { data } = await axios.post("/api/v1/users/signin", formData);
    dispatch({
      type: actionTypes.SIGN_IN_SUCCESS,
      payload: data.user,
    });
    history.push("/");
  } catch (error) {
    dispatch({
      type: actionTypes.SIGN_IN_FAILED,
      payload: error.response.data.message,
    });
  }
};

export let getCurrentUser = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.SIGN_IN });
    let { data } = await axios.get("/api/v1/users/me");
    dispatch({
      type: actionTypes.SIGN_IN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.SIGN_IN_FAILED,
      payload: "",
    });
  }
};

export let logoutAction = () => async (dispatch) => {
  await axios.get("/api/v1/users/logout");
  dispatch({
    type: actionTypes.LOGOUT,
  });
};
