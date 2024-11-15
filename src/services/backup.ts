import { FirebaseService } from './api/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BackupService = {
  async createBackup() {
    const data = {
      clients: await FirebaseService.getClients(),
      appointments: await FirebaseService.getAppointments(),
      services: await FirebaseService.getServices(),
    };

    await AsyncStorage.setItem('@Backup:data', JSON.stringify(data));
    return data;
  },

  async restoreBackup() {
    const backup = await AsyncStorage.getItem('@Backup:data');
    if (backup) {
      const data = JSON.parse(backup);
      // Implementar restauração
    }
  }
}; 