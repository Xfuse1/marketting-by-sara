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
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          className={`
            fixed bottom-8 ${lang === 'ar' ? 'left-8' : 'right-8'}
            flex flex-col gap-3 z-40
          `}
        >
          {/* Contact Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scrollToSection('contact')}
            className="group relative p-4 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg hover:shadow-primary/50 transition-all duration-300"
            aria-label="Contact us"
          >
            <MessageCircle className="w-6 h-6" />
            {/* Tooltip */}
            <div className={`
              absolute ${lang === 'ar' ? 'right-full mr-3' : 'left-full ml-3'} top-1/2 -translate-y-1/2
              px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg
              opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap
              transition-opacity duration-300
            `}>
              {lang === 'en' ? 'Contact' : 'تواصل'}
            </div>
          </motion.button>

          {/* Special Offer Button (with pulse animation) */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scrollToSection('special-offer')}
            className="group relative p-4 bg-gradient-to-r from-orange via-magenta to-purple hover:shadow-2xl hover:shadow-magenta/50 text-white rounded-full shadow-lg transition-all duration-300"
            aria-label="View special offer"
          >
            <Sparkles className="w-6 h-6" />
            {/* Pulsing Ring */}
            <span className="absolute inset-0 rounded-full bg-magenta/50 animate-ping" />
            {/* Tooltip */}
            <div className={`
              absolute ${lang === 'ar' ? 'right-full mr-3' : 'left-full ml-3'} top-1/2 -translate-y-1/2
              px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg
              opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap
              transition-opacity duration-300 z-10
            `}>
              {lang === 'en' ? 'Special Offer' : 'عرض خاص'}
            </div>
          </motion.button>

          {/* Scroll to Top Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="group relative p-4 bg-gray-800 hover:bg-gray-700 text-white rounded-full shadow-lg transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-6 h-6" />
            {/* Tooltip */}
            <div className={`
              absolute ${lang === 'ar' ? 'right-full mr-3' : 'left-full ml-3'} top-1/2 -translate-y-1/2
              px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg
              opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap
              transition-opacity duration-300
            `}>
              {lang === 'en' ? 'Back to top' : 'العودة للأعلى'}
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
