import React, { useState, useEffect } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { useApp } from '../context/AppContext';

export default function FaqPage() {
  const { lang } = useApp();
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    fetch('/api/faqs')
      .then(res => res.json())
      .then(data => setFaqs(data || []))
      .catch(err => console.error(err));
  }, []);

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <SEOHead
        title="Frequently Asked Questions (FAQ) | IKN Properties"
        description="Find answers to common questions about buying land share flats in Dhaka, RAJUK approvals, mutation deeds, and payment installments."
        canonical="https://iknproperties.com/faq"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Banner */}
        <div className="bg-emerald-luxury rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden text-center">
          <div className="max-w-xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold bg-white/10 px-3.5 py-1.5 rounded-full inline-block border border-gold/30">
              FAQ
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {lang === 'bn' ? 'সাধারণ প্রশ্নোত্তর' : 'Frequently Asked Questions'}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200">
              {lang === 'bn'
                ? 'আইকেএন জমি শেয়ার ও ফ্ল্যাট প্রকল্প সম্পর্কে আপনার যাবতীয় প্রশ্নের উত্তর জানুন।'
                : 'Clear, authoritative answers regarding land registry, construction schedules, and legal ownership.'}
            </p>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={faq.id || idx}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-primary-700 transition"
              >
                <span>{lang === 'bn' ? faq.questionBn || faq.question : faq.question}</span>
                {openIndex === idx ? (
                  <ChevronUp className="w-4 h-4 text-primary-600 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>

              {openIndex === idx && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50">
                  {lang === 'bn' ? faq.answerBn || faq.answer : faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
