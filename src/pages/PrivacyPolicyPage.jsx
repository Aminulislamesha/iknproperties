import React from 'react';
import SEOHead from '../components/SEOHead';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <SEOHead
        title="Privacy & Refund Policy | IKN Properties"
        description="Official privacy policy, data protection terms, and customer rights for IKN Properties."
        canonical="https://iknproperties.com/privacy-policy"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Privacy Policy & Customer Terms
          </h1>
          <p className="text-slate-500">Last updated: November 2026</p>

          <h2 className="text-base font-bold text-slate-900 pt-2">1. Introduction</h2>
          <p>
            IKN Properties ("we", "our", or "the Company") operates the domain https://iknproperties.com. This Privacy Policy informs our visitors, land-share buyers, and property partners regarding our policies with the collection, use, and disclosure of personal information.
          </p>

          <h2 className="text-base font-bold text-slate-900 pt-2">2. Information Collection and Use</h2>
          <p>
            When you request a project consultation, schedule an on-site visit, or submit a flat booking inquiry, we collect your name, phone number, email address, and property preferences. This information is utilized solely to facilitate legal land registration, provide construction updates, and manage customer service.
          </p>

          <h2 className="text-base font-bold text-slate-900 pt-2">3. Land Registration & Title Deeds</h2>
          <p>
            Under IKN Properties' land-share model, property deeds (Sub-Kabla) and mutation records (নামজারি) are executed directly between the buyer and the competent Sub-Registry office under Bangladesh Registration Act and State Acquisition and Tenancy Act.
          </p>

          <h2 className="text-base font-bold text-slate-900 pt-2">4. Contact Information</h2>
          <p>
            For any inquiries regarding your data or rights, please contact our North Badda office at info@iknproperties.com or call 01703-033789.
          </p>
        </div>
      </div>
    </div>
  );
}
