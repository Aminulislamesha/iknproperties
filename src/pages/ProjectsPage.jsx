import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Building, Filter, Search, RotateCcw } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import ProjectCard from '../components/ProjectCard';
import { useApp } from '../context/AppContext';

export default function ProjectsPage() {
  const { lang } = useApp();
  const [searchParams] = useSearchParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || 'All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [bedFilter, setBedFilter] = useState('All');

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const resetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('All');
    setStatusFilter('All');
    setBedFilter('All');
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.titleBn && p.titleBn.includes(searchQuery));

    const matchesCategory =
      categoryFilter === 'All' || p.category === categoryFilter;

    const matchesStatus =
      statusFilter === 'All' || p.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesBed =
      bedFilter === 'All' || p.bedrooms === Number(bedFilter);

    return matchesSearch && matchesCategory && matchesStatus && matchesBed;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <SEOHead
        title="Residential Projects & Land Share Flats in Dhaka"
        description="Explore Rose Garden, Shopno Tower and upcoming luxury apartments in North Badda, Dhaka with 100% RAJUK approval and direct land-share registration."
        keywords="Rose Garden North Badda, Shopno Tower, Land Share Apartments Dhaka, Eastern Road Flats"
        canonical="https://iknproperties.com/projects"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Page Banner */}
        <div className="bg-emerald-luxury rounded-3xl p-8 sm:p-12 text-white mb-10 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold bg-white/10 px-3.5 py-1.5 rounded-full inline-block border border-gold/30">
              {lang === 'bn' ? 'আমাদের প্রকল্পসমূহ' : 'Our Portfolio'}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {lang === 'bn'
                ? 'আইকেএন প্রোপার্টিজের চলমান ও আসন্ন প্রকল্প'
                : 'Residential Projects & Land-Share Living'}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
              {lang === 'bn'
                ? 'উত্তর বাড্ডার ইস্টার্ন রোডে শতভাগ রাজউক অনুমোদিত ও সাব-কবলা রেজিস্ট্রেশনকৃত আধুনিক ফ্ল্যাট।'
                : 'Choose your desired apartment in prime North Badda locations. Enjoy 35-40% cost reduction under transparent land-share models.'}
            </p>
          </div>
          {/* Decorative Building silhouette */}
          <Building className="absolute -right-8 -bottom-10 w-72 h-72 text-white/5 pointer-events-none" />
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={lang === 'bn' ? 'প্রকল্পের নাম বা লোকেশন দিয়ে খুঁজুন...' : 'Search by project name or location...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition"
              />
            </div>

            {/* Category Dropdown */}
            <div className="w-full md:w-auto">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full md:w-48 px-3 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-600"
              >
                <option value="All">{lang === 'bn' ? 'সকল ক্যাটাগরি' : 'All Categories'}</option>
                <option value="Land Share Flats">Land Share Flats</option>
                <option value="Ready Flats">Ready Flats</option>
                <option value="Upcoming Projects">Upcoming Projects</option>
              </select>
            </div>

            {/* Status Dropdown */}
            <div className="w-full md:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full md:w-36 px-3 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-600"
              >
                <option value="All">{lang === 'bn' ? 'সকল স্ট্যাটাস' : 'All Status'}</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Ready">Ready</option>
              </select>
            </div>

            {/* Bedrooms Dropdown */}
            <div className="w-full md:w-auto">
              <select
                value={bedFilter}
                onChange={(e) => setBedFilter(e.target.value)}
                className="w-full md:w-36 px-3 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-600"
              >
                <option value="All">{lang === 'bn' ? 'সকল বেডরুম' : 'All Beds'}</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4 Bedrooms</option>
              </select>
            </div>

            {/* Reset */}
            <button
              onClick={resetFilters}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
              title="Reset Filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs text-slate-500 font-semibold pt-1">
            {lang === 'bn'
              ? `মোট ${filteredProjects.length}টি প্রকল্প পাওয়া গেছে`
              : `Showing ${filteredProjects.length} matching properties`}
          </div>
        </div>

        {/* Project Cards Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs text-slate-500 font-medium">Loading properties...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm space-y-3">
            <Filter className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-700">No projects match your filter criteria</h3>
            <p className="text-xs text-slate-500">Try adjusting your search keywords or resetting filters.</p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-primary-700 hover:bg-primary-800 transition"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
