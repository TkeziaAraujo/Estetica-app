import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      const storedUser = await AsyncStorage.getItem('@EsteticaApp:user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } finally {
      setLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', response.user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        await AsyncStorage.setItem('@EsteticaApp:user', JSON.stringify(userData));
        setUser(userData);
      }
    } catch (error) {
      throw error;
    }
  }

  async function signOut() {
    await firebaseSignOut(auth);
    await AsyncStorage.removeItem('@EsteticaApp:user');
    setUser(null);
  }

  async function signUp(name: string, email: string, password: string) {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      
      const userData: User = {
        id: response.user.uid,
        name,
        email,
        role: 'client',
      };

      await setDoc(doc(db, 'users', response.user.uid), userData);
      await AsyncStorage.setItem('@EsteticaApp:user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 