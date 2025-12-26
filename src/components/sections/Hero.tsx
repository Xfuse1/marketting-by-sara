import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroProps {
  stage: number;
  setStage: (s: number) => void;
  onConnect: () => void;
  lightOn: boolean;
  isWeakDevice?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ stage, setStage, onConnect, lightOn, isWeakDevice }) => {
  const { t } = useTranslation();

  return (
    <section id="home" className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-darker">
      {/* Dynamic background element for premium feel */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-brand-gradient opacity-10 blur-[100px] rounded-full animate-pulse-slow" />
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="z-10 text-center px-6 relative"
        >
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="text-7xl md:text-[12rem] font-black bg-clip-text text-transparent bg-brand-gradient tracking-tighter leading-none select-none drop-shadow-2xl"
          >
            {t('hero.title') || "XFUSE"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, letterSpacing: "0em" }}
            animate={{ opacity: 1, letterSpacing: "0.2em" }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="mt-6 text-lg md:text-3xl font-light text-white uppercase"
          >
            {t('hero.subtitle') || "Strategic Intelligence"}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-12 flex flex-col md:flex-row gap-6 justify-center items-center"
          >
            <a href="#contact" className="px-10 py-4 bg-white text-darker font-bold rounded-full hover:bg-primary hover:text-white transition-all duration-300">
              Book Consultation
            </a>
            <a href='#services' className="px-10 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300">
              Explore Services
            </a>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

