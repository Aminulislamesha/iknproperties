import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Send, Phone, User, Mail, Building, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function InquiryModal() {
  const { inquiryModalOpen, closeInquiryModal, selectedProjectForInquiry, lang, showToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    project: '',
    serviceType: 'Land Share Flats',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selectedProjectForInquiry) {
      setFormData(prev => ({ ...prev, project: selectedProjectForInquiry }));
    }
  }, [selectedProjectForInquiry]);

  if (!inquiryModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      showToast(lang === 'bn' ? 'নাম ও ফোন নম্বর আবশ্যক' : 'Name and phone are required', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
        showToast(data.message || 'Inquiry submitted successfully!');
        setTimeout(() => {
          setSubmitted(false);
          closeInquiryModal();
          setFormData({ name: '', phone: '', email: '', project: '', serviceType: 'Land Share Flats', message: '' });
        }, 2200);
      } else {
        showToast(data.error || 'Failed to submit inquiry', 'error');
      }
    } catch (err) {
      showToast('Network error, please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
        {/* Header with emerald luxury gradient */}
        <div className="bg-emerald-luxury px-6 py-5 text-white flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold tracking-tight">
              {lang === 'bn' ? 'বুকিং ও পরামর্শ অনুসন্ধান' : 'Book a Consultation / Flat Inquiry'}
            </h3>
            <p className="text-xs text-emerald-200 mt-1">
              {lang === 'bn'
                ? 'আইকেএন প্রোপার্টিজ টিম আপনার সাথে অবিলম্বে যোগাযোগ করবে'
                : 'Direct consultation with our senior project coordinators'}
            </p>
          </div>
          <button
            onClick={closeInquiryModal}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">
              {lang === 'bn' ? 'ধন্যবাদ! আপনার বার্তা পেয়েছি।' : 'Thank You! We Received Your Request.'}
            </h4>
            <p className="text-sm text-slate-600">
              {lang === 'bn'
                ? 'আমাদের রিয়েল এস্টেট বিশেষজ্ঞ দ্রুত আপনার প্রদত্ত ফোন নম্বরে কল করবেন।'
                : 'Our property advisors will contact you promptly at your provided phone number.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                {lang === 'bn' ? 'আপনার নাম *' : 'Your Full Name *'}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder={lang === 'bn' ? 'যেমন: মোহাম্মদ রফিক' : 'e.g. John Doe'}
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  {lang === 'bn' ? 'মোবাইল নম্বর *' : 'Phone Number *'}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="017XXXXXXXX"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  {lang === 'bn' ? 'ইমেইল (ঐচ্ছিক)' : 'Email (Optional)'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  {lang === 'bn' ? 'আগ্রহী প্রকল্প' : 'Interested Project'}
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={formData.project}
                    onChange={e => setFormData({ ...formData, project: e.target.value })}
                    className="w-full pl-10 pr-8 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition appearance-none"
                  >
                    <option value="">{lang === 'bn' ? 'যেকোনো প্রকল্প / সাধারণ' : 'Select Project / General'}</option>
                    <option value="Rose Garden">Rose Garden (North Badda, G+9)</option>
                    <option value="Shopno Tower">Shopno Tower (North Badda, G+9)</option>
                    <option value="IKN Green Paradise">IKN Green Paradise (Upcoming)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  {lang === 'bn' ? 'সেবার ধরন' : 'Service Type'}
                </label>
                <select
                  value={formData.serviceType}
                  onChange={e => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition"
                >
                  <option value="Land Share Flats">Land Share Flats (জমি শেয়ার)</option>
                  <option value="Ready Flats">Ready Flats (রেডি ফ্ল্যাট)</option>
                  <option value="Joint Building Development">Joint Venture (যৌথ নির্মাণ)</option>
                  <option value="Site Visit Booking">Schedule Site Visit (সাইট পরিদর্শন)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                {lang === 'bn' ? 'আপনার বার্তা / প্রশ্ন' : 'Your Message / Inquiry'}
              </label>
              <div className="relative">
                <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <textarea
                  rows="3"
                  placeholder={lang === 'bn' ? 'ফ্ল্যাটের সাইজ বা আপনার পছন্দের বিষয় লিখুন...' : 'Preferred floor, budget, or visit timing...'}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition resize-none"
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-white bg-primary-600 hover:bg-primary-700 active:scale-[0.99] transition shadow-lg shadow-primary-600/20 disabled:opacity-70"
            >
              {submitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'বার্তা পাঠান' : 'Submit Inquiry'}</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
