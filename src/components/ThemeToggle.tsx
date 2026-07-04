import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

// Sun/moon toggle, sitting next to the language toggle in the header.
// Shows the icon of the theme you'd switch TO (moon while in light mode).
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === 'dark';

  const label = isDark
    ? language === 'bg'
      ? 'Превключи на светла тема'
      : 'Switch to light theme'
    : language === 'bg'
      ? 'Превключи на тъмна тема'
      : 'Switch to dark theme';

  return (
    <button
      type="button"
      className="btn-nav inline-flex items-center"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      {isDark ? (
        // Sun icon
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        // Moon icon
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
