import { combineReducers } from "redux";
import authReducer from "./authReducer";
import memoriesReducer from "./memoriesReducer";

let reducer = combineReducers({
  memories: memoriesReducer,
  auth: authReducer,
});

export default reducer;
