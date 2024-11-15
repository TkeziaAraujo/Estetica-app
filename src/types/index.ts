export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'professional' | 'client';
  phone?: string;
  profileImage?: string;
  createdAt: Date;
  settings?: UserSettings;
}

export interface UserSettings {
  notifications: boolean;
  theme: 'light' | 'dark';
  language: 'pt' | 'en';
}

export interface Appointment {
  id: string;
  clientId: string;
  professionalId: string;
  serviceId: string;
  date: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  price: number;
  notes?: string;
  duration: number;
  reminder?: boolean;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  notes?: string;
  history?: AppointmentHistory[];
  preferences?: ClientPreferences;
}

export interface AppointmentHistory {
  appointmentId: string;
  date: Date;
  serviceId: string;
  notes?: string;
  rating?: number;
}

export interface ClientPreferences {
  preferredProfessional?: string;
  allergies?: string[];
  observations?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  image?: string;
  active: boolean;
}

export interface Transaction {
  id: string;
  appointmentId?: string;
  type: 'income' | 'expense';
  amount: number;
  date: Date;
  description: string;
  category: string;
  paymentMethod: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface Report {
  id: string;
  type: 'daily' | 'monthly' | 'annual';
  date: Date;
  data: ReportData;
}

export interface ReportData {
  totalAppointments: number;
  revenue: number;
  expenses: number;
  profit: number;
  topServices: ServicePerformance[];
  clientSatisfaction: number;
}

export interface ServicePerformance {
  serviceId: string;
  count: number;
  revenue: number;
} 