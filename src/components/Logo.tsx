import { useTheme } from '../context/ThemeContext';
import logoLight from '../assets/logo-full-transparent.png';
import logoDark from '../assets/logo-full-dark.png';

// Theme-aware wordmark: the standard green/black logo on light, and a
// recolored light-on-dark variant in dark mode. Both are transparent PNGs
// so they sit cleanly on the blurred sticky header.
export function Logo() {
  const { theme } = useTheme();

  return (
    <img
      src={theme === 'dark' ? logoDark : logoLight}
      alt="Solid Auto"
      className="h-[69px] w-auto block"
    />
  );
}
