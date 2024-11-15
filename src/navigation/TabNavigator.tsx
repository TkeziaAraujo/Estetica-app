import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppointmentScreen } from '../screens/appointments/AppointmentScreen';
import { ClientListScreen } from '../screens/clients/ClientListScreen';
import { FinancialScreen } from '../screens/financial/FinancialScreen';
import { ReportsScreen } from '../screens/reports/ReportsScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { useAuth } from '../contexts/AuthContext';
import { Permissions } from '../services/permissions';

const Tab = createBottomTabNavigator();

export const TabNavigator: React.FC = () => {
  const { user } = useAuth();

  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Agenda" 
        component={AppointmentScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Clientes" 
        component={ClientListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-group" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Financeiro" 
        component={FinancialScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cash" color={color} size={size} />
          ),
        }}
      />
      {Permissions.canViewReports(user) && (
        <Tab.Screen 
          name="Relatórios" 
          component={ReportsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="chart-bar" color={color} size={size} />
            ),
          }}
        />
      )}
      <Tab.Screen 
        name="Configurações" 
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}; 