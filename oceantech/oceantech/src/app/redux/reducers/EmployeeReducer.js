import { ActionTypes } from "../actions/actionTypes";

const initialState = {
  objStatus: {
    1: "Lưu mới",
    // "2": "Chờ xử lý",
    3: "Chờ xử lý",
    4: "Yêu cầu bổ sung",
    5: "Đã duyệt",
    6: "Đã từ chối",
    8: "Chờ duyệt kết thúc",
    9: "Yêu cầu bổ sung đối với kết thúc",
    10: "Đã duyệt kết thúc",
    11: "Đã từ chối kết thúc",
    13: "Đã lưu hồ sơ",
    14: "Đã xóa",
    15: "Lưu mới",
    16: "Chờ duyệt",
    17: "Yêu cầu bổ sung",
    18: "Đã duyệt",
    19: "Đã từ chối",
  },
  otherFeature: [
    {
      id: 1,
      name: "Back-End",
    },
    {
      id: 2,
      name: "Front-End",
    },
    {
      id: 3,
      name: "Design",
    },
  ],
  Gender: [
    {
      value: "0",
      gender: "Nam",
    },
    {
      value: "1",
      gender: "Nữ",
    },
  ],
  leader: [
    {
      name: "Nguyen Van A",
      position: "Giám Đốc",
    },
    {
      name: "Nguyen Van B",
      position: "Quản lí",
    },
    {
      name: "Nguyen Van C",
      position: "Nhân viên",
    },
  ],
  total: null,
  listEmployeeData: [],
  employeeData: {},
  formData: {},
  regist: {},
  //
  listPromoteHistory: [],
  salaryIncreaseHistory: [],
  proposalConsulHistory: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_TOTAL_SUCCESS: {
      return { ...state, total: action.payload };
    }

    case ActionTypes.GET_LIST_EMPLOYEE_DATA_SUCCESS: {
      return { ...state, listEmployeeData: action.payload };
    }

    case ActionTypes.ADD_NEW_EMPLOYEE_SUCCESS: {
      return { ...state, employeeData: action.payload };
    }

    case ActionTypes.GET_EMPLOYEE_DATA_SUCCESS: {
      return { ...state, employeeData: action.payload };
    }

    case ActionTypes.RESET_EMPLOYEE_DATA_SUCCESS: {
      return { ...state, employeeData: action.payload };
    }

    case ActionTypes.GET_FORM_DATA_SUCCESS: {
      return { ...state, formData: action.payload };
    }

    case ActionTypes.GET_FORM_DATA_SUCCESS: {
      return { ...state, formData: action.payload };
    }

    case ActionTypes.RESET_FORM_DATA_SUCCESS: {
      return { ...state, formData: action.payload };
    }
    //

    case ActionTypes.GET_PROMOTE_HISTORY_DATA_SUCCESS: {
      // console.log("proto histoey : ", action.payload);
      return { ...state, listPromoteHistory: action.payload };
    }

    case ActionTypes.RESET_EMPLOYEE_DATA_SUCCESS: {
      return { ...state, employeeData: action.payload };
    }
    case ActionTypes.GET_SALARY_INCREASE_HISTORY_SUCCESS: {
      return { ...state, salaryIncreaseHistory: action.payload };
    }
    case ActionTypes.GET_PROPOSAL_CONSULTATION_SUCCESS: {
      return {
        ...state,
        proposalConsulHistory: action.payload,
      };
    }
    default:
      return state;
  }
};
