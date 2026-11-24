import React from 'react';
import { Layers, Home, Handshake, CheckCircle2, ArrowRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { useApp } from '../context/AppContext';

export default function ServicesPage() {
  const { lang, openInquiryModal } = useApp();

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <SEOHead
        title="Real Estate Services | Land Share & Joint Venture in Dhaka"
        description="IKN Properties offers Land Share Flats, Ready Flats, and Joint Building Development in North Badda, Dhaka. Transparent construction and RAJUK approved architecture."
        canonical="https://iknproperties.com/services"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Banner */}
        <div className="bg-emerald-luxury rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold bg-white/10 px-3.5 py-1.5 rounded-full inline-block border border-gold/30">
              {lang === 'bn' ? 'আমাদের বিশেষায়িত সেবাসমূহ' : 'Our Specialized Services'}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {lang === 'bn'
                ? 'জমি শেয়ারিং, রেডি ফ্ল্যাট ও যৌথ নির্মাণ'
                : 'Real Estate & Property Development Services'}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
              {lang === 'bn'
                ? 'আইকেএন প্রোপার্টিজ দিচ্ছে গ্রাহকবান্ধব জমি শেয়ার পদ্ধতি এবং জমির মালিকদের জন্য লাভজনক অংশীদারিত্ব।'
                : 'Comprehensive real estate solutions designed to reduce overhead, maximize transparency, and guarantee legal security.'}
            </p>
          </div>
        </div>

        {/* Service 1: Land Share Flats */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-primary-800 text-xs font-bold uppercase">
              <Layers className="w-3.5 h-3.5" />
              <span>Service 01</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {lang === 'bn' ? 'জমি শেয়ারে ফ্ল্যাট (Land Share Flats)' : 'Land Share Flats'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'জমি শেয়ার পদ্ধতিতে ক্রেতারা সরাসরি সাব-রেজিস্ট্রি অফিসে নিজ নামে জমির আনুপাতিক অংশ কিনে নেন। এরপর সবাই মিলে ঠিকাদার বা ম্যানেজমেন্টের তত্ত্বাবধানে আসল নির্মাণ খরচে ফ্ল্যাট তৈরি করেন। এতে প্রথাগত ডেভেলপারদের ৩৫% থেকে ৪০% মুনাফা বেঁচে যায়।'
                : 'Our flagship land-share model allows you to purchase a registered undivided portion of high-value land in North Badda directly in your name. Construction takes place collaboratively at actual material cost, saving you 35-40% compared to traditional commercial apartments.'}
            </p>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>100% Sub-Kabla registered deed in the buyer’s name before any construction starts.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Save 20 to 35 Lakh BDT per apartment compared to conventional market pricing.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Construction cost distributed across 30 comfortable monthly installments.</span>
              </div>
            </div>

            <button
              onClick={() => openInquiryModal('Land Share Flats Service')}
              className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-900 bg-gold hover:bg-gold-400 active:scale-95 transition shadow-sm flex items-center gap-2"
            >
              <span>{lang === 'bn' ? 'জমি শেয়ারের জন্য যোগাযোগ' : 'Inquire for Land Share'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-5 h-72 sm:h-80 rounded-2xl overflow-hidden bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
              alt="Land Share"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Service 2: Ready Flats */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 h-72 sm:h-80 rounded-2xl overflow-hidden bg-slate-100 order-last lg:order-first">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
              alt="Ready Flats"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase">
              <Home className="w-3.5 h-3.5" />
              <span>Service 02</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {lang === 'bn' ? 'রেডি ফ্ল্যাট (Ready Flats)' : 'Ready Flats'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'যাঁরা কোনো অপেক্ষা ছাড়াই অবিলম্বে বসবাসযোগ্য ফ্ল্যাট খুঁজছেন, তাঁদের জন্য প্রস্তুত ফ্ল্যাট। গ্যাস/বিদ্যুৎ সংযোগ, ডুয়াল লিফট, সার্বক্ষণিক জেনারেটর এবং সর্বোচ্চ মানের ফিটিংস সম্পন্ন।'
                : 'For families requiring immediate relocation, our completed turnkey luxury apartments offer move-in readiness with clean title deeds, dedicated electrical substations, dual elevators, and modern sanitaryware.'}
            </p>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Instant physical handover with full utility connections and lift operations.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Bank loan support from major commercial banks and NBFI partners in Dhaka.</span>
              </div>
            </div>

            <button
              onClick={() => openInquiryModal('Ready Flats Service')}
              className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-900 bg-gold hover:bg-gold-400 active:scale-95 transition shadow-sm flex items-center gap-2"
            >
              <span>{lang === 'bn' ? 'রেডি ফ্ল্যাট দেখতে যোগাযোগ' : 'Inquire for Ready Flats'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Service 3: Joint Building Development */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase">
              <Handshake className="w-3.5 h-3.5" />
              <span>Service 03</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {lang === 'bn' ? 'যৌথ ভবন নির্মাণ (Joint Building Development)' : 'Joint Building Development'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'উত্তর বাড্ডা বা ঢাকার অন্য যেকোনো প্রান্তে জমির মালিকদের সাথে যৌথ আবাসন নির্মাণ। রাজউক অনুমোদন থেকে শুরু করে নকশা, পাইলিং ও সার্বিক নির্মাণ কাজ আমরা পেশাদারিত্বের সাথে পরিচালনা করি।'
                : 'We collaborate with Dhaka landowners for joint multi-storey residential building development, offering handsome ratio sharing, fast-tracked RAJUK approvals, and architectural superiority.'}
            </p>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Transparent agreements with zero hidden clauses or unnecessary delays.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Full architectural and engineering compliance with Bangladesh National Building Code (BNBC).</span>
              </div>
            </div>

            <button
              onClick={() => openInquiryModal('Joint Building Development')}
              className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-900 bg-gold hover:bg-gold-400 active:scale-95 transition shadow-sm flex items-center gap-2"
            >
              <span>{lang === 'bn' ? 'জমির অংশীদারিত্বের আলোচনা' : 'Discuss Joint Venture'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-5 h-72 sm:h-80 rounded-2xl overflow-hidden bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
              alt="Joint Development"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
