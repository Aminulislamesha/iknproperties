import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Building, DollarSign } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function QuickSearchFilter() {
  const { lang } = useApp();
  const navigate = useNavigate();

  const [filterType, setFilterType] = useState('All');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterBudget, setFilterBudget] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (filterType !== 'All') query.set('category', filterType);
    if (filterLocation) query.set('location', filterLocation);
    if (filterBudget) query.set('budget', filterBudget);
    navigate(`/projects?${query.toString()}`);
  };

  return (
    <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-8 -mt-10 sm:-mt-12 lg:-mt-14 mb-4 sm:mb-6">
      <form
        onSubmit={handleSearchSubmit}
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 border border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 items-end"
      >
        {/* Property Type Dropdown */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-primary-600" />
            <span>{lang === 'bn' ? 'প্রকল্পের ধরন' : 'Project Category'}</span>
          </label>
          <div className="relative">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3.5 py-3 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 bg-slate-50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-600 appearance-none transition cursor-pointer text-slate-800"
            >
              <option value="All">{lang === 'bn' ? 'সকল প্রকল্প (All)' : 'All Categories'}</option>
              <option value="Land Share Flats">Land Share Flats (জমি শেয়ার)</option>
              <option value="Ready Flats">Ready Flats (রেডি ফ্ল্যাট)</option>
              <option value="Upcoming Projects">Upcoming (আসন্ন প্রকল্প)</option>
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
              ▼
            </div>
          </div>
        </div>

        {/* Location Dropdown */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary-600" />
            <span>{lang === 'bn' ? 'লোকেশন' : 'Location'}</span>
          </label>
          <div className="relative">
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="w-full px-3.5 py-3 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 bg-slate-50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-600 appearance-none transition cursor-pointer text-slate-800"
            >
              <option value="">{lang === 'bn' ? 'সকল এলাকা (All Locations)' : 'All Locations'}</option>
              <option value="North Badda">North Badda, Eastern Road</option>
              <option value="Badda Link Road">Badda Link Road (Near Gulshan)</option>
              <option value="Dhaka">Dhaka Metropolis</option>
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
              ▼
            </div>
          </div>
        </div>

        {/* Budget Range Dropdown */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-gold-dark" />
            <span>{lang === 'bn' ? 'বাজেট সীমা' : 'Budget Range'}</span>
          </label>
          <div className="relative">
            <select
              value={filterBudget}
              onChange={(e) => setFilterBudget(e.target.value)}
              className="w-full px-3.5 py-3 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 bg-slate-50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-600 appearance-none transition cursor-pointer text-slate-800"
            >
              <option value="">{lang === 'bn' ? 'যেকোনো বাজেট' : 'Any Budget'}</option>
              <option value="18-20">18 - 20 Lakh (Land Share)</option>
              <option value="40-45">40 - 45 Lakh (Total Apartment)</option>
              <option value="45+">45+ Lakh BDT</option>
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
              ▼
            </div>
          </div>
        </div>

        {/* Search Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-3 px-5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-white bg-primary-700 hover:bg-primary-800 active:scale-98 transition flex items-center justify-center gap-2 shadow-lg shadow-primary-700/25"
          >
            <Search className="w-4 h-4 text-gold" />
            <span>{lang === 'bn' ? 'ফ্ল্যাট অনুসন্ধান' : 'Find Properties'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
