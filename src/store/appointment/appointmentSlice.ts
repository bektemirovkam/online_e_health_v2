import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IOrgInfoByAppointment, IUserData } from "./../../models/Appointment";
import { appointmentAPI } from "../../services/appointmentAPI";

export interface AppointmentState {
  userDataLoading: boolean;
  userDataError: null | string;
  userData: null | IUserData;

  orgsListLoading: boolean;
  orgsListError: null | string;
  orgsList: IOrgInfoByAppointment[];
}

const initialState: AppointmentState = {
  userDataLoading: false,
  userDataError: null,
  userData: null,

  orgsListLoading: false,
  orgsListError: null,
  orgsList: [],
};

export const fetchUserByIIN = createAsyncThunk(
  "users/fetchUserByIIN",
  async (IIN: string, thunkAPI) => {
    try {
      const userData = await appointmentAPI.GetPatientByIIN(IIN);

      if (
        userData.ErrorCode === 300 ||
        userData.ErrorCode === 200 ||
        userData.ErrorCode === 100
      ) {
        thunkAPI.rejectWithValue(userData.ErrorDesc);
      } else {
        return userData;
      }
    } catch (error) {
      thunkAPI.rejectWithValue("Не удалось загрузить данные о пациенте!");
    }
  }
);

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUserByIIN.pending.type]: (state) => {
      state.userDataLoading = true;
    },
    [fetchUserByIIN.rejected.type]: (state, action: PayloadAction<string>) => {
      console.log("fetchUserByIIN.rejected.type");
      state.userDataLoading = false;
      state.userDataError = action.payload;
    },
    [fetchUserByIIN.fulfilled.type]: (
      state,
      action: PayloadAction<IUserData>
    ) => {
      state.userDataLoading = false;
      state.userDataError = null;
      state.userData = action.payload;
    },
  },
});

export default appointmentSlice.reducer;
