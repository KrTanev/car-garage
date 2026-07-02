import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export function LoginForm() {
  const [passcode, setPasscode] = useState('');
  const { signIn, isLoading, hasError } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const ok = await signIn(passcode);
    if (ok) navigate('/documents');
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>{t.home.loginTitle}</h2>
      <label htmlFor="passcode">{t.home.accessCodeLabel}</label>
      <input
        id="passcode"
        type="password"
        autoComplete="current-password"
        value={passcode}
        onChange={(e) => setPasscode(e.target.value)}
        required
      />
      {hasError && <p className="form-error">{t.home.incorrectCode}</p>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? t.home.loggingIn : t.home.loginButton}
      </button>
    </form>
  );
}
