import { NavLink, Link } from 'react-router-dom';
import { Logo } from './Logo';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export function Header() {
  const { isAuthenticated, signOut } = useAuth();
  const { t } = useLanguage();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative no-underline font-semibold text-[0.9rem] py-2 px-1 transition-colors duration-150 hover:text-accent-dark ${
      isActive
        ? 'text-accent-dark after:absolute after:inset-x-1 after:bottom-0.5 after:h-0.5 after:rounded-full after:bg-accent'
        : 'text-text-muted'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-surface/85 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between flex-wrap gap-3 max-w-[960px] mx-auto p-4">
        <Link
          to="/"
          className="no-underline text-inherit inline-flex"
          aria-label="Solid Auto"
        >
          <Logo />
        </Link>
        <nav className="flex items-center gap-2 flex-wrap">
          <NavLink to="/" end className={navLinkClass}>
            {t.nav.home}
          </NavLink>
          <NavLink to="/services" className={navLinkClass}>
            {t.nav.services}
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
          <ThemeToggle />
          <LanguageToggle />
        </nav>
      </div>
    </header>
  );
}
