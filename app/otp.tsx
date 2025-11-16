import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { OtpInput } from '../components/forms/OtpInput';
import { OTP_CONFIG } from '../constants';
import { verifyOtp } from '../store/actions/authActions';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setOtp } from '../store/slices/authSlice';
import { theme } from '../themes';

export default function OtpScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { phoneNumber, isLoading, error, isOtpVerified } = useAppSelector(
    (state) => state.auth
  );

  const [otp, setLocalOtp] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (isOtpVerified) {
      router.replace('/dashboard');
    }
  }, [isOtpVerified, router]);

  useEffect(() => {
    if (!phoneNumber) {
      router.replace('/login');
    }
  }, [phoneNumber, router]);

  const handleOtpComplete = (enteredOtp: string) => {
    setLocalOtp(enteredOtp);
    setLocalError(null);
    dispatch(setOtp(enteredOtp));
    
    if (enteredOtp.length === OTP_CONFIG.OTP_LENGTH && phoneNumber) {
      dispatch(verifyOtp(phoneNumber, enteredOtp));
    }
  };

  const handleResend = () => {
    setLocalError(null);
    setLocalOtp('');
  };

  const displayError = localError || error;
  const maskedPhone = phoneNumber
    ? `${phoneNumber.slice(0, 2)}****${phoneNumber.slice(-2)}`
    : '';

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.headerBackground} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.iconWrapper}>
              <View style={styles.iconInnerCircle}>
                <Ionicons name="lock-closed" size={56} color={theme.colors.primary} />
              </View>
            </View>
            <Text style={styles.title}>Enter OTP</Text>
            <Text style={styles.subtitle}>
              Code sent to {maskedPhone}
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.form}>
              <View style={styles.otpContainer}>
                <OtpInput
                  onComplete={handleOtpComplete}
                  error={displayError || undefined}
                />
              </View>

              {displayError && (
                <View style={styles.errorContainer}>
                  <Ionicons name="alert-circle-outline" size={18} color={theme.colors.error} />
                  <Text style={styles.errorText}>{displayError}</Text>
                </View>
              )}

              {isLoading && (
                <View style={styles.loadingContainer}>
                  <Text style={styles.loadingText}>Verifying...</Text>
                </View>
              )}

              <View style={styles.resendContainer}>
                <Text style={styles.resendText}>Didn't receive code? </Text>
                <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
                  <Text style={styles.resendLink}>Resend</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundLight,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 280,
    backgroundColor: theme.colors.primary,
    borderBottomLeftRadius: theme.borderRadius.xl * 2,
    borderBottomRightRadius: theme.borderRadius.xl * 2,
    ...theme.shadows.lg,
  },
  scrollContent: {
    flexGrow: 1,
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xxl,
  },
  content: {
    width: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    marginTop: theme.spacing.lg,
  },
  iconWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
    ...theme.shadows.md,
  },
  iconInnerCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.sm,
  },
  title: {
    fontSize: theme.fontSizes.xxxl,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.textLight,
    opacity: 0.9,
    textAlign: 'center',
  },
  formContainer: {
    marginTop: theme.spacing.lg,
  },
  form: {
    width: '100%',
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    ...theme.shadows.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  otpContainer: {
    marginBottom: theme.spacing.lg,
    alignItems: 'center',
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
    fontWeight: theme.fontWeights.medium,
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  loadingText: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.medium,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.xl,
  },
  resendText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.textSecondary,
  },
  resendLink: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
    marginLeft: theme.spacing.xs,
  },
});