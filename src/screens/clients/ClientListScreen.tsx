import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { List, FAB, Searchbar } from 'react-native-paper';
import { Client } from '../../types';

export const ClientListScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [clients, setClients] = React.useState<Client[]>([]);

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Buscar cliente"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <FlatList
        data={clients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            description={item.phone}
            onPress={() => {
              // Navegação para detalhes do cliente
            }}
          />
        )}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {
          // Navegação para criar cliente
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