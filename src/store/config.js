import { combineReducers, createStore } from "redux";
import { cinemaReducer } from "./reducers/cinemaReducer";
import { userReducer } from "./reducers/userReducer";

const rootReducer = combineReducers({
  userReducer: userReducer,
  cinemaReducer: cinemaReducer,
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
