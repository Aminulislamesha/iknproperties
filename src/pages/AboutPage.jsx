import React from 'react';
import { Shield, Target, Eye, Award, CheckCircle, MapPin, Phone } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { useApp } from '../context/AppContext';

export default function AboutPage() {
  const { lang, settings, openInquiryModal } = useApp();

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <SEOHead
        title="About IKN Properties | Trusted Real Estate in Dhaka"
        description="Learn about IKN Properties, our mission, values, and how our land-share flats in North Badda, Dhaka empower families with 35-40% savings and 100% legal security."
        canonical="https://iknproperties.com/about"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Hero Banner */}
        <div className="bg-emerald-luxury rounded-3xl p-8 sm:p-14 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gold bg-white/10 px-3.5 py-1.5 rounded-full inline-block border border-gold/30">
              {lang === 'bn' ? 'আমাদের পরিচয়' : 'About IKN Properties'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              {lang === 'bn'
                ? 'বিশ্বাসের ভিত্তিতে গড়ে উঠুক আপনার নিরাপদ বিনিয়োগ'
                : 'Pioneering Trust & Transparency in Dhaka Real Estate'}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed italic border-l-2 border-gold pl-3">
              “{settings?.taglineBn || 'নিজের নামে জমি কিনুন, সবাই মিলে কম খরচে ফ্ল্যাট গড়ুন। বিশ্বাসের ভিত্তিতে গড়ে উঠুক আপনার নিরাপদ বিনিয়োগ।'}”
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
              {lang === 'bn'
                ? 'আইকেএন প্রোপার্টিজ উত্তর বাড্ডার স্বনামধন্য রিয়েল এস্টেট ও প্রোপার্টি ডেভেলপমেন্ট প্রতিষ্ঠান। মধ্যস্বত্বভোগী ছাড়া প্রকৃত নির্মাণ খরচে গ্রাহকদের নিজস্ব ফ্ল্যাট নিশ্চিত করাই আমাদের মূল অঙ্গীকার।'
                : 'IKN Properties is a dedicated property development company in Dhaka, Bangladesh, revolutionizing apartment ownership through direct land-share participation, cost-to-cost construction, and strict RAJUK adherence.'}
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              {lang === 'bn' ? 'আমাদের লক্ষ্য (Our Mission)' : 'Our Mission'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'ঢাকার মধ্যবিত্ত ও উচ্চ-মধ্যবিত্ত পরিবারগুলোর জন্য প্রথাগত ডেভেলপারদের অতিরিক্ত মুনাফা ও বিপণন খরচ দূর করে, শতভাগ আইনি সুরক্ষায় সাশ্রয়ী ও আধুনিক মানের ফ্ল্যাট সরবরাহ করা।'
                : 'To democratize luxury urban living in Dhaka by eliminating excessive commercial developer markups, enabling families to own registered land directly and build contemporary apartments at actual cost.'}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              {lang === 'bn' ? 'আমাদের দর্শন (Our Vision)' : 'Our Vision'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'বাংলাদেশে জমি শেয়ারিং আবাসন পদ্ধতির সবচেয়ে বিশ্বস্ত এবং স্বচ্ছ ব্র্যান্ড হিসেবে নিজেদের প্রতিষ্ঠা করা, যেখানে প্রতিটি বিনিয়োগকারীর অধিকার এবং ভবিষ্যৎ শতভাগ সুরক্ষিত।'
                : 'To be the gold standard of ethical, transparent, and collaborative real estate development in Bangladesh, establishing communities where mutual trust and uncompromised structural quality thrive.'}
            </p>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900">
              {lang === 'bn' ? 'আইকেএন প্রোপার্টিজের ৪টি মৌলিক স্তম্ভ' : 'The 4 Pillars of Our Business'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-slate-700">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <Shield className="w-6 h-6 text-primary-600" />
              <h3 className="font-bold text-sm text-slate-900">100% Legal Ownership</h3>
              <p className="text-slate-500 leading-relaxed">
                Direct Sub-Kabla registry and mutation in the buyer's own name before groundbreaking.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <Award className="w-6 h-6 text-gold" />
              <h3 className="font-bold text-sm text-slate-900">RAJUK Approved (G+9)</h3>
              <p className="text-slate-500 leading-relaxed">
                Every project is fully approved by RAJUK and civil aviation authorities with certified soil test reports.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
              <h3 className="font-bold text-sm text-slate-900">Cost Transparency</h3>
              <p className="text-slate-500 leading-relaxed">
                Construction accounts and bills are open to project partners, with zero hidden profit add-ons.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <Target className="w-6 h-6 text-primary-600" />
              <h3 className="font-bold text-sm text-slate-900">Timely Handover</h3>
              <p className="text-slate-500 leading-relaxed">
                Strict adherence to 30-month construction schedules under expert civil engineering oversight.
              </p>
            </div>
          </div>
        </div>

        {/* Office & Direct Contact Box */}
        <div className="bg-emerald-luxury rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">
              {lang === 'bn' ? 'আমাদের অফিসে আসুন বা যোগাযোগ করুন' : 'Visit Our Corporate Office in Dhaka'}
            </h3>
            <div className="flex items-center gap-2 text-xs text-emerald-200">
              <MapPin className="w-4 h-4 text-gold shrink-0" />
              <span>158/1B (4th Floor), Moynarbag, Hossen Market, North Badda, Dhaka-1212</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-200">
              <Phone className="w-4 h-4 text-gold shrink-0" />
              <span>Hotline: 01703-033789, 01721-961935</span>
            </div>
          </div>

          <button
            onClick={() => openInquiryModal()}
            className="px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-900 bg-gold hover:bg-gold-400 active:scale-95 transition shadow-lg shrink-0"
          >
            {lang === 'bn' ? 'সরাসরি সাক্ষাতের সময় নির্ধারণ' : 'Schedule Office Visit'}
          </button>
        </div>
      </div>
    </div>
  );
}
