import AsyncStorage from '@react-native-async-storage/async-storage';
import { FirebaseService } from './api/firebase';
import NetInfo from '@react-native-community/netinfo';

export const SyncService = {
  async syncOfflineData() {
    const isConnected = await NetInfo.fetch();
    
    if (!isConnected.isConnected) {
      return;
    }

    const offlineActions = await AsyncStorage.getItem('@OfflineActions');
    if (offlineActions) {
      const actions = JSON.parse(offlineActions);
      
      for (const action of actions) {
        try {
          await this.processOfflineAction(action);
        } catch (error) {
          console.error('Error syncing offline action:', error);
        }
      }

      await AsyncStorage.removeItem('@OfflineActions');
    }
  },

  async processOfflineAction(action: any) {
    switch (action.type) {
      case 'ADD_APPOINTMENT':
        await FirebaseService.addAppointment(action.data);
        break;
      case 'UPDATE_CLIENT':
        await FirebaseService.updateClient(action.data);
        break;
      // Adicione outros casos conforme necessário
    }
  },

  async addOfflineAction(action: any) {
    const currentActions = await AsyncStorage.getItem('@OfflineActions');
    const actions = currentActions ? JSON.parse(currentActions) : [];
    actions.push(action);
    await AsyncStorage.setItem('@OfflineActions', JSON.stringify(actions));
  }
}; 