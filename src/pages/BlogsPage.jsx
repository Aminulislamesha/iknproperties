import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { useApp } from '../context/AppContext';

export default function BlogsPage() {
  const { lang } = useApp();
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  const filteredBlogs = blogs.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    (b.titleBn && b.titleBn.includes(search)) ||
    b.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <SEOHead
        title="Real Estate Insights & Land Share Guides | IKN Properties"
        description="Read comprehensive guides on buying land share flats in Dhaka, RAJUK approval verification, property law, and real estate market trends."
        keywords="Dhaka real estate blog, land share flat guide, RAJUK rules, apartment buying tips North Badda"
        canonical="https://iknproperties.com/blogs"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Banner */}
        <div className="bg-emerald-luxury rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold bg-white/10 px-3.5 py-1.5 rounded-full inline-block border border-gold/30">
              {lang === 'bn' ? 'জ্ঞান ও রিয়েল এস্টেট পরামর্শ' : 'Real Estate Insights & News'}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {lang === 'bn'
                ? 'ফ্ল্যাট ও জমি কেনার আইনি ও আর্থিক গাইড'
                : 'Property Buyer Guides & Legal Insights'}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
              {lang === 'bn'
                ? 'ঢাকায় ফ্ল্যাট কেনার সময় প্রতারণা এড়াতে এবং সঠিক বিনিয়োগ নিশ্চিত করতে আমাদের বিশেষজ্ঞদের বিশ্লেষণমূলক লেখাগুলো পড়ুন।'
                : 'Empowering apartment buyers and land share partners with verified legal advice, market valuations, and cost analysis.'}
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={lang === 'bn' ? 'আর্টিকেল অনুসন্ধান করুন...' : 'Search articles by title or topic...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-600 shadow-sm"
            />
          </div>
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs text-slate-500">Loading articles...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-base font-bold text-slate-700">No articles found</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((b) => (
              <article
                key={b.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-52 w-full overflow-hidden bg-slate-200">
                    <img
                      src={b.coverImage}
                      alt={b.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-brandDark/85 backdrop-blur-md px-3 py-1 rounded-xl text-white text-[11px] font-bold">
                      {b.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold mb-2">
                      <Calendar className="w-3.5 h-3.5 text-primary-600" />
                      <span>{b.date}</span>
                      <span>•</span>
                      <Clock className="w-3.5 h-3.5 text-gold" />
                      <span>{b.readTime}</span>
                    </div>

                    <h2 className="text-base font-bold text-slate-900 group-hover:text-primary-700 transition leading-snug">
                      <Link to={`/blogs/${b.slug}`}>
                        {lang === 'bn' ? b.titleBn || b.title : b.title}
                      </Link>
                    </h2>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {lang === 'bn' ? b.excerptBn || b.excerpt : b.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-50 mt-2 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400">{b.author}</span>
                  <Link
                    to={`/blogs/${b.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-700 hover:text-primary-800"
                  >
                    <span>{lang === 'bn' ? 'সম্পূর্ণ পড়ুন' : 'Read Full'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
