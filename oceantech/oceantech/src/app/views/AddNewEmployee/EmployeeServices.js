const API = "http://em-dev.oceantech.com.vn/em/employees"
const token = localStorage.getItem("access_token");
const headers = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
}

const API_PATH = "http://localhost:3000/api/";
const API_PATH_LOCATION = "http://localhost:3000/api/location";
const API_PATH_OTHER_FEATURE = "http://localhost:3000/api/otherFeature";


import axios from "axios";
import { async } from "regenerator-runtime";
export const GetListEmployee = () => {
  var url = API_PATH + "listAddNewEmployee";
  return axios.get(url);
};

export const GetListLocation = () => {
  return axios.get(API_PATH_LOCATION);
};
export const getOtherFeature = () => {
  return axios.get(API_PATH_OTHER_FEATURE);
};
// export const addNewEmployee = (data) => {
//   return axios.post(API_PATH + "listAddNewEmployee", data);
// };
// export const deleteEmployee = (id) => {
//   return axios.delete(API_PATH + "listAddNewEmployee/" + id);
// };

// export const updateEmployee = (payload) => {
//   return axios.put(API_PATH + "listAddNewEmployee/" + payload.id, payload.data);
// };




// apim moi


export const getTotal = async (status) => {
  const url = `${API}/total?statuses=${status}`
  return await axios.get(url,headers);
};

export const getListEmployeeData = async (status, page, pageSize) => {
  const url = `${API}?statuses=${status}&page=${page}&size=${pageSize}`
  return await axios.get(url,headers);
};

export const getEmployeeDataByID = async (id) => {
  const url = API + "/" + id
  return await axios.get(url,headers)
};

export const addNewEmployee = async (data) => {
  return await axios.post(API, data, headers)
};

export const updateEmployee = async (id, data) => {
  const url = API + "/" + id
  return await axios.put(url, data, headers);
};

export const deleteEmployee = async (id) => {
  const url = `${API}/${id}/status`
  const data = {
    "status": 14
  }
  return await axios.put(url, data, headers);
};

export const getFormData = async (id) => {
  const url = `${API}/${id}/form`
  return await axios.get(url, headers);
}

export const updateForm = async (id, data) => {
  const url = `${API}/${id}/form`
  return await axios.put(url, data, headers);
}


export const addRegist = async (id, data) => {
  const url = `${API}/${id}/status`
  return await axios.put(url, data, headers);
}


export const leaderOfAction = async (id, data) => {
  const url = `${API}/${id}/status`
  return await axios.put(url, data, headers);
}


