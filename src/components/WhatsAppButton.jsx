import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function WhatsAppButton() {
  const { lang, settings } = useApp();
  const phone = settings?.phone1?.replace(/[^0-9]/g, '') || '01703033789';
  const intPhone = phone.startsWith('88') ? phone : `88${phone}`;

  const message = encodeURIComponent(
    lang === 'bn'
      ? 'আসসালামু আলাইকুম, আমি আইকেএন প্রোপার্টিজের জমি শেয়ার ও ফ্ল্যাট প্রকল্প সম্পর্কে বিস্তারিত জানতে চাই।'
      : 'Hello IKN Properties, I would like to inquire about your land-share flats and residential projects in North Badda.'
  );

  const whatsappUrl = `https://wa.me/${intPhone}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group border-2 border-white/20"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative">
        <MessageCircle className="w-6 h-6 animate-pulse" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
      </div>
      <span className="hidden sm:inline font-semibold text-sm tracking-wide">
        {lang === 'bn' ? 'হোয়াটসঅ্যাপ চ্যাট' : 'WhatsApp Us'}
      </span>
    </a>
  );
}
