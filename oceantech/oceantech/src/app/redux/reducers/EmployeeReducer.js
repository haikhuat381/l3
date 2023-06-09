import { ActionTypes } from "../actions/actionTypes";

const initialState = {
  total: null,
  listEmployeeData: [],
  employeeData: {},
  formData: {},
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LEADER_ACTION: {
      return { ...state, loading: true };
    }

    case ActionTypes.ADD_REGIST: {
      return { ...state, loading: true };
    }
    case ActionTypes.ADD_REGIST_SUCCESS: {
      return { ...state, loading: false };
    }
    case ActionTypes.RELEASE_MANAGE: {
      return { ...state, loading: true };
    }
    case ActionTypes.RELEASE_MANAGE_SUCCESS: {
      return { ...state, loading: false }
    }
    case ActionTypes.GET_TOTAL_SUCCESS: {
      return { ...state, total: action.payload };
    }
    case ActionTypes.GET_LIST_EMPLOYEE_DATA: {
      return { ...state, loading: true }
    }

    case ActionTypes.GET_LIST_EMPLOYEE_DATA_SUCCESS: {
      return { ...state, listEmployeeData: action.payload, loading: false };
    }

    case ActionTypes.GET_LIST_EMPLOYEE_DATA_FAIL: {
      return { ...state, loading: false };
    }
    case ActionTypes.ADD_NEW_EMPLOYEE: {
      return { ...state, loading: true };
    }

    case ActionTypes.UPDATE_EMPLOYEE: {
      return { ...state, loading: true };
    }

    case ActionTypes.DELETE_EMPLOYEE: {
      return { ...state, loading: true };
    }
    case ActionTypes.UPDATE_FORM: {
      return { ...state, loading: true };
    }
    case ActionTypes.ADD_NEW_EMPLOYEE_SUCCESS: {
      return { ...state, employeeData: action.payload };
    }

    case ActionTypes.GET_EMPLOYEE_DATA: {
      return { ...state, loading: true }
    }
    case ActionTypes.GET_EMPLOYEE_DATA_SUCCESS: {
      return { ...state, employeeData: action.payload, loading: false };
    }
    case ActionTypes.GET_EMPLOYEE_DATA_FAIL: {
      return { ...state, loading: false };
    }
    case ActionTypes.GET_FORM_DATA_SUCCESS: {
      return { ...state, formData: action.payload };
    }

    case ActionTypes.RESET_FORM_DATA_SUCCESS: {
      return { ...state, formData: action.payload };
    }

    case ActionTypes.RESET_EMPLOYEE_DATA_SUCCESS: {
      return { ...state, employeeData: action.payload };
    }
    default:
      return state;
  }
};
