import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Tokens, User } from '../types/Login';

interface UserContextType {
  user: User | null;
  token: Tokens | null;
  setToken: (user: Tokens | null) => void;
  setUser: (user: User | null) => void;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<Tokens | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('tokens');
      if (user) {
        setUser(JSON.parse(user));
      }
      if (token) {
        setToken(JSON.parse(token));
      }
      setLoading(false); // <-- Mark loading as complete
    };

    loadData();
  }, []);
  return (
    <UserContext.Provider value={{ user, token, setUser, setToken, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
