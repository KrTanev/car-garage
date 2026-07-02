import { BUSINESS_INFO, SERVICE_IDS, GALLERY_IDS } from '../data/business';
import { useLanguage } from '../context/LanguageContext';

export function About() {
  const { t } = useLanguage();
  const yearsInBusiness = new Date().getFullYear() - BUSINESS_INFO.foundedYear;

  return (
    <main className="about">
      <section className="about-intro">
        <h1>{t.about.title(BUSINESS_INFO.name)}</h1>
        <p>{t.about.intro(BUSINESS_INFO.foundedYear, yearsInBusiness)}</p>
        <p className="about-address">
          {BUSINESS_INFO.addressStreet}, {t.common.cityCountry}
        </p>
      </section>

      <section className="about-services">
        <h2>{t.about.servicesTitle}</h2>
        <div className="services-grid">
          {SERVICE_IDS.map((id) => (
            <div className="service-card" key={id}>
              <h3>{t.about.services[id].title}</h3>
              <p>{t.about.services[id].description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-gallery">
        <h2>{t.about.galleryTitle}</h2>
        <div className="gallery-grid">
          {GALLERY_IDS.map((id) => (
            <div className="gallery-tile" key={id}>
              <span>{t.about.gallery[id]}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
