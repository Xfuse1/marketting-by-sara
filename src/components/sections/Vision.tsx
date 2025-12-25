import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Target, Lightbulb } from 'lucide-react';
import { Repository } from '../../data/repository';
import type { VisionMission } from '../../data/types';

export function Vision() {
  const { i18n } = useTranslation();
  const [data, setData] = useState<VisionMission | null>(null);
  const [loading, setLoading] = useState(true);
  const lang = i18n.language as 'en' | 'ar';

  useEffect(() => {
    Repository.getVisionMission()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center px-6 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group"
          >
            <div className="relative">
              {/* Icon Background Glow */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all duration-500" />

              {/* Icon */}
              <div className="relative mb-6 inline-flex">
                <div className="p-4 bg-gradient-to-br from-primary/20 to-purple/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <Lightbulb className="w-8 h-8 text-primary" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-magenta to-purple bg-clip-text text-transparent">
                {lang === 'en' ? 'Our Vision' : 'رؤيتنا'}
              </h3>

              {/* Content */}
              <p className="text-gray-300 dark:text-gray-900 text-lg leading-relaxed">
                {data.vision[lang]}
              </p>

              {/* Decorative Line */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-8 h-1 bg-gradient-to-r from-primary via-magenta to-transparent rounded-full"
              />
            </div>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group"
          >
            <div className="relative">
              {/* Icon Background Glow */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-magenta/20 rounded-full blur-2xl group-hover:bg-magenta/30 transition-all duration-500" />

              {/* Icon */}
              <div className="relative mb-6 inline-flex">
                <div className="p-4 bg-gradient-to-br from-magenta/20 to-orange/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8 text-magenta" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-magenta via-orange to-primary bg-clip-text text-transparent">
                {lang === 'en' ? 'Our Mission' : 'مهمتنا'}
              </h3>

              {/* Content */}
              <p className="text-gray-300 dark:text-gray-900 text-lg leading-relaxed">
                {data.mission[lang]}
              </p>

              {/* Decorative Line */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-8 h-1 bg-gradient-to-r from-magenta via-orange to-transparent rounded-full"
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom Accent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 dark:text-gray-800 text-sm">
            {lang === 'en'
              ? 'Building the future of brand excellence in MENA'
              : 'بناء مستقبل التميز للعلامات التجارية في منطقة الشرق الأوسط وشمال إفريقيا'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
