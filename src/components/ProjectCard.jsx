import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Compass, ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ProjectCard({ project }) {
  const { lang, formatBDT, openInquiryModal } = useApp();

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col">
      {/* Image Preview & Badges */}
      <div className="relative h-60 w-full overflow-hidden bg-slate-100">
        <img
          src={project.thumbnail || project.images?.[0]}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-primary-800 text-white shadow-md">
            {project.status}
          </span>
          {project.category && (
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/90 text-slate-800 backdrop-blur-sm shadow-md">
              {project.category}
            </span>
          )}
        </div>

        {/* RAJUK Approved Badge */}
        <div className="absolute bottom-3 left-3 bg-brandDark/85 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-semibold text-gold flex items-center gap-1 border border-gold/30">
          <ShieldCheck className="w-3.5 h-3.5 text-gold" />
          <span>RAJUK G+9 Approved</span>
        </div>

        {/* Units pill */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-800 shadow">
          {project.totalUnits} Units • {project.floors}
        </div>
      </div>

      {/* Body Information */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary-600 shrink-0" />
            <span className="truncate">{lang === 'bn' ? project.locationBn || project.location : project.location}</span>
          </div>

          {/* Project Title */}
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-700 transition">
            <Link to={`/projects/${project.slug}`}>
              {lang === 'bn' ? project.titleBn || project.title : project.title}
            </Link>
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
            {lang === 'bn' ? project.descriptionBn || project.description : project.description}
          </p>
        </div>

        {/* Specs Icons Grid */}
        <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-slate-100 text-xs text-slate-700">
          <div className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-gold" />
            <span className="font-semibold">{project.apartmentSize}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bed className="w-3.5 h-3.5 text-primary-600" />
            <span>{project.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-3.5 h-3.5 text-primary-600" />
            <span>{project.bathrooms} Baths</span>
          </div>
        </div>

        {/* Pricing & Progress */}
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                {lang === 'bn' ? 'জমি শেয়ার মূল্য' : 'Land Share Price'}
              </span>
              <span className="text-base font-extrabold text-primary-700">
                {formatBDT(project.landSharePrice)}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                {lang === 'bn' ? 'আনুমানিক মোট' : 'Est. Total Price'}
              </span>
              <span className="text-xs font-bold text-slate-700">
                {formatBDT(project.estimatedTotalCost)}
              </span>
            </div>
          </div>

          {/* Construction Progress Bar */}
          {project.progressPercentage !== undefined && (
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[10px] font-semibold text-slate-500">
                <span>{project.pilingStatus || 'Site Work'}</span>
                <span>{project.progressPercentage}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-primary-600 rounded-full transition-all duration-500"
                  style={{ width: `${project.progressPercentage}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <Link
            to={`/projects/${project.slug}`}
            className="py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition text-center"
          >
            {lang === 'bn' ? 'বিস্তারিত দেখুন' : 'View Details'}
          </Link>
          <button
            onClick={() => openInquiryModal(project.title)}
            className="py-2.5 px-3 rounded-xl text-xs font-bold text-slate-900 bg-gold hover:bg-gold-400 active:scale-95 transition text-center flex items-center justify-center gap-1 shadow-sm"
          >
            <span>{lang === 'bn' ? 'বুকিং দিন' : 'Book Flat'}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
