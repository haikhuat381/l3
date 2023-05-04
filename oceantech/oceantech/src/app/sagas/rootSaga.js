import { takeLatest, takeEvery } from "redux-saga/effects";
import { ActionTypes } from "app/redux/actions/actionTypes";
import {
  getListEmployeeSaga,
  deleteEmployeeSaga,
  updateEmployeeSaga,
  getListEmployeeDataSaga,
  getEmployeeDataSaga,
  resetEmployeeDataSaga,
  getFormDataSaga,
  updateFormSaga,
  resetFormDataSaga,
  getTotalSaga,
  addRegistSaga,
  leaderActionSaga,
  // Employee management
  getPromoteHistorysaga,
  deletePromotesaga,
  addPromotesaga,
  UpdatePromotesaga,
  getSalaryIncreaseHistorysaga,
  addSalarysaga,
  deleteSalarysaga,
  updateSalarysaga,
  getProposalConsultationsaga,
  addProposalConsultsaga,
  updateProposalConsultsaga,
  deleteProposalConsultsaga,
  ReleaseManagesaga,
} from "./EmployeeSaga";
import { addNewEmployeeSaga } from "./EmployeeSaga";
export default function* rootSaga() {
  yield takeLatest(ActionTypes.GET_TOTAL, getTotalSaga);
  yield takeLatest(ActionTypes.GET_LIST_EMPLOYEE_DATA, getListEmployeeDataSaga);
  yield takeLatest(ActionTypes.GET_EMPLOYEE_DATA, getEmployeeDataSaga);
  yield takeLatest(ActionTypes.RESET_EMPLOYEE_DATA, resetEmployeeDataSaga);
  yield takeLatest(ActionTypes.ADD_NEW_EMPLOYEE, addNewEmployeeSaga);
  yield takeLatest(ActionTypes.UPDATE_EMPLOYEE, updateEmployeeSaga);
  yield takeLatest(ActionTypes.DELETE_EMPLOYEE, deleteEmployeeSaga);

  yield takeLatest(ActionTypes.GET_FORM_DATA, getFormDataSaga);
  yield takeLatest(ActionTypes.UPDATE_FORM, updateFormSaga);
  yield takeLatest(ActionTypes.RESET_FORM_DATA, resetFormDataSaga);

  yield takeLatest(ActionTypes.ADD_REGIST, addRegistSaga);
  yield takeLatest(ActionTypes.LEADER_ACTION, leaderActionSaga);
  // Employee management

  // PROMOTE
  yield takeLatest(ActionTypes.GET_PROMOTE_HISTORY_DATA, getPromoteHistorysaga);
  yield takeLatest(ActionTypes.DELETE_PROMOTE, deletePromotesaga);
  yield takeLatest(ActionTypes.ADD_PROMOTE, addPromotesaga);
  yield takeLatest(ActionTypes.UPDATE_PROMOTE, UpdatePromotesaga);
  // SALARY_INCREASE

  yield takeLatest(
    ActionTypes.GET_SALARY_INCREASE_HISTORY,
    getSalaryIncreaseHistorysaga
  );
  yield takeLatest(ActionTypes.ADD_SALARY_INCREASE, addSalarysaga);
  yield takeLatest(ActionTypes.DELETE_SALARY, deleteSalarysaga);
  yield takeLatest(ActionTypes.UPDATE_SALARY_INCREASE, updateSalarysaga);

  // Proposal Consultation
  yield takeLatest(
    ActionTypes.GET_PROPOSAL_CONSULTATION,
    getProposalConsultationsaga
  );
  // UPDATE_PROPOSACONSULT
  yield takeLatest(ActionTypes.ADD_PROPOSACONSULT, addProposalConsultsaga);
  yield takeLatest(
    ActionTypes.UPDATE_PROPOSACONSULT,
    updateProposalConsultsaga
  );
  yield takeLatest(
    ActionTypes.DELETE_PROPOSACONSULT,
    deleteProposalConsultsaga
  );
  yield takeLatest(ActionTypes.RELEASE_MANAGE, ReleaseManagesaga);
}
