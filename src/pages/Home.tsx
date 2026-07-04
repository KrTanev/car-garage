import { Link } from 'react-router-dom';
import { GarageMap } from '../components/GarageMap';
import { BUSINESS_INFO } from '../data/business';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import heroLight from '../assets/hero-white-mode.png';
import heroDark from '../assets/hero-dark-mode.png';

export function Home() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <main className="max-w-[960px] mx-auto px-4 pt-8 pb-12 flex flex-col gap-10">
      <section className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <h1 className="text-[1.8rem] sm:text-[2rem] leading-tight font-semibold text-text mb-3">
            {t.home.heroTitle}
          </h1>
          <p className="text-text-muted text-[1.05rem] mb-5 max-w-[520px]">
            {t.home.heroSubtitle}
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              className="chip text-accent-dark border-accent"
              href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`}
            >
              {t.home.callCta} · {BUSINESS_INFO.phone}
            </a>
            <Link to="/about" className="chip text-accent-dark border-accent">
              {t.home.aboutCta}
            </Link>
          </div>
        </div>
        <img
          src={theme === 'dark' ? heroDark : heroLight}
          alt=""
          aria-hidden="true"
          className="w-full max-w-[280px] mx-auto sm:mx-0 sm:w-[280px] rounded-card border border-border bg-surface shadow-sm"
        />
      </section>

      <section>
        <h2 className="text-[1.1rem] font-semibold text-text mb-3">
          {t.home.findUs}
        </h2>
        <GarageMap />
      </section>
    </main>
  );
}
