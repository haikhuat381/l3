import { ActionTypes } from "../actions/actionTypes";

const initialState = {
  listEmployeeData: [],
  objStatus: {
    "1": "Lưu mới",
    // "2": "Chờ xử lý",
    "3": "Chờ xử lý",
    "4": "Yêu cầu bổ sung",
    "5": "Đã duyệt",
    "6": "Đã từ chối",
    "8": "Chờ duyệt kết thúc",
    "9": "Yêu cầu bổ sung đối với kết thúc",
    "10": "Đã duyệt kết thúc",
    "11": "Đã từ chối kết thúc",
    "13": "Đã lưu hồ sơ",
    "14": "Đã xóa",
    "15": "Lưu mới",
    "16": "Chờ duyệt",
    "17": "Yêu cầu bổ sung",
    "18": "Đã duyệt",
    "19": "Đã từ chối",
  },

  employeeData: {
    listDiploma: [],
    listRelationship: [],
    // listPromote:[],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_LIST_EMPLOYEE_SUCCESS: {
      return { ...state, listEmployee: action.payload };
    }
    case ActionTypes.GET_EMPLOYEE_DATA: {
      return { ...state, employeeData: action.payload };
    }

    //moi
    case ActionTypes.GET_LIST_EMPLOYEE_DATA_SUCCESS: {
      console.log("action",action)
      return { ...state, listEmployeeData: action.payload };
    }


    default:
      return state;
  }
};
