import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { Repository } from '../../data/repository';
import type { SpecialOffer } from '../../data/types';

const BANNER_DELAY_MS = 30000; // 30 seconds
const DISMISS_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export function SpecialOfferBanner() {
  const { i18n } = useTranslation();
  const [offer, setOffer] = useState<SpecialOffer | null>(null);
  const [visible, setVisible] = useState(false);
  const lang = i18n.language as 'en' | 'ar';

  useEffect(() => {
    // Check if banner was dismissed recently
    const dismissed = localStorage.getItem('xfuse_offer_dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const now = Date.now();
      if (now - dismissedTime < DISMISS_DURATION_MS) {
        // Still within 24h dismissal period
        return;
      }
    }

    // Load offer data
    Repository.getSpecialOffer().then(setOffer);

    // Show banner after delay
    const timer = setTimeout(() => {
      setVisible(true);
    }, BANNER_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    localStorage.setItem('xfuse_offer_dismissed', Date.now().toString());
  };

  const scrollToOffer = () => {
    const element = document.getElementById('special-offer');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setVisible(false);
    }
  };

  if (!offer) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          className="fixed top-20 left-0 right-0 z-40 px-4"
        >
          <div className="max-w-5xl mx-auto">
            <div className="relative bg-gradient-to-r from-orange/90 via-magenta/90 to-purple/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10">
              {/* Close Button */}
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-300 group"
                aria-label="Dismiss banner"
              >
                <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              </button>

              <div className="flex flex-col md:flex-row items-center gap-4 p-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="p-3 bg-white/10 rounded-full">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                    {offer.title[lang]}
                  </h3>
                  <p className="text-sm md:text-base text-white/90">
                    {offer.description[lang].length > 120
                      ? `${offer.description[lang].substring(0, 120)}...`
                      : offer.description[lang]}
                  </p>
                </div>

                {/* CTA Button */}
                <div className="flex-shrink-0">
                  <button
                    onClick={scrollToOffer}
                    className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg whitespace-nowrap"
                  >
                    {offer.cta[lang]}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
