
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'Admin' | 'Employé' | 'Client' | 'Manager';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Test accounts as specified in the requirements
export const TEST_ACCOUNTS = [
  {
    email: 'admin@djabaro.ci',
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@djabaro.ci',
      firstName: 'Admin',
      lastName: 'Djabaro',
      role: 'Admin' as const
    }
  },
  {
    email: 'employe@djabaro.ci',
    password: 'employe123',
    user: {
      id: '2',
      email: 'employe@djabaro.ci',
      firstName: 'Employé',
      lastName: 'Djabaro',
      role: 'Employé' as const
    }
  },
  {
    email: 'client@djabaro.ci',
    password: 'client123',
    user: {
      id: '3',
      email: 'client@djabaro.ci',
      firstName: 'Client',
      lastName: 'Djabaro',
      role: 'Client' as const
    }
  },
  {
    email: 'manager@djabaro.ci',
    password: 'manager123',
    user: {
      id: '4',
      email: 'manager@djabaro.ci',
      firstName: 'Manager',
      lastName: 'Djabaro',
      role: 'Manager' as const
    }
  }
];

export const authenticate = (email: string, password: string): User | null => {
  const account = TEST_ACCOUNTS.find(
    acc => acc.email === email && acc.password === password
  );
  return account ? account.user : null;
};

export const getStoredAuth = (): AuthState => {
  try {
    const stored = localStorage.getItem('djabaro_auth');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading stored auth:', error);
  }
  return { user: null, isAuthenticated: false };
};

export const storeAuth = (authState: AuthState): void => {
  try {
    localStorage.setItem('djabaro_auth', JSON.stringify(authState));
  } catch (error) {
    console.error('Error storing auth:', error);
  }
};

export const clearAuth = (): void => {
  try {
    localStorage.removeItem('djabaro_auth');
  } catch (error) {
    console.error('Error clearing auth:', error);
  }
};
