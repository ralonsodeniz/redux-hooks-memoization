import { combineReducers } from "redux";

import counterReducer from "./counter/reducer";
import videoReducer from "./video/reducer";
import modalReducer from "./modal/reducer";
import userReducer from "./user/reducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  video: videoReducer,
  modal: modalReducer,
  user: userReducer
});

export default rootReducer;
