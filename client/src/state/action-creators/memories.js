import axios from "axios";
import * as actionTypes from "../action-types";

export let fetchAllMemories = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.FETCH_MEMORIES });
    let { data } = await axios.get("/api/v1/memories/");
    dispatch({
      type: actionTypes.FETCH_MEMORIES_SUCCESS,
      payload: data.memories,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.FETCH_MEMORIES_FAILED,
      payload: error.response.data.message,
    });
  }
};

export let createMemory = (formData, history) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.CREATE_MEMORY });
    let { data } = await axios.post("/api/v1/memories", formData);
    dispatch({
      type: actionTypes.CREATE_MEMORY_SUCCESS,
      payload: data.memory,
    });
    history.push("/");
  } catch (error) {
    dispatch({
      type: actionTypes.CREATE_MEMORY_FAILED,
      payload: error.response.data.message,
    });
  }
};

export let fetchSingleMemory = (memId) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.FETCH_SINGLE_MEMORY });
    let { data } = await axios.get(`/api/v1/memories/${memId}`);
    dispatch({
      type: actionTypes.FETCH_SINGLE_MEMORY_SUCCESS,
      payload: data.memory,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.FETCH_SINGLE_MEMORY_SUCCESS,
      payload: error.response.data.message,
    });
  }
};

export let updateMemory = (formData, memId, history) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.UPDATE_MEMORY });
    await axios.patch(`/api/v1/memories/${memId}`, formData);
    history.push("/");
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_MEMORY_FAILED,
      payload: error.response.data.message,
    });
  }
};

export let updateReview = (memId, reviewId, formData, callback) => async (
  dispatch
) => {
  try {
    let { data } = await axios.patch(
      `/api/v1/memories/${memId}/reviews/${reviewId}`,
      formData
    );
    await dispatch(fetchSingleMemory(memId));
    callback();
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_MEMORY_FAILED,
      payload: error.response.data.message,
    });
  }
};
