import {
  BUSINESS_INFO,
  MAINTENANCE_SERVICE_IDS,
  REPAIR_SERVICE_IDS,
  GALLERY_IDS,
} from '../data/business';
import { useLanguage } from '../context/LanguageContext';

export function About() {
  const { t } = useLanguage();

  return (
    <main className="max-w-[960px] mx-auto px-4 py-8 pb-16">
      <section className="max-w-[640px] mb-10">
        <h1 className="text-[1.6rem] font-semibold text-text mb-3">
          {t.about.title(BUSINESS_INFO.name)}
        </h1>
        <p className="text-text-muted mb-3">{t.about.intro}</p>
        <p className="text-text font-semibold">
          {BUSINESS_INFO.addressStreet}, {t.common.cityCountry}
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-[1.1rem] font-semibold text-text mb-3">
          {t.about.maintenanceTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {MAINTENANCE_SERVICE_IDS.map((id) => (
            <div className="card card-lift" key={id}>
              <h3 className="text-base mb-1.5">{t.about.services[id].title}</h3>
              <p className="text-text-muted text-[0.9rem] m-0">
                {t.about.services[id].description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-[1.1rem] font-semibold text-text mb-3">
          {t.about.repairsTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {REPAIR_SERVICE_IDS.map((id) => (
            <div className="card card-lift" key={id}>
              <h3 className="text-base mb-1.5">{t.about.services[id].title}</h3>
              <p className="text-text-muted text-[0.9rem] m-0">
                {t.about.services[id].description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-[1.1rem] font-semibold text-text mb-3">
          {t.about.galleryTitle}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {GALLERY_IDS.map((id) => (
            <div
              key={id}
              className="aspect-[4/3] rounded-card border border-dashed border-border flex items-end p-2.5 bg-[repeating-linear-gradient(45deg,var(--color-surface),var(--color-surface)_10px,var(--color-bg)_10px,var(--color-bg)_20px)]"
            >
              <span className="bg-surface border border-border rounded-md py-1 px-2 text-xs text-text-muted">
                {t.about.gallery[id]}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
