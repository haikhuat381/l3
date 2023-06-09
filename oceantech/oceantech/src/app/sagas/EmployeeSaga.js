import {
  addNewEmployee,
  deleteEmployee,
  updateEmployee,
  getListEmployeeData,
  getEmployeeDataByID,
  getFormData,
  updateForm,
  getTotal,
  addRegist,
  leaderOfAction,
} from "app/views/NewEmployee/EmployeeServices";
import { call, put } from "redux-saga/effects";
import { ActionTypes } from "app/redux/actions/actionTypes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  messageSuccess,
  statusSuccess,
  statusResourceConflict,
  messageResourceConflict,
  messageError,
} from "app/constant";

export function* getTotalSaga(data) {
  try {
    const res = yield call(getTotal, data?.payload?.status);
    yield put({
      type: ActionTypes.GET_TOTAL_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (err) {
    toast.error(messageError);
  }
}

export function* getListEmployeeDataSaga(data) {
  try {
    const res = yield call(
      getListEmployeeData,
      data?.payload?.status,
      data?.payload?.page,
      data?.payload?.pageSize
    );
    yield put({
      type: ActionTypes.GET_LIST_EMPLOYEE_DATA_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {
    error?.response?.status === statusResourceConflict
      ? toast.success(messageResourceConflict)
      : toast.error(messageError);
    yield put({
      type: ActionTypes.GET_LIST_EMPLOYEE_DATA_FAIL,
    });
  }

}

export function* getEmployeeDataSaga(action) {
  try {
    const res = yield call(getEmployeeDataByID, action?.payload)
    if (res) {
      yield put({
        type: ActionTypes.GET_EMPLOYEE_DATA_SUCCESS,
        payload: res?.data?.data,
      });
    }
  } catch (error) {
    error?.response?.status === statusResourceConflict
      ? toast.success(messageResourceConflict)
      : toast.error(messageError);
    yield put({
      type: ActionTypes.GET_EMPLOYEE_DATA_FAIL,
    });
  }
}

export function* resetEmployeeDataSaga(action) {
  try {
    yield put({
      type: ActionTypes.RESET_EMPLOYEE_DATA_SUCCESS,
      payload: action?.payload,
    });
  } catch (error) {
    error?.response?.status === statusResourceConflict
      ? toast.success(messageResourceConflict)
      : toast.error(messageError);
  }
}

export function* addNewEmployeeSaga(action) {
  try {
    const res = yield call(addNewEmployee, action?.payload);
    res?.status === statusSuccess
      ? toast.success(messageSuccess?.saveEmployee)
      : toast.error(messageError);

    yield put({
      type: ActionTypes.ADD_NEW_EMPLOYEE_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {
    error?.response?.status === statusResourceConflict
      ? toast.success(messageResourceConflict)
      : toast.error(messageError);
  }
}

export function* updateEmployeeSaga(action) {
  try {
    const res = yield call(
      updateEmployee,
      action?.payload?.id,
      action?.payload?.data
    );
    res?.status === statusSuccess
      ? toast.success(messageSuccess?.updateEmployee)
      : toast.error(messageError);
  } catch (error) {
    error?.response?.status === statusResourceConflict
      ? toast.success(messageResourceConflict)
      : toast.error(messageError);;
  }
}

export function* deleteEmployeeSaga(action) {
  try {
    const res = yield call(deleteEmployee, action?.payload);
    res?.status === statusSuccess
      ? toast.success(messageSuccess?.deleteEmployee)
      : toast.error(messageError);
  } catch (error) {
    error?.response?.status === statusResourceConflict
      ? toast.success(messageResourceConflict)
      : toast.error(messageError);
  }
}

export function* getFormDataSaga(action) {
  try {
    const res = yield call(getFormData, action?.payload);
    yield put({
      type: ActionTypes.GET_FORM_DATA_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {
    error?.response?.status === statusResourceConflict
      ? toast.success(messageResourceConflict)
      : toast.error(messageError);
  }
}

export function* updateFormSaga(action) {
  try {
    const resUpdateForm = yield call(
      updateForm,
      action?.payload?.id,
      action?.payload?.data
    );
    resUpdateForm?.status === statusSuccess
      ? toast.success(messageSuccess?.saveForm)
      : toast.error(messageError);

    const resGetForm = yield call(getFormData, action?.payload?.id);
    yield put({
      type: ActionTypes.GET_FORM_DATA_SUCCESS,
      payload: resGetForm?.data?.data,
    });
  } catch (error) {
    error?.response?.status === statusResourceConflict
      ? toast.success(messageResourceConflict)
      : toast.error(messageError);
  }
}

export function* resetFormDataSaga(action) {
  try {
    yield put({
      type: ActionTypes.RESET_FORM_DATA_SUCCESS,
      payload: action?.payload,
    });
  } catch (error) {
    error?.response?.status === statusResourceConflict
      ? toast.success(messageResourceConflict)
      : toast.error(messageError);
  }
}

export function* addRegistSaga(action) {
  try {
    const res = yield call(
      addRegist,
      action?.payload?.id,
      action?.payload?.data
    );

    res?.status === statusSuccess
      ? toast.success(messageSuccess?.sendLeader)
      : toast.error(messageError);
    yield put({
      type: ActionTypes.ADD_REGIST_SUCCESS,
    });
  } catch (error) {
    error?.response?.status === statusResourceConflict
      ? toast.success(messageResourceConflict)
      : toast.error(messageError);
    yield put({
      type: ActionTypes.GET_LIST_EMPLOYEE_DATA_FAIL,
    });
  }
}

export function* leaderActionSaga(action) {
  try {
    const res = yield call(
      leaderOfAction,
      action?.payload?.id,
      action?.payload?.data
    );
    res?.status === statusSuccess
      ? toast.success(action?.payload?.message)
      : toast.error(messageError);
  } catch (error) {
    error?.response?.status === statusResourceConflict
      ? toast.success(messageResourceConflict)
      : toast.error(messageError);
  }
}
