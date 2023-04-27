import {
  GetListEmployee,
  addNewEmployee,
  deleteEmployee,
  updateEmployee,

  getListEmployeeData, getEmployeeDataByID, getFormData, updateForm, getTotal, addRegist, leaderOfAction
} from "app/views/AddNewEmployee/EmployeeServices";
import { call, put } from "redux-saga/effects";
import { ActionTypes } from "app/redux/actions/actionTypes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  console.log("resres",res)
  if(res.status === 200 || res.status === 409) {
    toast.success("Lưu mới thành công")
  } else {
    // toast.error()
  }
  yield put({ type: ActionTypes.ADD_NEW_EMPLOYEE_SUCCESS, payload: res.data.data });
}

export function* updateEmployeeSaga(action) {
  const res = yield call(updateEmployee, action.payload.id, action.payload.data);
  if(res.status === 200 || res.status === 409) {
    toast.success("Cập nhật thành công")
  } else {
    // toast.error()
  }
}

export function* deleteEmployeeSaga(action) {
  const res = yield call(deleteEmployee, action.payload);
  if(res.status === 200 || res.status === 409) {
    toast.success("Xóa nhân viên thành công")
  } else {
    // toast.error()
  }
}

export function* getFormDataSaga(action) {
  const res = yield call(getFormData, action.payload);
  yield put({ type: ActionTypes.GET_FORM_DATA_SUCCESS, payload: res.data.data });
}


export function* updateFormSaga(action) {
  const resForm = yield call(updateForm, action.payload.id, action.payload.data);
  if(resForm.status === 200 || res.status === 409) {
    toast.success("Cập nhật hồ sơ thành công")
  } else {
    // toast.error()
  }
  const res = yield call(getFormData, action.payload.id);
  yield put({ type: ActionTypes.GET_FORM_DATA_SUCCESS, payload: res.data.data });
}

export function* addRegistSaga(action) {
  const res = yield call(addRegist, action.payload.id, action.payload.data);
  if(res.status === 200 || res.status === 409) {
    toast.success("Gửi lãnh đạo thành công")
  } else {
    // toast.error()
  }
}

export function* leaderActionSaga(action) {
  const res = yield call(leaderOfAction, action.payload.id, action.payload.data);
  if(res.status === 200 || res.status === 409) {
    toast.success(`${action.payload.action} thành công`)
  } else {
    // toast.error()
  }
}