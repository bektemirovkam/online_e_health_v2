import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { appReducer } from "./reducers/app";
import { hospitalsReducer } from "./reducers/hospitals";
import { appointmentReducer } from "./reducers/appointment";

const rootReducer = combineReducers({
  app: appReducer,
  hospitals: hospitalsReducer,
  appointment: appointmentReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>;

export default createStore(rootReducer, applyMiddleware(thunk));
