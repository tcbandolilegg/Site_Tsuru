import { motion, AnimatePresence } from "motion/react";
import { Globe, ChevronDown, Mail, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import TsuruLogo from "./TsuruLogo";

const languages = [
  { code: 'pt-BR', name: 'Português (BR)', flag: '🇧🇷' },
  { code: 'pt-PT', name: 'Português (PT)', flag: '🇵🇹' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
];

export default function Navbar({ 
  onOpenContact, 
  onRegister, 
  onAccess, 
  onLogoClick,
  onFamilyClick,
  onSolutionsClick,
  onFeaturesClick,
  onCTAClick
}: { 
  onOpenContact: () => void, 
  onRegister: () => void, 
  onAccess: () => void, 
  onLogoClick: () => void,
  onFamilyClick: () => void,
  onSolutionsClick: () => void,
  onFeaturesClick: () => void,
  onCTAClick: () => void
}) {
  const { t, i18n } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsLangOpen(false);
  };

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled ? "glass-nav py-2" : "bg-transparent py-4"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 cursor-pointer group"
          onClick={onLogoClick}
          id="nav-logo"
        >
          <div className="relative">
            <TsuruLogo className="w-12 h-12 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
            <div className="absolute inset-0 bg-tsuru-blue/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
          </div>
          <span className="text-4xl font-serif font-bold tracking-tight text-tsuru-blue">Tsuru</span>
        </motion.div>
        
        <div className="hidden lg:flex items-center gap-10 text-sm font-bold tracking-widest text-tsuru-navy">
          <button onClick={onLogoClick} className="nav-link">{t('common.about')}</button>
          <button onClick={onSolutionsClick} className="nav-link">{t('common.solutions')}</button>
          <button onClick={onFeaturesClick} className="nav-link">{t('common.features')}</button>
          <button onClick={onFamilyClick} className="nav-link">{t('common.family')}</button>
          <button onClick={onRegister} className="nav-link">{t('common.plans')}</button>
          <button onClick={onOpenContact} className="nav-link">{t('common.contactUs')}</button>
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden xl:flex relative group items-center">
            <Search className="absolute left-3 w-4 h-4 text-tsuru-muted group-focus-within:text-tsuru-blue transition-colors" />
            <input 
              type="text" 
              placeholder={t('common.search')}
              className="bg-tsuru-blue/5 border border-tsuru-blue/10 rounded-full pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-tsuru-blue/20 transition-all w-48 focus:w-64"
            />
          </div>

          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 text-tsuru-blue hover:bg-tsuru-blue/5 px-3 py-2 rounded-xl transition-all"
              id="lang-selector-btn"
            >
              <span className="text-2xl">{currentLang.flag}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-tsuru-blue/10 overflow-hidden py-2"
                >
                  <div className="px-4 py-2 text-sm font-bold text-tsuru-muted uppercase tracking-widest">{t('common.language')}</div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-tsuru-blue/5 transition-colors ${i18n.language === lang.code ? 'bg-tsuru-blue/5 text-tsuru-blue font-bold' : 'text-tsuru-navy'}`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onCTAClick}
              className="relative bg-tsuru-navy text-white px-8 py-3 rounded-full text-sm font-bold tracking-wider hover:bg-tsuru-blue transition-colors duration-300 shadow-xl shadow-tsuru-navy/10 overflow-hidden group flex items-center gap-2 whitespace-nowrap"
              id="nav-cta"
            >
              <span className="relative z-10">{t('common.getStarted')}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
}
