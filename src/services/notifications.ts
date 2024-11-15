import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

export async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    
    token = (await Notifications.getExpoPushTokenAsync()).data;
  }

  return token;
}

export async function scheduleAppointmentReminder(appointment: Appointment) {
  const trigger = new Date(appointment.date);
  trigger.setHours(trigger.getHours() - 1); // Notificar 1 hora antes

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Lembrete de Agendamento',
      body: `Você tem um agendamento em 1 hora`,
    },
    trigger,
  });
} 