import React, { useState } from 'react';
import { Calculator, TrendingDown, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CostCalculator() {
  const { lang, openInquiryModal } = useApp();
  const [flatSize, setFlatSize] = useState(1250);
  const [constructionMonths, setConstructionMonths] = useState(30);

  // Typical North Badda Developer Market Rates
  const marketRatePerSft = 6800; // Commercial developer price ~6,800 BDT/SFT
  const commercialTotal = (flatSize * marketRatePerSft);

  // IKN Land-Share Model
  // Land share cost roughly ~1,450 BDT/SFT equivalent
  const iknLandShare = flatSize >= 1350 ? 2000000 : 1800000;
  // Actual construction cost roughly ~2,000 BDT/SFT
  const iknConstruction = (flatSize * 2000);
  const iknTotal = iknLandShare + iknConstruction;

  // Savings
  const totalSavings = commercialTotal - iknTotal;
  const savingsPercent = Math.round((totalSavings / commercialTotal) * 100);

  // Monthly installment for construction
  const monthlyInstallment = Math.round(iknConstruction / constructionMonths);

  const formatLakh = (amount) => {
    return `${(amount / 100000).toFixed(1)} Lakh BDT`;
  };

  return (
    <section id="calculator" className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-primary-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'স্মার্ট খরচ গণনাকারী' : 'Smart Cost Comparison Calculator'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'bn'
              ? 'প্রথাগত ডেভেলপার বনাম আইকেএন জমি শেয়ার: খরচ তুলনা'
              : 'Commercial Developer vs IKN Land-Share Cost'}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            {lang === 'bn'
              ? 'নিচের স্লাইডার দিয়ে আপনার পছন্দের ফ্ল্যাটের সাইজ নির্বাচন করুন এবং দেখুন কীভাবে ৩৫-৪০% খরচ বাঁচাবেন।'
              : 'Select your desired apartment size and see how much you save by cutting developer profit margins.'}
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12">
          {/* Controls Column */}
          <div className="lg:col-span-6 p-6 sm:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-slate-100">
            {/* Flat Size Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  {lang === 'bn' ? 'ফ্ল্যাটের আয়তন (বর্গফুট)' : 'Apartment Size (SFT)'}
                </label>
                <span className="text-xl font-extrabold text-primary-700 bg-primary-50 px-3 py-1 rounded-lg">
                  {flatSize.toLocaleString()} SFT
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="1800"
                step="50"
                value={flatSize}
                onChange={(e) => setFlatSize(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-semibold">
                <span>1,000 SFT</span>
                <span>1,250 (Rose Garden)</span>
                <span>1,350 (Shopno Tower)</span>
                <span>1,800 SFT</span>
              </div>
            </div>

            {/* Construction Duration */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  {lang === 'bn' ? 'নির্মাণ কিস্তি সময়সীমা' : 'Construction Period'}
                </label>
                <span className="text-sm font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                  {constructionMonths} Months (৩০ মাস)
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[24, 30, 36].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setConstructionMonths(m)}
                    className={`py-2 text-xs font-bold rounded-xl transition ${
                      constructionMonths === m
                        ? 'bg-primary-700 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {m} Months
                  </button>
                ))}
              </div>
            </div>

            {/* Breakdown summary */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>{lang === 'bn' ? '১. জমি সাব-কবলা রেজিস্ট্রেশন মূল্য' : '1. Land Share (Sub-Kabla)'}</span>
                <span className="font-bold text-slate-800">{formatLakh(iknLandShare)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{lang === 'bn' ? '২. আসল নির্মাণ খরচ (উপকরণ ও শ্রমিক)' : '2. Actual Construction Cost'}</span>
                <span className="font-bold text-slate-800">{formatLakh(iknConstruction)}</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-sm text-primary-900">
                <span>{lang === 'bn' ? 'আইকেএন মোট খরচ' : 'Total Estimated Cost'}</span>
                <span>{formatLakh(iknTotal)}</span>
              </div>
            </div>

            <div className="text-xs text-slate-500 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{lang === 'bn' ? 'কোনো গোপন বা মধ্যস্বত্বভোগী লাভ নেই' : '0% commercial markups, actual construction receipts'}</span>
            </div>
          </div>

          {/* Results Column (Emerald Luxury Gradient) */}
          <div className="lg:col-span-6 bg-emerald-luxury p-6 sm:p-8 text-white flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200 block">
                    {lang === 'bn' ? 'প্রথাগত কোম্পানির বাজারদর' : 'Conventional Developer Rate'}
                  </span>
                  <span className="text-sm line-through text-slate-400 font-semibold">
                    {formatLakh(commercialTotal)} (~{marketRatePerSft} BDT/sft)
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gold block">
                    {lang === 'bn' ? 'আইকেএন জমি শেয়ার দাম' : 'IKN Properties Cost'}
                  </span>
                  <span className="text-2xl font-extrabold text-white">
                    {formatLakh(iknTotal)}
                  </span>
                </div>
              </div>

              {/* Savings Highlight */}
              <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-gold/40 text-center my-4">
                <div className="flex items-center justify-center gap-1.5 text-gold text-xs font-extrabold uppercase tracking-widest mb-1">
                  <TrendingDown className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'আপনার আনুমানিক সঞ্চয়' : 'Total Savings'}</span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white my-1">
                  {formatLakh(totalSavings)}
                </div>
                <div className="text-xs text-emerald-200 font-medium">
                  {lang === 'bn'
                    ? `প্রথাগত ডেভেলপারদের তুলনায় প্রায় ${savingsPercent}% খরচ কম!`
                    : `Save approximately ${savingsPercent}% compared to typical Dhaka developers!`}
                </div>
              </div>

              {/* Monthly Installment Pill */}
              <div className="flex items-center justify-between text-xs py-2 px-3 rounded-xl bg-white/5 border border-white/10 mt-3">
                <span className="text-slate-300">
                  {lang === 'bn' ? 'নির্মাণ কিস্তি (প্রতি মাসে)' : 'Monthly Construction Installment:'}
                </span>
                <span className="font-extrabold text-gold text-sm">
                  {Math.round(monthlyInstallment).toLocaleString()} BDT / Month
                </span>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => openInquiryModal(`Cost Calculator inquiry for ${flatSize} SFT`)}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-900 bg-gold hover:bg-gold-400 active:scale-95 transition shadow-lg shadow-gold/20 flex items-center justify-center gap-2"
              >
                <span>{lang === 'bn' ? 'এই খরচে ফ্ল্যাট বুক করুন' : 'Lock This Rate & Book Consultation'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
