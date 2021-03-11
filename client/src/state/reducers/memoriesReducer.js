import * as actionTypes from "../action-types";

const INITIAL_STATE = {
  loading: false,
  memories: [],
  error: "",
};

let memoriesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MEMORIES:
      return {
        loading: true,
        memories: [],
        error: "",
      };
    case actionTypes.FETCH_MEMORIES_SUCCESS:
      return {
        loading: false,
        memories: action.payload,
        error: "",
      };
    case actionTypes.FETCH_MEMORIES_FAILED:
      return {
        loading: false,
        memories: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default memoriesReducer;
