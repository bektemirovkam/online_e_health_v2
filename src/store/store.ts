import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { appReducer } from "./reducers/app";
import { hospitalsReducer } from "./reducers/hospitals";
import { appointmentReducer } from "./reducers/appointment";
import { sickListReducer } from "./reducers/sickList";

const rootReducer = combineReducers({
  sickList: sickListReducer,
  app: appReducer,
  hospitals: hospitalsReducer,
  appointment: appointmentReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>;

export default createStore(rootReducer, applyMiddleware(thunk));
