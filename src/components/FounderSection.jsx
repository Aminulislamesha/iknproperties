import React from 'react';
import { ShieldCheck, Phone, MessageCircle, CheckCircle2, Award, ArrowRight, UserCheck, Mail, GraduationCap } from 'lucide-react';
import { useApp } from '../context/AppContext';

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
  );
}

export default function FounderSection() {
  const { lang, openInquiryModal } = useApp();

  return (
    <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 right-0 w-96 h-96 bg-gold/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-14 border border-slate-100 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Owner's Portrait with Luxury Framing */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Outer gold ring glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-gold via-primary-600 to-emerald-400 rounded-3xl blur-md opacity-30"></div>

              {/* Card Container */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-slate-100 via-white to-emerald-50 border-2 border-gold/40 shadow-2xl p-4 pt-6 text-center">
                {/* Top Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-800 text-gold text-[11px] font-bold uppercase tracking-wider mb-3 shadow">
                  <UserCheck className="w-3.5 h-3.5 text-gold" />
                  <span>{lang === 'bn' ? 'প্রতিষ্ঠাতা ও ব্যবস্থাপনা পরিচালক' : 'Founder & Managing Director'}</span>
                </div>

                {/* Owner Photo */}
                <div className="relative mx-auto w-64 sm:w-72 h-72 sm:h-80 overflow-hidden flex items-end justify-center">
                  <img
                    src="/owner.png"
                    alt="Founder & Managing Director - IKN Properties"
                    className="w-full h-full object-contain filter drop-shadow-xl hover:scale-102 transition-transform duration-300"
                  />
                </div>

                {/* Bottom Signature Plate */}
                <div className="mt-3 p-4 rounded-2xl bg-brandDark text-white border border-gold/30 text-left space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-extrabold text-white tracking-wide">
                        MD. Ibrahim Khalil
                      </h4>
                      <p className="text-xs text-gold font-medium flex items-center gap-1 mt-0.5">
                        <GraduationCap className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span>BA (Hons) in English, MA, B.Ed</span>
                      </p>
                      <p className="text-[11px] text-emerald-300 font-semibold mt-0.5">
                        {lang === 'bn' ? 'প্রতিষ্ঠাতা ও ব্যবস্থাপনা পরিচালক' : 'Founder & Managing Director'}
                      </p>
                    </div>
                    <img
                      src="/logo.png"
                      alt="IKN Logo"
                      className="w-12 h-12 object-contain drop-shadow shrink-0"
                    />
                  </div>
                  <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-300">
                    <a
                      href="https://wa.me/8801703033789?text=Hello%20MD.%20Ibrahim%20Khalil"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-slate-200 hover:text-emerald-400 transition"
                    >
                      <Phone className="w-3 h-3 text-emerald-400" />
                      <span>01703033789</span>
                    </a>
                    <a
                      href="mailto:ikhalil1982@gmail.com"
                      className="flex items-center gap-1 text-slate-200 hover:text-gold transition"
                    >
                      <Mail className="w-3 h-3 text-gold" />
                      <span>ikhalil1982@gmail.com</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Floating verified badge */}
              <div className="absolute -bottom-4 -left-4 hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-white shadow-xl border border-slate-100 text-xs font-bold text-slate-800">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <span className="block leading-tight">{lang === 'bn' ? 'ব্যক্তিগত জবাবদিহিতা' : 'Personal Guarantee'}</span>
                  <span className="text-[10px] text-slate-500 font-normal">{lang === 'bn' ? 'সরাসরি তদারকি' : 'On-Site Oversight'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative, Core Message & Direct CTA */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-primary-900 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-primary-700" />
                <span>{lang === 'bn' ? 'সরাসরি প্রতিষ্ঠাতার বার্তা' : 'A Message from Our Leadership'}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {lang === 'bn'
                  ? '“প্রতিটি পরিবারের জন্য নিরাপদ জমি ও আসল খরচে বিলাসবহুল ফ্ল্যাট আমার অঙ্গীকার”'
                  : '“Direct Leadership, Zero Middlemen, and 100% Peace of Mind for Every Family”'}
              </h2>
            </div>

            {/* Quote Block with Gold Accent */}
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-luxury text-white border-l-4 border-gold shadow-lg space-y-2">
              <p className="text-xs sm:text-sm font-semibold italic text-gold-100 leading-relaxed font-bengali">
                “নিজের নামে জমি কিনুন, সবাই মিলে কম খরচে ফ্ল্যাট গড়ুন। বিশ্বাসের ভিত্তিতে গড়ে উঠুক আপনার নিরাপদ বিনিয়োগ।”
              </p>
              <p className="text-[11px] text-emerald-200">
                — {lang === 'bn' ? 'আইকেএন প্রোপার্টিজের পথচলার মূল দর্শন' : 'The founding philosophy behind IKN Properties'}
              </p>
            </div>

            {/* Narrative Paragraphs */}
            <div className="text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed">
              <p>
                {lang === 'bn'
                  ? 'ঢাকা শহরে একটি নিজস্ব ফ্ল্যাট কেনা প্রতিটি পরিবারের আজীবনের লালিত স্বপ্ন। কিন্তু বাণিজ্যিক ডেভেলপারদের অতিরিক্ত মুনাফা ও মধ্যস্বত্বভোগী বিপণন খরচের কারণে মধ্যবিত্ত ও উচ্চ-মধ্যবিত্তের জন্য সেই স্বপ্ন অনেক সময় দুঃসাধ্য হয়ে ওঠে। আইকেএন প্রোপার্টিজ প্রতিষ্ঠিত হয়েছে এই বাস্তবতাকে ইতিবাচকভাবে বদলে দিতে।'
                  : 'Owning an apartment in Dhaka is the dream of a lifetime for every family. Unfortunately, commercial developer markups and marketing overheads often push prices beyond reach. IKN Properties was established to transform this reality through direct collaborative land ownership.'}
              </p>
              <p>
                {lang === 'bn'
                  ? 'রোজ গার্ডেন ও স্বপ্ন টাওয়ারের প্রতিটি পাইলিং, ঢালাই ও লিগ্যাল দলিলের তদারকি আমি নিজে সরাসরি সাইটে উপস্থিত থেকে পরিচালনা করি। কোনো কাজের টাকা নেওয়ার আগে সাব-রেজিস্ট্রি অফিসে আপনার নিজ নামে জমির সাব-কবলা রেজিস্ট্রেশন ও নামজারি সম্পন্ন করা হয়। ফলে আপনার প্রতিটি টাকা ঢাকা শহরের মূল্যবান জমিতে শতভাগ সুরক্ষিত।'
                  : 'From soil testing to the final structural slab casting, I personally oversee operations on Eastern Road, North Badda. We execute the registered deed (Sub-Kabla) in your name before any construction begins. Your capital is never at risk — it is backed directly by prime Dhaka land.'}
              </p>
            </div>

            {/* 4 Direct Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-slate-800">
                  {lang === 'bn' ? '১০০% নিজ নামে সাব-কবলা জমি দলিল' : '100% Sub-Kabla Registry in Your Name'}
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-slate-800">
                  {lang === 'bn' ? '৩৫-৪০% সরাসরি খরচ সাশ্রয়' : 'Save 35-40% via Land-Share Model'}
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-slate-800">
                  {lang === 'bn' ? 'রাজউক (G+9) অনুমোদিত স্ট্রাকচার' : 'RAJUK (G+9) Approved Engineering'}
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-slate-800">
                  {lang === 'bn' ? 'সরাসরি প্রতিষ্ঠাতার সাথে আলোচনার সুযোগ' : 'Direct Accessibility with Management'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => openInquiryModal('Direct Founder Meeting')}
                className="px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-900 bg-gold hover:bg-gold-400 active:scale-95 transition shadow-lg shadow-gold/25 flex items-center gap-2"
              >
                <span>{lang === 'bn' ? 'সরাসরি সাক্ষাতের সময় নিন' : 'Meet the Founder Directly'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/8801703033789?text=Hello%20MD.%20Ibrahim%20Khalil,%20I%20would%20like%20to%20discuss%20with%20you%20regarding%20IKN%20Properties."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp: 01703033789</span>
              </a>

              <a
                href="mailto:ikhalil1982@gmail.com"
                className="px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 transition flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-gold-dark" />
                <span>ikhalil1982@gmail.com</span>
              </a>

              <a
                href="https://www.facebook.com/ibrahim.khalil.452624"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-blue-700 bg-blue-50 hover:bg-blue-100 transition flex items-center gap-2"
              >
                <FacebookIcon className="w-4 h-4 text-blue-600" />
                <span>Facebook Profile</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
