import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BookingModal } from '../components/booking/BookingModal';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { FlightsList } from '../components/dashboard/FlightsList';
import flightsData from '../data/data.json';
import { loadBookings } from '../store/actions/bookingActions';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import { openBookingModal } from '../store/slices/bookingSlice';
import { theme } from '../themes';
import { Flight } from '../types';

export default function DashboardScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isOtpVerified } = useAppSelector((state) => state.auth);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!isOtpVerified || !user) {
      router.replace('/login');
      return;
    }
    loadFlights();
    dispatch(loadBookings());
  }, [isOtpVerified, user, dispatch]);

  const loadFlights = () => {
    try {
      setFlights(flightsData.flights);
    } catch (error) {
      console.error('Error loading flights:', error);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadFlights();
      setRefreshing(false);
    }, 500);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.replace('/login');
  };

  const handleFlightPress = (flight: Flight) => {
    dispatch(openBookingModal(flight));
  };

  return (
    <View style={styles.container}>
      <DashboardHeader
        phoneNumber={user?.phoneNumber}
        onLogout={handleLogout}
      />
      <FlightsList
        flights={flights}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onFlightPress={handleFlightPress}
      />
      <BookingModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundLight,
  },
});