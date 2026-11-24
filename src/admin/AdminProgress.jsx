import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Calendar, HardHat, Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export default function AdminProgress() {
  const { token } = useAuth();
  const { showToast } = useApp();
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    projectId: 'rose-garden',
    projectTitle: 'Rose Garden',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    milestone: '',
    milestoneBn: '',
    percentage: 50,
    photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=1000&q=80',
    description: '',
    descriptionBn: ''
  });

  const loadProgress = () => {
    fetch('/api/progress')
      .then(res => res.json())
      .then(data => {
        setUpdates(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadProgress();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.milestone) {
      showToast('Milestone title is required', 'error');
      return;
    }

    try {
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        showToast('Construction milestone update published');
        setModalOpen(false);
        setFormData({
          projectId: 'rose-garden',
          projectTitle: 'Rose Garden',
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          milestone: '',
          milestoneBn: '',
          percentage: 50,
          photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=1000&q=80',
          description: '',
          descriptionBn: ''
        });
        loadProgress();
      }
    } catch (err) {
      showToast('Failed to save update', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this milestone update?')) return;
    try {
      const res = await fetch(`/api/progress/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showToast('Milestone deleted');
        loadProgress();
      }
    } catch (err) {
      showToast('Error deleting update', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Live Construction Milestones Manager
          </h1>
          <p className="text-xs text-slate-500">
            Publish weekly piling progress, structural castings, and site photos for investor updates.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-primary-700 hover:bg-primary-800 transition shadow flex items-center gap-2"
        >
          <Plus className="w-4 h-4 text-gold" />
          <span>Add Progress Milestone</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-16 text-center">
            <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : updates.length === 0 ? (
          <div className="col-span-full bg-white rounded-3xl p-12 text-center border border-slate-100 text-xs text-slate-400">
            No updates posted.
          </div>
        ) : (
          updates.map((up) => (
            <div
              key={up.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 bg-slate-100">
                  <img src={up.photoUrl} alt={up.milestone} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-brandDark/85 px-2.5 py-1 rounded-lg text-white text-[11px] font-bold">
                    {up.projectTitle}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-primary-700 text-gold px-2.5 py-1 rounded-lg text-xs font-extrabold shadow">
                    {up.percentage}% Done
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <span className="text-[11px] text-slate-400 font-semibold block">{up.date}</span>
                  <h3 className="font-bold text-sm text-slate-900">{up.milestone}</h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{up.description}</p>
                </div>
              </div>

              <div className="p-4 border-t border-slate-50 flex items-center justify-end">
                <button
                  onClick={() => handleDelete(up.id)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 bg-emerald-luxury text-white flex items-center justify-between">
              <h3 className="font-bold text-base">New Construction Milestone</h3>
              <button onClick={() => setModalOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Project</label>
                <select
                  value={formData.projectId}
                  onChange={e => {
                    const title = e.target.value === 'rose-garden' ? 'Rose Garden' : 'Shopno Tower';
                    setFormData({ ...formData, projectId: e.target.value, projectTitle: title });
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="rose-garden">Rose Garden (North Badda)</option>
                  <option value="shopno-tower">Shopno Tower (North Badda)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Milestone Headline (English) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 136 Piles Cast Successfully"
                  value={formData.milestone}
                  onChange={e => setFormData({ ...formData, milestone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Milestone Headline (Bengali)</label>
                <input
                  type="text"
                  placeholder="যেমন: পাইলিং কাজের অগ্রগতি"
                  value={formData.milestoneBn}
                  onChange={e => setFormData({ ...formData, milestoneBn: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Completed (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.percentage}
                    onChange={e => setFormData({ ...formData, percentage: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Site Photo URL</label>
                <input
                  type="text"
                  value={formData.photoUrl}
                  onChange={e => setFormData({ ...formData, photoUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description / Notes</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 resize-none"
                  placeholder="Details of civil work performed..."
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-bold bg-slate-100 text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-slate-900 bg-gold hover:bg-gold-400 flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish Milestone</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
