import React, { useState, useEffect, useRef } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  BookOpen,
  Save,
  X,
  Upload,
  Image as ImageIcon,
  Loader2,
  Link as LinkIcon,
  Eye,
  FileText
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export default function AdminBlogs() {
  const { token } = useAuth();
  const { showToast } = useApp();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Upload States
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingBodyImage, setUploadingBodyImage] = useState(false);
  const coverInputRef = useRef(null);
  const bodyImageInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    titleBn: '',
    category: 'Investment Guide',
    author: 'IKN Research Team',
    readTime: '5 min read',
    coverImage: '/projects/rose_garden_main.jpg',
    excerpt: '',
    excerptBn: '',
    content: ''
  });

  const loadBlogs = () => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => {
        setBlogs(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      titleBn: '',
      category: 'Investment Guide',
      author: 'IKN Research Team',
      readTime: '5 min read',
      coverImage: '/projects/rose_garden_main.jpg',
      excerpt: '',
      excerptBn: '',
      content: ''
    });
    setModalOpen(true);
  };

  const openEdit = (b) => {
    setEditingId(b.id);
    setFormData(b);
    setModalOpen(true);
  };

  // Upload Single Image Helper
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

  // Cover image upload
  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingCover(true);
      const url = await uploadSingleFile(file);
      setFormData(prev => ({ ...prev, coverImage: url }));
      showToast('Cover photo uploaded successfully!');
    } catch (err) {
      showToast(err.message || 'Error uploading cover photo', 'error');
    } finally {
      setUploadingCover(false);
      e.target.value = '';
    }
  };

  // Body image upload (inserts markdown into article)
  const handleBodyImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingBodyImage(true);
      const url = await uploadSingleFile(file);
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9 ]/g, ' ');
      const markdownImage = `\n\n![${cleanName}](${url})\n*Photo: ${cleanName}*\n\n`;

      setFormData(prev => ({
        ...prev,
        content: (prev.content || '') + markdownImage
      }));
      showToast('Image uploaded and inserted into article body!');
    } catch (err) {
      showToast(err.message || 'Error uploading article image', 'error');
    } finally {
      setUploadingBodyImage(false);
      e.target.value = '';
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/blogs/${editingId}` : '/api/blogs';
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
        showToast(editingId ? 'Article updated' : 'Article published');
        setModalOpen(false);
        loadBlogs();
      } else {
        const errJson = await res.json();
        showToast(errJson.error || 'Failed to save article', 'error');
      }
    } catch (err) {
      showToast('Error saving article', 'error');
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete article "${title}"?`)) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showToast('Article deleted');
        loadBlogs();
      }
    } catch (err) {
      showToast('Error deleting article', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary-700" />
            <span>Articles & Real Estate Insights</span>
          </h1>
          <p className="text-xs text-slate-500">
            Publish and manage SEO guides on land sharing, RAJUK approvals, flat pricing, and North Badda market updates.
          </p>
        </div>

        <button
          onClick={openAdd}
          className="px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-primary-700 hover:bg-primary-800 transition shadow flex items-center gap-2"
        >
          <Plus className="w-4 h-4 text-gold" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">No articles published yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="p-4">Article</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Author</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {blogs.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/70 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={b.coverImage}
                          alt={b.title}
                          className="w-14 h-14 rounded-xl object-cover border border-slate-200 shadow-sm"
                          onError={(e) => {
                            e.target.src = '/projects/rose_garden_main.jpg';
                          }}
                        />
                        <div>
                          <span className="font-bold text-slate-900 block max-w-sm truncate text-sm">
                            {b.title}
                          </span>
                          <span className="text-[11px] text-slate-400">{b.readTime}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary-50 text-primary-800">
                        {b.category}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-slate-700">{b.author}</td>
                    <td className="p-4 text-slate-400">{b.date}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`/blogs/${b.slug || b.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 text-slate-400 hover:text-primary-700 hover:bg-slate-100 rounded-lg transition"
                          title="View Live Article"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => openEdit(b)}
                          className="p-2 text-slate-600 hover:text-primary-700 hover:bg-slate-100 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(b.id, b.title)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
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
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 bg-emerald-luxury text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-gold" />
                  <span>{editingId ? 'Edit Article' : 'Write New Article'}</span>
                </h3>
                <p className="text-[11px] text-white/70">
                  {editingId ? 'Update article details, cover image, and content' : 'Compose and publish a new insightful real estate guide'}
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs overflow-y-auto flex-1">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Title (English) *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. How Land Share Flats Save 35-40% Compared to Developers in Dhaka"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Title (Bengali)</label>
                <input
                  type="text"
                  value={formData.titleBn}
                  onChange={e => setFormData({ ...formData, titleBn: e.target.value })}
                  placeholder="যেমন: কীভাবে জমি শেয়ারের মাধ্যমে ৩৫-৪০% কম খরচে ঢাকায় ফ্ল্যাট কিনবেন?"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Investment Guide"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={e => setFormData({ ...formData, author: e.target.value })}
                    placeholder="IKN Research Team"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Read Time</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={e => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="5 min read"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-600"
                  />
                </div>
              </div>

              {/* COVER IMAGE WITH DIRECT UPLOAD */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block font-bold text-slate-800">Article Cover Image</label>
                    <p className="text-[10px] text-slate-400">
                      Displayed on blog cards, article headers, and social media share cards.
                    </p>
                  </div>

                  <input
                    type="file"
                    ref={coverInputRef}
                    accept="image/*"
                    onChange={handleCoverUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    disabled={uploadingCover}
                    onClick={() => coverInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg bg-primary-700 text-white font-bold text-[11px] hover:bg-primary-800 transition flex items-center gap-1 shadow-sm"
                  >
                    {uploadingCover ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    <span>{uploadingCover ? 'Uploading...' : 'Upload Cover Photo'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                  <div className="sm:col-span-1">
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-200 border border-slate-300 shadow-inner group">
                      {formData.coverImage ? (
                        <img
                          src={formData.coverImage}
                          alt="Cover Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/projects/rose_garden_main.jpg';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <ImageIcon className="w-6 h-6 stroke-1" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <div className="relative">
                      <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                      <input
                        type="text"
                        value={formData.coverImage}
                        onChange={e => setFormData({ ...formData, coverImage: e.target.value })}
                        placeholder="/projects/... or https://..."
                        className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-mono text-[11px] focus:outline-none focus:border-primary-600"
                      />
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Upload from your device or paste an image URL directly.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Excerpt (English)</label>
                <textarea
                  rows="2"
                  value={formData.excerpt}
                  onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 resize-none focus:outline-none focus:border-primary-600"
                  placeholder="Brief summary displayed on article preview cards..."
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Excerpt (Bengali)</label>
                <textarea
                  rows="2"
                  value={formData.excerptBn}
                  onChange={e => setFormData({ ...formData, excerptBn: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 resize-none focus:outline-none focus:border-primary-600"
                  placeholder="সংক্ষিপ্ত সারসংক্ষেপ (বাংলায়)..."
                ></textarea>
              </div>

              {/* ARTICLE BODY & INLINE IMAGE INSERTION */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block font-bold text-slate-700">Article Content (Markdown supported) *</label>

                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      ref={bodyImageInputRef}
                      accept="image/*"
                      onChange={handleBodyImageUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      disabled={uploadingBodyImage}
                      onClick={() => bodyImageInputRef.current?.click()}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center gap-1 transition"
                      title="Upload and insert an image tag into the markdown body"
                    >
                      {uploadingBodyImage ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Upload className="w-3 h-3 text-primary-700" />
                      )}
                      <span>{uploadingBodyImage ? 'Inserting Image...' : '+ Insert Image in Body'}</span>
                    </button>
                  </div>
                </div>

                <textarea
                  rows="8"
                  required
                  value={formData.content}
                  onChange={e => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs focus:outline-none focus:border-primary-600 leading-relaxed"
                  placeholder="Write article content using markdown headers (#), bullet points, and paragraphs..."
                ></textarea>
                <p className="text-[10px] text-slate-400">
                  Tip: Use the <strong>"+ Insert Image in Body"</strong> button above to upload and embed site photos, drawings, and charts directly into your article text!
                </p>
              </div>

              {/* Footer */}
              <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
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
                  <span>{editingId ? 'Update Article' : 'Publish Article'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
