import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Search, ShieldCheck, MapPin, Building, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function HeroSlider() {
  const { lang, openInquiryModal } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliders, setSliders] = useState([]);
  const navigate = useNavigate();

  // Quick filter states
  const [filterType, setFilterType] = useState('All');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterBudget, setFilterBudget] = useState('');

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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (filterType !== 'All') query.set('category', filterType);
    if (filterLocation) query.set('location', filterLocation);
    if (filterBudget) query.set('budget', filterBudget);
    navigate(`/projects?${query.toString()}`);
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
    <div className="relative w-full min-h-[580px] lg:min-h-[660px] bg-slate-900 overflow-hidden flex flex-col justify-between">
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-20 lg:pt-28 pb-12 w-full flex-1 flex flex-col justify-center">
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

          {/* Quick Badges & Founder Trust Anchor */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3 p-2.5 pr-4 rounded-2xl bg-brandDark/85 backdrop-blur-md border border-gold/40 shadow-xl max-w-md">
              <img
                src="/owner.png"
                alt="Founder & Managing Director"
                className="w-12 h-12 rounded-full object-cover object-top border-2 border-gold shadow shrink-0 bg-slate-100"
              />
              <div>
                <div className="flex items-center gap-1 text-gold text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{lang === 'bn' ? 'সরাসরি প্রতিষ্ঠাতার তত্ত্বাবধান' : 'Direct Founder Supervision'}</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-tight mt-0.5">
                  {lang === 'bn' ? 'শতভাগ নির্ভেজাল সাব-কবলা দলিল ও স্বচ্ছ হিসাব' : '100% Sub-Kabla land title & open-book construction'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>RAJUK G+9</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Save 35-40%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      {sliders.length > 1 && (
        <div className="absolute right-6 bottom-32 hidden sm:flex items-center gap-2 z-20">
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

      {/* Floating Quick Search Bar (Like dpremiumhomes.com) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 w-full -mb-10 sm:-mb-8">
        <form
          onSubmit={handleSearchSubmit}
          className="bg-white rounded-2xl shadow-2xl p-4 sm:p-5 border border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-center"
        >
          {/* Property Type Dropdown */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              {lang === 'bn' ? 'প্রকল্পের ধরন' : 'Project Category'}
            </label>
            <div className="relative">
              <Building className="w-4 h-4 text-primary-600 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full pl-9 pr-6 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-600 appearance-none"
              >
                <option value="All">{lang === 'bn' ? 'সকল প্রকল্প' : 'All Categories'}</option>
                <option value="Land Share Flats">Land Share Flats (জমি শেয়ার)</option>
                <option value="Ready Flats">Ready Flats (রেডি ফ্ল্যাট)</option>
                <option value="Upcoming Projects">Upcoming (আসন্ন প্রকল্প)</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              {lang === 'bn' ? 'লোকেশন' : 'Location'}
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-primary-600 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="w-full pl-9 pr-6 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-600 appearance-none"
              >
                <option value="">{lang === 'bn' ? 'সকল এলাকা' : 'All Locations'}</option>
                <option value="North Badda">North Badda, Eastern Road</option>
                <option value="Badda Link Road">Badda Link Road (Near Gulshan)</option>
                <option value="Dhaka">Dhaka Metropolis</option>
              </select>
            </div>
          </div>

          {/* Budget Range */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              {lang === 'bn' ? 'বাজেট সীমা' : 'Budget Range'}
            </label>
            <select
              value={filterBudget}
              onChange={(e) => setFilterBudget(e.target.value)}
              className="w-full px-3 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-600"
            >
              <option value="">{lang === 'bn' ? 'যেকোনো বাজেট' : 'Any Budget'}</option>
              <option value="18-20">18 - 20 Lakh (Land Share)</option>
              <option value="40-45">40 - 45 Lakh (Total Apartment)</option>
              <option value="45+">45+ Lakh BDT</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="pt-2 sm:pt-4">
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-primary-700 hover:bg-primary-800 active:scale-98 transition flex items-center justify-center gap-2 shadow-md shadow-primary-700/20"
            >
              <Search className="w-4 h-4 text-gold" />
              <span>{lang === 'bn' ? 'ফ্ল্যাট অনুসন্ধান' : 'Find Properties'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
