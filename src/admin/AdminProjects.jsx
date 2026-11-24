import React, { useState, useEffect, useRef } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  MapPin,
  X,
  Save,
  Upload,
  Image as ImageIcon,
  Star,
  ChevronLeft,
  ChevronRight,
  Link as LinkIcon,
  Layers,
  FileText,
  Loader2,
  Building2,
  DollarSign,
  CheckCircle2,
  ExternalLink,
  Eye
} from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState('media'); // 'info', 'media', 'description'

  // Image Uploading States
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [uploadingFloorPlanIdx, setUploadingFloorPlanIdx] = useState(null);
  const [newGalleryUrl, setNewGalleryUrl] = useState('');

  // Refs for file pickers
  const thumbnailInputRef = useRef(null);
  const galleryInputRef = useRef(null);

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
    descriptionBn: '',
    thumbnail: '/projects/rose_garden_main.jpg',
    images: [],
    floorPlans: [],
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
      descriptionBn: '',
      thumbnail: '',
      images: [],
      floorPlans: [
        {
          name: 'Typical Floor Plan (1,250 SFT)',
          specs: '3 Bed, 3 Bath, 2 Balcony, Drawing, Dining, Kitchen',
          image: ''
        }
      ],
      amenities: '2 Modern Lifts, 24/7 Security CCTV, Generator Backup, Substation'
    });
    setActiveTab('info');
    setModalOpen(true);
  };

  const openEditModal = (p) => {
    setEditingId(p.id);
    const projectImages = Array.isArray(p.images) && p.images.length > 0
      ? [...p.images]
      : (p.thumbnail ? [p.thumbnail] : []);

    setFormData({
      ...p,
      images: projectImages,
      floorPlans: Array.isArray(p.floorPlans) ? JSON.parse(JSON.stringify(p.floorPlans)) : [],
      amenities: Array.isArray(p.amenities) ? p.amenities.join(', ') : p.amenities || ''
    });
    setActiveTab('media'); // Open directly into Media tab for quick visual editing!
    setModalOpen(true);
  };

  // Upload helper
  const uploadSingleFile = async (file) => {
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
    return json.url;
  };

  // Thumbnail upload handler
  const handleThumbnailUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingThumbnail(true);
      const url = await uploadSingleFile(file);
      setFormData(prev => {
        const nextImages = prev.images && prev.images.length > 0 ? prev.images : [url];
        return {
          ...prev,
          thumbnail: url,
          images: nextImages.includes(url) ? nextImages : [url, ...nextImages]
        };
      });
      showToast('Thumbnail image uploaded successfully!');
    } catch (err) {
      showToast(err.message || 'Error uploading thumbnail', 'error');
    } finally {
      setUploadingThumbnail(false);
      e.target.value = '';
    }
  };

  // Gallery multi-upload handler
  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    try {
      setUploadingGallery(true);
      const data = new FormData();
      files.forEach(f => data.append('images', f));

      const res = await fetch('/api/upload/multiple', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: data
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to upload images');
      }

      setFormData(prev => {
        const existing = prev.images || [];
        const merged = [...existing, ...(json.urls || [])];
        return {
          ...prev,
          images: merged,
          thumbnail: prev.thumbnail || (json.urls && json.urls[0]) || ''
        };
      });
      showToast(`${json.urls.length} images added to project gallery!`);
    } catch (err) {
      showToast(err.message || 'Error uploading gallery photos', 'error');
    } finally {
      setUploadingGallery(false);
      e.target.value = '';
    }
  };

  // Add gallery image by URL
  const handleAddGalleryUrl = (e) => {
    e?.preventDefault();
    if (!newGalleryUrl.trim()) return;
    const url = newGalleryUrl.trim();
    setFormData(prev => {
      const existing = prev.images || [];
      return {
        ...prev,
        images: [...existing, url],
        thumbnail: prev.thumbnail || url
      };
    });
    setNewGalleryUrl('');
    showToast('Image URL added to gallery');
  };

  // Remove gallery image
  const handleRemoveGalleryImage = (idx) => {
    setFormData(prev => {
      const updated = [...(prev.images || [])];
      const removed = updated.splice(idx, 1)[0];
      let newThumb = prev.thumbnail;
      if (newThumb === removed) {
        newThumb = updated.length > 0 ? updated[0] : '';
      }
      return {
        ...prev,
        images: updated,
        thumbnail: newThumb
      };
    });
  };

  // Set selected image as thumbnail cover
  const handleSetAsThumbnail = (url) => {
    setFormData(prev => ({
      ...prev,
      thumbnail: url
    }));
    showToast('Cover thumbnail updated!');
  };

  // Reorder gallery images
  const handleMoveGalleryImage = (idx, direction) => {
    setFormData(prev => {
      const updated = [...(prev.images || [])];
      const targetIdx = idx + direction;
      if (targetIdx < 0 || targetIdx >= updated.length) return prev;
      const temp = updated[idx];
      updated[idx] = updated[targetIdx];
      updated[targetIdx] = temp;
      return { ...prev, images: updated };
    });
  };

  // Floor Plan handlers
  const handleAddFloorPlan = () => {
    setFormData(prev => ({
      ...prev,
      floorPlans: [
        ...(prev.floorPlans || []),
        {
          name: 'Typical Unit Plan',
          specs: '1,250 SFT | 3 Bed, 3 Bath, 2 Balcony',
          image: ''
        }
      ]
    }));
  };

  const handleUpdateFloorPlan = (idx, field, value) => {
    setFormData(prev => {
      const list = [...(prev.floorPlans || [])];
      list[idx] = { ...list[idx], [field]: value };
      return { ...prev, floorPlans: list };
    });
  };

  const handleRemoveFloorPlan = (idx) => {
    setFormData(prev => {
      const list = [...(prev.floorPlans || [])];
      list.splice(idx, 1);
      return { ...prev, floorPlans: list };
    });
  };

  const handleFloorPlanUpload = async (idx, file) => {
    if (!file) return;
    try {
      setUploadingFloorPlanIdx(idx);
      const url = await uploadSingleFile(file);
      handleUpdateFloorPlan(idx, 'image', url);
      showToast('Floor plan uploaded successfully!');
    } catch (err) {
      showToast(err.message || 'Error uploading floor plan', 'error');
    } finally {
      setUploadingFloorPlanIdx(null);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      images: Array.isArray(formData.images) ? formData.images.filter(Boolean) : [],
      floorPlans: Array.isArray(formData.floorPlans)
        ? formData.floorPlans.filter(fp => fp && (fp.name || fp.image))
        : [],
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
            Add, update pricing, construction progress, images, and architectural drawings for IKN developments.
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
                  <th className="p-4">Gallery Images</th>
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
                          className="w-14 h-14 rounded-xl object-cover border border-slate-200 shadow-sm"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=200&q=80';
                          }}
                        />
                        <div>
                          <span className="font-bold text-slate-900 block text-sm">{p.title}</span>
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
                      <div className="flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-primary-600" />
                        <span className="font-bold text-slate-700">
                          {p.images?.length || (p.thumbnail ? 1 : 0)} photos
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {p.floorPlans?.length || 0} floor plans
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
                        <a
                          href={`/projects/${p.slug || p.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg text-slate-500 hover:text-primary-700 hover:bg-slate-100 transition"
                          title="View Live Page"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-4 sm:my-8 max-h-[92vh] flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 bg-emerald-luxury text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-gold" />
                  <span>{editingId ? 'Edit Project Details' : 'Add New Real Estate Project'}</span>
                </h3>
                <p className="text-[11px] text-white/70">
                  {formData.title ? formData.title : 'Configure project specs, pricing, cover thumbnail, and galleries'}
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-2 gap-2 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('info')}
                className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition ${
                  activeTab === 'info'
                    ? 'border-primary-700 text-primary-800 bg-white rounded-t-xl shadow-sm'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>1. Project Info & Pricing</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('media')}
                className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition ${
                  activeTab === 'media'
                    ? 'border-primary-700 text-primary-800 bg-white rounded-t-xl shadow-sm'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <ImageIcon className="w-4 h-4 text-gold-600" />
                <span>2. Images & Media</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-primary-100 text-primary-800">
                  {formData.images?.length || 0} photos
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('description')}
                className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition ${
                  activeTab === 'description'
                    ? 'border-primary-700 text-primary-800 bg-white rounded-t-xl shadow-sm'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>3. Description & Amenities</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
              {/* TAB 1: BASIC INFO & PRICING */}
              {activeTab === 'info' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Project Title *</label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-600"
                        placeholder="Rose Garden"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Title (Bengali)</label>
                      <input
                        type="text"
                        value={formData.titleBn}
                        onChange={e => setFormData({ ...formData, titleBn: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-600"
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
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-primary-600"
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
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-primary-600"
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
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Location (English)</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-600"
                        placeholder="Eastern Road, North Badda, Dhaka-1212"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Location (Bengali)</label>
                      <input
                        type="text"
                        value={formData.locationBn}
                        onChange={e => setFormData({ ...formData, locationBn: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-600"
                        placeholder="ইস্টার্ন রোড, উত্তর বাড্ডা, ঢাকা-১২১২"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Apartment Size</label>
                      <input
                        type="text"
                        value={formData.apartmentSize}
                        onChange={e => setFormData({ ...formData, apartmentSize: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-600"
                        placeholder="1,250 SFT"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Floors</label>
                      <input
                        type="text"
                        value={formData.floors}
                        onChange={e => setFormData({ ...formData, floors: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-600"
                        placeholder="G+9"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Total Units</label>
                      <input
                        type="number"
                        value={formData.totalUnits}
                        onChange={e => setFormData({ ...formData, totalUnits: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-600"
                        placeholder="63"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-primary-700" />
                      <span>Transparent Cost & Pricing Breakdown (BDT)</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-600 mb-1">Land Share Price</label>
                        <input
                          type="number"
                          value={formData.landSharePrice}
                          onChange={e => setFormData({ ...formData, landSharePrice: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-primary-600"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-600 mb-1">Est. Construction Cost</label>
                        <input
                          type="number"
                          value={formData.estimatedConstructionCost}
                          onChange={e => setFormData({ ...formData, estimatedConstructionCost: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-primary-600"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-600 mb-1">Est. Total Cost</label>
                        <input
                          type="number"
                          value={formData.estimatedTotalCost}
                          onChange={e => setFormData({ ...formData, estimatedTotalCost: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-primary-600"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Bedrooms</label>
                      <input
                        type="number"
                        value={formData.bedrooms}
                        onChange={e => setFormData({ ...formData, bedrooms: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-600"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Bathrooms</label>
                      <input
                        type="number"
                        value={formData.bathrooms}
                        onChange={e => setFormData({ ...formData, bathrooms: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-600"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Balconies</label>
                      <input
                        type="number"
                        value={formData.balconies}
                        onChange={e => setFormData({ ...formData, balconies: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-600"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Lifts</label>
                      <input
                        type="number"
                        value={formData.lifts}
                        onChange={e => setFormData({ ...formData, lifts: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Construction Period</label>
                      <input
                        type="text"
                        value={formData.constructionPeriod}
                        onChange={e => setFormData({ ...formData, constructionPeriod: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-600"
                        placeholder="30 Months"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Piling Status</label>
                      <input
                        type="text"
                        value={formData.pilingStatus}
                        onChange={e => setFormData({ ...formData, pilingStatus: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-600"
                        placeholder="136 Piles Cast, 13 Remaining"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: IMAGES & MEDIA (THUMBNAIL + GALLERY + FLOOR PLANS) */}
              {activeTab === 'media' && (
                <div className="space-y-8">
                  {/* SECTION 1: THUMBNAIL COVER IMAGE */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                          <Star className="w-4 h-4 text-gold fill-gold" />
                          <span>Main Thumbnail Cover Image</span>
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          This is the primary image shown on the Homepage cards, Project Listing cards, and social share links.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          ref={thumbnailInputRef}
                          accept="image/*"
                          onChange={handleThumbnailUpload}
                          className="hidden"
                        />
                        <button
                          type="button"
                          disabled={uploadingThumbnail}
                          onClick={() => thumbnailInputRef.current?.click()}
                          className="px-3 py-2 rounded-xl font-bold bg-primary-700 text-white hover:bg-primary-800 transition flex items-center gap-1.5 shadow-sm"
                        >
                          {uploadingThumbnail ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Upload className="w-3.5 h-3.5" />
                          )}
                          <span>{uploadingThumbnail ? 'Uploading...' : 'Upload Cover Photo'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                      {/* Image Preview Box */}
                      <div className="sm:col-span-1">
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-200 border-2 border-slate-300 shadow-inner group">
                          {formData.thumbnail ? (
                            <img
                              src={formData.thumbnail}
                              alt="Thumbnail Preview"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                              <ImageIcon className="w-8 h-8 mb-1 stroke-1" />
                              <span className="text-[10px]">No Thumbnail Selected</span>
                            </div>
                          )}
                          {formData.thumbnail && (
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[9px] font-bold bg-black/70 text-white backdrop-blur-sm">
                              Current Cover
                            </span>
                          )}
                        </div>
                      </div>

                      {/* URL or Direct Link Input */}
                      <div className="sm:col-span-2 space-y-2">
                        <label className="block font-bold text-slate-700">Cover Image URL / Path</label>
                        <div className="flex items-center gap-2">
                          <div className="relative flex-1">
                            <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                            <input
                              type="text"
                              value={formData.thumbnail}
                              onChange={e => setFormData({ ...formData, thumbnail: e.target.value })}
                              placeholder="/projects/rose_garden_main.jpg or https://..."
                              className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 bg-white font-mono text-[11px] focus:outline-none focus:border-primary-600"
                            />
                          </div>
                          {formData.thumbnail && (
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, thumbnail: '' })}
                              className="px-2.5 py-2 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 border border-slate-200 transition"
                              title="Clear Thumbnail"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400">
                          Tip: You can either click "Upload Cover Photo" to pick an image from your device or paste an image URL directly.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: PROJECT DETAILED VIEWS IMAGES (GALLERY) */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                          <Layers className="w-4 h-4 text-primary-700" />
                          <span>Project Detailed Views Images (Gallery Slider & Lightbox)</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gold/20 text-slate-800">
                            {formData.images?.length || 0} Photos
                          </span>
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          These images appear in the photo gallery slider, thumbnail carousel, and full-screen view on the project details page.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          ref={galleryInputRef}
                          accept="image/*"
                          multiple
                          onChange={handleGalleryUpload}
                          className="hidden"
                        />
                        <button
                          type="button"
                          disabled={uploadingGallery}
                          onClick={() => galleryInputRef.current?.click()}
                          className="px-3.5 py-2 rounded-xl font-bold bg-emerald-luxury text-white hover:bg-emerald-800 transition flex items-center gap-1.5 shadow"
                        >
                          {uploadingGallery ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Upload className="w-3.5 h-3.5 text-gold" />
                          )}
                          <span>{uploadingGallery ? 'Uploading...' : 'Upload Device Photos'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Add Image by URL Bar */}
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          value={newGalleryUrl}
                          onChange={e => setNewGalleryUrl(e.target.value)}
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddGalleryUrl();
                            }
                          }}
                          placeholder="Paste image URL or /projects/photo.jpg to add to gallery..."
                          className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-[11px] focus:outline-none focus:border-primary-600 focus:bg-white"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleAddGalleryUrl}
                        className="px-4 py-2 rounded-xl font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Gallery</span>
                      </button>
                    </div>

                    {/* Gallery Cards Grid */}
                    {(!formData.images || formData.images.length === 0) ? (
                      <div className="py-12 border-2 border-dashed border-slate-200 rounded-2xl text-center space-y-2">
                        <ImageIcon className="w-10 h-10 text-slate-300 mx-auto" />
                        <p className="font-bold text-slate-600">No detailed view images added yet.</p>
                        <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                          Click <strong>"Upload Device Photos"</strong> to select multiple photos from your computer, or paste image URLs above.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {formData.images.map((imgUrl, idx) => {
                          const isThumb = formData.thumbnail === imgUrl;
                          return (
                            <div
                              key={idx}
                              className={`relative rounded-2xl border overflow-hidden transition group bg-white shadow-sm flex flex-col ${
                                isThumb ? 'border-primary-600 ring-2 ring-primary-600/20' : 'border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              {/* Image Preview Container */}
                              <div className="relative aspect-video bg-slate-100 overflow-hidden">
                                <img
                                  src={imgUrl}
                                  alt={`Gallery photo ${idx + 1}`}
                                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                  onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80';
                                  }}
                                />

                                {/* Index Badge */}
                                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/70 text-white backdrop-blur-sm">
                                  #{idx + 1}
                                </span>

                                {/* Main Cover Star Badge */}
                                {isThumb && (
                                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-gold text-slate-900 shadow-md flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-slate-900" />
                                    <span>Cover</span>
                                  </span>
                                )}
                              </div>

                              {/* Card Actions & URL */}
                              <div className="p-3 bg-white space-y-2 flex-1 flex flex-col justify-between">
                                <input
                                  type="text"
                                  value={imgUrl}
                                  onChange={e => {
                                    const nextImages = [...formData.images];
                                    nextImages[idx] = e.target.value;
                                    setFormData({ ...formData, images: nextImages });
                                  }}
                                  className="w-full px-2 py-1 rounded-lg border border-slate-200 text-[10px] font-mono text-slate-600 bg-slate-50 focus:bg-white focus:outline-none focus:border-primary-600"
                                  title="Edit URL"
                                />

                                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                                  {/* Set as Thumbnail Button */}
                                  <button
                                    type="button"
                                    onClick={() => handleSetAsThumbnail(imgUrl)}
                                    className={`px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition ${
                                      isThumb
                                        ? 'bg-gold/20 text-slate-800 cursor-default'
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                    }`}
                                    title="Set as main project thumbnail"
                                  >
                                    <Star className={`w-3 h-3 ${isThumb ? 'fill-gold text-gold' : 'text-slate-400'}`} />
                                    <span>{isThumb ? 'Current Cover' : 'Make Cover'}</span>
                                  </button>

                                  {/* Reorder and Delete controls */}
                                  <div className="flex items-center gap-1">
                                    <button
                                      type="button"
                                      disabled={idx === 0}
                                      onClick={() => handleMoveGalleryImage(idx, -1)}
                                      className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-20"
                                      title="Move Left"
                                    >
                                      <ChevronLeft className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      disabled={idx === formData.images.length - 1}
                                      onClick={() => handleMoveGalleryImage(idx, 1)}
                                      className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-20"
                                      title="Move Right"
                                    >
                                      <ChevronRight className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveGalleryImage(idx)}
                                      className="p-1 rounded-md text-red-500 hover:text-red-700 hover:bg-red-50 transition ml-1"
                                      title="Remove from gallery"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* SECTION 3: FLOOR PLANS & ARCHITECTURAL DRAWINGS */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-primary-700" />
                          <span>Floor Plans & Architectural Drawings</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700">
                            {formData.floorPlans?.length || 0} Drawings
                          </span>
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          Blueprints, CAD drawings, and plot maps displayed in the Floor Plans tab on the project details page.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleAddFloorPlan}
                        className="px-3.5 py-1.5 rounded-xl font-bold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition flex items-center gap-1.5 shadow-sm text-xs"
                      >
                        <Plus className="w-3.5 h-3.5 text-primary-700" />
                        <span>Add Floor Plan</span>
                      </button>
                    </div>

                    {(!formData.floorPlans || formData.floorPlans.length === 0) ? (
                      <div className="py-6 text-center text-slate-400 text-xs">
                        No floor plans configured. Click "Add Floor Plan" to attach drawings.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {formData.floorPlans.map((fp, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                          >
                            {/* Drawing Image Preview */}
                            <div className="sm:col-span-3">
                              <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100 border border-slate-200 group">
                                {fp.image ? (
                                  <img
                                    src={fp.image}
                                    alt={fp.name || 'Floor Plan'}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.src = 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=400&q=80';
                                    }}
                                  />
                                ) : (
                                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 text-[10px]">
                                    <ImageIcon className="w-6 h-6 stroke-1 mb-1" />
                                    <span>No Drawing</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Plan Details & Upload */}
                            <div className="sm:col-span-8 space-y-2">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Plan Title / Name</label>
                                  <input
                                    type="text"
                                    value={fp.name || ''}
                                    onChange={e => handleUpdateFloorPlan(idx, 'name', e.target.value)}
                                    placeholder="e.g. Typical Floor Plan (1st to 9th Floor)"
                                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-primary-600"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold text-slate-600 mb-0.5">Unit Specs / Dimensions</label>
                                  <input
                                    type="text"
                                    value={fp.specs || ''}
                                    onChange={e => handleUpdateFloorPlan(idx, 'specs', e.target.value)}
                                    placeholder="e.g. 1,250 SFT | 3 Bed, 3 Bath, 2 Balcony"
                                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-primary-600"
                                  />
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={fp.image || ''}
                                  onChange={e => handleUpdateFloorPlan(idx, 'image', e.target.value)}
                                  placeholder="Floor plan image URL or /projects/drawing.jpg"
                                  className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-[11px] font-mono focus:outline-none focus:border-primary-600"
                                />

                                <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] flex items-center gap-1 transition">
                                  {uploadingFloorPlanIdx === idx ? (
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                  ) : (
                                    <Upload className="w-3 h-3" />
                                  )}
                                  <span>{uploadingFloorPlanIdx === idx ? 'Uploading...' : 'Upload'}</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={e => {
                                      const file = e.target.files?.[0];
                                      if (file) handleFloorPlanUpload(idx, file);
                                    }}
                                  />
                                </label>
                              </div>
                            </div>

                            {/* Remove Plan */}
                            <div className="sm:col-span-1 text-right sm:text-center">
                              <button
                                type="button"
                                onClick={() => handleRemoveFloorPlan(idx)}
                                className="p-2 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition"
                                title="Delete Floor Plan"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: DESCRIPTION & AMENITIES */}
              {activeTab === 'description' && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Amenities & Facilities (Comma separated)
                    </label>
                    <input
                      type="text"
                      value={formData.amenities}
                      onChange={e => setFormData({ ...formData, amenities: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-600"
                      placeholder="2 Lifts, Substation, CCTV, Generator Backup, Underground Reservoir"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      Separate each amenity with a comma. They will be rendered as luxury feature badges on the details page.
                    </p>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Project Overview (English)</label>
                    <textarea
                      rows="4"
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-600 resize-none text-xs leading-relaxed"
                      placeholder="Comprehensive project description explaining location, land-share model, and building features..."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Project Overview (Bengali)</label>
                    <textarea
                      rows="4"
                      value={formData.descriptionBn}
                      onChange={e => setFormData({ ...formData, descriptionBn: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-600 resize-none text-xs leading-relaxed"
                      placeholder="প্রকল্পের বিস্তারিত বিবরণ (বাংলায়)..."
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">RAJUK Approval</label>
                      <input
                        type="text"
                        value={formData.rajukApproval}
                        onChange={e => setFormData({ ...formData, rajukApproval: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-600"
                        placeholder="Approved for G+9 Multi-Storey"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Legal Status</label>
                      <input
                        type="text"
                        value={formData.legalStatus}
                        onChange={e => setFormData({ ...formData, legalStatus: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-600"
                        placeholder="Direct Registration & Mutation"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Soil Test</label>
                      <input
                        type="text"
                        value={formData.soilTest}
                        onChange={e => setFormData({ ...formData, soilTest: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-600"
                        placeholder="Certified & Completed"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Footer with Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div className="text-[11px] text-slate-400">
                  {activeTab === 'info' && 'Step 1 of 3: Building details'}
                  {activeTab === 'media' && `Step 2 of 3: Images & drawings (${formData.images?.length || 0} gallery photos)`}
                  {activeTab === 'description' && 'Step 3 of 3: Text & legal approvals'}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
                  >
                    Cancel
                  </button>

                  {activeTab !== 'description' ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (activeTab === 'info') setActiveTab('media');
                        else if (activeTab === 'media') setActiveTab('description');
                      }}
                      className="px-4 py-2 rounded-xl font-bold bg-slate-800 text-white hover:bg-slate-900 transition flex items-center gap-1.5"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  ) : null}

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl font-bold text-slate-900 bg-gold hover:bg-gold-400 transition shadow flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Project</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
