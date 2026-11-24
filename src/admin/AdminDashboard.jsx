import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building, Users, HardHat, BookOpen, Plus, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export default function AdminDashboard() {
  const { token } = useAuth();
  const { showToast } = useApp();
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/metrics', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setMetrics(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [token]);

  const updateLeadStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        showToast(`Lead marked as ${newStatus}`);
        setMetrics(prev => ({
          ...prev,
          recentLeads: prev.recentLeads.map(l => l.id === id ? { ...l, status: newStatus } : l)
        }));
      }
    } catch (err) {
      showToast('Failed to update status', 'error');
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Inquiries',
      value: metrics?.totalLeads || 0,
      sub: `${metrics?.newLeads || 0} New Pending`,
      icon: Users,
      color: 'bg-blue-500',
      link: '/admin/leads'
    },
    {
      title: 'Active Projects',
      value: metrics?.totalProjects || 0,
      sub: 'Rose Garden & Shopno Tower',
      icon: Building,
      color: 'bg-emerald-600',
      link: '/admin/projects'
    },
    {
      title: 'Construction Updates',
      value: metrics?.totalUpdates || 0,
      sub: 'Verified Milestones',
      icon: HardHat,
      color: 'bg-amber-600',
      link: '/admin/progress'
    },
    {
      title: 'Published Articles',
      value: metrics?.totalBlogs || 0,
      sub: 'SEO Real Estate Guides',
      icon: BookOpen,
      color: 'bg-purple-600',
      link: '/admin/blogs'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs text-slate-500">
            Welcome to IKN Properties administrative control panel.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/projects"
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-primary-700 hover:bg-primary-800 transition flex items-center gap-1.5 shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Project</span>
          </Link>
          <Link
            to="/admin/blogs"
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Write Article</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <Link
              key={i}
              to={c.link}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition flex items-center justify-between group"
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  {c.title}
                </span>
                <div className="text-3xl font-extrabold text-slate-900 group-hover:text-primary-700 transition">
                  {c.value}
                </div>
                <span className="text-xs text-slate-500 font-medium mt-1 block">
                  {c.sub}
                </span>
              </div>
              <div className={`w-12 h-12 rounded-2xl ${c.color} text-white flex items-center justify-center shadow-lg`}>
                <Icon className="w-6 h-6" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Inquiries & Leads Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recent Customer Inquiries</h2>
            <p className="text-xs text-slate-500">Latest website submissions for flat bookings & site visits.</p>
          </div>
          <Link
            to="/admin/leads"
            className="text-xs font-bold text-primary-700 hover:text-primary-800 flex items-center gap-1"
          >
            <span>View All Leads</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {(!metrics?.recentLeads || metrics.recentLeads.length === 0) ? (
          <p className="text-xs text-slate-400 py-6 text-center">No inquiries received yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Project / Type</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {metrics.recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-3 font-bold text-slate-900">{lead.name}</td>
                    <td className="p-3 font-semibold text-slate-700">
                      <a href={`tel:${lead.phone}`} className="hover:underline">
                        {lead.phone}
                      </a>
                    </td>
                    <td className="p-3 text-slate-600">
                      <span className="font-semibold block">{lead.project}</span>
                      <span className="text-[10px] text-slate-400">{lead.serviceType}</span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          lead.status === 'New'
                            ? 'bg-blue-100 text-blue-800'
                            : lead.status === 'Contacted'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {lead.status === 'New' ? (
                        <button
                          onClick={() => updateLeadStatus(lead.id, 'Contacted')}
                          className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-primary-50 text-primary-700 hover:bg-primary-100 transition"
                        >
                          Mark Contacted
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400">Processed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
