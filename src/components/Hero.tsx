import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section id="about" className="relative min-h-screen pt-32 flex items-center overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-tsuru-blue/5 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          id="hero-content"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-tsuru-gold/10 text-tsuru-gold text-xs font-bold uppercase tracking-wider mb-6">
            {t('hero.badge')}
          </span>
          <h1 className="text-6xl md:text-8xl font-serif leading-[0.9] text-tsuru-ink mb-8">
            {t('hero.title1')} <br />
            <span className="italic font-medium text-tsuru-blue">{t('hero.title2')}</span>
          </h1>
          <p className="text-lg text-tsuru-muted max-w-lg mb-10 leading-relaxed">
            {t('hero.description')}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button className="bg-tsuru-blue text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 group hover:bg-tsuru-blue/90 transition-all shadow-xl shadow-tsuru-blue/20">
              {t('hero.cta')}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-tsuru-blue/20 text-tsuru-blue px-8 py-4 rounded-full font-semibold hover:bg-tsuru-blue/5 transition-all">
              {t('common.learnMore')}
            </button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "circOut" }}
          className="relative aspect-square md:aspect-auto md:h-[600px]"
          id="hero-image-container"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-tsuru-blue/10 to-transparent rounded-3xl" />
          <img 
            src="https://images.unsplash.com/photo-1576091160550-217359f4ecf8?auto=format&fit=crop&q=80&w=1000" 
            alt="Medical Management" 
            className="w-full h-full object-cover rounded-3xl shadow-2xl grayscale-[0.2] sepia-[0.1]"
            referrerPolicy="no-referrer"
          />
          
          {/* Symbol Overlay */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -left-10 bg-white p-8 rounded-2xl shadow-xl border border-tsuru-gold/20"
          >
            <div className="text-tsuru-gold text-sm font-bold uppercase tracking-tighter mb-1">{t('common.symbol')}</div>
            <div className="font-serif italic text-xl text-tsuru-blue">{t('common.longevity')}</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
