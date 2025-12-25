import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
    const { i18n } = useTranslation();
    const lang = i18n.language as 'en' | 'ar';

    const footerLinks = [
        { id: 'about', label: lang === 'en' ? 'About' : 'من نحن' },
        { id: 'services', label: lang === 'en' ? 'Services' : 'الخدمات' },
        { id: 'process', label: lang === 'en' ? 'Process' : 'عمليتنا' },
        { id: 'contact', label: lang === 'en' ? 'Contact' : 'تواصل معنا' }
    ];

    return (
        <footer className="bg-darker border-t border-white/5 pt-20 pb-10 px-6 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Col */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <img src="/assets/logo.svg" alt="XFUSE" className="w-12 h-12 shadow-[0_0_20px_rgba(15,148,185,0.3)]" />
                            <span className="text-3xl font-black bg-brand-gradient bg-clip-text text-transparent italic">XFUSE</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            {lang === 'en'
                                ? 'The Strategic partner that transforms brand vision into measurable business outcomes through intelligence and creativity.'
                                : 'الشريك الاستراتيجي الذي يحول رؤية علامتك التجارية إلى نتائج أعمال قابلة للقياس من خلال الذكاء والإبداع.'}
                        </p>
                        <div className="flex gap-4">
                            {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                                <motion.a
                                    key={i}
                                    href="#"
                                    whileHover={{ scale: 1.2, color: '#0F94B9' }}
                                    className="text-gray-500 transition-colors"
                                >
                                    <Icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs">{lang === 'en' ? 'Navigation' : 'التنقل'}</h4>
                        <ul className="space-y-4">
                            {footerLinks.map((link) => (
                                <li key={link.id}>
                                    <a href={`#${link.id}`} className="text-gray-400 hover:text-primary transition-colors text-sm">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services Col */}
                    <div className="space-y-6">
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs">{lang === 'en' ? 'Core Expertise' : 'خبراتنا الأساسية'}</h4>
                        <ul className="space-y-4">
                            {['Media Buying', 'Public Relations', 'Content Strategy', 'Market Research'].map((s, i) => (
                                <li key={i} className="text-gray-400 text-sm">{s}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Col */}
                    <div className="space-y-6">
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs">{lang === 'en' ? 'Connect' : 'اتصال'}</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-center gap-3">
                                <Mail size={16} className="text-primary" />
                                <span>strategy@xfuse.agency</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={16} className="text-primary" />
                                <span>+971 50 XXXXXXX</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <MapPin size={16} className="text-primary" />
                                <span>Dubai, UAE</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                    <p>© 2025 XFUSE STRATEGIC INTELLIGENCE. ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
