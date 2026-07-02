import { BUSINESS_INFO, HOURS } from '../data/business';
import { useLanguage } from '../context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <h3>{t.footer.hoursTitle}</h3>
          <ul className="footer-hours">
            {HOURS.map((h) => (
              <li key={h.id}>
                <span>{t.footer.hours[h.id]}</span>
                <span>{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>{t.footer.contactTitle}</h3>
          <p>
            <a href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`}>{BUSINESS_INFO.phone}</a>
          </p>
          <p>
            {BUSINESS_INFO.addressStreet}, {t.common.cityCountry}
          </p>
        </div>
      </div>
      <p className="footer-copy">{t.footer.rightsReserved(year, BUSINESS_INFO.name)}</p>
    </footer>
  );
}
