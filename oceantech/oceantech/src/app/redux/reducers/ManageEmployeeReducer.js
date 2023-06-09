import { ActionTypes } from "../actions/actionTypes";

const initialState = {
  fromoteHistory: {},
  increaseHistory: {},
  consulHistory: {},
  listPromoteHistory: [],
  salaryIncreaseHistory: [],
  proposalConsulHistory: [],
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_MANAGER_FAIL: {
      return { ...state, loading: false }
    }
    case ActionTypes.UPDATE_MANAGER_FAIL: {
      return { ...state, loading: false }
    }
    case ActionTypes.DELETE_MANAGER_FAIL: {
      return { ...state, loading: false }
    }


    case ActionTypes.ADD_PROMOTE: {
      return { ...state, loading: true }
    }
    case ActionTypes.UPDATE_PROMOTE: {
      return { ...state, loading: true }
    }
    case ActionTypes.DELETE_PROMOTE: {
      return { ...state, loading: true }
    }
    case ActionTypes.GET_PROMOTE_HISTORY_DATA: {
      return { ...state, loading: true }
    }
    case ActionTypes.GET_PROMOTE_HISTORY_ELEMENT: {
      return { ...state, fromoteHistory: action.payload, loading: false }
    }

    case ActionTypes.GET_PROMOTE_HISTORY_DATA_SUCCESS: {
      return { ...state, listPromoteHistory: action.payload, loading: false };
    }
    case ActionTypes.ADD_SALARY_INCREASE: {
      return { ...state, loading: true }
    }
    case ActionTypes.UPDATE_SALARY_INCREASE: {
      return { ...state, loading: true }
    }
    case ActionTypes.DELETE_SALARY: {
      return { ...state, loading: true }
    }
    case ActionTypes.GET_SALARY_INCREASE_ELEMENT: {
      return { ...state, increaseHistory: action.payload, loading: false }
    }
    case ActionTypes.GET_SALARY_INCREASE_HISTORY: {
      return { ...state, loading: true }
    }
    case ActionTypes.GET_SALARY_INCREASE_HISTORY_SUCCESS: {
      return { ...state, salaryIncreaseHistory: action.payload, loading: false };
    }
    case ActionTypes.ADD_PROPOSACONSULT: {
      return { ...state, loading: true }
    }
    case ActionTypes.UPDATE_PROPOSACONSULT: {
      return { ...state, loading: true }
    }
    case ActionTypes.DELETE_PROPOSACONSULT: {
      return { ...state, loading: true }
    }
    case ActionTypes.GET_PROPOSAL_CONSULTATION_ELEMENT: {
      return { ...state, consulHistory: action.payload, loading: false }
    }
    case ActionTypes.GET_PROPOSAL_CONSULTATION: {
      return { ...state, loading: true }
    }
    case ActionTypes.GET_PROPOSAL_CONSULTATION_SUCCESS: {
      return {
        ...state,
        proposalConsulHistory: action.payload,
        loading: false
      };
    }
    default:
      return state;
  }
};
