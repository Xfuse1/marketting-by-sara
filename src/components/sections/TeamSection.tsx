import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSpeechSynthesis } from '../../hooks/useSpeechSynthesis';

const teamMembers = [
    {
        id: 1,
        name: { en: 'Sarah Al-Mansouri', ar: 'سارة المنصوري' },
        role: { en: 'Public Relations', ar: 'العلاقات العامة' },
        bio: {
            en: 'Specializing in shaping brand perception and managing cross-cultural communication.',
            ar: 'متخصصة في تشكيل تصور العلامة التجارية وإدارة التواصل عبر الثقافات.'
        },
        voiceText: {
            en: "Hi, I'm Sarah. I bridge the gap between your brand and the public eye with strategic PR.",
            ar: "مرحباً، أنا سارة. أقوم بسد الفجوة بين علامتك التجارية والجمهور من خلال العلاقات العامة الاستراتيجية."
        },
        avatar: '/assets/team/member1.png',
        color: 'from-purple/20'
    },
    {
        id: 2,
        name: { en: 'Ahmed Hassan', ar: 'أحمد حسن' },
        role: { en: 'Media Buying', ar: 'شراء الوسائط الإعلانية' },
        bio: {
            en: 'Performance-driven expert focused on maximizing ROAS across global platforms.',
            ar: 'خبير مدفوع بالأداء يركز على تعظيم العائد على الإنفاق الإعلاني عبر المنصات العالمية.'
        },
        voiceText: {
            en: "I'm Ahmed. My mission is to ensure every dollar you spend on ads brings the highest possible return.",
            ar: "أنا أحمد. مهمتي هي التأكد من أن كل دولار تنفقه على الإعلانات يحقق أعلى عائد ممكن."
        },
        avatar: '/assets/team/member2.png',
        color: 'from-primary/20'
    },
    {
        id: 3,
        name: { en: 'Layla Ibrahim', ar: 'ليلى إبراهيم' },
        role: { en: 'Content Strategy', ar: 'استراتيجية المحتوى' },
        bio: {
            en: 'Crafting viral-ready narratives that resonate with MENA audiences.',
            ar: 'صياغة روايات جاهزة للانتشار تتردد صداها مع جمهور الشرق الأوسط وأفريقيا.'
        },
        voiceText: {
            en: "Hello, I'm Layla. I create stories that people relate to and share across all digital channels.",
            ar: "أهلاً، أنا ليلى. أصنع القصص التي يرتبط بها الناس ويشاركونها عبر جميع القنوات الرقمية."
        },
        avatar: '/assets/team/member3.png',
        color: 'from-magenta/20'
    }
];

export const TeamSection: React.FC = () => {
    const { i18n } = useTranslation();
    const lang = i18n.language as 'en' | 'ar';
    const { speak, stop, isSpeaking } = useSpeechSynthesis();
    const [activeIndex, setActiveIndex] = useState(0);

    const next = () => setActiveIndex((prev) => (prev + 1) % teamMembers.length);
    const prev = () => setActiveIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);

    const currentMember = teamMembers[activeIndex];

    return (
        <section id="team" className="py-24 px-6 relative overflow-hidden bg-darker/50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-primary to-purple bg-clip-text text-transparent">
                        {lang === 'en' ? 'The Strategic Minds' : 'العقول الاستراتيجية'}
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto uppercase tracking-widest text-sm">
                        {lang === 'en' ? 'AI-Powered expertise at your service' : 'خبرة مدعومة بالذكاء الاصطناعي في خدمتك'}
                    </p>
                </div>

                <div className="relative flex flex-col md:flex-row items-center gap-12 bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2rem] shadow-2xl">
                    {/* Avatar Side */}
                    <div className="w-full md:w-1/2 flex justify-center relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                exit={{ opacity: 0, scale: 1.1, rotateY: 20 }}
                                className="relative w-64 h-64 md:w-80 md:h-80"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${currentMember.color} to-transparent blur-3xl opacity-50 rounded-full`} />
                                <img
                                    src={currentMember.avatar}
                                    alt={currentMember.name[lang]}
                                    className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_30px_rgba(15,148,185,0.4)]"
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Controls for Voice */}
                        <button
                            onClick={() => isSpeaking ? stop() : speak(currentMember.voiceText[lang], lang)}
                            className="absolute bottom-0 right-1/4 z-20 p-4 bg-white text-darker rounded-full shadow-xl hover:scale-110 transition-transform group"
                        >
                            {isSpeaking ? <VolumeX className="text-primary" /> : <Volume2 className="group-hover:text-primary transition-colors" />}
                        </button>
                    </div>

                    {/* Info Side */}
                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <h3 className="text-3xl md:text-5xl font-bold text-white mb-2">{currentMember.name[lang]}</h3>
                                <p className="text-primary font-bold uppercase tracking-widest mb-6">{currentMember.role[lang]}</p>
                                <p className="text-xl text-gray-400 leading-relaxed font-light italic mb-8 border-l-2 border-primary/30 pl-6 ml-1">
                                    "{currentMember.bio[lang]}"
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        <div className="flex gap-4 justify-center md:justify-start">
                            <button onClick={prev} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                                <ChevronLeft className="text-white" />
                            </button>
                            <div className="flex items-center gap-2">
                                {teamMembers.map((_, i) => (
                                    <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 bg-primary' : 'w-2 bg-white/20'}`} />
                                ))}
                            </div>
                            <button onClick={next} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                                <ChevronRight className="text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
