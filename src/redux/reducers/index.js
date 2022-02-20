import { combineReducers } from "redux";
import { userDataReducer } from "./userData";

const allReducers = combineReducers({
  userData: userDataReducer,
});
export default allReducers;
