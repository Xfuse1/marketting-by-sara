import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import HeroScene from '../3d/HeroScene';

interface HeroProps {
  stage: number;
  setStage: (s: number) => void;
  onConnect: () => void;
  lightOn: boolean;
}

export const Hero: React.FC<HeroProps> = ({ stage, setStage, onConnect, lightOn }) => {
  const { t } = useTranslation();

  return (
    <section id="home" className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-darker">
      {/* Background 3D Scene */}
      <div className="absolute inset-0 z-0">
        <HeroScene onConnect={onConnect} />
      </div>

      {/* Stage 0 Overlay */}
      <AnimatePresence>
        {stage === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="z-10 text-center px-6 pointer-events-none"
          >
            <h2 className="text-3xl md:text-5xl font-light text-gray-400 mb-4 tracking-widest uppercase">
              {t('questions.brandReady') || "Your brand is almost ready"}
            </h2>
            <h1 className="text-5xl md:text-8xl font-black bg-clip-text text-transparent bg-brand-gradient mb-8">
              {t('questions.turnLight') || "Turn the light on"}
            </h1>
            <button
              onClick={() => setStage(1)}
              className="pointer-events-auto px-12 py-4 bg-white text-darker rounded-full font-bold text-xl hover:bg-primary hover:text-white transition-all duration-500 hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              {t('questions.turnOn') || "Turn it on"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 1: Interaction Hint */}
      <AnimatePresence>
        {stage === 1 && !lightOn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-20 z-10 text-center pointer-events-none"
          >
            <p className="text-primary animate-pulse text-lg font-medium tracking-tighter">
              {t('questions.dragPlug') || "Drag the plug to the socket"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Post-Light Branding Revealed */}
      <AnimatePresence>
        {lightOn && stage >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="z-10 text-center pointer-events-none px-6"
          >
            <h1 className="text-6xl md:text-9xl font-black bg-clip-text text-transparent bg-brand-gradient">
              {t('hero.title')}
            </h1>
            <p className="mt-4 text-xl md:text-3xl font-light text-gray-200 dark:text-gray-800 tracking-[0.2em] uppercase">
              {t('hero.subtitle')}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

