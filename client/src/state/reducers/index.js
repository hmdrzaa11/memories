import { combineReducers } from "redux";
import memoriesReducer from "./memoriesReducer";

let reducer = combineReducers({
  memories: memoriesReducer,
});

export default reducer;
