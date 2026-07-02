import { Link } from 'react-router-dom';
import { GarageMap } from '../components/GarageMap';
import { BUSINESS_INFO } from '../data/business';
import { useLanguage } from '../context/LanguageContext';

export function Home() {
  const { t } = useLanguage();

  return (
    <main className="home">
      <section className="home-hero">
        <h1>{t.home.heroTitle}</h1>
        <p>{t.home.heroSubtitle}</p>
        <div className="home-highlights">
          <span className="highlight-chip">{t.home.establishedBadge(BUSINESS_INFO.foundedYear)}</span>
          <a
            className="highlight-chip highlight-cta"
            href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`}
          >
            {t.home.callCta} · {BUSINESS_INFO.phone}
          </a>
          <Link to="/about" className="highlight-chip highlight-cta">
            {t.home.aboutCta}
          </Link>
        </div>
      </section>

      <section className="home-map-section">
        <h2>{t.home.findUs}</h2>
        <GarageMap />
      </section>
    </main>
  );
}
