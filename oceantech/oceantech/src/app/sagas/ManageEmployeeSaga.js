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
  releaseManage,
} from "app/views/ManageEmployee/ManageEmployeeServices";
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

export function* deletePromotesaga(action) {
  try {
    const res = yield call(deletePromote, action?.payload?.id);
    if (res?.status === statusSuccess) {
      toast.success(messageSuccess?.deletePromote);
      yield getPromoteHistorysaga({ payload: action?.payload?.idRegister });
    } else {
      toast.error(messageError);
    }
  } catch (error) {
    error?.response?.status === statusResourceConflict
      ? toast.success(messageResourceConflict)
      : toast.error(messageError);
  }
  yield put({
    type: ActionTypes.DELETE_MANAGER_FAIL

  });
}

export function* getPromoteHistorysaga(action) {
  try {
    const res = yield call(getPromoteHistory, action?.payload);
    if (res?.status === statusSuccess) {
      yield put({
        type: ActionTypes.GET_PROMOTE_HISTORY_DATA_SUCCESS,
        payload: res?.data?.data,
      });
    }
  } catch (error) {
    error?.response?.status === statusResourceConflict
      ? toast.success(messageResourceConflict)
      : toast.error(messageError);
  }
}
export function* addPromotesaga(action) {
  try {
    const res = yield call(
      addPromote,
      action?.payload?.idRegister,
      action?.payload?.data
    );
    if (res?.status === statusSuccess) {
      toast.success(messageSuccess?.addPromote);
      yield getPromoteHistorysaga({ payload: action?.payload?.idRegister });
      yield put({
        type: ActionTypes.GET_PROMOTE_HISTORY_ELEMENT,
        payload: action?.payload?.data,
      });
    } else {
      toast.error(messageError);

    }
  } catch (error) {
    error?.response?.status === statusResourceConflict
      ? toast.success(messageResourceConflict)
      : toast.error(messageError);
    yield put({
      type: ActionTypes.ADD_MANAGER_FAIL

    });
  }
}
export function* UpdatePromotesaga(action) {
  try {
    const res = yield call(
      updatePromote,
      action?.payload?.id,
      action?.payload?.data
    );
    if (res?.status === statusSuccess) {
      toast.success(messageSuccess?.updatePromote);
      yield getPromoteHistorysaga({ payload: action?.payload?.idRegister });
      yield put({
        type: ActionTypes.GET_PROMOTE_HISTORY_ELEMENT,
        payload: action?.payload?.data,
      });
    } else {
      toast.error(messageError);


    }
  } catch (error) {
    error?.response?.status === statusResourceConflict
      ? toast.success(messageResourceConflict)
      : toast.error(messageError);
    yield put({
      type: ActionTypes.UPDATE_MANAGER_FAIL
    });
  }
}
// tang luong 
export function* getSalaryIncreaseHistorysaga(action) {
  try {
    const res = yield call(getSalaryIncreaseHistory, action?.payload);
    yield put({
      type: ActionTypes.GET_SALARY_INCREASE_HISTORY_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (error) {
    error?.response?.status === statusResourceConflict
      ? toast.success(messageResourceConflict)
      : toast.error(messageError);
  }
}

export function* addSalarysaga(action) {
  try {
    const res = yield call(
      addSalaryIncrease,
      action?.payload?.idRegister,
      action?.payload?.data
    );
    if (res?.status === statusSuccess) {
      toast.success(messageSuccess?.addIncreaseSalary);
      yield getSalaryIncreaseHistorysaga({
        payload: action?.payload?.idRegister,
      });
      yield put({
        type: ActionTypes.GET_SALARY_INCREASE_ELEMENT,
        payload: action?.payload?.data
      });
    } else {
      toast.error(messageError);
    }
  } catch (error) {
    error?.response?.status === statusResourceConflict
      ? toast.success(messageResourceConflict)
      : toast.error(messageError);
    yield put({
      type: ActionTypes.ADD_MANAGER_FAIL

    });
  }
}

export function* deleteSalarysaga(action) {
  try {
    const res = yield call(deleteSalaryIncrease, action?.payload?.id);
    if (res?.status === statusSuccess) {
      toast.success(messageSuccess?.deleteIncreaseSalary);
      yield getSalaryIncreaseHistorysaga({
        payload: action?.payload?.idRegister,
      });
    } else {
      toast.error(messageError);
    }
  } catch (error) {
    error?.response?.status === statusResourceConflict
      ? toast.success(messageResourceConflict)
      : toast.error(messageError);
  }
  yield put({
    type: ActionTypes.DELETE_MANAGER_FAIL

  });
}

export function* updateSalarysaga(action) {
  try {
    const res = yield call(
      updateSalaryIncrease,
      action?.payload?.id,
      action?.payload?.data
    );
    if (res?.status === statusSuccess) {
      toast.success(messageSuccess?.updateIncreaseSalary);
      yield getSalaryIncreaseHistorysaga({
        payload: action?.payload?.idRegister,
      });
      yield put({
        type: ActionTypes.GET_SALARY_INCREASE_ELEMENT,
        payload: action?.payload?.data
      });
    } else {
      toast.error(messageError);
    }
  } catch (error) {
    error?.response?.status === statusResourceConflict
      ? toast.success(messageResourceConflict)
      : toast.error(messageError);
    yield put({
      type: ActionTypes.UPDATE_MANAGER_FAIL
    });
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
  } catch (error) {
    error?.response?.status === statusResourceConflict
      ? toast.success(messageResourceConflict)
      : toast.error(messageError);
  }
}

export function* addProposalConsultsaga(action) {
  try {
    const res = yield call(
      addProposalConsultation,
      action?.payload?.idRegister,
      action?.payload?.data
    );
    if (res?.status == statusSuccess) {
      toast.success(messageSuccess?.addProposalConsultation);
      yield getProposalConsultationsaga({
        payload: action?.payload?.idRegister,
      });
      yield put({
        type: ActionTypes.GET_PROPOSAL_CONSULTATION_ELEMENT,
        payload: action?.payload?.data,
      });
    } else {
      toast.error(messageError);
    }
  } catch (error) {
    error?.response?.status === statusResourceConflict
      ? toast.success(messageResourceConflict)
      : toast.error(messageError);
  }
  yield put({
    type: ActionTypes.ADD_MANAGER_FAIL

  });
}

export function* deleteProposalConsultsaga(action) {
  try {
    const res = yield call(deleteProposalConsultation, action?.payload?.id);
    if (res?.status == statusSuccess) {
      toast.success(messageSuccess?.deleteProposalConsultation);
      yield getProposalConsultationsaga({
        payload: action?.payload?.idRegister,
      });
    } else {
      toast.error(messageError);
    }
  } catch (error) {
    error?.response?.status === statusResourceConflict
      ? toast.success(messageResourceConflict)
      : toast.error(messageError);
  }
  yield put({
    type: ActionTypes.DELETE_MANAGER_FAIL

  });
}
export function* updateProposalConsultsaga(action) {
  try {
    const res = yield call(
      updateProposalConsultation,
      action?.payload?.id,
      action?.payload?.data
    );
    if (res?.status === statusSuccess) {
      toast.success(messageSuccess?.updateProposalConsultation);
      yield getProposalConsultationsaga({
        payload: action?.payload?.idRegister,
      });
      yield put({
        type: ActionTypes.GET_PROPOSAL_CONSULTATION_ELEMENT,
        payload: action?.payload?.data,
      });
    } else {
      toast.error(messageError);
    }
  } catch (error) {
    error?.response?.status === statusResourceConflict
      ? toast.success(messageResourceConflict)
      : toast.error(messageError);
    yield put({
      type: ActionTypes.UPDATE_MANAGER_FAIL
    });
  }
}


export function* releaseManagesaga(action) {
  try {
    const res = yield call(
      releaseManage,
      action?.payload?.id,
      action?.payload?.data
    );
    res?.status === statusSuccess
      ? toast.success(messageSuccess?.sendLeader)
      : toast.error(messageError);
    yield put({
      type: ActionTypes.RELEASE_MANAGE_SUCCESS
    });
  } catch (error) {
    error?.response?.status === statusResourceConflict
      ? toast.success(messageResourceConflict)
      : toast.error(messageError);
  }
}
