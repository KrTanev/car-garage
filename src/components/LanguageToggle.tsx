import { useLanguage } from '../context/LanguageContext';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      type="button"
      className="btn-nav"
      onClick={toggleLanguage}
      aria-label={
        language === 'bg' ? 'Switch to English' : 'Превключи на български'
      }
    >
      {language === 'bg' ? 'BG' : 'EN'}
    </button>
  );
}
