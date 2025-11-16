import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../types';

const initialState: AuthState = {
  user: null,
  phoneNumber: '',
  otp: '',
  isLoading: false,
  error: null,
  isOtpVerified: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
      state.error = null;
    },
    setOtp: (state, action: PayloadAction<string>) => {
      state.otp = action.payload;
      state.error = null;
    },
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.phoneNumber = action.payload;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    verifyOtpStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    verifyOtpSuccess: (state, action: PayloadAction<{ phoneNumber: string; otp: string }>) => {
      state.isLoading = false;
      state.isOtpVerified = true;
      state.user = {
        id: Date.now().toString(),
        phoneNumber: action.payload.phoneNumber,
        isAuthenticated: true,
      };
      state.error = null;
    },
    verifyOtpFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isOtpVerified = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.phoneNumber = '';
      state.otp = '';
      state.isOtpVerified = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setPhoneNumber,
  setOtp,
  loginStart,
  loginSuccess,
  loginFailure,
  verifyOtpStart,
  verifyOtpSuccess,
  verifyOtpFailure,
  logout,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;