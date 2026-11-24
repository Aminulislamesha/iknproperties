import React, { useState, useEffect, useRef } from 'react';
import {
  Globe,
  Search,
  Share2,
  Save,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Loader2,
  Link as LinkIcon,
  Sparkles,
  BarChart3,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export default function AdminSEO() {
  const { token } = useAuth();
  const { showToast } = useApp();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingOgImage, setUploadingOgImage] = useState(false);
  const ogImageInputRef = useRef(null);

  const [seo, setSeo] = useState({
    metaTitle: 'IKN Properties | Land Share Flats & Premium Apartments in Dhaka',
    metaDescription: 'Discover smart land-share flats in North Badda, Dhaka by IKN Properties. Save 35-40% on building construction cost with direct registered sub-kabla ownership and RAJUK approved multi-storey buildings.',
    keywords: 'land share flat dhaka, flat for sale north badda, ikn properties, rose garden badda, shopno tower, luxury apartment dhaka, affordable flat dhaka',
    canonicalUrl: 'https://iknproperties.com',
    ogTitle: 'IKN Properties - Premium Land Share Flats in North Badda, Dhaka',
    ogDescription: 'Buy land in your own name and build luxury flats together at actual construction cost. 35-40% savings with 100% legal security.',
    ogImage: '/projects/rose_garden_main.jpg',
    googleAnalyticsId: '',
    googleSearchConsole: '',
    robotsIndexing: true
  });

  useEffect(() => {
    fetch('/api/settings/seo')
      .then(res => res.json())
      .then(data => {
        if (data && Object.keys(data).length > 0) {
          setSeo(prev => ({ ...prev, ...data }));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleOgImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingOgImage(true);
      const data = new FormData();
      data.append('image', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: data
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to upload image');
      }

      setSeo(prev => ({ ...prev, ogImage: json.url }));
      showToast('Open Graph preview image uploaded!');
    } catch (err) {
      showToast(err.message || 'Error uploading image', 'error');
    } finally {
      setUploadingOgImage(false);
      e.target.value = '';
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/settings/seo', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(seo)
      });
      const json = await res.json();
      if (res.ok) {
        showToast('SEO settings saved and published successfully!');
      } else {
        showToast(json.error || 'Failed to save SEO settings', 'error');
      }
    } catch (err) {
      showToast('Network error saving SEO settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  const titleLength = seo.metaTitle ? seo.metaTitle.length : 0;
  const descLength = seo.metaDescription ? seo.metaDescription.length : 0;

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Globe className="w-6 h-6 text-primary-700" />
            <span>Search Engine Optimization (SEO) & Social Sharing</span>
          </h1>
          <p className="text-xs text-slate-500">
            Control search engine snippets, target real estate keywords, social media link previews, and webmaster analytics.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-900 bg-gold hover:bg-gold-400 transition shadow flex items-center gap-2 self-start sm:self-auto"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? 'Saving...' : 'Save SEO Settings'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. GOOGLE SEARCH RESULTS REAL-TIME PREVIEW */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <Search className="w-4 h-4 text-blue-600" />
              <span>Google SERP Preview (Desktop & Mobile Simulation)</span>
            </h3>
            <span className="text-[11px] font-semibold text-slate-400">Live preview as typed below</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 max-w-2xl font-sans">
            <div className="flex items-center gap-2 text-[12px] text-slate-600">
              <div className="w-4 h-4 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[9px] font-bold">
                I
              </div>
              <span className="truncate">
                {seo.canonicalUrl || 'https://iknproperties.com'}
              </span>
              <span className="text-slate-400">›</span>
              <span className="text-slate-400">Dhaka</span>
            </div>

            <h4 className="text-base sm:text-lg font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug line-clamp-1">
              {seo.metaTitle || 'IKN Properties | Land Share Flats in Dhaka'}
            </h4>

            <p className="text-xs sm:text-[13px] text-slate-600 line-clamp-2 leading-relaxed">
              {seo.metaDescription || 'Buy land in your own name and build flats together at low cost in Eastern Road, North Badda, Dhaka...'}
            </p>
          </div>
        </div>

        {/* 2. GENERAL META TAGS */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Sparkles className="w-4 h-4 text-primary-700" />
            <span>Default Meta Tags & Indexing</span>
          </h3>

          <div className="space-y-4 text-xs">
            {/* Meta Title */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-slate-700">Meta Title *</label>
                <span
                  className={`text-[10px] font-semibold ${
                    titleLength >= 45 && titleLength <= 65 ? 'text-emerald-600' : 'text-slate-400'
                  }`}
                >
                  {titleLength} / 60 characters (Recommended: 50-60)
                </span>
              </div>
              <input
                type="text"
                required
                value={seo.metaTitle}
                onChange={e => setSeo({ ...seo, metaTitle: e.target.value })}
                placeholder="IKN Properties | Land Share Flats & Premium Apartments in Dhaka"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-primary-600"
              />
            </div>

            {/* Meta Description */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-slate-700">Meta Description *</label>
                <span
                  className={`text-[10px] font-semibold ${
                    descLength >= 140 && descLength <= 165 ? 'text-emerald-600' : 'text-slate-400'
                  }`}
                >
                  {descLength} / 160 characters (Recommended: 140-160)
                </span>
              </div>
              <textarea
                rows="3"
                required
                value={seo.metaDescription}
                onChange={e => setSeo({ ...seo, metaDescription: e.target.value })}
                placeholder="Comprehensive summary describing land share flats, registered ownership, RAJUK approval, and project locations..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-primary-600 resize-none leading-relaxed"
              ></textarea>
            </div>

            {/* Target Keywords */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Focus Keywords (Comma separated)
              </label>
              <input
                type="text"
                value={seo.keywords}
                onChange={e => setSeo({ ...seo, keywords: e.target.value })}
                placeholder="land share flat dhaka, flat for sale north badda, ikn properties, rose garden badda..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-primary-600"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Keywords help search engines and indexing spiders categorize your property offerings.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Canonical URL */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Canonical Base URL</label>
                <input
                  type="text"
                  value={seo.canonicalUrl}
                  onChange={e => setSeo({ ...seo, canonicalUrl: e.target.value })}
                  placeholder="https://iknproperties.com"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:border-primary-600"
                />
              </div>

              {/* Robots Indexing */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Search Engine Indexing</label>
                <select
                  value={seo.robotsIndexing ? 'index' : 'noindex'}
                  onChange={e => setSeo({ ...seo, robotsIndexing: e.target.value === 'index' })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-primary-600"
                >
                  <option value="index">index, follow (Allow Google & Bing to index site)</option>
                  <option value="noindex">noindex, nofollow (Block search engines)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 3. OPEN GRAPH & SOCIAL LINK PREVIEW (FACEBOOK, WHATSAPP, LINKEDIN) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-emerald-700" />
                <span>Social Sharing & Open Graph (Facebook / WhatsApp / LinkedIn Preview)</span>
              </h3>
              <p className="text-[11px] text-slate-500">
                This image and headline appear when visitors share your website link on WhatsApp, Facebook, or LinkedIn.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs items-start">
            {/* Left Column: Form Fields */}
            <div className="lg:col-span-7 space-y-3.5">
              <div>
                <label className="block font-bold text-slate-700 mb-1">OG Title</label>
                <input
                  type="text"
                  value={seo.ogTitle}
                  onChange={e => setSeo({ ...seo, ogTitle: e.target.value })}
                  placeholder="IKN Properties - Premium Land Share Flats in North Badda"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">OG Description</label>
                <textarea
                  rows="2"
                  value={seo.ogDescription}
                  onChange={e => setSeo({ ...seo, ogDescription: e.target.value })}
                  placeholder="Buy land in your own name and build luxury flats together at actual construction cost..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 resize-none focus:outline-none focus:border-primary-600"
                ></textarea>
              </div>

              {/* OG Image Upload */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-800">Social Share Image (OG Image)</label>
                  <input
                    type="file"
                    ref={ogImageInputRef}
                    accept="image/*"
                    onChange={handleOgImageUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    disabled={uploadingOgImage}
                    onClick={() => ogImageInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg bg-primary-700 text-white font-bold text-[11px] hover:bg-primary-800 transition flex items-center gap-1 shadow-sm"
                  >
                    {uploadingOgImage ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    <span>{uploadingOgImage ? 'Uploading...' : 'Upload Image'}</span>
                  </button>
                </div>

                <div className="relative">
                  <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={seo.ogImage}
                    onChange={e => setSeo({ ...seo, ogImage: e.target.value })}
                    placeholder="/projects/... or https://..."
                    className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-mono text-[11px] focus:outline-none focus:border-primary-600"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Live Facebook/WhatsApp Card Preview */}
            <div className="lg:col-span-5 space-y-2">
              <span className="font-bold text-slate-500 block text-[11px]">Social Card Simulation:</span>
              <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">
                <div className="relative aspect-video bg-slate-100 overflow-hidden">
                  {seo.ogImage ? (
                    <img
                      src={seo.ogImage}
                      alt="Open Graph preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/projects/rose_garden_main.jpg';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <ImageIcon className="w-8 h-8 stroke-1" />
                    </div>
                  )}
                </div>
                <div className="p-3 bg-slate-50 border-t border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    iknproperties.com
                  </span>
                  <h5 className="font-bold text-slate-900 text-xs line-clamp-1">
                    {seo.ogTitle || seo.metaTitle}
                  </h5>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {seo.ogDescription || seo.metaDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. WEBMASTER TOOLS & ANALYTICS */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <BarChart3 className="w-4 h-4 text-primary-700" />
            <span>Search Console & Analytics Integration</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Google Search Console Verification Token / Meta Tag
              </label>
              <input
                type="text"
                value={seo.googleSearchConsole}
                onChange={e => setSeo({ ...seo, googleSearchConsole: e.target.value })}
                placeholder="e.g. google-site-verification=abc123xyz"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-[11px] focus:outline-none focus:border-primary-600"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Enter your Google Search Console token or verification code to claim site ownership.
              </p>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Google Analytics 4 (GA4) Measurement ID
              </label>
              <input
                type="text"
                value={seo.googleAnalyticsId}
                onChange={e => setSeo({ ...seo, googleAnalyticsId: e.target.value })}
                placeholder="e.g. G-ABC123XYZ"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-[11px] focus:outline-none focus:border-primary-600"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Automatically activates traffic analytics and pageview measurement across all pages.
              </p>
            </div>
          </div>
        </div>

        {/* 5. TECHNICAL SITEMAP & HEALTH CHECK */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Technical SEO & Sitemap Health</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-between">
              <div>
                <span className="font-bold text-emerald-900 block text-xs">XML Sitemap Active</span>
                <span className="text-[11px] text-emerald-700 block">
                  Automatically generated with all projects and articles.
                </span>
              </div>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white font-bold text-[11px] hover:bg-emerald-800 transition flex items-center gap-1 shadow-sm"
              >
                <span>View XML</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 block text-xs">Robots.txt Active</span>
                <span className="text-[11px] text-slate-500 block">
                  Instructs crawlers to index public pages and protect admin routes.
                </span>
              </div>
              <a
                href="/robots.txt"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-800 font-bold text-[11px] hover:bg-slate-300 transition flex items-center gap-1"
              >
                <span>View</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider text-slate-900 bg-gold hover:bg-gold-400 transition shadow-lg flex items-center gap-2"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{saving ? 'Saving...' : 'Save & Publish SEO Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
