const API_PATH = "http://localhost:3000/api/";
const API_PATH_LOCATION = "http://localhost:3000/api/location";
const API_PATH_OTHER_FEATURE = "http://localhost:3000/api/otherFeature";

import axios from "axios";
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
export const addNewEmployee = (data) => {
  return axios.post(API_PATH + "listAddNewEmployee", data);
};
export const deleteEmployee = (id) => {
  return axios.delete(API_PATH + "listAddNewEmployee/" + id);
};
export const updateEmployee = (payload) => {
  return axios.put(API_PATH + "listAddNewEmployee/" + payload.id, payload.data);
};
// // api
export const getdata = async (page, pageSize) => {
  const token = localStorage.getItem("access_token");
  return await axios.get(
    `http://em-dev.oceantech.com.vn/em/employees?statuses=1,2,3&page=1&size=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
