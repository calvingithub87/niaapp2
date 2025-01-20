import {GET_USERS_REQUEST,GET_USERS_SUCCESS,GET_USERS_FAIL, GET_USER_DATA_BY_EMAIL_SUCCESS, LOGOUT_USER, SET_UT} from "../constants/userConstants";
  export const userReducer = (state={userInfo: {}}, action) => {
    switch (action.type) {
      case GET_USERS_REQUEST:
        return { loading: true, userInfo: {} };
  
      case GET_USERS_SUCCESS:
        return { loading: false, userInfo: action.payload };
  
      case GET_USERS_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };


  export const userDataByEmail = (state = { authList: [], userInfo:{} }, action) => {
    switch (action.type) {
      case GET_USER_DATA_BY_EMAIL_SUCCESS:{
        const authList = action.payload.roles.reduce((list, item)=>{
          list.push(item.role_code)
          return list
        },[])
        return { ...state, authList, userInfo: {email: action.payload.email, userId: action.payload.userId, username: action.payload.username }};
      };
      case LOGOUT_USER:{
        return { ...state, authList:[], userInfo: {}, ut:null };
      };
      case SET_UT:{
        return {...state, ut: action.payload}
      }
      default:
        return state;
    }
  };