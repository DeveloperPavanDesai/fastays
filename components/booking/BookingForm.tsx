import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { submitBooking } from '../../store/actions/bookingActions';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { PassengerInfo } from '../../store/slices/bookingSlice';
import { theme } from '../../themes';
import { Flight } from '../../types';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

interface BookingFormProps {
  flight: Flight;
}

export const BookingForm: React.FC<BookingFormProps> = ({ flight }) => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.booking);

  const [passenger, setPassenger] = useState<PassengerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    passportNumber: '',
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<PassengerInfo>>({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const validateForm = (): boolean => {
    const errors: Partial<PassengerInfo> = {};

    if (!passenger.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!passenger.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    if (!passenger.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(passenger.email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!passenger.phone.trim()) {
      errors.phone = 'Phone number is required';
    }
    if (!passenger.dateOfBirth.trim()) {
      errors.dateOfBirth = 'Date of birth is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    if (!termsAccepted) {
      return;
    }

    dispatch(submitBooking(flight, passenger, termsAccepted));
  };

  return (
    <View style={styles.container} testID="booking-form">
      {/* Flight Summary */}
      <View style={styles.flightSummary}>
        <View style={styles.flightHeader}>
          <Ionicons name="airplane" size={20} color={theme.colors.primary} />
          <Text style={styles.flightTitle}>Flight Details</Text>
        </View>
        <View style={styles.flightInfo}>
          <View style={styles.flightRow}>
            <Text style={styles.flightLabel}>Airline:</Text>
            <Text style={styles.flightValue}>{flight.airline}</Text>
          </View>
          <View style={styles.flightRow}>
            <Text style={styles.flightLabel}>Flight:</Text>
            <Text style={styles.flightValue}>{flight.flightNumber}</Text>
          </View>
          <View style={styles.flightRow}>
            <Text style={styles.flightLabel}>Route:</Text>
            <Text style={styles.flightValue}>
              {flight.departure.airport} → {flight.arrival.airport}
            </Text>
          </View>
          <View style={styles.flightRow}>
            <Text style={styles.flightLabel}>Date:</Text>
            <Text style={styles.flightValue}>{flight.departure.date}</Text>
          </View>
          <View style={styles.flightRow}>
            <Text style={styles.flightLabel}>Price:</Text>
            <Text style={styles.flightValue}>
              {flight.currency} {flight.price.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>

      {/* Passenger Information */}
      <Text style={styles.sectionTitle}>Passenger Information</Text>

      <Input
        label="First Name *"
        placeholder="Enter first name"
        value={passenger.firstName}
        onChangeText={(text) => {
          setPassenger({ ...passenger, firstName: text });
          setFormErrors({ ...formErrors, firstName: undefined });
        }}
        error={formErrors.firstName}
        leftIcon={
          <Ionicons name="person-outline" size={20} color={theme.colors.textSecondary} />
        }
      />

      <Input
        label="Last Name *"
        placeholder="Enter last name"
        value={passenger.lastName}
        onChangeText={(text) => {
          setPassenger({ ...passenger, lastName: text });
          setFormErrors({ ...formErrors, lastName: undefined });
        }}
        error={formErrors.lastName}
        leftIcon={
          <Ionicons name="person-outline" size={20} color={theme.colors.textSecondary} />
        }
      />

      <Input
        label="Email *"
        placeholder="Enter email address"
        value={passenger.email}
        onChangeText={(text) => {
          setPassenger({ ...passenger, email: text });
          setFormErrors({ ...formErrors, email: undefined });
        }}
        keyboardType="email-address"
        autoCapitalize="none"
        error={formErrors.email}
        leftIcon={
          <Ionicons name="mail-outline" size={20} color={theme.colors.textSecondary} />
        }
      />

      <Input
        label="Phone Number *"
        placeholder="Enter phone number"
        value={passenger.phone}
        onChangeText={(text) => {
          setPassenger({ ...passenger, phone: text });
          setFormErrors({ ...formErrors, phone: undefined });
        }}
        keyboardType="phone-pad"
        error={formErrors.phone}
        leftIcon={
          <Ionicons name="call-outline" size={20} color={theme.colors.textSecondary} />
        }
      />

      <View style={styles.dateContainer}>
        <Text style={styles.dateLabel}>Date of Birth *</Text>
        <TouchableOpacity
          style={[styles.dateInput, formErrors.dateOfBirth && styles.dateInputError]}
          onPress={() => setShowDatePicker(true)}
          activeOpacity={0.7}
        >
          <Ionicons name="calendar-outline" size={20} color={theme.colors.textSecondary} />
          <Text style={[styles.dateText, !passenger.dateOfBirth && styles.datePlaceholder]}>
            {passenger.dateOfBirth || 'Select date of birth'}
          </Text>
        </TouchableOpacity>
        {formErrors.dateOfBirth && (
          <Text style={styles.dateErrorText}>{formErrors.dateOfBirth}</Text>
        )}
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, date) => {
              setShowDatePicker(Platform.OS === 'ios');
              if (date) {
                setSelectedDate(date);
                const formattedDate = date.toISOString().split('T')[0];
                setPassenger({ ...passenger, dateOfBirth: formattedDate });
                setFormErrors({ ...formErrors, dateOfBirth: undefined });
              }
            }}
            maximumDate={new Date()}
            minimumDate={new Date(1900, 0, 1)}
          />
        )}
      </View>

      <Input
        label="Passport Number (Optional)"
        placeholder="Enter passport number"
        value={passenger.passportNumber || ''}
        onChangeText={(text) => setPassenger({ ...passenger, passportNumber: text })}
        leftIcon={
          <Ionicons name="document-text-outline" size={20} color={theme.colors.textSecondary} />
        }
      />

      {/* Terms and Conditions */}
      <View style={styles.termsContainer}>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setTermsAccepted(!termsAccepted)}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}>
            {termsAccepted && (
              <Ionicons name="checkmark" size={16} color={theme.colors.textLight} />
            )}
          </View>
          <Text style={styles.termsText}>
            I accept the terms and conditions *
          </Text>
        </TouchableOpacity>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={18} color={theme.colors.error} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <Button
        title="Confirm Booking"
        onPress={handleSubmit}
        loading={isLoading}
        disabled={isLoading || !termsAccepted}
        style={styles.submitButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  flightSummary: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  flightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  flightTitle: {
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textDark,
    marginLeft: theme.spacing.xs,
  },
  flightInfo: {
    gap: theme.spacing.xs,
  },
  flightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flightLabel: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.textSecondary,
  },
  flightValue: {
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.medium,
    color: theme.colors.textDark,
  },
  sectionTitle: {
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textDark,
    marginBottom: theme.spacing.md,
  },
  termsContainer: {
    marginVertical: theme.spacing.lg,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
    marginRight: theme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  checkboxChecked: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  termsText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.textDark,
    flex: 1,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.error + '10',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
  },
  errorText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.error,
    marginLeft: theme.spacing.xs,
    flex: 1,
  },
  submitButton: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  dateContainer: {
    marginBottom: theme.spacing.md,
  },
  dateLabel: {
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.medium,
    color: theme.colors.textDark,
    marginBottom: theme.spacing.xs,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
  },
  dateInputError: {
    borderColor: theme.colors.error,
  },
  dateText: {
    flex: 1,
    fontSize: theme.fontSizes.md,
    color: theme.colors.textDark,
    marginLeft: theme.spacing.md,
    fontFamily: theme.fonts.regular,
  },
  datePlaceholder: {
    color: theme.colors.textSecondary,
  },
  dateErrorText: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
  },
});