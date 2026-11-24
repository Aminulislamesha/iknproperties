import React, { useState, useEffect } from 'react';
import { HardHat, Calendar, CheckCircle2, Building, ShieldCheck } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { useApp } from '../context/AppContext';

export default function ProjectProgressPage() {
  const { lang } = useApp();
  const [updates, setUpdates] = useState([]);
  const [selectedProject, setSelectedProject] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/progress')
      .then(res => res.json())
      .then(data => {
        setUpdates(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredUpdates = selectedProject === 'All'
    ? updates
    : updates.filter(u => u.projectId === selectedProject || u.projectTitle.toLowerCase().includes(selectedProject.toLowerCase()));

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <SEOHead
        title="Live Construction Progress & Site Milestones | IKN Properties"
        description="Follow weekly and monthly construction milestones, piling casting updates, and site progress for Rose Garden and Shopno Tower in North Badda, Dhaka."
        keywords="Construction progress North Badda, Rose Garden piling, Shopno Tower progress, Dhaka flat construction"
        canonical="https://iknproperties.com/project-progress"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Banner */}
        <div className="bg-emerald-luxury rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold bg-white/10 px-3.5 py-1.5 rounded-full inline-block border border-gold/30">
              {lang === 'bn' ? 'সরাসরি সাইট রিপোর্ট' : 'Live Field Updates'}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {lang === 'bn'
                ? 'নির্মাণ কাজের লাইভ অগ্রগতি ও ছবি'
                : 'Live Project Construction & Milestones'}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
              {lang === 'bn'
                ? 'আইকেএন প্রোপার্টিজ বিশ্বাস করে শতভাগ স্বচ্ছতায়। প্রতিটি পাইলিং, ঢালাই ও ফ্লোর কাস্টিংয়ের হালনাগাদ তথ্য এখানে নিয়মিত প্রকাশ করা হয়।'
                : 'Engineering milestones, piling updates, and physical site photographs published weekly for full investor transparency.'}
            </p>
          </div>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {['All', 'rose-garden', 'shopno-tower'].map((p) => (
            <button
              key={p}
              onClick={() => setSelectedProject(p)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedProject === p
                  ? 'bg-primary-700 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {p === 'All' ? 'All Projects' : p === 'rose-garden' ? 'Rose Garden (North Badda)' : 'Shopno Tower'}
            </button>
          ))}
        </div>

        {/* Progress Timeline List */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs text-slate-500 font-medium">Loading progress reports...</p>
          </div>
        ) : filteredUpdates.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100">
            <HardHat className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-base font-bold text-slate-700">No updates found for this selection</h3>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredUpdates.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Photo */}
                <div className="lg:col-span-5 h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-100 relative">
                  <img
                    src={item.photoUrl}
                    alt={item.milestone}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-brandDark/85 backdrop-blur-md px-3 py-1 rounded-xl text-white text-xs font-bold">
                    {item.projectTitle}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-primary-700 text-gold px-3 py-1.5 rounded-xl text-xs font-extrabold shadow">
                    {item.percentage}% Milestone Completed
                  </div>
                </div>

                {/* Details */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
                    <Calendar className="w-4 h-4 text-primary-600" />
                    <span>Report Date: {item.date}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900">
                    {lang === 'bn' ? item.milestoneBn || item.milestone : item.milestone}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {lang === 'bn' ? item.descriptionBn || item.description : item.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>Overall Progress</span>
                      <span>{item.percentage}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 via-primary-600 to-primary-700 rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Quality Inspected by Licensed Civil Engineers</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
