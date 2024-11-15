import { db } from '../../config/firebase';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc,
  doc,
  deleteDoc 
} from 'firebase/firestore';
import { Client, Appointment, Service, Transaction } from '../../types';

export const FirebaseService = {
  // Clientes
  async getClients(): Promise<Client[]> {
    const clientsRef = collection(db, 'clients');
    const snapshot = await getDocs(clientsRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Client));
  },

  async addClient(client: Omit<Client, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'clients'), client);
    return docRef.id;
  },

  // Agendamentos
  async getAppointments(filters?: { 
    date?: Date, 
    clientId?: string,
    professionalId?: string 
  }): Promise<Appointment[]> {
    let appointmentsQuery = collection(db, 'appointments');
    
    if (filters?.date) {
      appointmentsQuery = query(
        appointmentsQuery, 
        where('date', '>=', filters.date),
        where('date', '<', new Date(filters.date.getTime() + 24*60*60*1000))
      );
    }

    const snapshot = await getDocs(appointmentsQuery);
    return snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data(),
      date: doc.data().date.toDate()
    } as Appointment));
  },

  // Serviços
  async getServices(): Promise<Service[]> {
    const servicesRef = collection(db, 'services');
    const snapshot = await getDocs(servicesRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
  },

  // Transações
  async addTransaction(transaction: Omit<Transaction, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'transactions'), transaction);
    return docRef.id;
  }
}; 