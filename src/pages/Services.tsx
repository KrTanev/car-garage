import { MAINTENANCE_SERVICE_IDS, REPAIR_SERVICE_IDS } from '../data/business';
import { useLanguage } from '../context/LanguageContext';

export function Services() {
  const { t } = useLanguage();

  return (
    <main className="max-w-[960px] mx-auto px-4 py-8 pb-16">
      <section className="mb-10">
        <h2 className="text-[1.1rem] font-semibold text-text mb-3">
          {t.services.maintenanceTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {MAINTENANCE_SERVICE_IDS.map((id) => (
            <div className="card card-lift" key={id}>
              <h3 className="text-base mb-1.5">{t.services.items[id].title}</h3>
              <p className="text-text-muted text-[0.9rem] m-0">
                {t.services.items[id].description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-[1.1rem] font-semibold text-text mb-3">
          {t.services.repairsTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {REPAIR_SERVICE_IDS.map((id) => (
            <div className="card card-lift" key={id}>
              <h3 className="text-base mb-1.5">{t.services.items[id].title}</h3>
              <p className="text-text-muted text-[0.9rem] m-0">
                {t.services.items[id].description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
