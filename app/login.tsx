import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { OTP_CONFIG } from '../constants';
import { loginWithPhone } from '../store/actions/authActions';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setPhoneNumber } from '../store/slices/authSlice';
import { theme } from '../themes';
import { formatPhoneNumber, validatePhoneNumber } from '../utils/helpers';

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { phoneNumber, isLoading, error } = useAppSelector((state) => state.auth);
  
  const [localPhone, setLocalPhone] = useState(phoneNumber || '');
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (phoneNumber && !isLoading && !error && phoneNumber === OTP_CONFIG.PHONE_NUMBER) {
      router.push('/otp');
    }
  }, [phoneNumber, isLoading, error, router]);

  const handlePhoneChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setLocalPhone(formatted);
    setLocalError(null);
    dispatch(setPhoneNumber(formatted.replace(/\s+/g, '')));
  };

  const handleLogin = () => {
    const cleanedPhone = localPhone.replace(/\s+/g, '');
    
    if (!cleanedPhone) {
      setLocalError('Phone number is required');
      return;
    }

    if (!validatePhoneNumber(cleanedPhone)) {
      setLocalError('Please enter a valid phone number');
      return;
    }

    dispatch(loginWithPhone(cleanedPhone));
  };

  const displayError = localError || error;

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
          <View style={styles.logoContainer}>
            <View style={styles.iconWrapper}>
              <View style={styles.iconInnerCircle}>
                <Ionicons name="airplane" size={64} color={theme.colors.primary} />
              </View>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.form}>
              <Text style={styles.formTitle}>Welcome Back</Text>
              <Text style={styles.formSubtitle}>Enter your phone number to continue</Text>
              
              <Input
                label="Phone Number"
                placeholder="Enter your phone number"
                value={localPhone}
                onChangeText={handlePhoneChange}
                keyboardType="phone-pad"
                maxLength={15}
                error={displayError || undefined}
                leftIcon={
                  <Ionicons name="call-outline" size={20} color={theme.colors.primary} />
                }
                containerStyle={styles.inputContainer}
              />

              <View style={styles.hintContainer}>
                <Ionicons name="information-circle-outline" size={16} color={theme.colors.textSecondary} />
                <Text style={styles.hint}>
                  Use {OTP_CONFIG.PHONE_NUMBER} for demo
                </Text>
              </View>

              <Button
                title="Continue"
                onPress={handleLogin}
                loading={isLoading}
                disabled={isLoading}
                style={styles.button}
              />
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
    height: 300,
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    marginTop: theme.spacing.xxl,
  },
  iconWrapper: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: theme.colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.md,
  },
  iconInnerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.sm,
  },
  formContainer: {
    marginTop: theme.spacing.xl,
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
  formTitle: {
    fontSize: theme.fontSizes.xxl,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textDark,
    marginBottom: theme.spacing.xs,
  },
  formSubtitle: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
  },
  inputContainer: {
    marginBottom: theme.spacing.md,
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.backgroundSecondary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.lg,
  },
  hint: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
    fontWeight: theme.fontWeights.medium,
  },
  button: {
    marginTop: theme.spacing.sm,
  },
});