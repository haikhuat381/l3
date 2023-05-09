import { ActionTypes } from "../actions/actionTypes";

const initialState = {
  
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
