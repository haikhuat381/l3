import {
  GetListEmployee,
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
} from "app/views/AddNewEmployee/EmployeeServices";

import {
  getPromoteHistory,
  deletePromote,
  addPromote,
  updatePromote,
  getSalaryIncreaseHistory,
  addSalaryIncrease,
  deleteSalaryIncrease,
  updateSalaryIncrease,
  getProposalConsultation,
  addProposalConsultation,
  updateProposalConsultation,
  deleteProposalConsultation,
  ReleaseManage,
} from "app/views/ManageEmployee/ManageEmployeeServices";

import { call, put } from "redux-saga/effects";
import { ActionTypes } from "app/redux/actions/actionTypes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { statusSuccess } from "app/constant";

export function* getTotalSaga(data) {
  try {
    const res = yield call(getTotal, data?.payload?.status);
    yield put({ type: ActionTypes.GET_TOTAL_SUCCESS, payload: res.data.data });
  } catch (err) {
    console.log(err);
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
  } catch (err) {
    console.log(err);
  }
}

export function* getEmployeeDataSaga(action) {
  const res = yield call(getEmployeeDataByID, action.payload);
  yield put({
    type: ActionTypes.GET_EMPLOYEE_DATA_SUCCESS,
    payload: res.data.data,
  });
}

export function* resetEmployeeDataSaga(action) {
  yield put({
    type: ActionTypes.RESET_EMPLOYEE_DATA_SUCCESS,
    payload: action.payload,
  });
}

export function* addNewEmployeeSaga(action) {
  const res = yield call(addNewEmployee, action.payload);
  if (res.status === statusSuccess) {
    toast.success("Lưu mới thành công");
  } else {
    toast.error("Đã xảy ra lỗi, xin hãy thử lại!");
  }
  yield put({
    type: ActionTypes.ADD_NEW_EMPLOYEE_SUCCESS,
    payload: res.data.data,
  });
}

export function* updateEmployeeSaga(action) {
  const res = yield call(
    updateEmployee,
    action.payload.id,
    action.payload.data
  );
  if (res.status === statusSuccess) {
    toast.success("Cập nhật thành công");
  } else {
    toast.error("Đã xảy ra lỗi, xin hãy thử lại!");
  }
}

export function* deleteEmployeeSaga(action) {
  const res = yield call(deleteEmployee, action.payload);
  if (res.status === statusSuccess) {
    toast.success("Xóa nhân viên thành công");
  } else {
    toast.error("Đã xảy ra lỗi, xin hãy thử lại!");
  }
}

export function* getFormDataSaga(action) {
  const res = yield call(getFormData, action.payload);
  yield put({
    type: ActionTypes.GET_FORM_DATA_SUCCESS,
    payload: res.data.data,
  });
}

export function* updateFormSaga(action) {
  const resForm = yield call(
    updateForm,
    action.payload.id,
    action.payload.data
  );
  if (resForm.status === statusSuccess) {
    toast.success("Cập nhật hồ sơ thành công");
  } else {
    toast.error("Đã xảy ra lỗi, xin hãy thử lại!");
  }
  const res = yield call(getFormData, action.payload.id);
  yield put({
    type: ActionTypes.GET_FORM_DATA_SUCCESS,
    payload: res.data.data,
  });
}

export function* resetFormDataSaga(action) {
  yield put({
    type: ActionTypes.RESET_FORM_DATA_SUCCESS,
    payload: action.payload,
  });
}

export function* addRegistSaga(action) {
  const res = yield call(addRegist, action.payload.id, action.payload.data);
  if (res.status === statusSuccess) {
    toast.success("Gửi lãnh đạo thành công");
  } else {
    toast.error("Đã xảy ra lỗi, xin hãy thử lại!");
  }
}

export function* leaderActionSaga(action) {
  const res = yield call(
    leaderOfAction,
    action.payload.id,
    action.payload.data
  );
  if (res.status === statusSuccess) {
    toast.success(`${action.payload.action} thành công`);
  } else {
    toast.error("Đã xảy ra lỗi, xin hãy thử lại!");
  }
}

// Employee management

export function* deletePromotesaga(action) {
  const res = yield call(deletePromote, action.payload);
  if (res?.status === statusSuccess) {
    toast.success("Đã xóa thành công!");
  }
}

export function* getPromoteHistorysaga(action) {
  try {
    const res = yield call(getPromoteHistory, action?.payload);
    yield put({
      type: ActionTypes.GET_PROMOTE_HISTORY_DATA_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (err) {
    console.log(err);
  }
}
export function* addPromotesaga(action) {
  try {
    const res = yield call(
      addPromote,
      action?.payload?.id,
      action?.payload?.data
    );
    if (res?.status === statusSuccess) {
      toast.success("Thêm mới thành công!");
    } else {
      toast.error("Đã xảy ra lỗi, xin hãy thử lại!");
    }
  } catch (error) {
    console.log(error);
  }
}
export function* UpdatePromotesaga(action) {
  try {
    const res = yield call(
      updatePromote,
      action.payload.id,
      action.payload.data
    );
    if (res?.status === statusSuccess) {
      toast.success("Chỉnh sửa thành công!");
    } else {
      toast.error("Đã xảy ra lỗi, xin hãy thử lại!");
    }
  } catch (error) {
    console.log(error);
  }
}

export function* getSalaryIncreaseHistorysaga(action) {
  try {
    const res = yield call(getSalaryIncreaseHistory, action?.payload);
    yield put({
      type: ActionTypes.GET_SALARY_INCREASE_HISTORY_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (err) {
    console.log(err);
  }
}

export function* addSalarysaga(action) {
  try {
    const res = yield call(
      addSalaryIncrease,
      action?.payload?.id,
      action?.payload?.data
    );
    if (res?.status === statusSuccess) {
      toast.success("Thêm mới thành công!");
    } else {
      toast.error("Đã xảy ra lỗi, xin hãy thử lại!");
    }
  } catch (error) {
    console.log(err);
  }
}

export function* deleteSalarysaga(action) {
  const res = yield call(deleteSalaryIncrease, action.payload);
  if (res?.status === statusSuccess) {
    toast.success("Đã xóa thành công!");
  } else {
    toast.error("Đã xảy ra lỗi, xin hãy thử lại!");
  }
}

export function* updateSalarysaga(action) {
  try {
    const res = yield call(
      updateSalaryIncrease,
      action?.payload?.id,
      action?.payload?.data
    );
    if (res?.status === statusSuccess) {
      toast.success("Chỉnh sửa thành công!");
    } else {
      toast.error("Đã xảy ra lỗi, xin hãy thử lại!");
    }
  } catch (error) {
    console.log(error);
  }
}
// Proposal Consultation
export function* getProposalConsultationsaga(action) {
  try {
    const res = yield call(getProposalConsultation, action?.payload);
    yield put({
      type: ActionTypes.GET_PROPOSAL_CONSULTATION_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (err) {
    console.log(err);
  }
}

export function* addProposalConsultsaga(action) {
  try {
    const res = yield call(
      addProposalConsultation,
      action?.payload?.id,
      action?.payload?.data
    );
    if (res?.status == 200) {
      toast.success("Thêm mới thành công!");
    } else {
      toast.error("Đã xảy ra lỗi, xin hãy thử lại!");
    }
  } catch (error) {
    console.log(err);
  }
}

export function* deleteProposalConsultsaga(action) {
  try {
    const res = yield call(deleteProposalConsultation, action?.payload);
    if (res?.status == 200) {
      toast.success("Đã xóa thành công!");
    } else {
      toast.error("Đã xảy ra lỗi, xin hãy thử lại!");
    }
  } catch (error) {
    console.log(err);
  }
}
export function* updateProposalConsultsaga(action) {
  try {
    const res = yield call(
      updateProposalConsultation,
      action?.payload?.id,
      action?.payload?.data
    );
    if (res?.status === statusSuccess) {
      toast.success("Chỉnh sửa thành công!");
    } else {
      toast.error("Đã xảy ra lỗi, xin hãy thử lại!");
    }
  } catch (error) {
    console.log(err);
  }
}

// Release
export function* ReleaseManagesaga(action) {
  try {
    const res = yield call(
      ReleaseManage,
      action?.payload?.id,
      action?.payload?.data
    );
    if (res?.status === statusSuccess) {
      toast.success("Gửi lãnh đạo thành công!");
    } else {
      toast.error("Đã xảy ra lỗi, xin hãy thử lại!");
    }
  } catch (error) {
    console.log(err);
  }
}
