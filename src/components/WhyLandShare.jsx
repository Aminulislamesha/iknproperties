import React from 'react';
import { FileCheck, Shield, HardHat, FileSpreadsheet, KeyRound, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function WhyLandShare() {
  const { lang, openInquiryModal } = useApp();

  const steps = [
    {
      step: '01',
      icon: FileCheck,
      title: 'Title Deeds & Legal Vetting',
      titleBn: 'আইনি ও দলিল যাচাই',
      desc: 'Complete inspection of CS, SA, RS, and City Survey Khatiyan, up-to-date tax receipts, and non-encumbrance verification.',
      descBn: 'সিএস, এসএ, আরএস ও সিটি জরিপ খতিয়ান, খাজনা দাখিলা এবং শতভাগ নির্ভেজাল দলিলের পুঙ্খানুপুঙ্খ আইনি নিরীক্ষা।'
    },
    {
      step: '02',
      icon: Shield,
      title: 'Sub-Kabla Registry in Your Name',
      titleBn: 'নিজ নামে সাব-কবলা দলিল',
      desc: 'Buyer purchases their proportionate land share directly registered at the Sub-Registry office with immediate physical mutation.',
      descBn: 'সাব-রেজিস্ট্রি অফিসে সরাসরি ক্রেতার নিজ নামে জমির আনুপাতিক শেয়ারের সাব-কবলা রেজিস্ট্রেশন ও নামজারি সম্পন্ন।'
    },
    {
      step: '03',
      icon: HardHat,
      title: 'RAJUK G+9 Approval & Soil Test',
      titleBn: 'রাজউক জি+৯ অনুমোদন ও পাইলিং',
      desc: 'Structural blueprints officially approved by RAJUK for G+9 residential towers with deep hydraulic piling for safety.',
      descBn: 'রাজউক কর্তৃক অনুমোদিত জি+৯ নকশা অনুযায়ী অভিজ্ঞ সিভিল ইঞ্জিনিয়ারদের প্রত্যক্ষ তত্ত্বাবধানে শক্তিশালী পাইলিং কাজ।'
    },
    {
      step: '04',
      icon: FileSpreadsheet,
      title: 'Cost-to-Cost Transparent Construction',
      titleBn: 'আসল খরচে স্বচ্ছ নির্মাণ',
      desc: 'Construction funds spent exclusively on verified materials and labor. Track receipts with zero hidden developer margins.',
      descBn: 'কোনো গোপন বা অতিরিক্ত বাণিজ্যিক লাভ ছাড়া আসল নির্মাণ খরচে ফ্ল্যাট তৈরি। ৩০ মাসের সহজ কিস্তিতে খরচ পরিশোধ।'
    },
    {
      step: '05',
      icon: KeyRound,
      title: 'Timely Handover in 30 Months',
      titleBn: '৩০ মাসে শুভ হস্তান্তর',
      desc: 'Flats delivered with 2 lifts, electricity substation, generator backup, and modern community amenities.',
      descBn: 'ডাবল লিফট, নিজস্ব সাবস্টেশন, অটো জেনারেটর ব্যাকআপ ও রুফটপ গার্ডেনসহ নির্ধারিত ৩০ মাসে চাবি হস্তান্তর।'
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-800 bg-emerald-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
            {lang === 'bn' ? 'স্বচ্ছতার ৫ ধাপ' : 'How It Works'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'bn'
              ? 'কেন আইকেএন জমি শেয়ার পদ্ধতি ঢাকার সবচেয়ে নিরাপদ?'
              : 'Why IKN Land Share is the Safest Investment in Dhaka'}
          </h2>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            {lang === 'bn'
              ? 'প্রথম দিন থেকেই আপনি জমির মালিক। কোনোরকম গোপন চার্জ বা অতিরিক্ত লাভ ছাড়াই কম খরচে গড়ে তুলুন আপনার স্থায়ী বাসস্থান।'
              : 'Direct land ownership from day one eliminates real estate risk while saving up to 40% on overall apartment costs.'}
          </p>
        </div>

        {/* 5-Step Process Roadmap Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div
                key={i}
                className="relative bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Step Number Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-slate-200 group-hover:text-gold transition font-mono">
                      {st.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center group-hover:bg-primary-700 group-hover:text-white transition">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mb-2">
                    {lang === 'bn' ? st.titleBn : st.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === 'bn' ? st.descBn : st.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1 text-[11px] font-bold text-primary-700">
                  <span>{lang === 'bn' ? 'নিরাপত্তা নিশ্চিত' : 'Verified Safe'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Banner Call to action */}
        <div className="mt-12 bg-emerald-luxury rounded-3xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-bold">
              {lang === 'bn'
                ? 'রোজ গার্ডেন বা স্বপ্ন টাওয়ারে সাইট ভিজিট করতে চান?'
                : 'Ready to inspect Rose Garden or Shopno Tower in person?'}
            </h4>
            <p className="text-xs text-emerald-200">
              {lang === 'bn'
                ? 'ইস্টার্ন রোড, উত্তর বাড্ডায় প্রতিদিন সাইট পরিদর্শনের সুব্যবস্থা রয়েছে।'
                : 'Daily guided site visits available on Eastern Road, North Badda.'}
            </p>
          </div>

          <button
            onClick={() => openInquiryModal('Site Visit Request')}
            className="px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-900 bg-gold hover:bg-gold-400 active:scale-95 transition shadow-lg shadow-gold/25 flex items-center gap-2 shrink-0"
          >
            <span>{lang === 'bn' ? 'ফ্রি সাইট ভিজিট বুক করুন' : 'Schedule Site Visit'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
