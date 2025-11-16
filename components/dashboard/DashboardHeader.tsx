import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../../themes';

interface DashboardHeaderProps {
  phoneNumber?: string;
  onLogout: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  phoneNumber,
  onLogout,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Welcome back! 👋</Text>
          <Text style={styles.phoneNumber}>{phoneNumber || 'User'}</Text>
        </View>
        <TouchableOpacity
          onPress={onLogout}
          style={styles.logoutButton}
          activeOpacity={0.7}
        >
          <Ionicons name="log-out-outline" size={24} color={theme.colors.textLight} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    borderBottomLeftRadius: theme.borderRadius.xl,
    borderBottomRightRadius: theme.borderRadius.xl,
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    ...theme.shadows.lg,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: theme.fontSizes.xxxl,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.xs,
  },
  phoneNumber: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.textLight,
    opacity: 0.9,
  },
  logoutButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});