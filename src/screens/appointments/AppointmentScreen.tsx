import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, FAB } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';

export const AppointmentScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => {
          // Lógica para selecionar dia
        }}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {
          // Navegação para criar agendamento
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
}); 