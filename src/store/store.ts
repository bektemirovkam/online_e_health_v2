import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { appointmentApi } from "../services/AppointmentService";

import appointmentReducer from "./appointment/appointmentSlice";

const rootReducer = combineReducers({
  appointment: appointmentReducer,
  [appointmentApi.reducerPath]: appointmentApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(appointmentApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
