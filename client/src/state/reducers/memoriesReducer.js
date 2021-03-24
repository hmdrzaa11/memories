import * as actionTypes from "../action-types";

const INITIAL_STATE = {
  loading: false,
  memories: [],
  error: "",
  createReviewLoading: false,
  deleteReviewLoading: false,
  updateReviewLoading: false,
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
    case actionTypes.FETCH_SINGLE_MEMORY:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_SINGLE_MEMORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        memories: [action.payload],
      };
    case actionTypes.FETCH_SINGLE_MEMORY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.UPDATE_MEMORY:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.UPDATE_MEMORY_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case actionTypes.CREATE_REVIEW:
      return {
        ...state,
        createReviewLoading: true,
        error: null,
      };
    case actionTypes.CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        createReviewLoading: false,
        error: null,
      };
    case actionTypes.CREATE_REVIEW_FAILED:
      return {
        ...state,
        createReviewLoading: false,
        error: action.payload,
      };

    case actionTypes.DELETE_REVIEW:
      return {
        ...state,
        deleteReviewLoading: true,
        error: null,
      };
    case actionTypes.DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        deleteReviewLoading: false,
        error: null,
      };

    case actionTypes.UPDATE_REVIEW:
      return {
        ...state,
        updateReviewLoading: true,
        error: null,
      };
    case actionTypes.UPDATE_REVIEW_SUCCESS:
      return {
        ...state,
        updateReviewLoading: false,
        error: null,
      };
    case actionTypes.UPDATE_REVIEW_FAILED:
      return {
        ...state,
        updateReviewLoading: false,
        error: action.payload,
      };

    case actionTypes.RESET_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default memoriesReducer;
