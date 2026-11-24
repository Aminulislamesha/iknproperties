import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem('ikn_lang') || 'en');
  const [settings, setSettings] = useState(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedProjectForInquiry, setSelectedProjectForInquiry] = useState(null);
  const [toast, setToast] = useState(null);

  // Toggle language
  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'bn' : 'en';
    setLang(newLang);
    localStorage.setItem('ikn_lang', newLang);
  };

  // Fetch general settings
  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error('Failed to load settings:', err));
  }, []);

  // Show Toast
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Open Inquiry Modal
  const openInquiryModal = (projectName = '') => {
    setSelectedProjectForInquiry(projectName);
    setInquiryModalOpen(true);
  };

  const closeInquiryModal = () => {
    setInquiryModalOpen(false);
    setSelectedProjectForInquiry(null);
  };

  // Format BDT Currency
  const formatBDT = (amount) => {
    if (!amount) return '0 BDT';
    const num = Number(amount);
    if (num >= 10000000) {
      return `${(num / 10000000).toFixed(2)} Crore BDT`;
    } else if (num >= 100000) {
      return `${(num / 100000).toFixed(1)} Lakh BDT`;
    }
    return `${num.toLocaleString('en-IN')} BDT`;
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        toggleLanguage,
        settings,
        setSettings,
        inquiryModalOpen,
        selectedProjectForInquiry,
        openInquiryModal,
        closeInquiryModal,
        toast,
        showToast,
        formatBDT
      }}
    >
      {children}
      {/* Global Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl transition-all duration-300 animate-fade-in bg-slate-900 text-white border border-slate-700">
          <div
            className={`w-3 h-3 rounded-full ${
              toast.type === 'error' ? 'bg-red-500' : 'bg-emerald-400'
            }`}
          />
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
