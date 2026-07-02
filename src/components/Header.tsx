import { NavLink, Link } from 'react-router-dom';
import { Logo } from './Logo';
import { LanguageToggle } from './LanguageToggle';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export function Header() {
  const { isAuthenticated, signOut } = useAuth();
  const { t } = useLanguage();

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="site-header-logo" aria-label="Solid Cars">
          <Logo />
        </Link>
        <nav className="site-nav">
          <NavLink to="/" end>
            {t.nav.home}
          </NavLink>
          <NavLink to="/about">{t.nav.about}</NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/documents">{t.nav.documents}</NavLink>
              <button type="button" className="secondary" onClick={signOut}>
                {t.nav.logout}
              </button>
            </>
          ) : (
            <NavLink to="/login" className="secondary nav-cta">
              {t.nav.login}
            </NavLink>
          )}
          <LanguageToggle />
        </nav>
      </div>
    </header>
  );
}
