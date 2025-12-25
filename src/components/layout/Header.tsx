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

export function Header() {
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
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${
            scrolled
              ? 'bg-darker/80 dark:bg-white/80 backdrop-blur-lg border-b border-gray-800/50 dark:border-gray-200 shadow-lg'
              : 'bg-transparent'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                <img
                  src="/assets/logo.svg"
                  alt="XFUSE"
                  className="w-10 h-10 rounded-lg group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-primary/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary via-magenta to-purple bg-clip-text text-transparent">
                XFUSE
              </span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                    ${
                      activeSection === item.id
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-black hover:bg-gray-800/50 dark:hover:bg-gray-200/50'
                    }
                  `}
                >
                  {lang === 'en' ? item.label_en : item.label_ar}
                </button>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-800/50 dark:bg-gray-200/50 hover:bg-gray-800 dark:hover:bg-gray-300 text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-black transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/50 dark:bg-gray-200/50 hover:bg-gray-800 dark:hover:bg-gray-300 text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-black transition-all duration-300"
                aria-label="Toggle language"
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium">{lang === 'en' ? 'AR' : 'EN'}</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-gray-800/50 dark:bg-gray-200/50 hover:bg-gray-800 dark:hover:bg-gray-300 text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-black transition-all duration-300"
                aria-label="Toggle menu"
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
                        ${
                          activeSection === item.id
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
