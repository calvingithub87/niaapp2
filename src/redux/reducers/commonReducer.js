import {GET_SUCCESS_SHOW, GET_SUCCESS_HIDE, GET_ALERT_SHOW, GET_ALERT_HIDE, GET_ERROR_SHOW, GET_ERROR_HIDE, GET_LOADING_SHOW, GET_LOADING_HIDE} from "../constants/commonConstants";
export const commonReducer = (state={loading:0}, action) => {
    switch (action.type) {
      case GET_SUCCESS_SHOW:
        return { ...state, success: true, successMsg: action.payload};
      case GET_SUCCESS_HIDE:
        return { ...state, success: false, successMsg: "" };
      case GET_ERROR_SHOW:
        return { ...state, error: true, errorMsg: action.payload, loading: state.loading >=1 ? state.loading-1 : 0};
      case GET_ERROR_HIDE:
        return { ...state, error: false, errorMsg: "" };
      case GET_ALERT_SHOW:
        return { ...state, alerts: true, alertMsg: action.payload};
      case GET_ALERT_HIDE:
        return { ...state, alert: false, alertMsg: "" };
      case GET_LOADING_SHOW:
        return { ...state, loading: state.loading >=0 ? state.loading+1 : 1, loadingMessage: action.payload?action.payload:null};
      case GET_LOADING_HIDE:
        return { ...state, loading: state.loading >=1 ? state.loading-1 : 0, loadingMessage: null };
      default:
        return state;
    }
  };