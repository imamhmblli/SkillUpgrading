import React from 'react';
import {
  Home,
  BookOpen,
  Calendar,
  Award,
  Users,
  Settings,
  Rocket,
  LayoutDashboard
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    closeClassroom,
    currentUser,
    setShowUpgradeModal
  } = useApp();

  const handleNavClick = (tab: string) => {
    closeClassroom();
    setActiveTab(tab);
  };

  const navItems = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'kursus', label: 'Kursus', icon: BookOpen },
    { id: 'rencana', label: 'Rencana Belajar', icon: Calendar },
    { id: 'sertifikat', label: 'Sertifikat', icon: Award },
    { id: 'komunitas', label: 'Bimbingan Mentor', icon: Users },
    { id: 'pengaturan', label: 'Pengaturan', icon: Settings },
  ];

  return (
    <aside className="w-64 shrink-0 bg-white dark:bg-[#0B101D] border-r border-slate-200 dark:border-[#1A2438] flex flex-col justify-between p-5 min-h-screen text-slate-700 dark:text-slate-200 transition-colors">
      <div>
        {/* Brand Logo & Tagline */}
        <div
          onClick={() => handleNavClick('beranda')}
          className="cursor-pointer group flex items-center gap-3 mb-6"
        >
          <div className="w-10 h-10 rounded-xl bg-[#5438FF] flex items-center justify-center text-white shadow-md shadow-[#5438FF]/30 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              SKILLUP
            </span>
            <div className="text-[10px] font-semibold tracking-wider text-slate-400 dark:text-slate-400 uppercase">
              Learn • Practice • Grow
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#5438FF] text-white shadow-md shadow-[#5438FF]/30 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-[#131C30]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}

          {/* Instructor & Admin Portal Link */}
          {(currentUser.role === 'instruktur' || currentUser.role === 'admin') && (
            <div className="pt-2 mt-2 border-t border-slate-200 dark:border-[#1A2438]">
              <button
                onClick={() => handleNavClick('instructor_panel')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'instructor_panel'
                    ? 'bg-purple-700 text-white shadow-md shadow-purple-500/30 font-bold'
                    : 'text-purple-700 bg-purple-50 border border-purple-200 hover:bg-purple-100 dark:text-purple-300 dark:bg-purple-950/40 dark:border-purple-800/40 dark:hover:bg-purple-900/50'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-purple-600 dark:text-purple-300" />
                <span className="truncate">
                  {currentUser.role === 'admin' ? 'Admin Portal' : 'Panel Instruktur'}
                </span>
              </button>
            </div>
          )}
        </nav>
      </div>

      {/* Upgrade Pro Card (Dark Theme matching palette) */}
      <div className="mt-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#5438FF] via-indigo-700 to-purple-900 p-4 text-white shadow-xl shadow-black/30">
          <div className="absolute -right-3 -bottom-3 opacity-20">
            <Rocket className="w-24 h-24 text-white" />
          </div>
          <div className="relative z-10">
            <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center mb-3">
              <Rocket className="w-4 h-4 text-amber-300" />
            </div>
            <h4 className="text-sm font-bold leading-snug">
              Jangan berhenti berkembang!
            </h4>
            <p className="text-[11px] text-indigo-100 mt-1 mb-3 leading-relaxed">
              Akses tanpa batas ke seluruh kelas dan konsultasi mentor 1-on-1.
            </p>
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="w-full py-2 px-3 bg-white text-indigo-700 font-bold text-xs rounded-xl shadow-xs hover:bg-indigo-50 hover:shadow transition-all flex items-center justify-center gap-1.5"
            >
              <span>Upgrade Pro</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
