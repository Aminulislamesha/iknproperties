import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Users, Percent, ArrowRight, Building2, CheckCircle2, BookOpen } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import HeroSlider from '../components/HeroSlider';
import ProjectCard from '../components/ProjectCard';
import FounderSection from '../components/FounderSection';
import CostCalculator from '../components/CostCalculator';
import ServicesSection from '../components/ServicesSection';
import WhyLandShare from '../components/WhyLandShare';
import ConstructionTracker from '../components/ConstructionTracker';
import TestimonialsSection from '../components/TestimonialsSection';
import { useApp } from '../context/AppContext';

export default function HomePage() {
  const { lang, openInquiryModal } = useApp();
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data || []))
      .catch(err => console.error(err));

    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => setBlogs((data || []).slice(0, 3)))
      .catch(err => console.error(err));
  }, []);

  const filteredProjects = activeTab === 'All'
    ? projects
    : projects.filter(p => p.category === activeTab || p.status === activeTab);

  return (
    <div className="space-y-0">
      <SEOHead
        title="IKN Properties | Land Share Flats & Premium Apartments in North Badda, Dhaka"
        description="IKN Properties is Dhaka's trusted real estate brand specializing in land-share flats, RAJUK approved apartments, and joint building development. Save 35-40% on luxury flats."
        keywords="IKN Properties, Land Share Flat Dhaka, Rose Garden North Badda, Shopno Tower, joint venture building dhaka, flat in badda, RAJUK approved apartment"
        canonical="https://iknproperties.com/"
      />

      {/* Hero Section */}
      <HeroSlider />

      {/* Trust & Credibility Stats Bar */}
      <section className="bg-white border-b border-slate-100 py-10 mt-12 sm:mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition">
              <ShieldCheck className="w-8 h-8 text-primary-700 mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">100%</div>
              <div className="text-xs text-slate-500 font-semibold mt-1">
                {lang === 'bn' ? 'রাজউক অনুমোদিত (জি+৯)' : 'RAJUK G+9 Approved'}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition">
              <Award className="w-8 h-8 text-gold mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">100%</div>
              <div className="text-xs text-slate-500 font-semibold mt-1">
                {lang === 'bn' ? 'নিজ নামে সাব-কবলা দলিল ও নামজারি' : 'Sub-Kabla & Mutation in Your Name'}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition">
              <Percent className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">35-40%</div>
              <div className="text-xs text-slate-500 font-semibold mt-1">
                {lang === 'bn' ? 'প্রথাগত ডেভেলপার থেকে খরচ সাশ্রয়' : 'Cost Savings vs Commercial Flats'}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition">
              <Users className="w-8 h-8 text-primary-700 mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">80+</div>
              <div className="text-xs text-slate-500 font-semibold mt-1">
                {lang === 'bn' ? 'সন্তুষ্ট জমি শেয়ার গ্রাহক পরিবার' : 'Happy Partner Families'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary-800 bg-emerald-100 px-3.5 py-1.5 rounded-full inline-block mb-2">
                {lang === 'bn' ? 'আমাদের চলমান প্রকল্পসমূহ' : 'Flagship Projects'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {lang === 'bn'
                  ? 'উত্তর বাড্ডার শীর্ষ আবাসিক প্রকল্প'
                  : 'Premium Residential Towers in North Badda'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                {lang === 'bn'
                  ? 'রোজ গার্ডেন ও স্বপ্ন টাওয়ার: ইস্টার্ন রোডে ৯ তলা আধুনিক বহুতল ভবন।'
                  : 'Explore Rose Garden & Shopno Tower — modern G+9 luxury apartments built at transparent construction cost.'}
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              {['All', 'Land Share Flats', 'Ongoing'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-primary-700 text-white shadow-md'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>

          {/* View All Projects Button */}
          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-primary-800 hover:bg-primary-900 transition shadow-lg shadow-primary-900/20"
            >
              <span>{lang === 'bn' ? 'সকল ফ্ল্যাট ও প্রকল্প দেখুন' : 'Explore All Available Projects'}</span>
              <ArrowRight className="w-4 h-4 text-gold" />
            </Link>
          </div>
        </div>
      </section>

      {/* Founder & Managing Director Spotlight Section */}
      <FounderSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Why Land Share 5-Step Process */}
      <WhyLandShare />

      {/* Live Construction Milestones */}
      <ConstructionTracker />

      {/* Interactive Cost Comparison Calculator */}
      <CostCalculator />

      {/* Client Testimonials */}
      <TestimonialsSection />

      {/* Latest Real Estate Articles & Guides */}
      {blogs.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold bg-primary-950 px-3.5 py-1.5 rounded-full inline-block mb-2">
                  {lang === 'bn' ? 'রিয়েল এস্টেট গাইড ও খবর' : 'Knowledge & Insights'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {lang === 'bn'
                    ? 'ফ্ল্যাট ও জমি কেনার আইনি নির্দেশিকা'
                    : 'Real Estate Buyer Guides & Legal Advice'}
                </h2>
              </div>
              <Link
                to="/blogs"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-700 hover:text-primary-800 group"
              >
                <span>{lang === 'bn' ? 'সকল আর্টিকেল পড়ুন' : 'View All Articles'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogs.map((b) => (
                <div
                  key={b.id}
                  className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 w-full overflow-hidden bg-slate-200">
                      <img
                        src={b.coverImage}
                        alt={b.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 bg-brandDark/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-white text-[10px] font-bold">
                        {b.category}
                      </span>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400 mb-2">
                        <span>{b.date}</span>
                        <span>•</span>
                        <span>{b.readTime}</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-primary-700 transition leading-snug line-clamp-2">
                        <Link to={`/blogs/${b.slug}`}>
                          {lang === 'bn' ? b.titleBn || b.title : b.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                        {lang === 'bn' ? b.excerptBn || b.excerpt : b.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <Link
                      to={`/blogs/${b.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-700 hover:text-primary-800"
                    >
                      <span>{lang === 'bn' ? 'বিস্তারিত পড়ুন' : 'Read Article'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final Consultation Lead CTA Section */}
      <section className="py-16 bg-emerald-luxury text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-6">
          <span className="text-xs font-extrabold uppercase tracking-widest text-gold bg-white/10 px-4 py-1.5 rounded-full inline-block border border-gold/40">
            {lang === 'bn' ? 'আপনার স্বপ্নের আবাসন' : 'Build Your Dream Home'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {lang === 'bn'
              ? 'নিজের নামে জমি কিনে আজই শুরু করুন আপনার ফ্ল্যাটের স্বপ্ন'
              : 'Secure Your Land Share in North Badda Today'}
          </h2>
          <p className="text-sm sm:text-base text-emerald-200 max-w-2xl mx-auto leading-relaxed">
            {lang === 'bn'
              ? 'রোজ গার্ডেন ও স্বপ্ন টাওয়ারে সীমিত সংখ্যক জমি শেয়ার অবশিষ্ট রয়েছে। বিস্তারিত জানতে আমাদের সিনিয়র ম্যানেজমেন্টের সাথে কথা বলুন।'
              : 'Limited land shares remaining for Rose Garden and Shopno Tower. Contact our Dhaka office directly for legal documentation and site visits.'}
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openInquiryModal()}
              className="px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-900 bg-gold hover:bg-gold-400 active:scale-95 transition shadow-2xl shadow-gold/30 flex items-center gap-2"
            >
              <span>{lang === 'bn' ? 'ফ্ল্যাট বুকিং অনুসন্ধান' : 'Book Consultation Now'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="tel:01703033789"
              className="px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 active:scale-95 transition"
            >
              {lang === 'bn' ? 'হটলাইন: ০১৭০৩-০৩৩৭৮৯' : 'Hotline: 01703-033789'}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
