import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Sparkles, Clock, ArrowRight } from 'lucide-react';
import { Repository } from '../../data/repository';
import type { SpecialOffer } from '../../data/types';

interface SpecialOfferSectionProps {
  onBookClick?: () => void;
}

export function SpecialOfferSection({ onBookClick }: SpecialOfferSectionProps) {
  const { i18n } = useTranslation();
  const [offer, setOffer] = useState<SpecialOffer | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const lang = i18n.language as 'en' | 'ar';

  useEffect(() => {
    Repository.getSpecialOffer()
      .then(setOffer)
      .finally(() => setLoading(false));
  }, []);

  // Countdown timer
  useEffect(() => {
    if (!offer?.validUntil) return;

    const calculateTimeLeft = () => {
      const difference = new Date(offer.validUntil!).getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [offer]);

  if (loading || !offer) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const hasValidTime = offer.validUntil && (timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0);

  return (
    <div className="min-h-screen flex items-center px-6 py-20">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Animated Background Glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary via-magenta to-purple rounded-3xl blur-2xl opacity-20 animate-pulse" />

          {/* Main Card */}
          <div className="relative bg-gradient-to-br from-darker via-gray-900 to-darker border border-primary/30 rounded-2xl overflow-hidden">
            {/* Sparkle Icon Background */}
            <div className="absolute top-8 right-8 opacity-10">
              <Sparkles className="w-64 h-64 text-primary" />
            </div>

            <div className="relative p-8 md:p-12">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange/10 border border-orange/30 rounded-full mb-6"
              >
                <Sparkles className="w-4 h-4 text-orange" />
                <span className="text-sm font-semibold text-orange uppercase tracking-wider">
                  {lang === 'en' ? 'Limited Time Offer' : 'عرض لفترة محدودة'}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-magenta to-purple bg-clip-text text-transparent"
              >
                {offer.title[lang]}
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-gray-300 dark:text-gray-800 text-lg md:text-xl mb-8 max-w-3xl leading-relaxed"
              >
                {offer.description[lang]}
              </motion.p>

              {/* Countdown Timer */}
              {hasValidTime && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="mb-8"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="text-sm font-semibold text-gray-400 dark:text-gray-700 uppercase tracking-wide">
                      {lang === 'en' ? 'Offer ends in' : 'ينتهي العرض في'}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-4 max-w-lg">
                    {[
                      { value: timeLeft.days, label: lang === 'en' ? 'Days' : 'أيام' },
                      { value: timeLeft.hours, label: lang === 'en' ? 'Hours' : 'ساعات' },
                      { value: timeLeft.minutes, label: lang === 'en' ? 'Minutes' : 'دقائق' },
                      { value: timeLeft.seconds, label: lang === 'en' ? 'Seconds' : 'ثواني' }
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 text-center"
                      >
                        <div className="text-3xl font-bold text-primary mb-1">
                          {String(item.value).padStart(2, '0')}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-600 uppercase">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <button
                  onClick={onBookClick}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary via-magenta to-purple rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-primary/50 hover:scale-105 transition-all duration-300"
                >
                  <span>{offer.cta[lang]}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>

              {/* Fine Print */}
              {offer.validUntil && (
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  className="mt-6 text-sm text-gray-500"
                >
                  {lang === 'en'
                    ? `* Offer valid until ${new Date(offer.validUntil).toLocaleDateString(
                      'en-US',
                      { year: 'numeric', month: 'long', day: 'numeric' }
                    )}`
                    : `* العرض صالح حتى ${new Date(offer.validUntil).toLocaleDateString('ar-EG', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}`}
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
