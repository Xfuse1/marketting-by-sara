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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

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
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
      >
        <div className={`
          flex items-center justify-between px-6 py-4 md:px-12 transition-all duration-300 border-b
          ${scrolled
            ? 'bg-darker/80 backdrop-blur-xl border-white/5 shadow-lg'
            : 'bg-transparent border-transparent py-6'
          }
        `}>
          {/* Logo & Branding */}
          <button onClick={() => scrollToSection('home')} className="flex items-center gap-3 group">
            <div className="relative group-hover:scale-110 transition-transform duration-500">
              <img
                src="/assets/logo.svg"
                alt="XFUSE"
                className="w-10 h-10 object-contain drop-shadow-[0_0_15px_rgba(15,148,185,0.4)]"
              />
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="text-xl md:text-2xl font-black tracking-tighter bg-brand-gradient bg-clip-text text-transparent">XFUSE</span>
              <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-gray-400">Strategic Intelligence</span>
            </div>
          </button>

          {/* Desktop Nav - Floating Style */}
          <nav className="hidden xl:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`
                  px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300
                  ${activeSection === item.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'}
                `}
              >
                {lang === 'en' ? item.label_en : item.label_ar}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Premium Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="relative w-16 h-8 bg-gray-900 border border-white/10 rounded-full p-1 flex items-center group cursor-pointer"
            >
              <motion.div
                animate={{ x: lang === 'en' ? 0 : 32 }}
                className="w-6 h-6 bg-primary rounded-full z-10 flex items-center justify-center text-[8px] font-black text-white"
              >
                {lang === 'en' ? 'EN' : 'AR'}
              </motion.div>
              <div className="absolute inset-0 flex justify-around items-center text-[7px] font-bold text-gray-500 px-2 select-none">
                <span>AR</span>
                <span>EN</span>
              </div>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="xl:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-white"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Re-implemented */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]"
            />
            <motion.div
              initial={{ x: lang === 'ar' ? 300 : -300 }}
              animate={{ x: 0 }}
              exit={{ x: lang === 'ar' ? 300 : -300 }}
              className={`fixed top-0 ${lang === 'ar' ? 'right-0' : 'left-0'} h-full w-80 bg-darker z-[70] p-8 border-${lang === 'ar' ? 'l' : 'r'} border-white/10`}
            >
              <div className="flex justify-between items-center mb-10">
                <span className="text-2xl font-black bg-brand-gradient bg-clip-text text-transparent italic">XFUSE</span>
                <button onClick={() => setMobileMenuOpen(false)}><X className="text-white" /></button>
              </div>
              <nav className="flex flex-col gap-4">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left py-2 text-gray-400 hover:text-white text-lg font-bold uppercase tracking-tighter"
                  >
                    {lang === 'en' ? item.label_en : item.label_ar}
                  </button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
