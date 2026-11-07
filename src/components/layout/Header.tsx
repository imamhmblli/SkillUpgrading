import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Sun,
  Moon,
  ChevronDown,
  Check,
  UserCheck,
  Shield,
  GraduationCap,
  PanelLeft
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const Header: React.FC = () => {
  const {
    currentUser,
    switchRole,
    searchQuery,
    setSearchQuery,
    theme,
    toggleTheme,
    setActiveTab,
    closeClassroom,
    toggleSidebarCollapse,
    isSidebarCollapsed
  } = useApp();

  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const roleMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (roleMenuRef.current && !roleMenuRef.current.contains(e.target as Node)) {
        setShowRoleMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoleChange = (role: UserRole) => {
    switchRole(role);
    setShowRoleMenu(false);
    if (role === 'instruktur' || role === 'admin') {
      setActiveTab('instructor_panel');
      closeClassroom();
    } else {
      setActiveTab('beranda');
    }
  };

  // User avatar initial letter
  const userInitial = currentUser.full_name ? currentUser.full_name[0].toUpperCase() : 'A';

  return (
    <header className="h-18 bg-white dark:bg-[#090D16] border-b border-slate-200 dark:border-[#1A2438] px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30 transition-colors">
      {/* Left: Sidebar Toggle & Brand Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebarCollapse}
          className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 dark:bg-[#0F1626] dark:hover:bg-[#161F34] dark:border-[#202C44] dark:text-slate-300 transition-colors cursor-pointer"
          title={isSidebarCollapsed ? 'Buka / Perlebar Sidebar' : 'Ciutkan Sidebar'}
          aria-label="Toggle sidebar"
        >
          <PanelLeft className="w-4.5 h-4.5" />
        </button>

        <div
          onClick={() => {
            closeClassroom();
            setActiveTab('beranda');
          }}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <img
            src="/assets/aistudio/skillup_logo_clean.png"
            alt="SKILLUP Logo"
            className="h-9 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-200"
          />
          <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            SKILLUP
          </span>
        </div>
      </div>

      {/* Center Search Bar */}
      <div className="flex-1 max-w-md mx-2 hidden sm:block">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari kursus, topik, atau skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-100 hover:bg-slate-200/60 focus:bg-white text-xs text-slate-900 placeholder-slate-400 rounded-xl border border-slate-200 focus:border-slate-500 dark:bg-[#101625] dark:hover:bg-[#141C30] dark:focus:bg-[#12192B] dark:text-white dark:placeholder-slate-400 dark:border-[#1E283F] outline-hidden transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Right Controls:
          1. Circular Dark/Light Mode toggle button
          2. User Profile pill (Initial, Name, Role, Role Switcher)
      */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Theme Toggle Button (Light/Dark mode) */}
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 dark:bg-[#0F1626] dark:hover:bg-[#161F34] dark:border-[#202C44] dark:text-amber-400 transition-all shadow-xs active:scale-95 cursor-pointer"
          title={theme === 'dark' ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4.5 h-4.5 stroke-[2.2]" />
          ) : (
            <Moon className="w-4.5 h-4.5 stroke-[2.2]" />
          )}
        </button>

        {/* User Pill: Letter 'A' in dark grey badge + 'Administrator' + 'Admin' + Chevron */}
        <div className="relative" ref={roleMenuRef}>
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-2.5 p-1.5 pr-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 dark:bg-[#0F1626] dark:hover:bg-[#161F34] dark:border-[#202C44] dark:text-white rounded-xl transition-colors shadow-xs active:scale-95 cursor-pointer"
          >
            {/* Square/rounded letter badge */}
            <div className="w-8 h-8 rounded-lg bg-[#2D333F] text-white flex items-center justify-center font-black text-xs shadow-xs">
              {userInitial}
            </div>

            <div className="text-left hidden sm:block leading-tight">
              <div className="text-xs font-extrabold text-slate-900 dark:text-white">
                {currentUser.role === 'admin' ? 'Administrator' : currentUser.full_name}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium capitalize">
                {currentUser.role === 'admin' ? 'Admin' : currentUser.role}
              </div>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
          </button>

          {/* Role Switching Dropdown */}
          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#101625] text-slate-900 dark:text-white rounded-2xl shadow-2xl border border-slate-200 dark:border-[#202C44] p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="p-2.5 pb-2 border-b border-slate-100 dark:border-[#1E283F] mb-1">
                <div className="text-xs font-bold text-slate-900 dark:text-white">{currentUser.full_name}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{currentUser.email}</div>
              </div>

              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Pilih Role Pengguna
              </div>

              <div className="space-y-1">
                <button
                  onClick={() => handleRoleChange('admin')}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-medium transition-colors ${
                    currentUser.role === 'admin'
                      ? 'bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-white border border-slate-300 dark:border-slate-600 font-bold'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-[#161F34]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                    <span>Administrator (Admin)</span>
                  </div>
                  {currentUser.role === 'admin' && <Check className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />}
                </button>

                <button
                  onClick={() => handleRoleChange('instruktur')}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-medium transition-colors ${
                    currentUser.role === 'instruktur'
                      ? 'bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-white border border-slate-300 dark:border-slate-600 font-bold'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-[#161F34]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                    <span>Instruktur (Budi Santoso)</span>
                  </div>
                  {currentUser.role === 'instruktur' && <Check className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />}
                </button>

                <button
                  onClick={() => handleRoleChange('siswa')}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-medium transition-colors ${
                    currentUser.role === 'siswa'
                      ? 'bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-white border border-slate-300 dark:border-slate-600 font-bold'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-[#161F34]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                    <span>Siswa (Imam Hambali)</span>
                  </div>
                  {currentUser.role === 'siswa' && <Check className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
