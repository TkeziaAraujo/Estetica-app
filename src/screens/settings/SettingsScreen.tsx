import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { List, Switch, Divider } from 'react-native-paper';
import { useAuth } from '../../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SettingsScreen: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  const toggleNotifications = async () => {
    setNotifications(!notifications);
    await AsyncStorage.setItem('@Settings:notifications', String(!notifications));
  };

  const toggleDarkMode = async () => {
    setDarkMode(!darkMode);
    await AsyncStorage.setItem('@Settings:theme', !darkMode ? 'dark' : 'light');
  };

  return (
    <ScrollView style={styles.container}>
      <List.Section>
        <List.Subheader>Preferências</List.Subheader>
        <List.Item
          title="Notificações"
          right={() => <Switch value={notifications} onValueChange={toggleNotifications} />}
        />
        <List.Item
          title="Modo Escuro"
          right={() => <Switch value={darkMode} onValueChange={toggleDarkMode} />}
        />
      </List.Section>
      <Divider />
      <List.Section>
        <List.Subheader>Conta</List.Subheader>
        <List.Item
          title="Perfil"
          description={user?.email}
          left={props => <List.Icon {...props} icon="account" />}
        />
        <List.Item
          title="Alterar Senha"
          left={props => <List.Icon {...props} icon="key" />}
          onPress={() => {/* Implementar alteração de senha */ }}
        />
      </List.Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 