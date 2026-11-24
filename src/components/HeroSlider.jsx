import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShieldCheck, ArrowRight, Sparkles, Phone, Mail, GraduationCap } from 'lucide-react';
import { useApp } from '../context/AppContext';

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
  );
}

export default function HeroSlider() {
  const { lang, openInquiryModal } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    fetch('/api/sliders')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setSliders(data);
        }
      })
      .catch(err => console.error('Error fetching sliders:', err));
  }, []);

  // Auto slide rotation
  useEffect(() => {
    if (sliders.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % sliders.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [sliders]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % (sliders.length || 1));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + (sliders.length || 1)) % (sliders.length || 1));
  };

  const slide = sliders[currentSlide] || {
    title: 'Own Land in Your Name, Build Flats Together at Cost',
    titleBn: 'নিজের নামে জমি কিনুন, সবাই মিলে কম খরচে ফ্ল্যাট গড়ুন',
    subtitle: '100% RAJUK Approved G+9 Residential towers in North Badda, Dhaka.',
    subtitleBn: '১০০% রাজউক অনুমোদিত, সম্পূর্ণ নামজারি ও সাব-কবলা রেজিস্ট্রেশন সম্পন্ন। মধ্যস্বত্বভোগী ছাড়া সর্বোচ্চ নিরাপত্তা।',
    bgImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80',
    buttonText: 'Explore Projects',
    buttonLink: '/projects'
  };

  return (
    <div className="relative w-full min-h-[600px] lg:min-h-[660px] bg-slate-900 overflow-hidden flex flex-col justify-between pb-16 sm:pb-20 lg:pb-24">
      {/* Background Image with Cinematic Dark Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform scale-105"
        style={{ backgroundImage: `url(${slide.bgImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-brandDark/95 via-brandDark/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brandDark via-transparent to-brandDark/40"></div>
      </div>

      {/* Decorative Gold Light Accent */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-20 lg:pt-28 pb-8 w-full flex-1 flex flex-col justify-center">
        <div className="max-w-2xl space-y-5 animate-fade-in">
          {/* Trust Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-gold/40 text-gold text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {lang === 'bn'
                ? 'উত্তর বাড্ডায় নিরাপদ বিনিয়োগ ও জমি শেয়ার ফ্ল্যাট'
                : 'Pioneering Transparent Land-Share Living in Dhaka'}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {lang === 'bn' ? slide.titleBn || slide.title : slide.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            {lang === 'bn' ? slide.subtitleBn || slide.subtitle : slide.subtitle}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to={slide.buttonLink || '/projects'}
              className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-900 bg-gold hover:bg-gold-400 active:scale-95 transition shadow-lg shadow-gold/25 flex items-center gap-2"
            >
              <span>{lang === 'bn' ? 'প্রকল্পসমূহ দেখুন' : slide.buttonText || 'Explore Projects'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => openInquiryModal()}
              className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 active:scale-95 transition flex items-center gap-2"
            >
              <span>{lang === 'bn' ? 'ফ্রি পরামর্শ নিন' : 'Request Consultation'}</span>
            </button>
          </div>

          {/* Owner Profile Showcase */}
          <div className="pt-2 max-w-xl">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-brandDark/90 backdrop-blur-md border border-gold/50 shadow-2xl transition hover:border-gold">
              <div className="flex items-center gap-3.5">
                {/* Owner Avatar with gold ring & verified check */}
                <div className="relative shrink-0">
                  <img
                    src="/owner.png"
                    alt="MD. Ibrahim Khalil - Founder & Managing Director"
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover object-top border-2 border-gold shadow-lg bg-slate-100"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-brandDark flex items-center justify-center text-white shadow" title="Verified Founder">
                    <ShieldCheck className="w-3 h-3 text-white" />
                  </div>
                </div>

                {/* Info Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm sm:text-base font-extrabold text-white tracking-wide">
                      MD. Ibrahim Khalil
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold/20 text-gold border border-gold/40">
                      {lang === 'bn' ? 'প্রতিষ্ঠাতা ও ব্যবস্থাপনা পরিচালক' : 'Founder & MD'}
                    </span>
                  </div>

                  <p className="text-[11px] sm:text-xs text-gold font-medium mt-0.5 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span>BA (Hons) in English, MA, B.Ed</span>
                  </p>

                  {/* Contact Links: Phone/WhatsApp, Email, Facebook */}
                  <div className="mt-2 pt-2 border-t border-white/10 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px]">
                    <a
                      href="https://wa.me/8801703033789?text=Hello%20MD.%20Ibrahim%20Khalil,%20I%20am%20interested%20in%20IKN%20Properties."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-slate-200 hover:text-emerald-400 font-semibold transition"
                      title="Call / WhatsApp: 01703033789"
                    >
                      <Phone className="w-3 h-3 text-emerald-400" />
                      <span>01703033789</span>
                    </a>

                    <span className="text-slate-500 hidden sm:inline">•</span>

                    <a
                      href="mailto:ikhalil1982@gmail.com"
                      className="flex items-center gap-1 text-slate-200 hover:text-gold font-semibold transition"
                      title="Email: ikhalil1982@gmail.com"
                    >
                      <Mail className="w-3 h-3 text-gold" />
                      <span>ikhalil1982@gmail.com</span>
                    </a>

                    <span className="text-slate-500 hidden sm:inline">•</span>

                    <a
                      href="https://www.facebook.com/ibrahim.khalil.452624"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-slate-200 hover:text-blue-400 font-semibold transition"
                      title="Facebook Profile"
                    >
                      <FacebookIcon className="w-3 h-3 text-blue-400" />
                      <span>Facebook</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      {sliders.length > 1 && (
        <div className="absolute right-6 bottom-16 sm:bottom-20 hidden sm:flex items-center gap-2 z-20">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
