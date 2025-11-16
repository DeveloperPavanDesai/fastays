import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../../themes';
import { Flight } from '../../types';
import { Card } from '../common/Card';

interface FlightCardProps {
  flight: Flight;
  onPress?: (flight: Flight) => void;
}

export const FlightCard: React.FC<FlightCardProps> = ({ flight, onPress }) => {
  const handlePress = () => {
    if (onPress) {
      onPress(flight);
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <View style={styles.airlineContainer}>
            <View style={styles.airlineBadge}>
              <Ionicons name="airplane" size={16} color={theme.colors.primary} />
              <Text style={styles.airline}>{flight.airline}</Text>
            </View>
            <Text style={styles.flightNumber}>{flight.flightNumber}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              {flight.currency} {flight.price.toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={styles.route}>
          <View style={styles.departure}>
            <Text style={styles.time}>{flight.departure.time}</Text>
            <Text style={styles.airport}>{flight.departure.airport}</Text>
            <Text style={styles.city}>{flight.departure.city}</Text>
          </View>

          <View style={styles.durationContainer}>
            <View style={styles.durationLineContainer}>
              <View style={styles.durationLine} />
              <View style={styles.airplaneIconContainer}>
                <Ionicons
                  name="airplane"
                  size={18}
                  color={theme.colors.primary}
                  style={styles.airplaneIcon}
                />
              </View>
            </View>
            <Text style={styles.duration}>{flight.duration}</Text>
            {flight.stops > 0 && (
              <View style={styles.stopsBadge}>
                <Text style={styles.stops}>
                  {flight.stops} stop{flight.stops > 1 ? 's' : ''}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.arrival}>
            <Text style={styles.time}>{flight.arrival.time}</Text>
            <Text style={styles.airport}>{flight.arrival.airport}</Text>
            <Text style={styles.city}>{flight.arrival.city}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.classBadge}>
            <Ionicons name="star-outline" size={14} color={theme.colors.textSecondary} />
            <Text style={styles.class}>{flight.class}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Ionicons name="calendar-outline" size={14} color={theme.colors.textSecondary} />
            <Text style={styles.date}>{flight.departure.date}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
  },
  airlineContainer: {
    flex: 1,
  },
  airlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  airline: {
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textDark,
    marginLeft: theme.spacing.xs,
  },
  flightNumber: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: theme.fontSizes.xxl,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.primary,
  },
  route: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  departure: {
    flex: 1,
    alignItems: 'flex-start',
  },
  arrival: {
    flex: 1,
    alignItems: 'flex-end',
  },
  time: {
    fontSize: theme.fontSizes.xxl,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textDark,
    marginBottom: theme.spacing.xs,
  },
  airport: {
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textDark,
    marginBottom: theme.spacing.xs,
  },
  city: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.textSecondary,
  },
  durationContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
    minHeight: 80,
    justifyContent: 'center',
  },
  durationLineContainer: {
    width: '100%',
    position: 'relative',
    marginBottom: theme.spacing.xs,
  },
  durationLine: {
    width: '100%',
    height: 2,
    backgroundColor: theme.colors.borderLight,
  },
  airplaneIconContainer: {
    position: 'absolute',
    left: '50%',
    top: -9,
    transform: [{ translateX: -9 }],
    backgroundColor: theme.colors.backgroundLight,
    padding: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
  },
  airplaneIcon: {
    transform: [{ rotate: '90deg' }],
  },
  duration: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeights.medium,
    marginTop: theme.spacing.xs,
  },
  stopsBadge: {
    backgroundColor: theme.colors.warning + '20',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    marginTop: theme.spacing.xs,
  },
  stops: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.warning,
    fontWeight: theme.fontWeights.medium,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
  },
  classBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundSecondary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
  },
  class: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
    fontWeight: theme.fontWeights.medium,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
    fontWeight: theme.fontWeights.medium,
  },
});

