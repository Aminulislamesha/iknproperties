import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin, Bed, Bath, Compass, CheckCircle2, ShieldCheck, Phone, Download,
  Send, Share2, Maximize2, X, ChevronLeft, ChevronRight, Navigation,
  Award, Layers, ArrowRight
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { useApp } from '../context/AppContext';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const { lang, formatBDT, showToast, openInquiryModal } = useApp();
  const [project, setProject] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Quick inquiry form inside sidebar
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [submittingInquiry, setSubmittingInquiry] = useState(false);

  useEffect(() => {
    fetch(`/api/projects/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setProject(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setAllProjects(data || []))
      .catch(err => console.error(err));
  }, [slug]);

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) {
      showToast('Name and phone are required.', 'error');
      return;
    }

    setSubmittingInquiry(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: inquiryName,
          phone: inquiryPhone,
          project: project?.title || slug,
          serviceType: 'Land Share Flats',
          message: inquiryMessage || `Inquiry from ${project?.title} detail page`
        })
      });
      const data = await res.json();
      if (res.ok) {
        showToast(data.message || 'Inquiry submitted successfully!');
        setInquiryName('');
        setInquiryPhone('');
        setInquiryMessage('');
      } else {
        showToast(data.error || 'Failed to submit inquiry', 'error');
      }
    } catch (err) {
      showToast('Network error, please try again.', 'error');
    } finally {
      setSubmittingInquiry(false);
    }
  };

  const handleBrochureDownload = () => {
    showToast(
      lang === 'bn'
        ? `${project?.title} ব্রোশার ডাউনলোড হচ্ছে...`
        : `Downloading ${project?.title} official brochure...`
    );
    const element = document.createElement('a');
    const file = new Blob([
      `IKN PROPERTIES - OFFICIAL PROJECT BROCHURE\n=========================================\nProject: ${project?.title}\nLocation: ${project?.location}\nUnits: ${project?.totalUnits} (G+9)\nApartment Size: ${project?.apartmentSize}\nBedrooms: ${project?.bedrooms} | Bathrooms: ${project?.bathrooms} | Balconies: ${project?.balconies}\nLand Share Price: ${project?.landSharePrice} BDT\nEstimated Construction Cost: ${project?.estimatedConstructionCost} BDT\nEstimated Total Cost: ${project?.estimatedTotalCost} BDT\nLegal Status: RAJUK G+9 Approved, Mutation & Land Registration 100% Done.\nHotline: 01703-033789, 01721-961935\nWebsite: https://iknproperties.com/`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${project?.slug || 'ikn'}-brochure.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Project Not Found</h2>
        <p className="text-sm text-slate-500 mb-4">The property you are looking for does not exist or has been moved.</p>
        <Link to="/projects" className="px-5 py-2.5 rounded-xl font-bold text-xs bg-primary-700 text-white">
          Back to All Projects
        </Link>
      </div>
    );
  }

  const images = project.images && project.images.length > 0 ? project.images : [project.thumbnail];
  const otherProjects = allProjects.filter(p => p.slug !== project.slug);

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <SEOHead
        title={`${project.title} - ${project.apartmentSize} Luxury Flats in North Badda`}
        description={`${project.title} in Eastern Road, North Badda, Dhaka. 3 Beds, 3 Baths, RAJUK approved G+9 building. Land share: ${formatBDT(project.landSharePrice)}.`}
        keywords={`${project.title}, ${project.location}, Land Share Flat, North Badda, Flat for sale in Dhaka`}
        canonical={`https://iknproperties.com/projects/${project.slug}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-primary-700">Home</Link>
          <span>/</span>
          <Link to="/projects" className="hover:text-primary-700">Projects</Link>
          <span>/</span>
          <span className="font-bold text-slate-800">{project.title}</span>
        </nav>

        {/* Title Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-primary-700 text-white">
                {project.status}
              </span>
              <span className="px-3 py-1 rounded-md text-xs font-bold bg-emerald-100 text-primary-800">
                {project.category}
              </span>
              <span className="px-3 py-1 rounded-md text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                RAJUK G+9 Approved
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {lang === 'bn' ? project.titleBn || project.title : project.title}
            </h1>

            <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
              <MapPin className="w-4 h-4 text-primary-600" />
              <span>{lang === 'bn' ? project.locationBn || project.location : project.location}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleBrochureDownload}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition shadow-sm flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-primary-600" />
              <span>Brochure</span>
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                showToast('Link copied to clipboard!');
              }}
              className="p-2.5 rounded-xl text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition shadow-sm"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Gallery & Details (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Gallery Box */}
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-3">
              {/* Active Image */}
              <div className="relative h-[380px] sm:h-[460px] w-full rounded-2xl overflow-hidden bg-slate-900 group">
                <img
                  src={images[selectedImage]}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                <div className="absolute bottom-4 left-4 bg-brandDark/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-xs font-semibold">
                  Photo {selectedImage + 1} of {images.length}
                </div>

                {/* Lightbox Zoom Button */}
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="absolute top-4 right-4 p-2.5 rounded-xl bg-brandDark/70 hover:bg-brandDark text-white backdrop-blur-md transition shadow"
                  title="View Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                {/* Nav Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage((selectedImage - 1 + images.length) % images.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setSelectedImage((selectedImage + 1) % images.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative w-20 h-16 sm:w-24 sm:h-20 rounded-xl overflow-hidden shrink-0 transition border-2 ${
                        selectedImage === idx ? 'border-primary-600 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Specs Grid */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-3 flex items-center justify-between">
                <span>{lang === 'bn' ? 'প্রকল্পের গুরুত্বপূর্ণ তথ্যাবলী' : 'Property Overview & Specifications'}</span>
                <span className="text-xs font-semibold text-primary-700 bg-primary-50 px-2.5 py-1 rounded-lg">
                  {project.category}
                </span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold block mb-1">Apartment Size</span>
                  <span className="text-base font-extrabold text-slate-900">{project.apartmentSize}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block mb-1">Total Units</span>
                  <span className="text-base font-extrabold text-slate-900">{project.totalUnits} Units</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block mb-1">Floors</span>
                  <span className="text-base font-extrabold text-slate-900">{project.floors}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block mb-1">Timeline</span>
                  <span className="text-base font-extrabold text-slate-900">{project.constructionPeriod}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block mb-1">Bedrooms</span>
                  <span className="text-base font-extrabold text-slate-900">{project.bedrooms} Beds</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block mb-1">Bathrooms</span>
                  <span className="text-base font-extrabold text-slate-900">{project.bathrooms} Baths</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block mb-1">Balconies</span>
                  <span className="text-base font-extrabold text-slate-900">{project.balconies} Balconies</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block mb-1">Passenger Lifts</span>
                  <span className="text-base font-extrabold text-slate-900">{project.lifts} Lifts</span>
                </div>
              </div>
            </div>

            {/* Verified Legal & Approvals */}
            <div className="bg-emerald-50/70 border border-emerald-100 rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-primary-900 font-bold text-base">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
                <span>{lang === 'bn' ? 'আইনি ও অনুমোদন যাচাই' : 'Verified Legal & Approval Status'}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">RAJUK Approval:</strong>
                    <span>{project.rajukApproval}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Land Title & Mutation:</strong>
                    <span>{project.legalStatus}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Soil Test & Engineering:</strong>
                    <span>{project.soilTest}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Piling Status:</strong>
                    <span>{project.pilingStatus}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-4">
              <h2 className="text-lg font-bold text-slate-900">
                {lang === 'bn' ? 'প্রকল্পের বিস্তারিত বিবরণ' : 'About the Project'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {lang === 'bn' ? project.descriptionBn || project.description : project.description}
              </p>
            </div>

            {/* Amenities & Features */}
            {project.amenities && project.amenities.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-4">
                <h2 className="text-lg font-bold text-slate-900">
                  {lang === 'bn' ? 'সুবিধাসমূহ ও ফিচার' : 'Key Amenities & Facilities'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                  {project.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-primary-600 shrink-0" />
                      <span className="font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Neighborhood & Strategic Location */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-primary-600" />
                <span>{lang === 'bn' ? 'কমিউনিটি ও যাতায়াত সুবিধা' : 'Neighborhood & Connectivity'}</span>
              </h2>
              <p className="text-xs text-slate-500">
                Located right off Eastern Road in North Badda with direct access to Gulshan, Hatirjheel, and Purbachal 300-ft Highway.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <span className="font-extrabold text-primary-800 text-sm block">5 Mins</span>
                  <span className="text-slate-500 text-[11px]">Gulshan-1 Link Road</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <span className="font-extrabold text-primary-800 text-sm block">7 Mins</span>
                  <span className="text-slate-500 text-[11px]">Hatirjheel Expressway</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <span className="font-extrabold text-primary-800 text-sm block">10 Mins</span>
                  <span className="text-slate-500 text-[11px]">Purbachal 300ft Road</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <span className="font-extrabold text-primary-800 text-sm block">2 Mins</span>
                  <span className="text-slate-500 text-[11px]">Hossen Market</span>
                </div>
              </div>
            </div>

            {/* Floor Plans */}
            {project.floorPlans && project.floorPlans.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-4">
                <h2 className="text-lg font-bold text-slate-900">
                  {lang === 'bn' ? 'ফ্লোর প্ল্যান ও নকশা' : 'Architectural Floor Plans'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {project.floorPlans.map((fp, i) => (
                    <div key={i} className="rounded-2xl border border-slate-100 overflow-hidden bg-slate-50">
                      <div className="h-56 bg-slate-200 overflow-hidden relative group">
                        <img src={fp.image} alt={fp.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-sm text-slate-900">{fp.name}</h4>
                        <p className="text-xs text-slate-500 mt-1">{fp.specs}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Pricing & Inquire Box (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Pricing Card */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 sticky top-28 space-y-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  {lang === 'bn' ? 'জমি শেয়ার মূল্য' : 'Land Share Price'}
                </span>
                <div className="text-3xl font-extrabold text-primary-800">
                  {formatBDT(project.landSharePrice)}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {lang === 'bn'
                    ? 'সাব-কবলা জমি রেজিস্ট্রেশন ও নামজারি সহ'
                    : 'Inclusive of direct registered land ownership'}
                </div>
              </div>

              {/* Cost breakdown pill */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Construction:</span>
                  <span className="font-bold text-slate-800">{formatBDT(project.estimatedConstructionCost)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Total:</span>
                  <span className="font-bold text-primary-700">{formatBDT(project.estimatedTotalCost)}</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between text-slate-600">
                  <span>Payment Tenure:</span>
                  <span className="font-bold text-slate-800">30 Months Installments</span>
                </div>
              </div>

              {/* Instant Inquiry Form */}
              <form onSubmit={handleInquirySubmit} className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  {lang === 'bn' ? 'ফ্ল্যাট বুকিং অনুসন্ধান' : 'Book Flat / Request Consultation'}
                </h4>

                <input
                  type="text"
                  required
                  placeholder={lang === 'bn' ? 'আপনার নাম' : 'Your Name'}
                  value={inquiryName}
                  onChange={e => setInquiryName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-600 transition"
                />

                <input
                  type="tel"
                  required
                  placeholder={lang === 'bn' ? 'মোবাইল নম্বর' : 'Phone Number (017XXXXXXXX)'}
                  value={inquiryPhone}
                  onChange={e => setInquiryPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-600 transition"
                />

                <textarea
                  rows="2"
                  placeholder={lang === 'bn' ? 'পছন্দের ফ্লোর বা মন্তব্য (ঐচ্ছিক)' : 'Preferred floor or message...'}
                  value={inquiryMessage}
                  onChange={e => setInquiryMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-600 transition resize-none"
                ></textarea>

                <button
                  type="submit"
                  disabled={submittingInquiry}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-900 bg-gold hover:bg-gold-400 active:scale-95 transition shadow-md shadow-gold/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'বুকিং আবেদন জমা দিন' : 'Submit Booking Request'}</span>
                </button>
              </form>

              {/* Direct Hotline */}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                <a
                  href="tel:01703033789"
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-primary-800 bg-primary-50 hover:bg-primary-100 transition flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-primary-600" />
                  <span>Call Hotline: 01703-033789</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Similar / Other Projects Section */}
        {otherProjects.length > 0 && (
          <div className="mt-20 pt-12 border-t border-slate-200 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary-700 bg-primary-50 px-3 py-1 rounded-full">
                Explore More
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
                Other Featured Developments by IKN Properties
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherProjects.map(op => (
                <Link
                  key={op.id}
                  to={`/projects/${op.slug}`}
                  className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-xl transition flex gap-4 items-center group"
                >
                  <img src={op.thumbnail} alt={op.title} className="w-24 h-24 rounded-xl object-cover shrink-0" />
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase text-primary-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {op.category}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 group-hover:text-primary-700 transition">
                      {op.title}
                    </h4>
                    <span className="text-xs text-slate-500 block">{op.location}</span>
                    <span className="text-xs font-extrabold text-primary-800 block">
                      Land Share: {formatBDT(op.landSharePrice)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={images[selectedImage]}
            alt={project.title}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl"
          />
        </div>
      )}
    </div>
  );
}
