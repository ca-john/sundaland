// src/AuthContext.tsx
import { FunctionComponent, ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Auth, Hub } from 'aws-amplify';

interface AuthContextType {
  user: any;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface Props {
  children: ReactNode; // Define the children prop
}


export const AuthProvider: FunctionComponent<Props> = ({ children }) => {
  
  const [user, setUser] = useState(null);

  const signIn = async (username: string, password: string) => {
    try {
      await Auth.signIn(username, password);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    const updateUser = async () => {
      try {
        const authUser = await Auth.currentAuthenticatedUser();
        setUser(authUser);
      } catch (error) {
        setUser(null);
      }
    };

    updateUser();

    Hub.listen('auth', updateUser);

    return () => Hub.remove('auth', updateUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
