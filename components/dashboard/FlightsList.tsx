import React from 'react';
import {
    FlatList,
    RefreshControl,
    StyleSheet,
    View,
} from 'react-native';
import { theme } from '../../themes';
import { Flight } from '../../types';
import { FlightCard } from '../flights/FlightCard';
import { EmptyState } from './EmptyState';

interface FlightsListProps {
  flights: Flight[];
  refreshing: boolean;
  onRefresh: () => void;
  onFlightPress?: (flight: Flight) => void;
}

export const FlightsList: React.FC<FlightsListProps> = ({
  flights,
  refreshing,
  onRefresh,
  onFlightPress,
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={flights}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FlightCard flight={item} onPress={onFlightPress} />
        )}
        ListEmptyComponent={<EmptyState />}
        contentContainerStyle={[
          styles.listContent,
          flights.length === 0 && styles.emptyListContent,
        ]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
  },
  emptyListContent: {
    flexGrow: 1,
  },
});