import { NavLink, Link } from 'react-router-dom';
import { Logo } from './Logo';
import { LanguageToggle } from './LanguageToggle';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export function Header() {
  const { isAuthenticated, signOut } = useAuth();
  const { t } = useLanguage();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `no-underline font-semibold text-[0.9rem] py-2 px-1 ${isActive ? 'text-text' : 'text-text-muted'}`;

  return (
    <header className="bg-surface border-b border-border">
      <div className="flex items-center justify-between flex-wrap gap-3 max-w-[960px] mx-auto p-4">
        <Link to="/" className="no-underline text-inherit inline-flex" aria-label="Solid Cars">
          <Logo />
        </Link>
        <nav className="flex items-center gap-2 flex-wrap">
          <NavLink to="/" end className={navLinkClass}>
            {t.nav.home}
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            {t.nav.about}
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/documents" className={navLinkClass}>
                {t.nav.documents}
              </NavLink>
              <button type="button" className="btn-nav" onClick={signOut}>
                {t.nav.logout}
              </button>
            </>
          ) : (
            <NavLink to="/login" className="btn-nav">
              {t.nav.login}
            </NavLink>
          )}
          <LanguageToggle />
        </nav>
      </div>
    </header>
  );
}
