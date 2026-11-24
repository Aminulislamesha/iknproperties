import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Home, Handshake, ArrowRight, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ServicesSection() {
  const { lang, openInquiryModal } = useApp();

  const services = [
    {
      id: 'land-share',
      icon: Layers,
      title: 'Land Share Flats',
      titleBn: 'জমি শেয়ারে ফ্ল্যাট',
      tagline: 'Save 35-40% on Luxury Apartments',
      taglineBn: 'আসল খরচে নিজের স্বপ্নের ফ্ল্যাট গড়ুন',
      description: 'Buy an undivided share of registered land in your own name and participate in cost-to-cost construction of modern high-rise apartments with RAJUK approval.',
      descriptionBn: 'সরাসরি নিজের নামে সাব-কবলা দলিল ও নামজারি সম্পন্ন করে মধ্যস্বত্বভোগী লাভ ছাড়াই সাশ্রয়ী খরচে আধুনিক আবাসিক ফ্ল্যাটের গর্বিত মালিক হোন।',
      features: [
        '100% Sub-Kabla Registry & Mutation in Buyer Name',
        'Transparent Cost of Construction (No Developer Markup)',
        'Flexible 30-Month Easy Installment Structure',
        'Full RAJUK Approval & Soil-Tested Engineering'
      ],
      featuresBn: [
        'ক্রেতার নিজ নামে ১০০% সাব-কবলা রেজিস্ট্রেশন ও নামজারি',
        'আসল নির্মাণ খরচে ফ্ল্যাট তৈরি (মধ্যস্বত্বভোগী ছাড়া)',
        '৩০ মাসের সহজ কিস্তিতে নির্মাণ খরচ পরিশোধ',
        'রাজউক (RAJUK) জি+৯ অনুমোদিত ও আধুনিক মানসম্মত নির্মাণ'
      ],
      cta: 'Explore Land Share',
      ctaBn: 'জমি শেয়ার বিস্তারিত'
    },
    {
      id: 'ready-flats',
      icon: Home,
      title: 'Ready Flats',
      titleBn: 'রেডি ফ্ল্যাট',
      tagline: 'Immediate Move-in Luxury Living',
      taglineBn: 'অবিলম্বে বসবাসযোগ্য বিলাসবহুল ফ্ল্যাট',
      description: 'Complete, turnkey luxury apartments with gas/electricity connections, lifts, full generator backup, and clear ownership documentation for immediate handover.',
      descriptionBn: 'সম্পূর্ণ আধুনিক ফিটিংস, বিদ্যুৎ সাবস্টেশন, ডাবল লিফট এবং নিরাপত্তা বেষ্টনী সহ অবিলম্বে ওঠার উপযোগী প্রস্তুত ফ্ল্যাট।',
      features: [
        'Immediate Physical Handover & Possession',
        'Bank Loan Assistance Supported by Top Financial Institutions',
        'Finished Living, Dining, Modern Fitted Kitchens & Bathrooms',
        '24/7 Security Guards & CCTV Surveillance'
      ],
      featuresBn: [
        'তাৎক্ষণিক দখল ও বাসস্থান নিশ্চিতকরণ',
        'ব্যাংক লোন সুবিধা ও আইনি নথিপত্রের নিশ্চয়তা',
        'আধুনিক কিচেন, বাথরুম ফিটিংস ও মার্বেল ফিনিশিং',
        '২৪/৭ সিসিটিভি ক্যামেরা ও সার্বক্ষণিক জেনারেটর ব্যাকআপ'
      ],
      cta: 'View Ready Flats',
      ctaBn: 'রেডি ফ্ল্যাট দেখুন'
    },
    {
      id: 'joint-development',
      icon: Handshake,
      title: 'Joint Building Development',
      titleBn: 'যৌথ ভবন নির্মাণ',
      tagline: 'Maximum Value for Landowners',
      taglineBn: 'জমির মালিকদের লাভজনক অংশীদারিত্ব',
      description: 'Partner with IKN Properties to develop multi-storey residential towers on your land with honest ratios, rapid approvals, and architectural excellence.',
      descriptionBn: 'আপনার জমিতে সর্বোচ্চ মানের বহুতল আধুনিক ভবন নির্মাণ করতে আইকেএন প্রোপার্টিজের সাথে যুক্ত হোন। জমির মালিকদের জন্য আকর্ষণীয় শেয়ারিং অনুপাত।',
      features: [
        'Competitive Landowner Share Ratios',
        'Hassle-free RAJUK & Civil Aviation Approvals Handled by Us',
        'Timely Milestone Handover with Strict Legal Contracts',
        'Premium Architectural Facade & High-Standard Materials'
      ],
      featuresBn: [
        'জমির মালিকদের জন্য সম্মানজনক ও সর্বোচ্চ লাভজনক রেশিও',
        'রাজউক নকশা ও অনুমোদন সংক্রান্ত সকল কাজ আমাদের দায়িত্বে',
        'নির্ধারিত সময়ে ভবন হস্তান্তর ও আইনগত স্বচ্ছ চুক্তিপত্র',
        'উন্নত মানের রড, সিমেন্ট ও আধুনিক আর্কিটেকচারাল ডিজাইন'
      ],
      cta: 'Partner With Us',
      ctaBn: 'যৌথ নির্মাণে যোগাযোগ'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-gold bg-primary-950 px-3.5 py-1.5 rounded-full inline-block mb-3">
            {lang === 'bn' ? 'আমাদের প্রধান সেবাসমূহ' : 'Core Business Services'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'bn'
              ? 'আইকেএন প্রোপার্টিজের আবাসন ও জমি সমাধান'
              : 'End-to-End Real Estate Solutions'}
          </h2>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            {lang === 'bn'
              ? 'ন্যায্য মূল্য ও শতভাগ আইনি স্বচ্ছতায় আপনার স্থায়ী ঠিকানার নিশ্চয়তা।'
              : 'Delivering uncompromised quality, transparency, and affordability for Dhaka home seekers.'}
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className="group bg-slate-50 hover:bg-white rounded-3xl p-8 border border-slate-100 hover:border-primary-100 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-primary-700 text-gold flex items-center justify-center mb-6 shadow-lg shadow-primary-700/20 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {lang === 'bn' ? srv.titleBn : srv.title}
                  </h3>
                  <span className="text-xs font-semibold text-primary-600 block mb-3">
                    {lang === 'bn' ? srv.taglineBn : srv.tagline}
                  </span>

                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {lang === 'bn' ? srv.descriptionBn : srv.description}
                  </p>

                  {/* Feature Checklist */}
                  <ul className="space-y-2.5 mb-6 text-xs text-slate-700">
                    {(lang === 'bn' ? srv.featuresBn : srv.features).map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <button
                    onClick={() => openInquiryModal(srv.title)}
                    className="w-full py-3 px-4 rounded-xl text-xs font-bold text-slate-900 bg-white group-hover:bg-primary-700 group-hover:text-white border border-slate-200 group-hover:border-transparent transition flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>{lang === 'bn' ? srv.ctaBn : srv.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
