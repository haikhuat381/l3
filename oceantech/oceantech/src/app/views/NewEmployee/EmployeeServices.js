import axios from "app/axios";
import { deletedStatus, API } from "app/constant";


export const getTotal = async (status) => {
  const url = `${API}/total?statuses=${status}`;
  return await axios.get(url);
};

export const getListEmployeeData = async (status, page, pageSize) => {
  const url = `${API}?statuses=${status}&page=${page}&size=${pageSize}`;
  return await axios.get(url);
};

export const getEmployeeDataByID = async (id) => {
  const url = API + "/" + id;
  return await axios.get(url);
};

export const addNewEmployee = async (data) => {
  return await axios.post(API, data);
};

export const updateEmployee = async (id, data) => {
  const url = API + "/" + id;
  return await axios.put(url, data);
};

export const deleteEmployee = async (id) => {
  const url = `${API}/${id}/status`;
  const data = {
    status: deletedStatus,
  };
  return await axios.put(url, data);
};

export const getFormData = async (id) => {
  const url = `${API}/${id}/form`;
  return await axios.get(url);
};

export const updateForm = async (id, data) => {
  const url = `${API}/${id}/form`;
  return await axios.put(url, data);
};

export const addRegist = async (id, data) => {
  const url = `${API}/${id}/status`;
  return await axios.put(url, data);
};

export const leaderOfAction = async (id, data) => {
  const url = `${API}/${id}/status`;
  return await axios.put(url, data);
};
