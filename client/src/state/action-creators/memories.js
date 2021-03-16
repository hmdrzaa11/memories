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
