import React, { useState, useEffect } from 'react';
import { Save, Lock, Building, Phone, Mail, MapPin, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export default function AdminSettings() {
  const { token } = useAuth();
  const { showToast, setSettings: updateGlobalSettings } = useApp();
  const [settings, setSettingsState] = useState(null);
  const [loading, setLoading] = useState(true);

  // Password Change
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPass, setChangingPass] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        setSettingsState(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (res.ok) {
        showToast('Company settings updated');
        updateGlobalSettings(data.settings);
      }
    } catch (err) {
      showToast('Error updating settings', 'error');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }
    setChangingPass(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json();
      if (res.ok) {
        showToast('Password changed successfully');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        showToast(data.error || 'Failed to change password', 'error');
      }
    } catch (err) {
      showToast('Error changing password', 'error');
    } finally {
      setChangingPass(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="py-20 text-center">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Company Settings & Credentials
        </h1>
        <p className="text-xs text-slate-500">
          Update hotline numbers, North Badda office address, and secure admin credentials.
        </p>
      </div>

      {/* Company Info Form */}
      <form onSubmit={handleSaveSettings} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6 text-xs">
        <h2 className="text-sm font-bold uppercase tracking-wider text-primary-800 border-b border-slate-100 pb-3 flex items-center gap-2">
          <Building className="w-4 h-4" />
          <span>General Business Profile</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Company Name</label>
            <input
              type="text"
              value={settings.companyName || ''}
              onChange={e => setSettingsState({ ...settings, companyName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Company Name (Bengali)</label>
            <input
              type="text"
              value={settings.companyNameBn || ''}
              onChange={e => setSettingsState({ ...settings, companyNameBn: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Company Tagline</label>
          <input
            type="text"
            value={settings.tagline || ''}
            onChange={e => setSettingsState({ ...settings, tagline: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-slate-200"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Company Tagline (Bengali)</label>
          <input
            type="text"
            value={settings.taglineBn || ''}
            onChange={e => setSettingsState({ ...settings, taglineBn: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-slate-200"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Phone 1 (Hotline)</label>
            <input
              type="text"
              value={settings.phone1 || ''}
              onChange={e => setSettingsState({ ...settings, phone1: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Phone 2</label>
            <input
              type="text"
              value={settings.phone2 || ''}
              onChange={e => setSettingsState({ ...settings, phone2: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Official Email</label>
            <input
              type="email"
              value={settings.email || ''}
              onChange={e => setSettingsState({ ...settings, email: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Head Office Address</label>
          <input
            type="text"
            value={settings.address || ''}
            onChange={e => setSettingsState({ ...settings, address: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-slate-200"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Head Office Address (Bengali)</label>
          <input
            type="text"
            value={settings.addressBn || ''}
            onChange={e => setSettingsState({ ...settings, addressBn: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-slate-200"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Facebook Page URL</label>
            <input
              type="text"
              value={settings.facebook || ''}
              onChange={e => setSettingsState({ ...settings, facebook: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">YouTube Channel URL</label>
            <input
              type="text"
              value={settings.youtube || ''}
              onChange={e => setSettingsState({ ...settings, youtube: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-900 bg-gold hover:bg-gold-400 active:scale-95 transition shadow flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Update Business Settings</span>
          </button>
        </div>
      </form>

      {/* Change Password Form */}
      <form onSubmit={handlePasswordChange} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-4 text-xs">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <Lock className="w-4 h-4 text-primary-600" />
          <span>Change Administrator Password</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Current Password</label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">New Password</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Confirm New Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={changingPass}
            className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 transition shadow flex items-center gap-2"
          >
            <Lock className="w-3.5 h-3.5 text-gold" />
            <span>Change Password</span>
          </button>
        </div>
      </form>
    </div>
  );
}
