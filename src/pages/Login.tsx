import { Navigate } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return <p className="text-text-muted text-sm text-center py-10">Loading…</p>;
  }
  if (isAuthenticated) {
    return <Navigate to="/documents" replace />;
  }

  return (
    <main className="max-w-[640px] mx-auto px-4 pt-12 pb-16 flex justify-center">
      <LoginForm />
    </main>
  );
}
