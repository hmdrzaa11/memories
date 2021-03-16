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
    case actionTypes.CREATE_MEMORY:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.CREATE_MEMORY_SUCCESS:
      return {
        loading: false,
        error: null,
        memories: [...state.memories, action.payload],
      };
    case actionTypes.CREATE_MEMORY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default memoriesReducer;
