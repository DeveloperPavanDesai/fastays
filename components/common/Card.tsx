import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { theme } from '../../themes';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  shadow?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, style, shadow = true }) => {
  return (
    <View style={[styles.card, shadow && theme.shadows.lg, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
});