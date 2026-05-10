import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Phone, Mail, User, MessageCircle, ChevronDown, Sparkles, ShieldCheck, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const containerVars = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.05,
      delayChildren: 0.2
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 20,
    transition: { duration: 0.3, ease: 'easeInOut' }
  }
};

const itemVars = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 }
};

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    situation: 'duvida',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const situationLabel = t(`contact.options.${formData.situation as any}`);
    const subject = encodeURIComponent(`Tsuru Health - ${situationLabel}`);
    const body = encodeURIComponent(
      `${t('contact.name')}: ${formData.name}\n` +
      `${t('contact.email')}: ${formData.email}\n` +
      `${t('contact.phone')}: ${formData.phone}\n\n` +
      `${t('contact.description')}:\n${formData.description}`
    );
    
    window.location.href = `mailto:contato@tsuru.app.br?subject=${subject}&body=${body}`;
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-md"
          />
          
          <motion.div
            variants={containerVars}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/10"
          >
            {/* Left Branding Side */}
            <div className="w-full md:w-[40%] bg-tsuru-navy p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-tsuru-blue/20 rounded-full blur-[80px] -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-tsuru-gold/10 rounded-full blur-[80px] -ml-32 -mb-32" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/10">
                    <Sparkles className="w-5 h-5 text-tsuru-gold" />
                  </div>
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-tsuru-gold/80">Concierge</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-serif font-medium leading-[1.1] mb-6">
                  {t('contact.title')}
                </h2>
                <p className="text-white/60 text-lg leading-relaxed mb-12">
                  {t('contact.conciergeText')}
                </p>
                
                <div className="space-y-6">
                  {[
                    { icon: ShieldCheck, text: "Privacidade Garantida", sub: "Dados protegidos com criptografia" },
                    { icon: Clock, text: "Resposta Rápida", sub: "Retorno em até 24 horas úteis" },
                    { icon: MessageCircle, text: "Suporte Personalizado", sub: "Atendimento humano e empático" }
                  ].map((info, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center mt-1 border border-white/5">
                        <info.icon className="w-3 h-3 text-tsuru-blue" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{info.text}</p>
                        <p className="text-xs text-white/40">{info.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative z-10 mt-12 pt-8 border-t border-white/10 hidden md:block">
                <p className="text-xs text-white/30 uppercase tracking-widest font-bold">Tsuru Health Management</p>
              </div>
            </div>

            {/* Right Form Side */}
            <div className="w-full md:w-[60%] bg-white p-8 md:p-12 overflow-y-auto max-h-[80vh] md:max-h-none">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 text-tsuru-navy/30 hover:text-tsuru-navy hover:bg-tsuru-blue/5 rounded-full transition-all md:relative md:top-0 md:right-0 md:mb-8 md:ml-auto md:flex hidden"
              >
                <X className="w-6 h-6" />
              </button>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div variants={itemVars} className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-tsuru-muted ml-1">
                      {t('contact.name')}
                    </label>
                    <div className="group relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-tsuru-blue/40 group-focus-within:text-tsuru-blue transition-colors" />
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-4 bg-tsuru-blue/5 border border-transparent rounded-2xl focus:bg-white focus:border-tsuru-blue/20 focus:ring-4 focus:ring-tsuru-blue/5 outline-none transition-all text-tsuru-navy font-medium placeholder:text-tsuru-muted/40"
                        placeholder="Ex: João da Silva"
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVars} className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-tsuru-muted ml-1">
                      {t('contact.situation')}
                    </label>
                    <div className="group relative">
                      <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-tsuru-blue/40 group-focus-within:text-tsuru-blue pointer-events-none transition-colors" />
                      <select
                        name="situation"
                        value={formData.situation}
                        onChange={handleChange}
                        className="w-full pl-11 pr-12 py-4 bg-tsuru-blue/5 border border-transparent rounded-2xl focus:bg-white focus:border-tsuru-blue/20 focus:ring-4 focus:ring-tsuru-blue/5 outline-none transition-all text-tsuru-navy font-medium appearance-none"
                      >
                        <option value="duvida">{t('contact.options.duvida')}</option>
                        <option value="problema">{t('contact.options.problema')}</option>
                        <option value="denuncia">{t('contact.options.denuncia')}</option>
                        <option value="sugestao">{t('contact.options.sugestao')}</option>
                        <option value="elogio">{t('contact.options.elogio')}</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-tsuru-blue/40 pointer-events-none" />
                    </div>
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div variants={itemVars} className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-tsuru-muted ml-1">
                      {t('contact.phone')}
                    </label>
                    <div className="group relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-tsuru-blue/40 group-focus-within:text-tsuru-blue transition-colors" />
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-4 bg-tsuru-blue/5 border border-transparent rounded-2xl focus:bg-white focus:border-tsuru-blue/20 focus:ring-4 focus:ring-tsuru-blue/5 outline-none transition-all text-tsuru-navy font-medium placeholder:text-tsuru-muted/40"
                        placeholder="+55 (00) 00000-0000"
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVars} className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-tsuru-muted ml-1">
                      {t('contact.email')}
                    </label>
                    <div className="group relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-tsuru-blue/40 group-focus-within:text-tsuru-blue transition-colors" />
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-4 bg-tsuru-blue/5 border border-transparent rounded-2xl focus:bg-white focus:border-tsuru-blue/20 focus:ring-4 focus:ring-tsuru-blue/5 outline-none transition-all text-tsuru-navy font-medium placeholder:text-tsuru-muted/40"
                        placeholder="nome@email.com"
                      />
                    </div>
                  </motion.div>
                </div>

                <motion.div variants={itemVars} className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-tsuru-muted ml-1">
                    {t('contact.description')}
                  </label>
                  <textarea
                    required
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-6 py-4 bg-tsuru-blue/5 border border-transparent rounded-2xl focus:bg-white focus:border-tsuru-blue/20 focus:ring-4 focus:ring-tsuru-blue/5 outline-none transition-all text-tsuru-navy font-medium placeholder:text-tsuru-muted/40 resize-none"
                    placeholder="Escreva aqui sua mensagem..."
                  />
                </motion.div>

                <motion.button
                  variants={itemVars}
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-5 bg-tsuru-blue text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-tsuru-blue/90 shadow-2xl shadow-tsuru-blue/20 transition-all text-sm uppercase tracking-widest"
                >
                  <Send className="w-5 h-5" />
                  {t('contact.send')}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

