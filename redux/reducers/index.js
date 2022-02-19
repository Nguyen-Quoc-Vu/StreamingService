import { combineReducers } from "redux";
import { commentReducer } from "./comment";
import { themeReducer } from "./theme";

const allReducers = combineReducers({
  comments: commentReducer,
  darkMode: themeReducer,
});
export default allReducers;
