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
  return { type: ActionTypes.UPDATE_EMPLOYEE, payload: { data: payload, id: payload.id } };
};


//moi

export const getTotalAction = (status) => {
  const payload = {status}
  return { type: ActionTypes.GET_TOTAL, payload: payload};
};

export const getListEmployeeAction = (status, page, pageSize) => {
  const payload = {status, page, pageSize}
  return { type: ActionTypes.GET_LIST_EMPLOYEE_DATA, payload: payload};
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


export const addRegistAction = (id, data) => {
  return { type: ActionTypes.ADD_REGIST, payload: { id, data } };
};

export const leaderAction = (id, data) => {
  return { type: ActionTypes.LEADER_ACTION, payload: { id, data } };
};
