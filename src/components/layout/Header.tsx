import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const navItems = [
  { id: 'home', label_en: 'Home', label_ar: 'الرئيسية' },
  { id: 'about', label_en: 'About', label_ar: 'من نحن' },
  { id: 'vision', label_en: 'Vision', label_ar: 'الرؤية' },
  { id: 'services', label_en: 'Services', label_ar: 'الخدمات' },
  { id: 'process', label_en: 'Process', label_ar: 'العملية' },
  { id: 'team', label_en: 'Team', label_ar: 'الفريق' },
  { id: 'case-studies', label_en: 'Case Studies', label_ar: 'دراسات الحالة' },
  { id: 'special-offer', label_en: 'Special Offer', label_ar: 'عرض خاص' },
  { id: 'faq', label_en: 'FAQ', label_ar: 'الأسئلة' },
  { id: 'contact', label_en: 'Contact', label_ar: 'تواصل' }
];

interface HeaderProps {
  lightOn: boolean;
}

export function Header({ lightOn }: HeaderProps) {
  const { i18n } = useTranslation();
  const { theme, toggleTheme, isDark } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const lang = i18n.language as 'en' | 'ar';

  // Handle scroll for background blur effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple active section detection
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`
          fixed top-4 left-4 right-4 z-50 transition-all duration-500
          ${scrolled
            ? 'bg-darker/40 dark:bg-white/40 backdrop-blur-2xl border border-white/10 dark:border-black/5 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] rounded-2xl'
            : 'bg-transparent'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-3 group relative"
            >
              <div className="relative transform group-hover:rotate-12 transition-transform duration-500">
                <img
                  src="/assets/logo.svg"
                  alt="XFUSE"
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-xl transition-all duration-700 ${lightOn ? 'opacity-100 shadow-[0_0_30px_rgba(15,148,185,0.6)]' : 'opacity-20 grayscale'}`}
                />
                <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className={`text-lg md:text-2xl font-black tracking-tighter bg-gradient-to-r from-primary via-magenta to-purple bg-clip-text text-transparent transition-all duration-700 ${lightOn ? 'opacity-100' : 'opacity-20 blur-[2px]'}`}>
                  XFUSE
                </span>
                <span className={`text-[8px] font-bold uppercase tracking-[0.2em] text-gray-500 transition-opacity duration-700 ${lightOn ? 'opacity-100' : 'opacity-0'}`}>
                  Strategic Intelligence
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5">
              {navItems.slice(0, 8).map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-500
                    ${activeSection === item.id
                      ? 'bg-primary text-white shadow-[0_0_15px_rgba(15,148,185,0.4)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  {lang === 'en' ? item.label_en : item.label_ar}
                </button>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Language Switcher - Premium Toggle Design */}
              <button
                onClick={toggleLanguage}
                className="relative flex items-center bg-gray-900 border border-white/10 rounded-full p-1 w-16 h-8 group overflow-hidden"
              >
                <motion.div
                  animate={{ x: lang === 'en' ? 0 : 32 }}
                  className="w-6 h-6 bg-primary rounded-full shadow-lg z-10 flex items-center justify-center text-[8px] font-bold text-white uppercase"
                >
                  {lang === 'en' ? 'EN' : 'AR'}
                </motion.div>
                <div className="absolute inset-x-0 flex justify-around text-[8px] font-black text-gray-600">
                  <span>AR</span>
                  <span>EN</span>
                </div>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 md:p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-primary hover:border-primary/50 transition-all duration-500"
              >
                {isDark ? <Sun className="w-4 h-4 md:w-5 h-5" /> : <Moon className="w-4 h-4 md:w-5 h-5" />}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-xl bg-primary text-white shadow-lg shadow-primary/20"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: lang === 'ar' ? 320 : -320 }}
              animate={{ x: 0 }}
              exit={{ x: lang === 'ar' ? 320 : -320 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`
                fixed top-0 ${lang === 'ar' ? 'right-0' : 'left-0'} bottom-0 w-80
                bg-darker border-${lang === 'ar' ? 'l' : 'r'} border-gray-800
                z-50 lg:hidden overflow-y-auto
              `}
            >
              <div className="p-6">
                {/* Sidebar Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <img src="/assets/logo.svg" alt="XFUSE" className="w-10 h-10 rounded-lg" />
                    <span className="text-xl font-bold bg-gradient-to-r from-primary via-magenta to-purple bg-clip-text text-transparent">
                      XFUSE
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-2 mb-8">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`
                        w-full text-${lang === 'ar' ? 'right' : 'left'} px-4 py-3 rounded-lg font-medium transition-all duration-300
                        ${activeSection === item.id
                          ? 'bg-primary/10 text-primary border border-primary/20'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                        }
                      `}
                    >
                      {lang === 'en' ? item.label_en : item.label_ar}
                    </button>
                  ))}
                </nav>

                {/* Language Toggle (Mobile) */}
                <button
                  onClick={toggleLanguage}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 text-gray-400 hover:text-white transition-all duration-300"
                >
                  <Globe className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {lang === 'en' ? 'العربية' : 'English'}
                  </span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
