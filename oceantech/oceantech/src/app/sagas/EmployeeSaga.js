import {
  GetListEmployee,
  addNewEmployee,
  deleteEmployee,
  updateEmployee,

  getListEmployeeData, getEmployeeDataByID
} from "app/views/AddNewEmployee/EmployeeServices";
import { call, put } from "redux-saga/effects";
import { ActionTypes } from "app/redux/actions/actionTypes";

export function* getListEmployeeSaga() {
  try {
    const listEmployee = yield call(GetListEmployee);
    yield put({ type: ActionTypes.GET_LIST_EMPLOYEE_SUCCESS, payload: listEmployee.data });
  } catch (err) {
    console.log(err);
  }
}
// export function* addNewEmployeeSaga(action) {
//   yield put({ type: ActionTypes.GET_EMPLOYEE_DATA, payload: action.payload });
//   yield call(addNewEmployee, action.payload);

//   yield getListEmployeeSaga();
//   console.log("Add");
// }
// export function* deleteEmployeeSaga(action) {
//   yield call(deleteEmployee, action.payload);
//   yield getListEmployeeSaga();
// }
// export function* updateEmployeeSaga(action) {
//   yield put({ type: ActionTypes.GET_EMPLOYEE_DATA, payload: action.payload.data });
//   yield call(updateEmployee, action.payload);
//   yield getListEmployeeSaga();
// }




//moi

export function* getListEmployeeDataSaga(data) {
  try {
    const res = yield call(getListEmployeeData,data?.payload?.status, data?.payload?.page, data?.payload?.pageSize);
    // console.log("resSaga",res)
    yield put({ type: ActionTypes.GET_LIST_EMPLOYEE_DATA_SUCCESS, payload: res.data.data });
    // yield put({ type: ActionTypes.GET_LIST_EMPLOYEE_DATA_SUCCESS, payload: listEmployee.data });
  } catch (err) {
    console.log(err);
  }
}

export function* getEmployeeDataSaga(action) {
  // yield put({ type: ActionTypes.GET_EMPLOYEE_DATA, payload: action.payload });
  console.log("action.id",action.payload)
  const res = yield call(getEmployeeDataByID, action.payload);
  yield put({ type: ActionTypes.GET_EMPLOYEE_DATA_SUCCESS, payload: res.data.data });
  // yield getListEmployeeDataSaga();
  console.log("getEmployeeDataSaga");
}

export function* resetEmployeeDataSaga(action) {
  console.log("resetEmployeeDataSaga", action)
  yield put({ type: ActionTypes.RESET_EMPLOYEE_DATA_SUCCESS, payload: action.payload });
  // yield getListEmployeeDataSaga();
  console.log("getEmployeeDataSaga");
}


export function* addNewEmployeeSaga(action) {
  // yield put({ type: ActionTypes.GET_EMPLOYEE_DATA, payload: action.payload });
  console.log("action.payload.create",action.payload)
  yield call(addNewEmployee, action.payload);
  // yield getListEmployeeDataSaga();
  console.log("Add");
}

export function* updateEmployeeSaga(action) {
  // yield put({ type: ActionTypes.GET_EMPLOYEE_DATA, payload: action.payload.data });
  console.log("action.payload.update",action.payload)
  yield call(updateEmployee, action.payload.id, action.payload.data);
  console.log("Update");

  // yield getListEmployeeSaga();
}

export function* deleteEmployeeSaga(action) {
  yield call(deleteEmployee, action.payload);
  // yield getListEmployeeSaga();
}