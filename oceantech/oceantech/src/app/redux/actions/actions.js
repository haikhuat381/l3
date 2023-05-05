import { ActionTypes } from "./actionTypes";

export const getListEmployeeRequest = () => {
  return { type: ActionTypes.GET_LIST_EMPLOYEE_REQUEST };
};

export const getListLocation = () => {
  return { type: ActionTypes.GET_LIST_LOCATION };
};
export const getOtherFeature = () => {
  return { type: ActionTypes.GET_OTHER_FEATURE };
};
export const getEmployeeData = (payload) => {
  return { type: ActionTypes.GET_EMPLOYEE_DATA, payload: payload };
};
export const addNewEmployee = (payload) => {
  return { type: ActionTypes.ADD_NEW_EMPLOYEE, payload: payload };
};
export const deleteEmployee = (payload) => {
  return { type: ActionTypes.DELETE_EMPLOYEE, payload: payload };
};
export const updateEmployee = (payload) => {
  return {
    type: ActionTypes.UPDATE_EMPLOYEE,
    payload: { data: payload, id: payload.id },
  };
};

//moi

export const getTotalAction = (status) => {
  const payload = { status };
  return { type: ActionTypes.GET_TOTAL, payload: payload };
};

export const getListEmployeeAction = (status, page, pageSize) => {
  const payload = { status, page, pageSize };
  return { type: ActionTypes.GET_LIST_EMPLOYEE_DATA, payload: payload };
};

export const getEmployeeDataAction = (payload) => {
  return { type: ActionTypes.GET_EMPLOYEE_DATA, payload: payload };
};

export const resetEmployeeDataAction = (payload) => {
  return { type: ActionTypes.RESET_EMPLOYEE_DATA, payload: payload };
};

export const addNewEmployeeAction = (payload) => {
  return { type: ActionTypes.ADD_NEW_EMPLOYEE, payload: payload };
};

export const updateEmployeeAction = (id, data) => {
  return { type: ActionTypes.UPDATE_EMPLOYEE, payload: { id, data } };
};

export const deleteEmployeeAction = (payload) => {
  return { type: ActionTypes.DELETE_EMPLOYEE, payload: payload };
};

export const getFormDataAction = (payload) => {
  return { type: ActionTypes.GET_FORM_DATA, payload: payload };
};

export const updateFormAction = (id, data) => {
  return { type: ActionTypes.UPDATE_FORM, payload: { id, data } };
};

export const resetFormDataAction = (payload) => {
  return { type: ActionTypes.RESET_FORM_DATA, payload: payload };
};

export const addRegistAction = (id, data) => {
  return { type: ActionTypes.ADD_REGIST, payload: { id, data } };
};

export const leaderAction = (id, data, action) => {
  return { type: ActionTypes.LEADER_ACTION, payload: { id, data, action } };
};

// promote
export const getPromoteHistoryAction = (id) => {
  return { type: ActionTypes.GET_PROMOTE_HISTORY_DATA, payload: id };
};
export const deletePromoteHistoryAction = (id) => {
  return { type: ActionTypes.DELETE_PROMOTE, payload: id };
};
export const addPromoteHistoryAction = (id, data) => {
  return { type: ActionTypes.ADD_PROMOTE, payload: { id, data } };
};
export const updatePromoteHistoryAction = (id, data) => {
  return { type: ActionTypes.UPDATE_PROMOTE, payload: { id, data } };
};

// Increase Salary

export const getSalaryIncreaseHistoryAction = (id) => {
  return { type: ActionTypes.GET_SALARY_INCREASE_HISTORY, payload: id };
};
export const addSalaryIncreaseAction = (id, data) => {
  return { type: ActionTypes.ADD_SALARY_INCREASE, payload: { id, data } };
};
export const updateSalaryIncreaseAction = (id, data) => {
  return { type: ActionTypes.UPDATE_SALARY_INCREASE, payload: { id, data } };
};
export const deleteSalaryIncreaseAction = (id) => {
  return { type: ActionTypes.DELETE_SALARY, payload: id };
};
// Proposal Consultation
export const getProposalConsultationAction = (id) => {
  return { type: ActionTypes.GET_PROPOSAL_CONSULTATION, payload: id };
};
export const addProposalConsult = (id, data) => {
  return { type: ActionTypes.ADD_PROPOSACONSULT, payload: { id, data } };
};
export const updateProposalConsult = (id, data) => {
  return { type: ActionTypes.UPDATE_PROPOSACONSULT, payload: { id, data } };
};
export const deleteProposalConsult = (id) => {
  return { type: ActionTypes.DELETE_PROPOSACONSULT, payload: id };
};
//Release
export const ReleaseManageAction = (id, data) => {
  return { type: ActionTypes.RELEASE_MANAGE, payload: { id, data } };
};
