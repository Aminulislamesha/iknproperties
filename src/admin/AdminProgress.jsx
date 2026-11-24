import React, { useState, useEffect, useRef } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Calendar,
  HardHat,
  Save,
  X,
  Upload,
  Image as ImageIcon,
  Loader2,
  Link as LinkIcon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export default function AdminProgress() {
  const { token } = useAuth();
  const { showToast } = useApp();
  const [updates, setUpdates] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    projectId: 'rose-garden',
    projectTitle: 'Rose Garden',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    milestone: '',
    milestoneBn: '',
    percentage: 50,
    photoUrl: '/projects/rose_garden_site_progress.jpg',
    description: '',
    descriptionBn: ''
  });

  const loadData = () => {
    Promise.all([
      fetch('/api/progress').then(r => r.json()),
      fetch('/api/projects').then(r => r.json())
    ])
      .then(([progressData, projectsData]) => {
        setUpdates(progressData || []);
        setProjects(projectsData || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    const defaultProj = projects[0] || { id: 'rose-garden', title: 'Rose Garden' };
    setFormData({
      projectId: defaultProj.id || defaultProj.slug || 'rose-garden',
      projectTitle: defaultProj.title || 'Rose Garden',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      milestone: '',
      milestoneBn: '',
      percentage: 50,
      photoUrl: '/projects/rose_garden_site_progress.jpg',
      description: '',
      descriptionBn: ''
    });
    setModalOpen(true);
  };

  const openEditModal = (up) => {
    setEditingId(up.id);
    setFormData({
      projectId: up.projectId || 'rose-garden',
      projectTitle: up.projectTitle || 'Rose Garden',
      date: up.date || '',
      milestone: up.milestone || '',
      milestoneBn: up.milestoneBn || '',
      percentage: up.percentage ?? 50,
      photoUrl: up.photoUrl || up.image || '',
      description: up.description || '',
      descriptionBn: up.descriptionBn || ''
    });
    setModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
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
        throw new Error(json.error || 'Failed to upload photo');
      }

      setFormData(prev => ({ ...prev, photoUrl: json.url }));
      showToast('Site photo uploaded successfully!');
    } catch (err) {
      showToast(err.message || 'Error uploading photo', 'error');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.milestone) {
      showToast('Milestone title is required', 'error');
      return;
    }

    try {
      const url = editingId ? `/api/progress/${editingId}` : '/api/progress';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        showToast(editingId ? 'Construction milestone updated' : 'Construction milestone update published');
        setModalOpen(false);
        loadData();
      } else {
        const errJson = await res.json();
        showToast(errJson.error || 'Failed to save milestone', 'error');
      }
    } catch (err) {
      showToast('Failed to save update', 'error');
    }
  };

  const handleDelete = async (id, milestoneTitle) => {
    if (!window.confirm(`Delete milestone update: "${milestoneTitle || 'this item'}"?`)) return;
    try {
      const res = await fetch(`/api/progress/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showToast('Milestone deleted');
        loadData();
      }
    } catch (err) {
      showToast('Error deleting update', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <HardHat className="w-6 h-6 text-primary-700" />
            <span>Live Construction Milestones Manager</span>
          </h1>
          <p className="text-xs text-slate-500">
            Publish, edit, and update weekly piling progress, structural castings, and verified site photos for investor updates.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-primary-700 hover:bg-primary-800 transition shadow flex items-center gap-2"
        >
          <Plus className="w-4 h-4 text-gold" />
          <span>Add Progress Milestone</span>
        </button>
      </div>

      {/* Grid of Milestone Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-16 text-center">
            <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : updates.length === 0 ? (
          <div className="col-span-full bg-white rounded-3xl p-12 text-center border border-slate-100 text-xs text-slate-400">
            No updates posted. Click "Add Progress Milestone" to publish your first site milestone.
          </div>
        ) : (
          updates.map((up) => (
            <div
              key={up.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
            >
              <div>
                {/* Photo & Badges */}
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <img
                    src={up.photoUrl || up.image}
                    alt={up.milestone}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    onError={(e) => {
                      e.target.src = '/projects/rose_garden_site_progress.jpg';
                    }}
                  />
                  <span className="absolute top-3 left-3 bg-brandDark/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-white text-[11px] font-bold shadow">
                    {up.projectTitle}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-primary-700 text-gold px-2.5 py-1 rounded-lg text-xs font-extrabold shadow">
                    {up.percentage}% Done
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 space-y-2">
                  <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-primary-600" />
                    <span>{up.date}</span>
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">{up.milestone}</h3>
                  {up.milestoneBn && (
                    <p className="text-[11px] text-slate-500 font-medium">{up.milestoneBn}</p>
                  )}
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed pt-1">
                    {up.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons: Edit & Delete */}
              <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                <span className="text-[10px] text-slate-400 font-mono">ID: {up.id}</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(up)}
                    className="px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-primary-700 hover:bg-white border border-slate-200 transition shadow-sm flex items-center gap-1 text-xs font-bold"
                    title="Edit Milestone"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-primary-700" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(up.id, up.milestone)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Delete Milestone"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-emerald-luxury text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base flex items-center gap-2">
                  <HardHat className="w-5 h-5 text-gold" />
                  <span>{editingId ? 'Edit Construction Milestone' : 'New Construction Milestone'}</span>
                </h3>
                <p className="text-[11px] text-white/70">
                  {editingId ? 'Update progress percentage, site photo, and milestone notes' : 'Publish a new construction progress update for investors'}
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs overflow-y-auto flex-1">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Project *</label>
                <select
                  value={formData.projectId}
                  onChange={e => {
                    const sel = projects.find(p => (p.id === e.target.value || p.slug === e.target.value));
                    setFormData({
                      ...formData,
                      projectId: e.target.value,
                      projectTitle: sel ? sel.title : e.target.value
                    });
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:border-primary-600"
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id || p.slug}>
                      {p.title} ({p.location || 'Dhaka'})
                    </option>
                  ))}
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
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Milestone Headline (Bengali)</label>
                <input
                  type="text"
                  placeholder="যেমন: পাইলিং কাজের অগ্রগতি প্রতিবেদন"
                  value={formData.milestoneBn}
                  onChange={e => setFormData({ ...formData, milestoneBn: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-600"
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
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Update Date</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    placeholder="November 24, 2026"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-600"
                  />
                </div>
              </div>

              {/* Site Photo & Upload */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block font-bold text-slate-800">Site Photo</label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    disabled={uploadingImage}
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg bg-primary-700 text-white font-bold text-[11px] hover:bg-primary-800 transition flex items-center gap-1 shadow-sm"
                  >
                    {uploadingImage ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    <span>{uploadingImage ? 'Uploading...' : 'Upload Site Photo'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3 items-center">
                  <div className="col-span-1">
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-200 border border-slate-300 shadow-inner">
                      {formData.photoUrl ? (
                        <img
                          src={formData.photoUrl}
                          alt="Milestone Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/projects/rose_garden_site_progress.jpg';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <ImageIcon className="w-6 h-6 stroke-1" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-span-2 space-y-1">
                    <div className="relative">
                      <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                      <input
                        type="text"
                        value={formData.photoUrl}
                        onChange={e => setFormData({ ...formData, photoUrl: e.target.value })}
                        placeholder="/projects/... or https://..."
                        className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-mono text-[11px] focus:outline-none focus:border-primary-600"
                      />
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Upload from your device or paste an image URL.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description / Notes (English)</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 resize-none focus:outline-none focus:border-primary-600"
                  placeholder="Details of civil work performed, casting tests, engineer inspections..."
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description / Notes (Bengali)</label>
                <textarea
                  rows="2"
                  value={formData.descriptionBn}
                  onChange={e => setFormData({ ...formData, descriptionBn: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 resize-none focus:outline-none focus:border-primary-600"
                  placeholder="কাজের বিস্তারিত বিবরণ (বাংলায়)..."
                ></textarea>
              </div>

              {/* Modal Actions */}
              <div className="pt-2 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-slate-900 bg-gold hover:bg-gold-400 transition shadow flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingId ? 'Update Milestone' : 'Publish Milestone'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
