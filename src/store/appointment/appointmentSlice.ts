import { createSlice } from "@reduxjs/toolkit";

export interface AppointmentState {}

const initialState: AppointmentState = {};

//TODO: метод для получения пациента по ИИН

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {},
});

export const {} = appointmentSlice.actions;

export default appointmentSlice.reducer;
