import { Navigate } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return <p className="loading">Loading…</p>;
  }
  if (isAuthenticated) {
    return <Navigate to="/documents" replace />;
  }

  return (
    <main className="login-page">
      <LoginForm />
    </main>
  );
}
