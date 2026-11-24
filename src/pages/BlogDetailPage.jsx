import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, Share2, Tag } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { useApp } from '../context/AppContext';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const { lang, showToast } = useApp();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/blogs/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setBlog(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Article Not Found</h2>
        <Link to="/blogs" className="text-xs font-bold text-primary-700 underline">
          Back to Blog List
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <SEOHead
        title={blog.title}
        description={blog.excerpt}
        keywords={blog.tags ? blog.tags.join(', ') : 'Dhaka Real Estate'}
        canonical={`https://iknproperties.com/blogs/${blog.slug}`}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Back Link */}
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-primary-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all articles</span>
        </Link>

        {/* Article Header */}
        <div className="space-y-4">
          <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-100 text-primary-800">
            {blog.category}
          </span>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {lang === 'bn' ? blog.titleBn || blog.title : blog.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-slate-200 text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                <User className="w-3.5 h-3.5 text-primary-600" />
                {blog.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {blog.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gold" />
                {blog.readTime}
              </span>
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                showToast('Article link copied!');
              }}
              className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition font-semibold"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Featured Cover Image */}
        <div className="rounded-3xl overflow-hidden shadow-md max-h-[460px] w-full bg-slate-900">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-100 shadow-sm space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base whitespace-pre-line">
          {blog.content}
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <Tag className="w-4 h-4 text-slate-400" />
            {blog.tags.map((t, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-200/70 text-slate-700"
              >
                #{t}
              </span>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}
