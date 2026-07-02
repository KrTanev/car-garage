import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import * as authProvider from './authProvider';

const STORAGE_KEY = 'car-garage-auth';

interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  // Whether the last sign-in attempt failed. Display text is chosen by the
  // caller (LoginForm) so it can be localized — this context stays
  // language-agnostic.
  hasError: boolean;
  signIn: (passcode: string) => Promise<boolean>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => localStorage.getItem(STORAGE_KEY) === 'true',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const signIn = useCallback(async (passcode: string) => {
    setIsLoading(true);
    setHasError(false);
    try {
      const ok = await authProvider.login({ passcode });
      if (ok) {
        localStorage.setItem(STORAGE_KEY, 'true');
        setIsAuthenticated(true);
      } else {
        setHasError(true);
      }
      return ok;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(() => {
    authProvider.logout();
    localStorage.removeItem(STORAGE_KEY);
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({ isAuthenticated, isLoading, hasError, signIn, signOut }),
    [isAuthenticated, isLoading, hasError, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
