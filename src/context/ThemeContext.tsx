import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

// Keep in sync with the pre-paint script in index.html, which reads the
// same key to apply the .dark class before the first render (no flash).
const STORAGE_KEY = 'car-garage-theme';

export type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  /** True when the user explicitly picked a theme (vs. following the OS). */
  isExplicit: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function readStoredTheme(): Theme | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === 'light' || stored === 'dark' ? stored : null;
}

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

// Theme behavior: follow the OS by default; once the user hits the toggle,
// their choice is stored and wins from then on (also across sessions).
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(
    () => readStoredTheme() ?? systemTheme(),
  );
  const [isExplicit, setIsExplicit] = useState(
    () => readStoredTheme() !== null,
  );

  // Apply the class the moment theme changes (index.html already applied
  // the initial one pre-paint; this keeps it in sync afterwards).
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    if (isExplicit) localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, isExplicit]);

  // While no explicit choice is stored, live-follow OS theme changes.
  useEffect(() => {
    if (isExplicit) return;
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) =>
      setTheme(e.matches ? 'dark' : 'light');
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, [isExplicit]);

  const toggleTheme = useCallback(() => {
    setIsExplicit(true);
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const value = useMemo(
    () => ({ theme, isExplicit, toggleTheme }),
    [theme, isExplicit, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
