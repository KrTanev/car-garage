import { useLanguage } from '../context/LanguageContext';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      type="button"
      className="secondary lang-toggle"
      onClick={toggleLanguage}
      aria-label={language === 'bg' ? 'Switch to English' : 'Превключи на български'}
    >
      {language === 'bg' ? 'BG' : 'EN'}
    </button>
  );
}
