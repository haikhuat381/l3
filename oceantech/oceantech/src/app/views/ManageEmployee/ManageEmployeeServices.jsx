import axios from "app/axios";
import { API } from "app/constant";

export const getPromoteHistory = async (id) => {
  const url = `${API}/${id}/promote?page=1&size=20`;
  return axios.get(url);
};

export const deletePromote = (id) => {
  const url = `${API}/promote/${id}`;
  return axios.delete(url);
};

export const addPromote = (id, data) => {
  const url = `${API}/${id}/promote?page=1&size=20`;
  return axios.post(url, data);
};
export const updatePromote = (id, data) => {
  const url = `${API}/promote/${id}`;
  return axios.put(url, data);
};
export const getProposalConsultationHistory = (id) => {
  const url = `${API}/${id}/propose-consult?page=1&size=2`;
  return axios.get(url);
};

export const getSalaryIncreaseHistory = (id) => {
  const url = `${API}/${id}/increase-salary?page=1&size=20`;
  return axios.get(url);
};

export const addSalaryIncrease = (id, data) => {
  const url = `${API}/${id}/increase-salary?page=1&size=20`;
  return axios.post(url, data);
};
export const updateSalaryIncrease = (id, data) => {
  const url = `${API}/increase-salary/${id}`;
  return axios.put(url, data);
};

export const deleteSalaryIncrease = (id) => {
  const url = `${API}/increase-salary/${id}`;
  return axios.delete(url);
};

export const getProposalConsultation = (id) => {
  const url = `${API}/${id}/propose-consult?page=1&size=20`;
  return axios.get(url);
};

export const addProposalConsultation = (id, data) => {
  const url = `${API}/${id}/propose-consult?page=1&size=20`;
  return axios.post(url, data);
};
export const updateProposalConsultation = (id, data) => {
  const url = `${API}/propose-consult/${id}`;
  return axios.put(url, data);
};
export const deleteProposalConsultation = (id) => {
  const url = `${API}/propose-consult/${id}`;
  return axios.delete(url);
};
export const releaseManage = (id, data) => {
  const url = `${API}/${id}/status`;
  return axios.put(url, data);
};
