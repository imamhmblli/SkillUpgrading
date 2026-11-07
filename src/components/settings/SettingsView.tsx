import React, { useState } from 'react';
import { Save, CheckCircle, Moon, Sun } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SettingsView: React.FC = () => {
  const { currentUser, theme, toggleTheme } = useApp();

  const [fullName, setFullName] = useState(currentUser.full_name);
  const [email, setEmail] = useState(currentUser.email);
  const [bio, setBio] = useState(currentUser.bio || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-8 pb-12 max-w-3xl">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Pengaturan Akun & Tampilan
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Perbarui informasi data diri, tema tampilan (mode gelap / terang), dan preferensi akun SKILLUP.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Pengaturan profil berhasil disimpan!</span>
        </div>
      )}

      {/* Theme Selection Card */}
      <div className="bg-white dark:bg-[#0B101D] rounded-3xl p-6 border border-slate-200 dark:border-[#1A2438] shadow-sm dark:shadow-xl space-y-4">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white">
          Tema Tampilan Aplikasi
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Pilih tema tampilan yang nyaman untuk mata saat belajar:
        </p>
        <div className="grid grid-cols-2 gap-3 max-w-md">
          <button
            type="button"
            onClick={() => theme === 'dark' && toggleTheme()}
            className={`p-4 rounded-2xl border flex items-center gap-3 transition-all cursor-pointer ${
              theme === 'light'
                ? 'border-[#5438FF] bg-[#5438FF]/10 text-slate-900 ring-2 ring-[#5438FF]/30'
                : 'border-slate-200 dark:border-[#1E2940] hover:bg-slate-50 dark:hover:bg-[#141C30] text-slate-600 dark:text-slate-300'
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Sun className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold">Mode Terang</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Tampilan cerah & bersih</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => theme === 'light' && toggleTheme()}
            className={`p-4 rounded-2xl border flex items-center gap-3 transition-all cursor-pointer ${
              theme === 'dark'
                ? 'border-[#5438FF] bg-[#5438FF]/20 text-white ring-2 ring-[#5438FF]/40'
                : 'border-slate-200 dark:border-[#1E2940] hover:bg-slate-50 dark:hover:bg-[#141C30] text-slate-600 dark:text-slate-300'
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-950 text-indigo-400 flex items-center justify-center">
              <Moon className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold">Mode Gelap</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Deep Navy & Purple</div>
            </div>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white dark:bg-[#0B101D] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-[#1A2438] shadow-sm dark:shadow-xl space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-200 dark:border-[#1A2438]">
          <img
            src={currentUser.avatar}
            alt={currentUser.full_name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/40"
          />
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">{currentUser.full_name}</h3>
            <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border border-indigo-500/30 px-2.5 py-0.5 rounded-md uppercase inline-block mt-1">
              Role: {currentUser.role}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nama Lengkap:</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-[#101728] border border-slate-200 dark:border-[#1E2940] rounded-xl text-xs text-slate-900 dark:text-white focus:border-indigo-500 outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email Terdaftar:</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-[#101728] border border-slate-200 dark:border-[#1E2940] rounded-xl text-xs text-slate-900 dark:text-white focus:border-indigo-500 outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Bio / Headline:</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-[#101728] border border-slate-200 dark:border-[#1E2940] rounded-xl text-xs text-slate-900 dark:text-white focus:border-indigo-500 outline-hidden"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-[#1A2438] flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#5438FF] hover:bg-[#462bf3] text-white font-bold text-xs shadow-lg shadow-[#5438FF]/20 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan Perubahan</span>
          </button>
        </div>
      </form>
    </div>
  );
};
