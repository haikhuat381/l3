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
export const getListEmployeeData = async (status, page, pageSize) => {
  const url = `${API}?statuses=${status}&page=${page}&size=${pageSize}`
  return await axios.get(url,headers);
};

export const getEmployeeDataByID = async (id) => {
  const url = API + "/" + id
  return await axios.get(url,headers)
};

export const addNewEmployee = (data) => {
  return axios.post(API, data, headers)
};

export const updateEmployee = (id, data) => {
  const url = API + "/" + id
  return axios.put(url, data, headers);
};

export const deleteEmployee = (id) => {
  // const url = API + "/" + id + "/status"
  const url = `${API}/${id}/status`
  const data = {
    "status": 14
  }
  return axios.put(url, data, headers);
};