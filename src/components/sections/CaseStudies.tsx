import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronDown, TrendingUp, Lightbulb, CheckCircle, Award } from 'lucide-react';
import { Repository } from '../../data/repository';
import type { CaseStudy } from '../../data/types';

interface CaseStudiesProps {
  onBookClick?: () => void;
}

export function CaseStudies({ onBookClick }: CaseStudiesProps) {
  const { i18n } = useTranslation();
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const lang = i18n.language as 'en' | 'ar';

  useEffect(() => {
    Repository.getCaseStudies()
      .then(setCaseStudies)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-magenta to-purple bg-clip-text text-transparent">
            {lang === 'en' ? 'Case Studies' : 'دراسات الحالة'}
          </h2>
          <p className="text-gray-400 dark:text-gray-800 text-lg max-w-2xl mx-auto">
            {lang === 'en'
              ? 'Real results from real clients. See how we transform challenges into measurable growth.'
              : 'نتائج حقيقية من عملاء حقيقيين. شاهد كيف نحول التحديات إلى نمو قابل للقياس.'}
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-full bg-darker/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 hover:border-primary/50 transition-all duration-300">
                {/* Gradient Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-magenta/0 to-purple/0 group-hover:from-primary/10 group-hover:via-magenta/10 group-hover:to-purple/10 transition-all duration-500" />

                <div className="relative p-8">
                  {/* Industry Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30 rounded-full mb-4">
                    <Award className="w-4 h-4 text-primary" />
                    <span className="text-sm text-primary font-medium">
                      {study.industry[lang]}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors">
                    {study.title[lang]}
                  </h3>

                  {/* Expandable Content */}
                  <div className="space-y-4">
                    {/* Problem */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-orange" />
                        <h4 className="font-semibold text-orange">
                          {lang === 'en' ? 'Challenge' : 'التحدي'}
                        </h4>
                      </div>
                      <p className="text-gray-400 dark:text-gray-800 text-sm leading-relaxed">
                        {expandedId === study.id
                          ? study.problem[lang]
                          : `${study.problem[lang].substring(0, 100)}...`}
                      </p>
                    </div>

                    {/* Decision (only when expanded) */}
                    {expandedId === study.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="w-5 h-5 text-magenta" />
                          <h4 className="font-semibold text-magenta">
                            {lang === 'en' ? 'Our Approach' : 'نهجنا'}
                          </h4>
                        </div>
                        <p className="text-gray-400 dark:text-gray-800 text-sm leading-relaxed mb-4">
                          {study.decision[lang]}
                        </p>

                        {/* Outcome */}
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-5 h-5 text-primary" />
                          <h4 className="font-semibold text-primary">
                            {lang === 'en' ? 'Results' : 'النتائج'}
                          </h4>
                        </div>
                        <p className="text-gray-400 dark:text-gray-800 text-sm leading-relaxed mb-6">
                          {study.outcome[lang]}
                        </p>

                        {/* Metrics */}
                        {study.metrics && study.metrics.length > 0 && (
                          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-800">
                            {study.metrics.map((metric, idx) => (
                              <div key={idx} className="text-center">
                                <div className="text-2xl font-bold text-primary mb-1">
                                  {metric.value}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {metric.label[lang]}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>

                  {/* Expand/Collapse Button */}
                  <button
                    onClick={() => setExpandedId(expandedId === study.id ? null : study.id)}
                    className="mt-6 w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-800/50 hover:bg-primary/10 border border-gray-700 hover:border-primary/50 rounded-lg transition-all duration-300 group/btn"
                  >
                    <span className="text-sm font-medium text-gray-300 group-hover/btn:text-primary">
                      {expandedId === study.id
                        ? lang === 'en'
                          ? 'Show Less'
                          : 'عرض أقل'
                        : lang === 'en'
                          ? 'Read Full Case Study'
                          : 'اقرأ دراسة الحالة الكاملة'}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 group-hover/btn:text-primary transition-transform duration-300 ${expandedId === study.id ? 'rotate-180' : ''
                        }`}
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 dark:text-gray-800 mb-6">
            {lang === 'en'
              ? 'Ready to become our next success story?'
              : 'هل أنت مستعد لتصبح قصة نجاحنا التالية؟'}
          </p>
          <button
            onClick={onBookClick}
            className="px-8 py-4 bg-gradient-to-r from-primary via-magenta to-purple rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 hover:scale-105 transition-all duration-300"
          >
            {lang === 'en' ? 'Start Your Journey' : 'ابدأ رحلتك'}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
