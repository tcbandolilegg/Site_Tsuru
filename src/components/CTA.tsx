import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function CTA({ onOpenContact, onRegister }: { onOpenContact: () => void, onRegister: () => void }) {
  const { t } = useTranslation();

  return (
    <section id="cta" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-tsuru-navy -z-20" />
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[4rem] p-16 md:p-24 relative"
           id="cta-box"
        >
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-tsuru-blue text-white p-5 rounded-full shadow-2xl">
            <Sparkles className="w-8 h-8" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight">
            {t('cta.title').split('cuidado com a saúde?')[0]} <br />
            <span className="italic">cuidado com a saúde?</span>
          </h2>
          
          <p className="text-white/70 text-xl max-w-2xl mx-auto mb-12">
            {t('cta.description')}
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a 
              href="https://www.tsuru.app.br"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-tsuru-navy px-12 py-5 rounded-full text-lg font-bold hover:bg-tsuru-blue hover:text-white transition-all shadow-2xl overflow-hidden relative group block"
            >
              <span className="relative z-10 font-bold tracking-wide text-sm">{t('cta.button')}</span>
            </a>
            
            <button 
              onClick={onOpenContact}
              className="text-white border border-white/30 px-12 py-5 rounded-full text-lg font-medium hover:bg-white/10 transition-all tracking-wide text-sm"
            >
              {t('cta.contact')}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
