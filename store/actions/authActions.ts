import { OTP_CONFIG } from '../../constants';
import {
    loginFailure,
    loginStart,
    loginSuccess,
    verifyOtpFailure,
    verifyOtpStart,
    verifyOtpSuccess,
} from '../slices/authSlice';
import { AppDispatch } from '../store';

export const loginWithPhone = (phoneNumber: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(loginStart());
    try {       
      await new Promise((resolve) => setTimeout(resolve, 300));
      if (phoneNumber === OTP_CONFIG.PHONE_NUMBER) {
        dispatch(loginSuccess(phoneNumber));
      } else {
        dispatch(loginFailure('Invalid phone number. Please use ' + OTP_CONFIG.PHONE_NUMBER));
      }
    } catch (error) {
      dispatch(loginFailure('Login failed. Please try again.'));
    }
  };
};

export const verifyOtp = (phoneNumber: string, otp: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(verifyOtpStart());
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      if (otp === OTP_CONFIG.OTP_CODE) {
        dispatch(verifyOtpSuccess({ phoneNumber, otp }));
      } else {
        dispatch(verifyOtpFailure('Invalid OTP. Please enter ' + OTP_CONFIG.OTP_CODE));
      }
    } catch (error) {
      dispatch(verifyOtpFailure('OTP verification failed. Please try again.'));
    }
  };
};