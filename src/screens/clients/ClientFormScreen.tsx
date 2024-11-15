import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Client } from '../../types';
import { FirebaseService } from '../../services/api/firebase';

export const ClientFormScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const handleSave = async () => {
    try {
      await FirebaseService.addClient({
        name,
        email,
        phone,
        birthDate: new Date(),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Nome"
        value={name}
        onChangeText={setName}
        mode="outlined"
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
      />
      <TextInput
        label="Telefone"
        value={phone}
        onChangeText={setPhone}
        mode="outlined"
      />
      <Button mode="contained" onPress={handleSave}>
        Salvar
      </Button>
    </View>
  );
}; 