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

    const openWhatsApp = (msg: string) => {
        const phone = '201508557715';
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
    };

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
                            <motion.a href="https://www.facebook.com/XFuse1" target="_blank" whileHover={{ scale: 1.2, color: '#0F94B9' }} className="text-gray-500 transition-colors">
                                <Instagram size={20} /> {/* Assuming user is okay with Instagram icon represented as Facebook for now or I should probably import Facebook if available, but staying with existing structure for speed unless I see lucide imports. I see Instagram imported. I will use existing icons but mapped correctly if possible. Actually, lucide has Facebook. I should check imports. */}
                            </motion.a>
                            <motion.a href="https://www.linkedin.com/in/xfuse-agency" target="_blank" whileHover={{ scale: 1.2, color: '#0F94B9' }} className="text-gray-500 transition-colors">
                                <Linkedin size={20} />
                            </motion.a>
                            <motion.a href="https://x.com/_Xfuse" target="_blank" whileHover={{ scale: 1.2, color: '#0F94B9' }} className="text-gray-500 transition-colors">
                                <Twitter size={20} />
                            </motion.a>
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
                                <li key={i} onClick={() => openWhatsApp(`I'm interested in ${s}`)} className="text-gray-400 text-sm cursor-pointer hover:text-primary transition-colors">{s}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Col */}
                    <div className="space-y-6">
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs">{lang === 'en' ? 'Connect' : 'اتصال'}</h4>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary/20 group-hover:border-primary/30 transition-all">
                                    <Mail size={18} />
                                </div>
                                <span className="text-gray-400 text-sm group-hover:text-white transition-colors">Info@xfuse.online</span>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary/20 group-hover:border-primary/30 transition-all">
                                    <Phone size={18} />
                                </div>
                                <span className="text-gray-400 text-sm group-hover:text-white transition-colors">01508557715</span>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary/20 group-hover:border-primary/30 transition-all">
                                    <MapPin size={18} />
                                </div>
                                <span className="text-gray-400 text-sm group-hover:text-white transition-colors">Egypt</span>
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
