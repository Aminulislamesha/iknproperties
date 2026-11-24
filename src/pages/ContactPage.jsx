import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { useApp } from '../context/AppContext';

export default function ContactPage() {
  const { lang, settings, showToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    project: 'General Inquiry',
    serviceType: 'Site Visit Booking',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      showToast('Name and phone are required', 'error');
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
        showToast(data.message || 'Message sent successfully!');
        setFormData({ name: '', phone: '', email: '', project: 'General Inquiry', serviceType: 'Site Visit Booking', message: '' });
      } else {
        showToast(data.error || 'Submission failed', 'error');
      }
    } catch (err) {
      showToast('Network error, please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <SEOHead
        title="Contact IKN Properties | North Badda Office, Dhaka"
        description="Visit IKN Properties office at 158/1B Moynarbag, Hossen Market, North Badda, Dhaka. Call 01703-033789 or 01721-961935 for Rose Garden and Shopno Tower visits."
        canonical="https://iknproperties.com/contact"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Banner */}
        <div className="bg-emerald-luxury rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold bg-white/10 px-3.5 py-1.5 rounded-full inline-block border border-gold/30">
              {lang === 'bn' ? 'আমাদের সাথে যোগাযোগ' : 'Get in Touch'}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {lang === 'bn'
                ? 'আইকেএন প্রোপার্টিজ অফিস ও সাইট ভিজিট'
                : 'Contact Us & Schedule a Site Visit'}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
              {lang === 'bn'
                ? 'উত্তর বাড্ডার ময়নাবাগে আমাদের প্রধান কার্যালয়ে সরাসরি আসুন অথবা ফোনে পরামর্শ নিন।'
                : 'Reach out to our customer care team or visit our corporate office in North Badda, Dhaka.'}
            </p>
          </div>
        </div>

        {/* Contact Grid: Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Info Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Address */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary-100 text-primary-700 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  {lang === 'bn' ? 'কর্পোরেট অফিস ঠিকানা' : 'Corporate Office Address'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {settings?.addressBn || '158/1B (4th Floor), Moynarbag, Hossen Market, North Badda, Dhaka-1212'}
                </p>
                <span className="text-[11px] font-semibold text-primary-700 mt-1 block">
                  {lang === 'bn' ? 'হোসেন মার্কেট সংলগ্ন, উত্তর বাড্ডা' : 'Adjacent to Hossen Market'}
                </span>
              </div>
            </div>

            {/* Phones */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gold/20 text-gold-dark flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  {lang === 'bn' ? 'হটলাইন ও সেলস ডেস্ক' : 'Official Hotline & Sales'}
                </h3>
                <div className="space-y-1 text-xs">
                  <a href="tel:01703033789" className="block font-bold text-slate-800 hover:text-primary-700">
                    01703-033789 (WhatsApp Available)
                  </a>
                  <a href="tel:01721961935" className="block font-bold text-slate-800 hover:text-primary-700">
                    01721-961935
                  </a>
                </div>
              </div>
            </div>

            {/* Email & Hours */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  {lang === 'bn' ? 'অফিসের সময়সূচি' : 'Office Working Hours'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Saturday - Thursday: 9:30 AM - 7:30 PM<br />
                  <span className="text-slate-400">Friday Closed (Site visits by prior appointment)</span>
                </p>
                <div className="mt-2 text-xs">
                  <span className="text-slate-400">Email: </span>
                  <a href="mailto:info@iknproperties.com" className="font-semibold text-primary-700">
                    info@iknproperties.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              {lang === 'bn' ? 'বার্তা পাঠান বা সাইট ভিজিট বুক করুন' : 'Send Message / Book Site Visit'}
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              {lang === 'bn'
                ? 'আপনার প্রয়োজনীয় তথ্য দিয়ে ফর্মটি পূরণ করুন। আমাদের প্রতিনিধি দ্রুত যোগাযোগ করবেন।'
                : 'Fill out this form and our senior project consultant will call you within 24 hours.'}
            </p>

            {submitted ? (
              <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">Thank you! Your message has been sent.</h3>
                <p className="text-xs text-slate-600">Our customer team will contact you shortly.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 text-xs font-bold bg-primary-700 text-white rounded-xl"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      {lang === 'bn' ? 'আপনার নাম *' : 'Your Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mohammad Rahim"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      {lang === 'bn' ? 'মোবাইল নম্বর *' : 'Phone Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="017XXXXXXXX"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      {lang === 'bn' ? 'ইমেইল (ঐচ্ছিক)' : 'Email (Optional)'}
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      {lang === 'bn' ? 'আগ্রহী প্রকল্প' : 'Interested Project'}
                    </label>
                    <select
                      value={formData.project}
                      onChange={e => setFormData({ ...formData, project: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-600"
                    >
                      <option value="General Inquiry">General Consultation</option>
                      <option value="Rose Garden">Rose Garden (1,250 SFT, North Badda)</option>
                      <option value="Shopno Tower">Shopno Tower (1,350 SFT, North Badda)</option>
                      <option value="Joint Building Development">Joint Building Development</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    {lang === 'bn' ? 'আপনার বার্তা / সাইট পরিদর্শনের সময়' : 'Message / Preferred Visit Date'}
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Write any specific question, preferred floor, or visit schedule..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-600 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-900 bg-gold hover:bg-gold-400 active:scale-95 transition shadow-lg shadow-gold/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'বার্তা পাঠান' : 'Submit Contact Inquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Embedded Map Section */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              {lang === 'bn' ? 'গুগল ম্যাপে আমাদের লোকেশন' : 'IKN Properties on Google Maps'}
            </h3>
            <span className="text-xs text-slate-500">Moynarbag, North Badda, Dhaka</span>
          </div>
          <div className="w-full h-80 rounded-2xl overflow-hidden bg-slate-200 border border-slate-100">
            <iframe
              title="IKN Properties Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.1077741366956!2d90.4244580760432!3d23.780963387661595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c79745778a4b%3A0xc3cf9c9a59bc8bb6!2sNorth%20Badda%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
