import { combineReducers } from "redux";

import counterReducer from "./counter/reducer";
import videoReducer from "./video/reducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  video: videoReducer
});

export default rootReducer;
