import { Flight } from '../../types';
import {
    Booking,
    loadBookingsFromStorage,
    PassengerInfo,
    setBookings,
    submitBookingFailure,
    submitBookingStart,
    submitBookingSuccess,
} from '../slices/bookingSlice';
import { AppDispatch } from '../store';

const generateBookingNumber = (): string => {
  return 'BK' + Date.now().toString().slice(-8) + Math.random().toString(36).substring(2, 6).toUpperCase();
};

export const submitBooking = (flight: Flight, passenger: PassengerInfo, termsAccepted: boolean) => {
  return async (dispatch: AppDispatch) => {
    dispatch(submitBookingStart());
    
    try {
      // Simulate API call - reduced delay for fast response
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      if (!termsAccepted) {
        dispatch(submitBookingFailure('Please accept the terms and conditions'));
        return;
      }
      
      const booking: Booking = {
        id: Date.now().toString(),
        flight,
        passenger,
        bookingDate: new Date().toISOString(),
        bookingNumber: generateBookingNumber(),
        termsAccepted,
      };
      
      dispatch(submitBookingSuccess(booking));
    } catch (error) {
      dispatch(submitBookingFailure('Booking failed. Please try again.'));
    }
  };
};

export const loadBookings = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const bookings = await loadBookingsFromStorage();
      dispatch(setBookings(bookings));
    } catch (error) {
      console.error('Error loading bookings:', error);
    }
  };
};