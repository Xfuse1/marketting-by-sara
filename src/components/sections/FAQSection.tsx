import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Repository } from '../../data/repository';
import type { FAQ } from '../../data/types';

type Category = 'services' | 'process' | 'pricing' | 'technical' | 'general';

const categories: { key: Category; label_en: string; label_ar: string }[] = [
  { key: 'services', label_en: 'Services', label_ar: 'الخدمات' },
  { key: 'process', label_en: 'Process', label_ar: 'العملية' },
  { key: 'pricing', label_en: 'Pricing', label_ar: 'التسعير' },
  { key: 'technical', label_en: 'Technical', label_ar: 'تقني' },
  { key: 'general', label_en: 'General', label_ar: 'عام' }
];

interface FAQSectionProps {
  onBookClick?: () => void;
}

export function FAQSection({ onBookClick }: FAQSectionProps) {
  const { i18n } = useTranslation();
  const [faqItems, setFaqItems] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<Category>('services');
  const [openId, setOpenId] = useState<string | null>(null);
  const lang = i18n.language as 'en' | 'ar';

  useEffect(() => {
    Repository.getFAQ()
      .then(setFaqItems)
      .finally(() => setLoading(false));
  }, []);

  const filteredFAQs = faqItems.filter((item) => item.category === activeCategory);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-magenta to-purple bg-clip-text text-transparent">
            {lang === 'en' ? 'Frequently Asked Questions' : 'الأسئلة الشائعة'}
          </h2>
          <p className="text-gray-400 dark:text-gray-800 text-lg">
            {lang === 'en'
              ? 'Everything you need to know about working with XFUSE'
              : 'كل ما تحتاج لمعرفته حول العمل مع XFUSE'}
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-800">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => {
                  setActiveCategory(category.key);
                  setOpenId(null); // Close any open accordion when switching tabs
                }}
                className={`
                  px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all duration-300
                  ${activeCategory === category.key
                    ? 'bg-gradient-to-r from-primary to-magenta text-white shadow-lg shadow-primary/30'
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white'
                  }
                `}
              >
                {lang === 'en' ? category.label_en : category.label_ar}
              </button>
            ))}
          </div>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {filteredFAQs.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="bg-darker/50 backdrop-blur-sm border border-gray-800 hover:border-primary/50 rounded-xl overflow-hidden transition-all duration-300">
                  {/* Question Button */}
                  <button
                    onClick={() => setOpenId(openId === item.id ? null : item.id)}
                    className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-gray-800/30 transition-colors"
                  >
                    <span className="text-lg font-semibold text-white flex-1">
                      {item.question[lang]}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${openId === item.id ? 'rotate-180' : ''
                        }`}
                    />
                  </button>

                  {/* Answer (Collapsible) */}
                  <AnimatePresence>
                    {openId === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-2">
                          <div className="w-12 h-1 bg-gradient-to-r from-primary to-magenta rounded-full mb-4" />
                          <p className="text-gray-400 dark:text-gray-800 leading-relaxed">{item.answer[lang]}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty State */}
          {filteredFAQs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-500">
                {lang === 'en'
                  ? 'No FAQs found in this category.'
                  : 'لم يتم العثور على أسئلة شائعة في هذه الفئة.'}
              </p>
            </motion.div>
          )}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center bg-gradient-to-br from-primary/10 via-magenta/10 to-purple/10 border border-primary/20 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold mb-3 text-white">
            {lang === 'en' ? "Still have questions?" : "لا تزال لديك أسئلة؟"}
          </h3>
          <p className="text-gray-400 dark:text-gray-800 mb-6">
            {lang === 'en'
              ? "Book a free 15-minute consultation and we'll answer everything."
              : "احجز استشارة مجانية لمدة 15 دقيقة وسنجيب على كل شيء."}
          </p>
          <button
            onClick={onBookClick}
            className="px-8 py-4 bg-gradient-to-r from-primary via-magenta to-purple rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 hover:scale-105 transition-all duration-300"
          >
            {lang === 'en' ? 'Book Consultation' : 'احجز استشارة'}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
