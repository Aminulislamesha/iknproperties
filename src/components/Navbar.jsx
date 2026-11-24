import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MapPin, Globe, Menu, X, Shield, Lock, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { lang, toggleLanguage, settings, openInquiryModal } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: lang === 'bn' ? 'হোম' : 'Home', path: '/' },
    { name: lang === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us', path: '/about' },
    { name: lang === 'bn' ? 'প্রকল্পসমূহ' : 'Projects', path: '/projects' },
    { name: lang === 'bn' ? 'সেবাসমূহ' : 'Services', path: '/services' },
    { name: lang === 'bn' ? 'কাজের অগ্রগতি' : 'Live Progress', path: '/project-progress' },
    { name: lang === 'bn' ? 'ব্লগ ও নির্দেশিকা' : 'Blogs', path: '/blogs' },
    { name: lang === 'bn' ? 'যোগাযোগ' : 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Bar (Dark Emerald Luxury) */}
      <div className="bg-brandDark text-slate-200 border-b border-white/10 text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Contact Numbers & Location */}
          <div className="flex items-center flex-wrap gap-4 sm:gap-6">
            <a
              href="tel:01703033789"
              className="flex items-center gap-1.5 hover:text-gold transition font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span>01703-033789</span>
            </a>
            <a
              href="tel:01721961935"
              className="hidden sm:flex items-center gap-1.5 hover:text-gold transition font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span>01721-961935</span>
            </a>
            <div className="hidden md:flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{settings?.addressBn || '158/1B, Moynarbag, North Badda, Dhaka'}</span>
            </div>
          </div>

          {/* Right Action: Language toggle & Admin link */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white transition text-xs font-semibold"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-gold" />
              <span>{lang === 'en' ? 'বাংলা' : 'English'}</span>
            </button>

            <Link
              to="/admin/login"
              className="flex items-center gap-1 text-slate-400 hover:text-white transition text-xs"
              title="Admin Portal"
            >
              <Lock className="w-3 h-3" />
              <span className="hidden sm:inline">Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-white py-4 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-700 via-primary-800 to-primary-950 flex items-center justify-center shadow-md border border-gold/40 group-hover:scale-105 transition-transform">
              <Shield className="w-6 h-6 text-gold" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-primary-950 block leading-tight font-sans">
                IKN <span className="text-gold">PROPERTIES</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-500 block">
                {lang === 'bn' ? 'আবাসন ও জমি শেয়ারিং' : 'Land Share & Real Estate'}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-primary-700 bg-primary-50 font-bold'
                    : 'text-slate-700 hover:text-primary-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Action CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => openInquiryModal()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-900 bg-gold hover:bg-gold-400 active:scale-95 transition shadow-md shadow-gold/20"
            >
              <span>{lang === 'bn' ? 'ফ্ল্যাট বুকিং' : 'Book a Flat'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-6 shadow-xl animate-fade-in">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                    isActive(link.path)
                      ? 'text-primary-700 bg-primary-50 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-3">
                <button
                  onClick={() => openInquiryModal()}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-slate-900 bg-gold hover:bg-gold-400 transition"
                >
                  <span>{lang === 'bn' ? 'পরামর্শ ও বুকিং' : 'Book Consultation'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
