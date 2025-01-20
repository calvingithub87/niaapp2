import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { userReducer } from "./redux/reducers/userReducer";
import { commonReducer } from "./redux/reducers/commonReducer";

import { chatListReducer } from "./redux/reducers/chatListReducer";

const rootReducer = combineReducers({
  userList: userReducer,
  commonData: commonReducer,
  chatListData: chatListReducer,
});


const intialState = {
  userList: {
    id: 1,
    name: "User Name",
  },
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
