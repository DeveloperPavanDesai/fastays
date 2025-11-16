export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  VERIFY_OTP: '/auth/verify-otp',
  FLIGHTS: '/flights',
} as const;

export const OTP_CONFIG = {
  PHONE_NUMBER: '9898989898',
  OTP_CODE: '1234',
  OTP_LENGTH: 4,
  OTP_EXPIRY: 300,
} as const;

export const SCREENS = {
  LOGIN: 'login',
  OTP: 'otp',
  DASHBOARD: 'dashboard',
} as const;

export const VALIDATION = {
  PHONE_MIN_LENGTH: 10,
  PHONE_MAX_LENGTH: 15,
  OTP_LENGTH: 4,
} as const;

export const STORAGE_KEYS = {
  USER_TOKEN: '@fastays:user_token',
  USER_DATA: '@fastays:user_data',
  PHONE_NUMBER: '@fastays:phone_number',
} as const;
