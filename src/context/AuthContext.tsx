import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { User } from 'firebase/auth';
import * as authProvider from './authProvider';

interface AuthContextValue {
  isAuthenticated: boolean;
  // True until Firebase's initial session check resolves (it restores a
  // persisted sign-in asynchronously). Callers should wait for this before
  // deciding to redirect, or a signed-in user briefly flashes as logged out.
  isInitializing: boolean;
  // True only while an active signIn() call is in flight.
  isSigningIn: boolean;
  // Whether the last sign-in attempt failed. Display text is chosen by the
  // caller (LoginForm) so it can be localized — this context stays
  // language-agnostic.
  hasError: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const unsubscribe = authProvider.onAuthChange((firebaseUser) => {
      setUser(firebaseUser);
      setIsInitializing(false);
    });
    return unsubscribe;
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setIsSigningIn(true);
    setHasError(false);
    try {
      const ok = await authProvider.login({ email, password });
      if (!ok) setHasError(true);
      return ok;
    } finally {
      setIsSigningIn(false);
    }
  }, []);

  const signOut = useCallback(() => {
    authProvider.logout();
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated: user !== null,
      isInitializing,
      isSigningIn,
      hasError,
      signIn,
      signOut,
    }),
    [user, isInitializing, isSigningIn, hasError, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
