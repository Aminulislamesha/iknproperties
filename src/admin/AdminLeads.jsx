import React, { useState, useEffect } from 'react';
import { Search, Download, Trash2, Phone, Mail, Calendar, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export default function AdminLeads() {
  const { token } = useAuth();
  const { showToast } = useApp();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  const loadLeads = () => {
    fetch('/api/leads', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setLeads(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadLeads();
  }, [token]);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        showToast(`Status updated to ${status}`);
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
      }
    } catch (err) {
      showToast('Failed to update status', 'error');
    }
  };

  const deleteLead = async (id, name) => {
    if (!window.confirm(`Delete inquiry from ${name}?`)) return;
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        showToast('Lead deleted');
        setLeads(prev => prev.filter(l => l.id !== id));
      }
    } catch (err) {
      showToast('Error deleting lead', 'error');
    }
  };

  const exportCSV = () => {
    if (leads.length === 0) {
      showToast('No leads to export', 'error');
      return;
    }
    const headers = ['ID', 'Name', 'Phone', 'Email', 'Project', 'Service Type', 'Status', 'Message', 'Date'];
    const rows = leads.map(l => [
      l.id,
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.email || ''}"`,
      `"${l.project}"`,
      `"${l.serviceType}"`,
      `"${l.status}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
      `"${l.createdAt}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ikn-leads-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter(l => {
    const matchesSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search) ||
      l.project.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Customer Inquiries & Leads CRM
          </h1>
          <p className="text-xs text-slate-500">
            Track inquiries, flat booking requests, and site visit schedules.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition shadow-sm flex items-center gap-2"
        >
          <Download className="w-4 h-4 text-primary-600" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, phone, or project..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-600"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['All', 'New', 'Contacted', 'Site Visit Scheduled', 'Closed'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-primary-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">No matching inquiries found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="p-4">Customer Details</th>
                  <th className="p-4">Interest / Project</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/70 transition">
                    <td className="p-4">
                      <span className="font-bold text-slate-900 block text-sm">{lead.name}</span>
                      <div className="flex items-center gap-2 text-slate-600 mt-1">
                        <Phone className="w-3.5 h-3.5 text-primary-600" />
                        <a href={`tel:${lead.phone}`} className="font-semibold hover:underline">
                          {lead.phone}
                        </a>
                      </div>
                      {lead.email && (
                        <div className="flex items-center gap-2 text-slate-400 text-[11px] mt-0.5">
                          <Mail className="w-3 h-3" />
                          <span>{lead.email}</span>
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-primary-800 block">{lead.project}</span>
                      <span className="text-[11px] text-slate-500">{lead.serviceType}</span>
                    </td>
                    <td className="p-4 max-w-xs">
                      <p className="text-slate-600 line-clamp-2 italic">
                        "{lead.message || 'No remarks entered'}"
                      </p>
                    </td>
                    <td className="p-4">
                      <select
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition ${
                          lead.status === 'New'
                            ? 'bg-blue-50 border-blue-200 text-blue-800'
                            : lead.status === 'Contacted'
                            ? 'bg-amber-50 border-amber-200 text-amber-800'
                            : lead.status === 'Site Visit Scheduled'
                            ? 'bg-purple-50 border-purple-200 text-purple-800'
                            : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td className="p-4 text-[11px] text-slate-400">
                      {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'Recent'}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => deleteLead(lead.id, lead.name)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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
