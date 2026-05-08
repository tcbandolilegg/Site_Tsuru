import { motion, AnimatePresence } from "motion/react";
import { Globe, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import TsuruLogo from "./TsuruLogo";

const languages = [
  { code: 'pt-BR', name: 'Português (BR)', flag: '🇧🇷' },
  { code: 'pt-PT', name: 'Português (PT)', flag: '🇵🇹' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsLangOpen(false);
  };

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-tsuru-bg/80 backdrop-blur-md border-b border-tsuru-blue/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
          id="nav-logo"
        >
          <TsuruLogo className="w-10 h-10" />
          <span className="text-2xl font-serif font-bold tracking-tight text-tsuru-blue">Tsuru</span>
        </motion.div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-tsuru-muted">
          <a href="#about" className="hover:text-tsuru-blue transition-colors">{t('common.about')}</a>
          <a href="#features" className="hover:text-tsuru-blue transition-colors">{t('common.features')}</a>
          <a href="#family" className="hover:text-tsuru-blue transition-colors">{t('common.family')}</a>
        </div>

        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 text-tsuru-blue hover:bg-tsuru-blue/5 px-3 py-2 rounded-lg transition-all text-sm font-medium"
              id="lang-selector-btn"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{currentLang.name}</span>
              <span className="sm:hidden">{currentLang.flag}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-tsuru-blue/10 overflow-hidden"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-tsuru-blue/5 transition-colors ${i18n.language === lang.code ? 'text-tsuru-blue font-bold bg-tsuru-blue/5' : 'text-tsuru-muted'}`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      {lang.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-tsuru-blue text-white px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide hover:shadow-lg hover:shadow-tsuru-blue/20 transition-all whitespace-nowrap"
            id="nav-cta"
          >
            {t('common.getStarted')}
          </motion.button>
        </div>
      </div>
    </nav>
  );
}
