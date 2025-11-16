import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';
import { theme } from '../../themes';
import { Button } from '../common/Button';

interface BookingConfirmationProps {
  onContinue: () => void;
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  onContinue,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { currentBooking } = useAppSelector((state) => state.booking);

  const handleLogout = () => {
    dispatch(logout());
    router.replace('/login');
  };

  if (!currentBooking) return null;

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <Ionicons name="checkmark-circle" size={80} color={theme.colors.success} />
        </View>
      </View>

      <Text style={styles.title}>Booking Confirmed!</Text>
      <Text style={styles.subtitle}>
        Your flight has been successfully booked
      </Text>

      <View style={styles.bookingDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Booking Number:</Text>
          <Text style={styles.detailValue}>{currentBooking.bookingNumber}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Flight:</Text>
          <Text style={styles.detailValue}>
            {currentBooking.flight.airline} {currentBooking.flight.flightNumber}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Route:</Text>
          <Text style={styles.detailValue}>
            {currentBooking.flight.departure.airport} → {currentBooking.flight.arrival.airport}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Passenger:</Text>
          <Text style={styles.detailValue}>
            {currentBooking.passenger.firstName} {currentBooking.passenger.lastName}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Total Amount:</Text>
          <Text style={styles.detailValue}>
            {currentBooking.flight.currency} {currentBooking.flight.price.toLocaleString()}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Continue Browsing"
          onPress={onContinue}
          style={styles.button}
        />
        <Button
          title="Logout"
          onPress={handleLogout}
          variant="outline"
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  iconContainer: {
    marginBottom: theme.spacing.lg,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.success + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: theme.fontSizes.xxxl,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textDark,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
  },
  bookingDetails: {
    width: '100%',
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  detailLabel: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.textSecondary,
    flex: 1,
  },
  detailValue: {
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textDark,
    flex: 1,
    textAlign: 'right',
  },
  buttonContainer: {
    width: '100%',
    gap: theme.spacing.md,
  },
  button: {
    width: '100%',
  },
});