import React, { useState, useEffect } from 'react';
import { Star, Quote, MessageSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function TestimonialsSection() {
  const { lang } = useApp();
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setTestimonials(data);
        }
      })
      .catch(err => console.error('Error fetching testimonials:', err));
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-primary-800 text-xs font-bold uppercase tracking-wider mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'গ্রাহকদের আস্থা' : 'Client Testimonials'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'bn'
              ? 'আইকেএন প্রোপার্টিজ সম্পর্কে জমি শেয়ার ক্রেতাদের মতামত'
              : 'What Our Land-Share Partners Say'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            {lang === 'bn'
              ? 'নিরাপদ বিনিয়োগ ও সাশ্রয়ী ফ্ল্যাট নির্মাণের অভিজ্ঞতার গল্প।'
              : 'Real stories of family trust, cost transparency, and seamless apartment ownership.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-7 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars & Quote */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-gold">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold" />
                    ))}
                  </div>
                  <Quote className="w-7 h-7 text-emerald-100" />
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{lang === 'bn' ? t.commentBn || t.comment : t.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-gold/40 shadow-sm"
                  loading="lazy"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">{t.designation}</p>
                  <span className="text-[10px] font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full inline-block mt-0.5">
                    {t.project}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
