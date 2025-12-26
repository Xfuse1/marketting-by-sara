import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Global3DBackground } from './components/3d/GlobalBackground';
import { AvatarGuide } from './components/avatar/AvatarGuide';
import { CustomCursor } from './components/ui/CustomCursor';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Vision } from './components/sections/Vision';
import { CaseStudies } from './components/sections/CaseStudies';
import { FAQSection } from './components/sections/FAQSection';
import { SpecialOfferSection } from './components/sections/SpecialOfferSection';
import { SpecialOfferBanner } from './components/ui/SpecialOfferBanner';
import { QuickActions } from './components/ui/QuickActions';
import { Repository } from './data/repository';
import type { Service } from './data/types';

import { Hero } from './components/sections/Hero';
import { TeamSection } from './components/sections/TeamSection';
import { usePerformanceCheck } from './hooks/usePerformanceCheck';

function App() {
  const { t, i18n } = useTranslation();
  const isWeakDevice = usePerformanceCheck();

  const [stage, setStage] = useState(3); // Start at questions stage directly
  const [lightOn, setLightOn] = useState(true); // Always on
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [servicesData, setServicesData] = useState<Service[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  useEffect(() => {
    Repository.getServices()
      .then(setServicesData)
      .finally(() => setServicesLoading(false));
  }, []);

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    Repository.saveLead({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      slot: formData.get('slot') as string,
      timestamp: Date.now()
    });
    setIsModalOpen(false);
    alert(t('modal.success') || 'Consultation booked successfully!');
  };

  return (
    <div className={`relative min-h-screen transition-colors duration-300 text-white bg-darker dark:bg-white`}>
      <CustomCursor />
      <Global3DBackground />
      <Header lightOn={true} />
      <SpecialOfferBanner />
      <QuickActions />

      <main className="relative z-10">
        <Hero
          stage={stage}
          setStage={setStage}
          onConnect={() => { }}
          lightOn={true}
          isWeakDevice={isWeakDevice}
        />

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          {/* About Section */}
          <section id="about" className="min-h-screen flex items-center justify-center px-6 py-24">
            <div className="max-w-4xl text-center">
              <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="text-4xl md:text-8xl font-black mb-8 bg-brand-gradient bg-clip-text text-transparent italic"
              >
                {i18n.language === 'en' ? 'About XFUSE' : 'عن XFUSE'}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-xl md:text-3xl leading-relaxed text-gray-300 dark:text-gray-800 mb-8 font-light italic"
              >
                {i18n.language === 'en'
                  ? "We are the strategic partner that transforms brand vision into measurable business outcomes."
                  : "نحن الشريك الاستراتيجي الذي يحول رؤية علامتك التجارية إلى نتائج أعمال قابلة للقياس."}
              </motion.p>
            </div>
          </section>

          <Vision />

          {/* Services Section */}
          <section id="services" className="py-32 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-24">
                <h2 className="text-5xl md:text-7xl font-black mb-6 bg-brand-gradient bg-clip-text text-transparent uppercase tracking-tighter italic">
                  {i18n.language === 'en' ? 'Our Expertise' : 'خبراتنا'}
                </h2>
                <p className="text-gray-500 font-bold tracking-[0.3em] uppercase text-xs">
                  {i18n.language === 'en' ? 'Strategic depth in every move' : 'عمق استراتيجي في كل خطوة'}
                </p>
              </div>

              {servicesLoading ? (
                <div className="flex items-center justify-center h-40">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="grid md:grid-cols-3 gap-8">
                  {servicesData.map((item, i) => {
                    const icons: Record<string, string> = {
                      s1: '🧠', s2: '📈', s3: '💡', s4: '🔬', s5: '🤝', s6: '🌍'
                    };
                    const icon = icons[item.id] || '✨';
                    const lang = i18n.language as 'en' | 'ar';

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -10 }}
                        onClick={() => {
                          const phone = '201508557715';
                          const msg = `I'm interested in ${item.title[lang]}`;
                          window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
                        }}
                        className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[2.5rem] group cursor-pointer hover:border-primary/50 transition-all"
                      >
                        <div className="text-5xl mb-6 group-hover:rotate-12 transition-transform inline-block">{icon}</div>
                        <h3 className="text-2xl font-bold mb-4 text-white uppercase tracking-tight">{item.title[lang]}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{item.description[lang]}</p>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          {/* Process Section */}
          <section id="process" className="py-32 bg-darker/30">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-4xl md:text-6xl font-black mb-20 text-center text-white italic tracking-tighter">Strategic Roadmap</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                {['Understand', 'Analyze', 'Decide', 'Execute', 'Optimize'].map((step, i) => (
                  <div key={i} className="text-center group">
                    <div className="w-16 h-16 bg-brand-gradient rounded-full mx-auto mb-6 flex items-center justify-center text-white font-black text-xl shadow-2xl group-hover:scale-110 transition-transform">
                      {i + 1}
                    </div>
                    <h4 className="text-white font-bold uppercase tracking-widest text-[10px]">{step}</h4>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <TeamSection />
          <CaseStudies onBookClick={() => setIsModalOpen(true)} />
          <SpecialOfferSection onBookClick={() => setIsModalOpen(true)} />
          <FAQSection onBookClick={() => setIsModalOpen(true)} />

          {/* Final CTA */}
          <section id="contact" className="min-h-screen py-24 flex flex-col items-center justify-center px-6 relative overflow-hidden">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-primary/10 blur-[150px] rounded-full" />
            <h2 className="text-6xl md:text-[10rem] font-black mb-12 bg-white/5 bg-clip-text text-transparent text-center leading-none tracking-tighter select-none">
              TRANSFORM<br />NOW
            </h2>
            <div className="relative z-10 text-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-16 py-6 bg-white text-darker rounded-[2rem] text-2xl font-black hover:bg-primary hover:text-white transition-all duration-500 uppercase tracking-widest shadow-2xl"
              >
                {i18n.language === 'en' ? 'Book Consultation' : 'حجز استشارة'}
              </button>
              <p className="mt-8 text-gray-500 text-[10px] font-bold uppercase tracking-[0.4em]">Strategic. Smart. Simple.</p>
            </div>
          </section>
        </motion.div>
      </main>

      <Footer />
      <AvatarGuide stage={stage} setStage={setStage} onBookClick={() => setIsModalOpen(true)} />

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 backdrop-blur-2xl px-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-darker p-10 rounded-[3rem] w-full max-w-md border border-white/10 shadow-2xl"
            >
              <h3 className="text-3xl font-black mb-8 bg-brand-gradient bg-clip-text text-transparent text-center">CONSULTATION</h3>
              <form onSubmit={handleBookSubmit} className="space-y-6">
                <input type="text" name="name" placeholder={t('modal.name')} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none" required />
                <input type="email" name="email" placeholder={t('modal.email')} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none" required />
                <button type="submit" className="w-full bg-brand-gradient py-5 rounded-2xl font-black text-white shadow-xl">CONFIRM BOOKING</button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="w-full text-gray-500 text-[10px] font-bold uppercase tracking-widest">Cancel</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
