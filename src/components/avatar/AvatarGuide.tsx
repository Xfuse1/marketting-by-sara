import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Volume2, VolumeX } from 'lucide-react';
import { useSpeechSynthesis } from '../../hooks/useSpeechSynthesis';

interface AvatarProps {
  stage: number;
  setStage: (s: number) => void;
  onBookClick: () => void;
}

type QuestionKey = 'stage' | 'goal' | 'obstacle';

export const AvatarGuide = ({ stage, setStage, onBookClick }: AvatarProps) => {
  const { t, i18n } = useTranslation();
  const { speak, stop, isSpeaking, isSupported } = useSpeechSynthesis();
  const [isOpen, setIsOpen] = useState(true);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const lang = i18n.language as 'en' | 'ar';
  const isRTL = lang === 'ar';

  const questions: { key: QuestionKey; tKey: string }[] = [
    { key: 'stage', tKey: 'questions.stage' },
    { key: 'goal', tKey: 'questions.goal' },
    { key: 'obstacle', tKey: 'questions.obstacle' }
  ];

  useEffect(() => {
    // If we just entered stage 3, reset questionnaire
    if (stage === 3) {
      setCurrentQuestionIdx(0);
      setIsOpen(true);
    }
  }, [stage]);

  const handleAnswer = (option: string) => {
    const key = questions[currentQuestionIdx].key;
    setAnswers(prev => ({ ...prev, [key]: option }));

    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      // Move to Insight stage
      setStage(4);
    }
  };

  const currentQ = questions[currentQuestionIdx];
  const questionData = t(currentQ.tKey, { returnObjects: true }) as { question: string, options: string[] };

  return (
    <div className={`fixed z-50 bottom-4 ${isRTL ? 'left-4' : 'right-4'} flex flex-col items-end gap-2`}>
      <AnimatePresence>
        {isOpen && stage >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="w-80 bg-white/95 backdrop-blur-md text-dark p-6 rounded-3xl shadow-2xl mb-2 border border-white/20"
          >
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  {stage === 3 ? `Step ${currentQuestionIdx + 1}/3` : stage === 4 ? "Initial Insight" : "Next Step"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {isSupported && (
                  <button onClick={isSpeaking ? stop : () => speak(stage === 3 ? questionData.question : stage === 4 ? t('questions.insight') : t('questions.cta'), lang)} className="text-gray-400 hover:text-primary">
                    {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                )}
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-dark">
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {stage === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={currentQuestionIdx}>
                  <p className="text-lg font-bold text-darker mb-4 leading-tight">
                    {questionData.question}
                  </p>
                  <div className="grid gap-2">
                    {questionData.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleAnswer(opt)}
                        className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-primary/10 border border-gray-100 hover:border-primary/50 rounded-xl text-sm font-medium transition-all group"
                      >
                        <span className="group-hover:translate-x-1 inline-block transition-transform">{opt}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {stage === 4 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="bg-brand-gradient/10 p-4 rounded-2xl border border-primary/20 mb-4">
                    <p className="text-sm font-bold text-primary mb-1 uppercase tracking-tighter">Strategic Insight</p>
                    <p className="text-gray-700 leading-relaxed font-medium">
                      {lang === 'en'
                        ? `Based on your ${answers.stage} stage, focusing on ${answers.goal} is key. The current ${answers.obstacle} is a common hurdle we solve.`
                        : `بناءً على مرحلة ${answers.stage}، التركيز على ${answers.goal} هو المفتاح. ${answers.obstacle} الحالية هي عقبة شائعة نقوم بحلها.`
                      }
                    </p>
                  </div>
                  <p className="text-darker font-bold mb-6">
                    {t('questions.insight')}
                  </p>
                  <button
                    onClick={() => setStage(5)}
                    className="w-full bg-darker text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                  >
                    {lang === 'en' ? "Continue" : "متابعة"}
                  </button>
                </motion.div>
              )}

              {stage === 5 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                  <p className="text-lg font-bold text-darker mb-2">{t('questions.cta')}</p>
                  <div className="flex flex-col gap-1 mb-6">
                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest">{t('questions.micro.noPressure')}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">{t('questions.micro.control')}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">{t('questions.micro.handoff')}</p>
                  </div>
                  <button
                    onClick={onBookClick}
                    className="w-full bg-brand-gradient text-white py-4 rounded-xl font-black text-lg shadow-xl hover:shadow-primary/40 hover:scale-[1.02] transition-all"
                  >
                    {lang === 'en' ? "Book 15-Min Consultation" : "احجز استشارة لمدة 15 دقيقة"}
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group"
      >
        <div className="w-16 h-16 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-brand-gradient p-1">
          <div className="w-full h-full rounded-full bg-darker flex items-center justify-center text-white overflow-hidden">
            <img src="/assets/avatar_guide.png" alt="XFUSE Guide" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
          </div>
        </div>
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange rounded-full border-2 border-white flex items-center justify-center animate-bounce">
            <span className="text-[10px] text-white font-bold">!</span>
          </div>
        )}
      </motion.button>
    </div>
  );
};
