import React, { useState, useEffect } from 'react';
import { Save, Sliders, Image, Eye } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export default function AdminSliders() {
  const { token } = useAuth();
  const { showToast } = useApp();
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/sliders')
      .then(res => res.json())
      .then(data => {
        setSliders(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const updateSlide = (idx, field, value) => {
    const copy = [...sliders];
    copy[idx] = { ...copy[idx], [field]: value };
    setSliders(copy);
  };

  const handleSaveAll = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/sliders', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(sliders)
      });
      if (res.ok) {
        showToast('Hero sliders updated successfully');
      }
    } catch (err) {
      showToast('Error saving sliders', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Homepage Hero Banners & Sliders
          </h1>
          <p className="text-xs text-slate-500">
            Customize the main banner headlines, promotional taglines, background renders, and CTA links.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-900 bg-gold hover:bg-gold-400 transition shadow flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="space-y-6">
        {sliders.map((s, idx) => (
          <div key={s.id || idx} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="font-extrabold text-xs uppercase tracking-wider text-primary-800">
                Slide #{idx + 1}
              </span>
              <span className="text-[11px] text-slate-400 font-semibold">
                ID: {s.id}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Headline (English)</label>
                <input
                  type="text"
                  value={s.title}
                  onChange={e => updateSlide(idx, 'title', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Headline (Bengali)</label>
                <input
                  type="text"
                  value={s.titleBn || ''}
                  onChange={e => updateSlide(idx, 'titleBn', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Subtitle (English)</label>
                <textarea
                  rows="2"
                  value={s.subtitle}
                  onChange={e => updateSlide(idx, 'subtitle', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Subtitle (Bengali)</label>
                <textarea
                  rows="2"
                  value={s.subtitleBn || ''}
                  onChange={e => updateSlide(idx, 'subtitleBn', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Background Image URL</label>
                <input
                  type="text"
                  value={s.bgImage}
                  onChange={e => updateSlide(idx, 'bgImage', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Button Link</label>
                <input
                  type="text"
                  value={s.buttonLink}
                  onChange={e => updateSlide(idx, 'buttonLink', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
