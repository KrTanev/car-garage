import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isInitializing } = useAuth();

  // Firebase restores a persisted session asynchronously — wait for that
  // to resolve before deciding to redirect, or a signed-in user briefly
  // flashes the login page on every refresh.
  if (isInitializing) {
    return <p className="text-text-muted text-sm text-center py-10">Loading…</p>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
