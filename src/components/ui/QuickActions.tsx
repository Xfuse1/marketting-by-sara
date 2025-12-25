import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Sparkles, ChevronUp } from 'lucide-react';

export function QuickActions() {
  const { i18n } = useTranslation();
  const [visible, setVisible] = useState(false);
  const lang = i18n.language as 'en' | 'ar';

  useEffect(() => {
    const handleScroll = () => {
      // Show quick actions after scrolling 300px
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className={`
            fixed bottom-10 ${lang === 'ar' ? 'left-8' : 'right-8'}
            flex flex-col gap-6 z-40
          `}
        >
          {/* Scroll to Top - Circle Shape */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="w-14 h-14 bg-darker border border-primary/30 text-primary rounded-full shadow-2xl flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-500 group relative"
          >
            <ChevronUp className="w-6 h-6" />
            <div className={`absolute ${lang === 'ar' ? 'right-full mr-4' : 'left-full ml-4'} opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-widest whitespace-nowrap`}>
              {lang === 'en' ? 'SCROLL' : 'صعود'}
            </div>
          </motion.button>

          {/* View Special Offer - Squircle/RoundedBox Shape */}
          <motion.button
            whileHover={{ scale: 1.1, borderRadius: '20%' }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scrollToSection('special-offer')}
            className="w-14 h-14 bg-brand-gradient text-white rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-500 group relative"
          >
            <Sparkles className="w-6 h-6 animate-pulse" />
            <div className={`absolute ${lang === 'ar' ? 'right-full mr-4' : 'left-full ml-4'} opacity-0 group-hover:opacity-100 transition-opacity bg-magenta text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-widest whitespace-nowrap`}>
              {lang === 'en' ? 'VIEW OFFER' : 'العروض'}
            </div>
          </motion.button>

          {/* Contact - Hexagon-like or custom shape (Rounded Corner Pentagon) */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: -15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scrollToSection('contact')}
            className="w-14 h-14 bg-primary text-white rounded-tr-[50%] rounded-bl-[50%] shadow-2xl flex items-center justify-center hover:rotate-0 transition-all duration-500 group relative"
          >
            <MessageCircle className="w-6 h-6" />
            <div className={`absolute ${lang === 'ar' ? 'right-full mr-4' : 'left-full ml-4'} opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-widest whitespace-nowrap`}>
              {lang === 'en' ? 'CONTACT' : 'تواصل'}
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
