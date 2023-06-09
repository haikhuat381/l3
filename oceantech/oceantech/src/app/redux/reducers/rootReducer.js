import { combineReducers } from "redux";
import EmployeeReducer from "./EmployeeReducer";
import ManageEmployeeReducer from "./ManageEmployeeReducer";

export default combineReducers({
  Employee: EmployeeReducer,
  ManageEmployee: ManageEmployeeReducer,
});
