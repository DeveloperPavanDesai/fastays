export interface User {
  id: string;
  phoneNumber: string;
  isAuthenticated: boolean;
}

export interface AuthState {
  user: User | null;
  phoneNumber: string;
  otp: string;
  isLoading: boolean;
  error: string | null;
  isOtpVerified: boolean;
}

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: {
    airport: string;
    city: string;
    time: string;
    date: string;
  };
  arrival: {
    airport: string;
    city: string;
    time: string;
    date: string;
  };
  duration: string;
  price: number;
  currency: string;
  stops: number;
  class: string;
}

export interface RootState {
  auth: AuthState;
  booking: import('../store/slices/bookingSlice').BookingState;
}
