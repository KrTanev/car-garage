import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, isSigningIn, hasError } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const ok = await signIn(email, password);
    if (ok) navigate('/documents');
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>{t.home.loginTitle}</h2>
      <label htmlFor="email">{t.home.emailLabel}</label>
      <input
        id="email"
        type="email"
        autoComplete="username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label htmlFor="password">{t.home.passwordLabel}</label>
      <input
        id="password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {hasError && <p className="form-error">{t.home.loginError}</p>}
      <button type="submit" disabled={isSigningIn}>
        {isSigningIn ? t.home.loggingIn : t.home.loginButton}
      </button>
    </form>
  );
}
