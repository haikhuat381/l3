import {
  GetListEmployee,
  addNewEmployee,
  deleteEmployee,
  updateEmployee,

  getListEmployeeData, getEmployeeDataByID, getFormData, updateForm, getTotal, addRegist, leaderOfAction
} from "app/views/AddNewEmployee/EmployeeServices";
import { call, put } from "redux-saga/effects";
import { ActionTypes } from "app/redux/actions/actionTypes";

// export function* getListEmployeeSaga() {
//   try {
//     const listEmployee = yield call(GetListEmployee);
//     yield put({ type: ActionTypes.GET_LIST_EMPLOYEE_SUCCESS, payload: listEmployee.data });
//   } catch (err) {
//     console.log(err);
//   }
// }

export function* getTotalSaga(data) {
  try {
    const res = yield call(getTotal,data?.payload?.status);
    yield put({ type: ActionTypes.GET_TOTAL_SUCCESS, payload: res.data.data });
  } catch (err) {
    console.log(err);
  }
}

export function* getListEmployeeDataSaga(data) {
  try {
    const res = yield call(getListEmployeeData,data?.payload?.status, data?.payload?.page, data?.payload?.pageSize);
    yield put({ type: ActionTypes.GET_LIST_EMPLOYEE_DATA_SUCCESS, payload: res.data.data });
  } catch (err) {
    console.log(err);
  }
}

export function* getEmployeeDataSaga(action) {
  const res = yield call(getEmployeeDataByID, action.payload);
  yield put({ type: ActionTypes.GET_EMPLOYEE_DATA_SUCCESS, payload: res.data.data });
}

export function* resetEmployeeDataSaga(action) {
  yield put({ type: ActionTypes.RESET_EMPLOYEE_DATA_SUCCESS, payload: action.payload });
}


export function* addNewEmployeeSaga(action) {
  const res = yield call(addNewEmployee, action.payload);
  yield put({ type: ActionTypes.ADD_NEW_EMPLOYEE_SUCCESS, payload: res.data.data });
}

export function* updateEmployeeSaga(action) {
  yield call(updateEmployee, action.payload.id, action.payload.data);

}

export function* deleteEmployeeSaga(action) {
  yield call(deleteEmployee, action.payload);
}

export function* getFormDataSaga(action) {
  const res = yield call(getFormData, action.payload);
  yield put({ type: ActionTypes.GET_FORM_DATA_SUCCESS, payload: res.data.data });
}


export function* updateFormSaga(action) {
  yield call(updateForm, action.payload.id, action.payload.data);
  const res = yield call(getFormData, action.payload.id);
  yield put({ type: ActionTypes.GET_FORM_DATA_SUCCESS, payload: res.data.data });
}

export function* addRegistSaga(action) {
  yield call(addRegist, action.payload.id, action.payload.data);
}

export function* leaderActionSaga(action) {
  yield call(leaderOfAction, action.payload.id, action.payload.data);
}