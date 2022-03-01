import { combineReducers } from "redux";
import { pageReducer } from "./pageReducer";
import { userDataReducer } from "./userData";

const allReducers = combineReducers({
  userData: userDataReducer,
  currentPage: pageReducer,
});
export default allReducers;
