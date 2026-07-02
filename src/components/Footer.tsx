import { BUSINESS_INFO, HOURS } from "../data/business";
import { useLanguage } from "../context/LanguageContext";
import logoIcon from "../assets/logo-icon.png";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface mt-12 py-8 px-4 pb-5">
      <div className="max-w-[960px] mx-auto flex flex-col sm:flex-row gap-6 sm:gap-16">
        <div>
          <h3 className="text-[0.85rem] uppercase tracking-[0.4px] text-text-muted mb-2.5">
            {t.footer.hoursTitle}
          </h3>
          <ul className="list-none m-0 p-0 flex flex-col gap-1 text-[0.9rem]">
            {HOURS.map((h) => (
              <li key={h.id} className="flex justify-between gap-4 max-w-[240px]">
                <span>{t.footer.hours[h.id]}</span>
                <span>{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-[0.85rem] uppercase tracking-[0.4px] text-text-muted mb-2.5">
            {t.footer.contactTitle}
          </h3>
          <p className="text-[0.9rem] mb-1.5">
            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, "")}`}
              className="no-underline text-accent font-semibold"
            >
              {BUSINESS_INFO.phone}
            </a>
          </p>
          <p className="text-[0.9rem] mb-1.5">
            {BUSINESS_INFO.addressStreet}, {t.common.cityCountry}
          </p>
        </div>
        <div className="flex items-center sm:ml-auto">
          <img src={logoIcon} alt={BUSINESS_INFO.name} className="h-10 w-auto opacity-90" />
        </div>
      </div>

      <p className="max-w-[960px] mx-auto mt-4 pt-2.5 border-t border-border text-text-muted text-[0.8rem]">
        {t.footer.rightsReserved(year, BUSINESS_INFO.name)}
      </p>
    </footer>
  );
}
