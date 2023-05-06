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
  console.log("resres", res);
  if (res.status === 200) {
    toast.success("Lưu mới thành công");
  } else {
    console.log("loii", res);
    // toast.error()
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
  if (res.status === 200) {
    toast.success("Cập nhật thành công");
  } else {
    console.log("loii", res);
    // toast.error()
  }
}

export function* deleteEmployeeSaga(action) {
  const res = yield call(deleteEmployee, action.payload);
  if (res.status === 200) {
    toast.success("Xóa nhân viên thành công");
  } else {
    console.log("loii", res);
    // toast.error()
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
  if (resForm.status === 200) {
    toast.success("Cập nhật hồ sơ thành công");
  } else {
    console.log("loii", res);
    // toast.error()
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
  if (res.status === 200) {
    toast.success("Gửi lãnh đạo thành công");
  } else {
    console.log("loii", res);
    // toast.error()
  }
}

export function* leaderActionSaga(action) {
  const res = yield call(
    leaderOfAction,
    action.payload.id,
    action.payload.data
  );
  if (res.status === 200) {
    toast.success(`${action.payload.action} thành công`);
  } else {
    console.log("loii", res);
    // toast.error()
  }
}

// Employee management

export function* deletePromotesaga(action) {
  const res = yield call(deletePromote, action.payload);
  if (res?.status === 200) {
    console.log("đã xóa thành cong", res?.message);
    toast.success("xóa thành công ");
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
    if (res?.status === 200) {
      toast.success("them moi ");
    }
  } catch (error) {
    console.log(error);
  }
}
export function* UpdatePromotesaga(action) {
  console.log("updatesaga", action?.payload?.id, action?.payload?.data);
  try {
    const res = yield call(
      updatePromote,
      action.payload.id,
      action.payload.data
    );
    if (res?.status === 200) {
      toast.success("Sua thanh cong ");
    }
  } catch (error) {
    console.log(error);
  }
}

export function* getSalaryIncreaseHistorysaga(action) {
  try {
    const res = yield call(getSalaryIncreaseHistory, action?.payload);
    console.log("getSalaryIncreaseHistory", res?.data?.data);
    yield put({
      type: ActionTypes.GET_SALARY_INCREASE_HISTORY_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (err) {
    console.log(err);
  }
}

export function* addSalarysaga(action) {
  console.log("them luong tu saga", action);
  try {
    const res = yield call(
      addSalaryIncrease,
      action?.payload?.id,
      action?.payload?.data
    );
    if (res?.status === 200) {
      toast.success(" them thanh cong ");
    }
  } catch (error) {
    console.log(err);
  }
}

export function* deleteSalarysaga(action) {
  console.log("đã xoa tang luong ", action);
  const res = yield call(deleteSalaryIncrease, action.payload);
  if (res?.status === 200) {
    console.log("đã xóa thành cong", res?.message);
    toast.success("xóa thành công ");
  }
}

export function* updateSalarysaga(action) {
  try {
    const res = yield call(
      updateSalaryIncrease,
      action?.payload?.id,
      action?.payload?.data
    );
    if (res?.status === 200) {
      console.log("sua thanh cong ");
      toast.success("Sua thanh cong ");
    }
  } catch (error) {
    console.log(error);
  }
}
// Proposal Consultation
export function* getProposalConsultationsaga(action) {
  try {
    const res = yield call(getProposalConsultation, action?.payload);
    console.log("getProposalConsultationsaga", res?.data?.data);
    yield put({
      type: ActionTypes.GET_PROPOSAL_CONSULTATION_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (err) {
    console.log(err);
  }
}

export function* addProposalConsultsaga(action) {
  console.log("action", action);
  try {
    const res = yield call(
      addProposalConsultation,
      action?.payload?.id,
      action?.payload?.data
    );
    if (res?.status == 200) {
      toast.success("them thanh cong ");
    }
    console.log("them thanh cong", res);
  } catch (error) {
    console.log(err);
  }
}

export function* deleteProposalConsultsaga(action) {
  try {
    const res = yield call(deleteProposalConsultation, action?.payload);
    if (res?.status == 200) {
      toast.success("xoa thanh cong ");
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
    if (res?.status === 200) {
      toast.success("sua thanh cong ");
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
    if (res?.status === 200) {
      toast.success("Gui  lanh dao");
    }
  } catch (error) {
    console.log(err);
  }
}
