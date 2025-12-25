import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Global3DBackground } from './components/3d/GlobalBackground';
import { AvatarGuide } from './components/avatar/AvatarGuide';
import { CustomCursor } from './components/ui/CustomCursor';
import { Header } from './components/layout/Header';
import { Vision } from './components/sections/Vision';
import { CaseStudies } from './components/sections/CaseStudies';
import { FAQSection } from './components/sections/FAQSection';
import { SpecialOfferSection } from './components/sections/SpecialOfferSection';
import { SpecialOfferBanner } from './components/ui/SpecialOfferBanner';
import { QuickActions } from './components/ui/QuickActions';
import { Repository } from './data/repository';

import { Hero } from './components/sections/Hero';

function App() {
  const { t, i18n } = useTranslation();
  const [stage, setStage] = useState(0);
  const [lightOn, setLightOn] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlugConnect = () => {
    setShowFlash(true);
    setLightOn(true);
    setStage(2);
    document.body.classList.add('light-spread-active');

    setTimeout(() => setShowFlash(false), 1000);

    // Auto-transition to questionnaire after reveal animation
    setTimeout(() => {
      setStage(3);
    }, 3000);
  };

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
    <div className={`relative min-h-screen transition-colors duration-300 ${lightOn ? 'text-white' : 'text-gray-400'} bg-darker dark:bg-white`}>
      {/* Global Components */}
      <CustomCursor />
      {showFlash && <div className="flash-overlay" />}
      <Global3DBackground />
      <Header lightOn={lightOn} />
      <SpecialOfferBanner />
      <QuickActions />

      <main className="relative z-10">
        <Hero stage={stage} setStage={setStage} onConnect={handlePlugConnect} lightOn={lightOn} />


        {/* All Other Sections (visible after light is on) */}
        {lightOn && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
            {/* About Section */}
            <section id="about" className="min-h-screen flex items-center justify-center px-6 py-12">
              <div className="max-w-4xl text-center">
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-100px" }}
                  className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-magenta to-purple bg-clip-text text-transparent"
                >
                  {i18n.language === 'en' ? 'About XFUSE' : 'عن XFUSE'}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ delay: 0.2 }}
                  className="text-lg md:text-xl leading-relaxed text-gray-300 dark:text-gray-800 mb-6"
                >
                  {i18n.language === 'en'
                    ? "We are the strategic partner that transforms your brand vision into measurable business outcomes. Born from the understanding that MENA's digital landscape demands more than execution—it requires cultural fluency, strategic depth, and relentless optimization."
                    : "نحن الشريك الاستراتيجي الذي يحول رؤية علامتك التجارية إلى نتائج أعمال قابلة للقياس. ولدنا من فهم أن المشهد الرقمي في منطقة الشرق الأوسط وشمال إفريقيا يتطلب أكثر من مجرد التنفيذ - فهو يتطلب الطلاقة الثقافية والعمق الاستراتيجي والتحسين المستمر."}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ delay: 0.4 }}
                  className="text-base md:text-lg leading-relaxed text-gray-400 dark:text-gray-700"
                >
                  {i18n.language === 'en'
                    ? "We bridge data and creativity, combining performance marketing, content strategy, market intelligence, community management, and public relations into a unified force. No silos. No guesswork. Just results."
                    : "نربط بين البيانات والإبداع، والجمع بين التسويق الأدائي، واستراتيجية المحتوى، والذكاء السوقي، وإدارة المجتمع، والعلاقات العامة في قوة موحدة. لا صوامع. لا تخمين. فقط نتائج."}
                </motion.p>
              </div>
            </section>

            {/* Vision & Mission Section */}
            <section id="vision" className="relative">
              <Vision />
            </section>

            {/* Services Section */}
            <section id="services" className="min-h-screen py-12 px-6 relative overflow-hidden">
              <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: -30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-100px" }}
                  className="text-center mb-16"
                >
                  <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-primary via-magenta to-purple bg-clip-text text-transparent">
                    {i18n.language === 'en' ? 'Our Services' : 'خدماتنا'}
                  </h2>
                  <p className="text-gray-400 dark:text-gray-800 text-lg max-w-2xl mx-auto">
                    {i18n.language === 'en'
                      ? 'Comprehensive digital solutions tailored to your business needs'
                      : 'حلول رقمية شاملة مصممة خصيصاً لاحتياجات عملك'}
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      icon: '🎯',
                      title: i18n.language === 'en' ? 'Strategic Planning' : 'التخطيط الاستراتيجي',
                      desc: i18n.language === 'en' ? 'Transform vision into measurable outcomes' : 'تحويل الرؤية إلى نتائج قابلة للقياس',
                      gradient: 'from-orange/20 to-orange/5',
                      borderColor: 'group-hover:border-orange'
                    },
                    {
                      icon: '📊',
                      title: i18n.language === 'en' ? 'Media Buying' : 'شراء الوسائط',
                      desc: i18n.language === 'en' ? 'Maximize ROAS across all platforms' : 'تعظيم العائد عبر جميع المنصات',
                      gradient: 'from-primary/20 to-primary/5',
                      borderColor: 'group-hover:border-primary'
                    },
                    {
                      icon: '🎬',
                      title: i18n.language === 'en' ? 'Content Creation' : 'إنشاء المحتوى',
                      desc: i18n.language === 'en' ? 'Viral-ready stories that engage' : 'قصص جاهزة للانتشار تجذب الجمهور',
                      gradient: 'from-magenta/20 to-magenta/5',
                      borderColor: 'group-hover:border-magenta'
                    },
                    {
                      icon: '🔍',
                      title: i18n.language === 'en' ? 'Market Research' : 'أبحاث السوق',
                      desc: i18n.language === 'en' ? 'Uncover competitive intelligence' : 'اكتشف معلومات استخبارات المنافسين',
                      gradient: 'from-purple/20 to-purple/5',
                      borderColor: 'group-hover:border-purple'
                    },
                    {
                      icon: '💬',
                      title: i18n.language === 'en' ? 'Community Management' : 'إدارة المجتمع',
                      desc: i18n.language === 'en' ? 'Build loyal brand advocates' : 'بناء مناصرين مخلصين للعلامة التجارية',
                      gradient: 'from-secondary/20 to-secondary/5',
                      borderColor: 'group-hover:border-secondary'
                    },
                    {
                      icon: '📢',
                      title: i18n.language === 'en' ? 'Public Relations' : 'العلاقات العامة',
                      desc: i18n.language === 'en' ? 'Shape perception, protect reputation' : 'شكل التصور، احمِ السمعة',
                      gradient: 'from-primary/20 via-magenta/10 to-purple/5',
                      borderColor: 'group-hover:border-primary'
                    }
                  ].map((service, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 60, rotateX: 10 }}
                      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                      viewport={{ once: false, margin: "-100px" }}
                      transition={{
                        delay: idx * 0.1,
                        duration: 0.6,
                        type: "spring",
                        stiffness: 100
                      }}
                      whileHover={{
                        y: -10,
                        rotateY: 5,
                        scale: 1.02,
                        transition: { duration: 0.3 }
                      }}
                      className={`group relative bg-gradient-to-br ${service.gradient} backdrop-blur-md border-2 border-gray-800/50 ${service.borderColor} p-8 rounded-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 overflow-hidden`}
                      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                    >
                      {/* Animated background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Glowing corner */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-primary/20 rounded-bl-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="relative z-10">
                        {/* Icon container with background */}
                        <div className="relative inline-block mb-6">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                          <div className="relative text-6xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                            {service.icon}
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold mb-3 text-white dark:text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-magenta transition-all duration-300">
                          {service.title}
                        </h3>

                        <p className="text-gray-400 dark:text-gray-800 text-sm leading-relaxed group-hover:text-gray-300 dark:group-hover:text-gray-800 transition-colors duration-300">
                          {service.desc}
                        </p>

                        {/* Bottom accent line */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-magenta/5 rounded-full blur-3xl" />
            </section>

            {/* Process Section */}
            <section id="process" className="min-h-screen py-12 px-6 bg-gradient-to-b from-transparent to-gray-900/50">
              <div className="max-w-5xl mx-auto">
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-100px" }}
                  className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-primary via-magenta to-purple bg-clip-text text-transparent"
                >
                  {i18n.language === 'en' ? 'Our Process' : 'عمليتنا'}
                </motion.h2>

                <div className="space-y-8">
                  {[
                    {
                      num: '01',
                      title: i18n.language === 'en' ? 'Understand' : 'فهم',
                      desc:
                        i18n.language === 'en'
                          ? 'Deep dive into your brand, audience, and market position'
                          : 'غوص عميق في علامتك التجارية وجمهورك ومركزك في السوق'
                    },
                    {
                      num: '02',
                      title: i18n.language === 'en' ? 'Analyze' : 'تحليل',
                      desc:
                        i18n.language === 'en'
                          ? 'Data-driven insights reveal opportunities and threats'
                          : 'رؤى مدفوعة بالبيانات تكشف الفرص والتهديدات'
                    },
                    {
                      num: '03',
                      title: i18n.language === 'en' ? 'Decide' : 'قرر',
                      desc:
                        i18n.language === 'en'
                          ? 'Strategic roadmap with clear KPIs and milestones'
                          : 'خارطة طريق استراتيجية مع مؤشرات أداء ومعالم واضحة'
                    },
                    {
                      num: '04',
                      title: i18n.language === 'en' ? 'Execute' : 'تنفيذ',
                      desc:
                        i18n.language === 'en'
                          ? 'Flawless implementation across all channels'
                          : 'تنفيذ خالي من العيوب عبر جميع القنوات'
                    },
                    {
                      num: '05',
                      title: i18n.language === 'en' ? 'Optimize' : 'تحسين',
                      desc:
                        i18n.language === 'en'
                          ? 'Continuous refinement based on real-time performance'
                          : 'تحسين مستمر بناءً على الأداء في الوقت الفعلي'
                    }
                  ].map((step, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, margin: "-100px" }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex gap-6 items-start group"
                    >
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary/20 to-purple/20 rounded-full flex items-center justify-center font-bold text-2xl text-primary group-hover:scale-110 transition-transform">
                        {step.num}
                      </div>
                      <div className="flex-1 pt-2">
                        <h3 className="text-2xl font-bold mb-2 text-white dark:text-gray-900">{step.title}</h3>
                        <p className="text-gray-400 dark:text-gray-800">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Team Section */}
            <section id="team" className="py-12 px-6">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                  <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-magenta to-purple bg-clip-text text-transparent"
                  >
                    {i18n.language === 'en' ? 'Meet The Team' : 'تعرف على الفريق'}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-400 dark:text-gray-800"
                  >
                    {i18n.language === 'en'
                      ? '5 specialized departments, 1 unified goal: Your success'
                      : '5 أقسام متخصصة، هدف واحد: نجاحك'}
                  </motion.p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      name: i18n.language === 'en' ? 'Sarah Al-Mansouri' : 'سارة المنصوري',
                      role: i18n.language === 'en' ? 'Public Relations' : 'العلاقات العامة',
                      color: 'from-purple/20 to-purple/5',
                      border: 'border-purple/30'
                    },
                    {
                      name: i18n.language === 'en' ? 'Ahmed Hassan' : 'أحمد حسن',
                      role: i18n.language === 'en' ? 'Media Buying' : 'شراء الوسائط',
                      color: 'from-primary/20 to-primary/5',
                      border: 'border-primary/30'
                    },
                    {
                      name: i18n.language === 'en' ? 'Layla Ibrahim' : 'ليلى إبراهيم',
                      role: i18n.language === 'en' ? 'Content Creation' : 'إنشاء المحتوى',
                      color: 'from-magenta/20 to-magenta/5',
                      border: 'border-magenta/30'
                    },
                    {
                      name: i18n.language === 'en' ? 'Omar Al-Farsi' : 'عمر الفارسي',
                      role: i18n.language === 'en' ? 'Market Research' : 'أبحاث السوق',
                      color: 'from-secondary/20 to-secondary/5',
                      border: 'border-secondary/30'
                    },
                    {
                      name: i18n.language === 'en' ? 'Fatima Al-Zahra' : 'فاطمة الزهراء',
                      role: i18n.language === 'en' ? 'Community Management' : 'إدارة المجتمع',
                      color: 'from-orange/20 to-orange/5',
                      border: 'border-orange/30'
                    }
                  ].map((member, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ delay: idx * 0.15 }}
                      className={`group bg-gradient-to-r ${member.color} border ${member.border} rounded-xl p-6 hover:scale-[1.02] transition-all duration-300`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center text-2xl">
                          👤
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white dark:text-gray-900">{member.name}</h3>
                          <p className="text-gray-400 dark:text-gray-700 text-sm">{member.role}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Case Studies Section */}
            <section id="case-studies" className="relative">
              <CaseStudies onBookClick={() => setIsModalOpen(true)} />
            </section>

            {/* Special Offer Section */}
            <section id="special-offer" className="relative">
              <SpecialOfferSection onBookClick={() => setIsModalOpen(true)} />
            </section>

            {/* FAQ Section */}
            <section id="faq" className="relative">
              <FAQSection onBookClick={() => setIsModalOpen(true)} />
            </section>

            {/* Contact Section */}
            <section id="contact" className="min-h-screen flex items-center justify-center py-12 px-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center max-w-3xl"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-magenta to-purple bg-clip-text text-transparent">
                  {i18n.language === 'en' ? 'Ready to Transform Your Brand?' : 'هل أنت مستعد لتحويل علامتك التجارية؟'}
                </h2>
                <p className="text-gray-400 text-lg mb-8">
                  {i18n.language === 'en'
                    ? "Book a free 15-minute consultation. No pressure, just strategic clarity."
                    : "احجز استشارة مجانية لمدة 15 دقيقة. لا ضغط، فقط وضوح استراتيجي."}
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-4 bg-gradient-to-r from-primary via-magenta to-purple rounded-lg text-xl font-bold hover:shadow-2xl hover:shadow-primary/50 hover:scale-105 transition-all duration-300"
                >
                  {i18n.language === 'en' ? 'Book Your Consultation' : 'احجز استشارتك'}
                </button>
              </motion.div>
            </section>
          </motion.div>
        )}
      </main>

      {/* Avatar Guide */}
      <AvatarGuide stage={stage} setStage={setStage} onBookClick={() => setIsModalOpen(true)} />

      {/* Consultation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur px-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-darker/95 backdrop-blur-lg p-8 rounded-2xl w-full max-w-md border border-primary/30"
            >
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-magenta bg-clip-text text-transparent">
                {i18n.language === 'en' ? 'Book Free Consultation' : 'احجز استشارة مجانية'}
              </h3>
              <form onSubmit={handleBookSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder={i18n.language === 'en' ? 'Your Name' : 'اسمك'}
                  className="w-full bg-black/30 border border-gray-700 focus:border-primary p-3 rounded text-white outline-none transition-colors"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder={i18n.language === 'en' ? 'Email Address' : 'البريد الإلكتروني'}
                  className="w-full bg-black/30 border border-gray-700 focus:border-primary p-3 rounded text-white outline-none transition-colors"
                  required
                />
                <select
                  name="slot"
                  className="w-full bg-black/30 border border-gray-700 focus:border-primary p-3 rounded text-white outline-none transition-colors"
                >
                  <option value="10:00">10:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                </select>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 text-gray-400 hover:text-white border border-gray-700 rounded-lg transition-colors"
                  >
                    {i18n.language === 'en' ? 'Cancel' : 'إلغاء'}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-primary via-magenta to-purple py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-primary/50 transition-all"
                  >
                    {i18n.language === 'en' ? 'Confirm' : 'تأكيد'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
