import { createSlice } from "@reduxjs/toolkit";

export interface AppointmentState {}

const initialState: AppointmentState = {};

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {},
});

export const {} = appointmentSlice.actions;

export default appointmentSlice.reducer;
