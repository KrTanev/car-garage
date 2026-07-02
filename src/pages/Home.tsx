import { Link } from 'react-router-dom';
import { GarageMap } from '../components/GarageMap';
import { BUSINESS_INFO } from '../data/business';
import { useLanguage } from '../context/LanguageContext';

export function Home() {
  const { t } = useLanguage();

  return (
    <main className="max-w-[640px] mx-auto px-4 pt-6 pb-12 flex flex-col gap-8">
      <section>
        <h1 className="text-[1.6rem] font-semibold text-text mb-3">{t.home.heroTitle}</h1>
        <p className="text-text-muted mb-4">{t.home.heroSubtitle}</p>
        <div className="flex flex-wrap gap-2">
          <span className="chip">{t.home.establishedBadge(BUSINESS_INFO.foundedYear)}</span>
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
      </section>

      <section>
        <h2 className="text-[1.1rem] font-semibold text-text mb-3">{t.home.findUs}</h2>
        <GarageMap />
      </section>
    </main>
  );
}
