import { combineReducers } from "redux";

import counterReducer from "./counter/reducer";
import videoReducer from "./video/reducer";
import modalReducer from "./modal/reducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  video: videoReducer,
  modal: modalReducer
});

export default rootReducer;
