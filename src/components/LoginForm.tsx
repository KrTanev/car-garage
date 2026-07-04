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
    <form className="card w-full max-w-[360px]" onSubmit={handleSubmit}>
      <h2 className="text-[1.1rem] font-semibold text-text mb-3">
        {t.home.loginTitle}
      </h2>
      <label htmlFor="email" className="form-label">
        {t.home.emailLabel}
      </label>
      <input
        id="email"
        type="email"
        autoComplete="username"
        className="form-input mb-0"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label htmlFor="password" className="form-label mt-3.5">
        {t.home.passwordLabel}
      </label>
      <input
        id="password"
        type="password"
        autoComplete="current-password"
        className="form-input mb-0"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {hasError && (
        <p className="animate-[page-in_0.2s_ease_both] text-danger text-[0.85rem] -mt-2 mb-3">
          {t.home.loginError}
        </p>
      )}
      <button
        type="submit"
        className="btn-primary mt-3.5"
        disabled={isSigningIn}
      >
        {isSigningIn ? t.home.loggingIn : t.home.loginButton}
      </button>
    </form>
  );
}
