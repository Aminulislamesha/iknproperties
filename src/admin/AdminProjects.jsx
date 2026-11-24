import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, ShieldCheck, MapPin, X, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export default function AdminProjects() {
  const { token } = useAuth();
  const { showToast, formatBDT } = useApp();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State for Add / Edit
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    titleBn: '',
    category: 'Land Share Flats',
    status: 'Ongoing',
    location: '',
    locationBn: '',
    apartmentSize: '1,250 SFT',
    totalUnits: 63,
    floors: 'G+9',
    landSharePrice: 1800000,
    estimatedConstructionCost: 2500000,
    estimatedTotalCost: 4300000,
    constructionPeriod: '30 Months',
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    lifts: 2,
    pilingStatus: '136 Piles Cast, 13 Remaining',
    progressPercentage: 45,
    rajukApproval: 'Approved for G+9 Multi-Storey Residential Building',
    legalStatus: 'Land Registration & Mutation 100% Completed',
    soilTest: 'Completed & Certified',
    description: '',
    thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
    amenities: '2 Modern Lifts, 24/7 Security CCTV, Generator Backup, Substation, Intercom, Underground Reservoir'
  });

  const loadProjects = () => {
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
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      titleBn: '',
      category: 'Land Share Flats',
      status: 'Ongoing',
      location: 'Eastern Road, North Badda, Dhaka',
      locationBn: 'ইস্টার্ন রোড, উত্তর বাড্ডা, ঢাকা',
      apartmentSize: '1,250 SFT',
      totalUnits: 63,
      floors: 'G+9',
      landSharePrice: 1800000,
      estimatedConstructionCost: 2500000,
      estimatedTotalCost: 4300000,
      constructionPeriod: '30 Months',
      bedrooms: 3,
      bathrooms: 3,
      balconies: 2,
      lifts: 2,
      pilingStatus: 'Piling in Progress',
      progressPercentage: 40,
      rajukApproval: 'Approved for G+9 Residential Building',
      legalStatus: 'Land Registration Completed',
      soilTest: 'Completed',
      description: '',
      thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
      amenities: '2 Modern Lifts, 24/7 Security CCTV, Generator Backup, Substation'
    });
    setModalOpen(true);
  };

  const openEditModal = (p) => {
    setEditingId(p.id);
    setFormData({
      ...p,
      amenities: Array.isArray(p.amenities) ? p.amenities.join(', ') : p.amenities || ''
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      amenities: formData.amenities ? formData.amenities.split(',').map(s => s.trim()) : [],
      landSharePrice: Number(formData.landSharePrice),
      estimatedConstructionCost: Number(formData.estimatedConstructionCost),
      estimatedTotalCost: Number(formData.estimatedTotalCost),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      balconies: Number(formData.balconies),
      totalUnits: Number(formData.totalUnits),
      progressPercentage: Number(formData.progressPercentage)
    };

    try {
      const url = editingId ? `/api/projects/${editingId}` : '/api/projects';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        showToast(editingId ? 'Project updated successfully' : 'New project added successfully');
        setModalOpen(false);
        loadProjects();
      } else {
        showToast(data.error || 'Failed to save project', 'error');
      }
    } catch (err) {
      showToast('Error saving project', 'error');
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showToast('Project deleted');
        loadProjects();
      }
    } catch (err) {
      showToast('Error deleting project', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Manage Properties & Projects
          </h1>
          <p className="text-xs text-slate-500">
            Add, update pricing, construction progress, and architectural details for IKN developments.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-primary-700 hover:bg-primary-800 transition shadow flex items-center gap-2"
        >
          <Plus className="w-4 h-4 text-gold" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">No projects listed.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="p-4">Project</th>
                  <th className="p-4">Category & Status</th>
                  <th className="p-4">Size & Units</th>
                  <th className="p-4">Land Share Price</th>
                  <th className="p-4">Progress</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.thumbnail}
                          alt={p.title}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-100"
                        />
                        <div>
                          <span className="font-bold text-slate-900 block">{p.title}</span>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-primary-600" />
                            {p.location}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-slate-700 block">{p.category}</span>
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 mt-1">
                        {p.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-slate-800">{p.apartmentSize}</span>
                      <span className="text-slate-400 block text-[11px]">
                        {p.totalUnits} Units • {p.floors}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-extrabold text-primary-700 block">
                        {formatBDT(p.landSharePrice)}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Total ~ {formatBDT(p.estimatedTotalCost)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="w-24">
                        <div className="flex justify-between text-[10px] font-bold text-slate-600 mb-1">
                          <span>Progress</span>
                          <span>{p.progressPercentage || 0}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary-600 rounded-full"
                            style={{ width: `${p.progressPercentage || 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-2 rounded-lg text-slate-600 hover:text-primary-700 hover:bg-slate-100 transition"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.title)}
                          className="p-2 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 bg-emerald-luxury text-white flex items-center justify-between">
              <h3 className="font-bold text-base">
                {editingId ? 'Edit Project Details' : 'Add New Real Estate Project'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-full text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                    placeholder="Rose Garden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Title (Bengali)</label>
                  <input
                    type="text"
                    value={formData.titleBn}
                    onChange={e => setFormData({ ...formData, titleBn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                    placeholder="রোজ গার্ডেন"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Land Share Flats">Land Share Flats</option>
                    <option value="Ready Flats">Ready Flats</option>
                    <option value="Upcoming Projects">Upcoming Projects</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Ongoing">Ongoing</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Ready">Ready</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Progress (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.progressPercentage}
                    onChange={e => setFormData({ ...formData, progressPercentage: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                    placeholder="Eastern Road, North Badda, Dhaka"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Apartment Size</label>
                  <input
                    type="text"
                    value={formData.apartmentSize}
                    onChange={e => setFormData({ ...formData, apartmentSize: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                    placeholder="1,250 SFT"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Land Share (BDT)</label>
                  <input
                    type="number"
                    value={formData.landSharePrice}
                    onChange={e => setFormData({ ...formData, landSharePrice: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Est. Construction (BDT)</label>
                  <input
                    type="number"
                    value={formData.estimatedConstructionCost}
                    onChange={e => setFormData({ ...formData, estimatedConstructionCost: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Est. Total Cost (BDT)</label>
                  <input
                    type="number"
                    value={formData.estimatedTotalCost}
                    onChange={e => setFormData({ ...formData, estimatedTotalCost: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total Units</label>
                  <input
                    type="number"
                    value={formData.totalUnits}
                    onChange={e => setFormData({ ...formData, totalUnits: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Bedrooms</label>
                  <input
                    type="number"
                    value={formData.bedrooms}
                    onChange={e => setFormData({ ...formData, bedrooms: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Bathrooms</label>
                  <input
                    type="number"
                    value={formData.bathrooms}
                    onChange={e => setFormData({ ...formData, bathrooms: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Balconies</label>
                  <input
                    type="number"
                    value={formData.balconies}
                    onChange={e => setFormData({ ...formData, balconies: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Thumbnail Image URL</label>
                <input
                  type="text"
                  value={formData.thumbnail}
                  onChange={e => setFormData({ ...formData, thumbnail: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Amenities (Comma separated)</label>
                <input
                  type="text"
                  value={formData.amenities}
                  onChange={e => setFormData({ ...formData, amenities: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  placeholder="2 Lifts, Substation, CCTV, Generator Backup"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 resize-none"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-slate-900 bg-gold hover:bg-gold-400 flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Project</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
