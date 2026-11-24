import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Phone, Mail, MapPin, Send, CheckCircle, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
  );
}

function YoutubeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
      <polygon points="10 15 15 12 10 9 10 15"></polygon>
    </svg>
  );
}

export default function Footer() {
  const { lang, settings, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    showToast(lang === 'bn' ? 'নিউজলেটার সফলভাবে সাবস্ক্রাইব হয়েছে!' : 'Subscribed to IKN Properties updates!');
    setEmail('');
  };

  return (
    <footer className="bg-brandDark text-slate-300 border-t border-emerald-950 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="IKN Properties Logo"
                className="w-12 h-12 object-contain drop-shadow-md shrink-0"
              />
              <span className="text-2xl font-extrabold tracking-tight text-white">
                IKN <span className="text-gold">PROPERTIES</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed italic border-l-2 border-gold pl-3">
              {lang === 'bn'
                ? '“নিজের নামে জমি কিনুন, সবাই মিলে কম খরচে ফ্ল্যাট গড়ুন। বিশ্বাসের ভিত্তিতে গড়ে উঠুক আপনার নিরাপদ বিনিয়োগ।”'
                : '“Buy land in your own name, build flats together at low cost. Let your safe investment be built on trust.”'}
            </p>

            <p className="text-xs text-slate-400 leading-relaxed">
              {lang === 'bn'
                ? 'আইকেএন প্রোপার্টিজ উত্তর বাড্ডার শীর্ষস্থানীয় জমি শেয়ারিং ও রিয়েল এস্টেট ডেভেলপার। ১০০% রাজউক অনুমোদিত এবং সাব-কবলা রেজিস্ট্রেশনের নিশ্চয়তা।'
                : 'Pioneering affordable luxury housing in Dhaka through transparent land-share models and trusted residential construction.'}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.facebook.com/iknproperties"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-primary-600 text-slate-300 hover:text-white flex items-center justify-center transition border border-white/10"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@iknproperties"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition border border-white/10"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-gold/30 pb-2 inline-block">
              {lang === 'bn' ? 'প্রয়োজনীয় লিংক' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-gold transition">
                  {lang === 'bn' ? 'হোম পেজ' : 'Home'}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold transition">
                  {lang === 'bn' ? 'কোম্পানি সম্পর্কে' : 'About IKN Properties'}
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-gold transition">
                  {lang === 'bn' ? 'সকল প্রকল্প (Rose Garden & Shopno Tower)' : 'All Projects'}
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gold transition">
                  {lang === 'bn' ? 'জমি শেয়ার ও যৌথ নির্মাণ' : 'Our Services'}
                </Link>
              </li>
              <li>
                <Link to="/project-progress" className="hover:text-gold transition">
                  {lang === 'bn' ? 'লাইভ কাজের অগ্রগতি (Piling Updates)' : 'Live Construction Progress'}
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-gold transition">
                  {lang === 'bn' ? 'রিয়েল এস্টেট ব্লগ ও গাইড' : 'Real Estate Blog & Articles'}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-gold transition">
                  {lang === 'bn' ? 'সাধারণ প্রশ্নোত্তর (FAQs)' : 'Frequently Asked Questions'}
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-gold transition">
                  {lang === 'bn' ? 'গোপনীয়তা নীতি ও শর্তাবলী' : 'Privacy & Refund Policy'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Office */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-gold/30 pb-2 inline-block">
              {lang === 'bn' ? 'অফিস ও যোগাযোগ' : 'Office & Contact'}
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>
                  {settings?.addressBn || '158/1B (4th Floor), Moynarbag, Hossen Market, North Badda, Dhaka-1212'}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:01703033789" className="hover:text-white transition">01703-033789</a>
                  <a href="tel:01721961935" className="hover:text-white transition">01721-961935</a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:info@iknproperties.com" className="hover:text-white transition">
                  info@iknproperties.com
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-400">
                <Clock className="w-4 h-4 text-gold shrink-0" />
                <span>Sat - Thu: 9:30 AM - 7:30 PM</span>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter & Verification */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-gold/30 pb-2 inline-block">
              {lang === 'bn' ? 'নতুন প্রকল্পের আপডেট' : 'Newsletter & Updates'}
            </h4>
            <p className="text-xs text-slate-400">
              {lang === 'bn'
                ? 'নতুন জমি শেয়ার প্রকল্প ও বিশেষ অফারের নোটিফিকেশন পেতে আপনার ইমেইল দিন।'
                : 'Subscribe to get firsthand alerts on new land-share launches and construction milestones.'}
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder={lang === 'bn' ? 'আপনার ইমেইল ঠিকানা' : 'Enter your email'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-900 bg-gold hover:bg-gold-400 transition flex items-center justify-center gap-2"
              >
                {subscribed ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-slate-900" />
                    <span>Subscribed</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'সাবস্ক্রাইব করুন' : 'Subscribe'}</span>
                  </>
                )}
              </button>
            </form>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                RAJUK Approved (G+9)
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} IKN Properties. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-slate-300 transition">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-slate-300 transition">
              Site Visit
            </Link>
            <span>•</span>
            <Link to="/admin/login" className="hover:text-gold transition">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
