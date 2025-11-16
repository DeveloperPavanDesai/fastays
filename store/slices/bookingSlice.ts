import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Flight } from '../../types';

export interface PassengerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  passportNumber?: string;
}

export interface Booking {
  id: string;
  flight: Flight;
  passenger: PassengerInfo;
  bookingDate: string;
  bookingNumber: string;
  termsAccepted: boolean;
}

export interface BookingState {
  selectedFlight: Flight | null;
  isModalOpen: boolean;
  isBookingConfirmed: boolean;
  currentBooking: Booking | null;
  bookings: Booking[];
  isLoading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  selectedFlight: null,
  isModalOpen: false,
  isBookingConfirmed: false,
  currentBooking: null,
  bookings: [],
  isLoading: false,
  error: null,
};

// Storage helper for React Native using AsyncStorage
const STORAGE_KEY = 'bookings';

const loadBookingsFromStorage = async (): Promise<Booking[]> => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return [];
  } catch (error) {
    console.error('Error loading bookings from storage:', error);
    return [];
  }
};

const saveBookingsToStorage = async (bookings: Booking[]): Promise<void> => {
  try {
    const data = JSON.stringify(bookings);
    await AsyncStorage.setItem(STORAGE_KEY, data);
  } catch (error) {
    console.error('Error saving bookings to storage:', error);
  }
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    openBookingModal: (state, action: PayloadAction<Flight>) => {
      state.selectedFlight = action.payload;
      state.isModalOpen = true;
      state.isBookingConfirmed = false;
      state.error = null;
    },
    closeBookingModal: (state) => {
      state.isModalOpen = false;
      state.selectedFlight = null;
      state.isBookingConfirmed = false;
      state.currentBooking = null;
      state.error = null;
    },
    submitBookingStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    submitBookingSuccess: (state, action: PayloadAction<Booking>) => {
      state.isLoading = false;
      state.currentBooking = action.payload;
      state.isBookingConfirmed = true;
      state.bookings.push(action.payload);
      // Save asynchronously (don't await)
      saveBookingsToStorage(state.bookings).catch((err) => {
        console.error('Failed to save booking:', err);
      });
    },
    submitBookingFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearBookingConfirmation: (state) => {
      state.isBookingConfirmed = false;
      state.currentBooking = null;
      state.selectedFlight = null;
      state.isModalOpen = false;
    },
    setBookings: (state, action: PayloadAction<Booking[]>) => {
      state.bookings = action.payload;
    },
  },
});

export const {
  openBookingModal,
  closeBookingModal,
  submitBookingStart,
  submitBookingSuccess,
  submitBookingFailure,
  clearBookingConfirmation,
  setBookings,
} = bookingSlice.actions;

export { loadBookingsFromStorage };

export default bookingSlice.reducer;