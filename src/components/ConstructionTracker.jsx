import React, { useState, useEffect } from 'react';
import { HardHat, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function ConstructionTracker() {
  const { lang } = useApp();
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    fetch('/api/progress')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setUpdates(data.slice(0, 3));
        }
      })
      .catch(err => console.error('Failed to load progress updates:', err));
  }, []);

  if (updates.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-primary-800 text-xs font-bold uppercase tracking-wider mb-2">
              <HardHat className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'লাইভ নির্মাণ অগ্রগতি' : 'Live Construction Progress'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {lang === 'bn'
                ? 'সাইটের চলমান কাজের সর্বশেষ তথ্য'
                : 'Real-Time Construction Milestones'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {lang === 'bn'
                ? 'ইস্টার্ন রোড, উত্তর বাড্ডায় প্রতিটি প্রকল্পের পাইলিং ও স্ট্রাকচারাল অগ্রগতির চিত্র।'
                : 'Verified engineering updates and progress photos directly from our project engineers.'}
            </p>
          </div>

          <Link
            to="/project-progress"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-700 hover:text-primary-800 group"
          >
            <span>{lang === 'bn' ? 'সকল অগ্রগতি রিপোর্ট' : 'View Full Progress Archive'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Updates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {updates.map((up) => (
            <div
              key={up.id}
              className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Photo */}
              <div className="relative h-48 w-full bg-slate-200 overflow-hidden">
                <img
                  src={up.photoUrl}
                  alt={up.milestone}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-brandDark/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-white text-[11px] font-bold">
                  {up.projectTitle}
                </div>
                <div className="absolute bottom-3 right-3 bg-primary-700 text-gold px-2.5 py-1 rounded-lg text-[11px] font-extrabold shadow">
                  {up.percentage}% Completed
                </div>
              </div>

              {/* Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 mb-1.5">
                    <Calendar className="w-3.5 h-3.5 text-primary-600" />
                    <span>{up.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {lang === 'bn' ? up.milestoneBn || up.milestone : up.milestone}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {lang === 'bn' ? up.descriptionBn || up.description : up.description}
                  </p>
                </div>

                <div className="pt-2">
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-primary-600 rounded-full"
                      style={{ width: `${up.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
