import { async } from "regenerator-runtime";
import axios from "axios";
const API = "http://em-dev.oceantech.com.vn/em/employees";
const token = localStorage.getItem("access_token");
const headers = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
// promote
export const getPromoteHistory = async (id) => {
  const url = `http://em-dev.oceantech.com.vn/em/employees/${id}/promote?page=1&size=20`;
  return axios.get(url, headers);
};

export const deletePromote = (id) => {
  const url = `http://em-dev.oceantech.com.vn/em/employees/promote/${id}`;
  return axios.delete(url, headers);
};

export const addPromote = (id, data) => {
  const url = `http://em-dev.oceantech.com.vn/em/employees/${id}/promote?page=1&size=20`;
  return axios.post(url, data, headers);
};
export const updatePromote = (id, data) => {
  const url = `http://em-dev.oceantech.com.vn/em/employees/promote/${id}`;
  return axios.put(url, data, headers);
};
// ProposeAdvisory
export const getProposalConsultationHistory = (id) => {
  const url = `http://em-dev.oceantech.com.vn/em/employees/${id}/propose-consult?page=1&size=2`;
  return axios.get(url, headers);
};
// Increase Salary

export const getSalaryIncreaseHistory = (id) => {
  const url = `http://em-dev.oceantech.com.vn/em/employees/${id}/increase-salary?page=1&size=20`;
  return axios.get(url, headers);
};

export const addSalaryIncrease = (id, data) => {
  const url = `http://em-dev.oceantech.com.vn/em/employees/${id}/increase-salary?page=1&size=20`;
  return axios.post(url, data, headers);
};
export const updateSalaryIncrease = (id, data) => {
  const url = `http://em-dev.oceantech.com.vn/em/employees/increase-salary/${id}`;
  return axios.put(url, data, headers);
};

export const deleteSalaryIncrease = (id) => {
  const url = `http://em-dev.oceantech.com.vn/em/employees/increase-salary/${id}`;
  return axios.delete(url, headers);
};
// Proposal Consultation

export const getProposalConsultation = (id) => {
  const url = `http://em-dev.oceantech.com.vn/em/employees/${id}/propose-consult?page=1&size=20`;
  return axios.get(url, headers);
};

export const addProposalConsultation = (id, data) => {
  const url = `http://em-dev.oceantech.com.vn/em/employees/${id}/propose-consult?page=1&size=20`;
  return axios.post(url, data, headers);
};
export const updateProposalConsultation = (id, data) => {
  const url = `http://em-dev.oceantech.com.vn/em/employees/propose-consult/${id}`;
  return axios.put(url, data, headers);
};
export const deleteProposalConsultation = (id) => {
  const url = `http://em-dev.oceantech.com.vn/em/employees/propose-consult/${id}`;
  return axios.delete(url, headers);
};
// Release
export const ReleaseManage = (id, data) => {
  const url = `http://em-dev.oceantech.com.vn/em/employees/${id}/status`;
  return axios.put(url, data, headers);
};
