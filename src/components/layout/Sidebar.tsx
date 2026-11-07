import React, { useState, useEffect, useRef } from 'react';
import {
  Home,
  BookOpen,
  Calendar,
  Award,
  Users,
  Settings,
  Rocket,
  LayoutDashboard,
  ChevronsLeft,
  ChevronsRight,
  GripVertical,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    closeClassroom,
    currentUser,
    setShowUpgradeModal,
    sidebarWidth,
    setSidebarWidth,
    isSidebarCollapsed,
    toggleSidebarCollapse
  } = useApp();

  const [isDragging, setIsDragging] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const dragStartXRef = useRef(0);
  const startWidthRef = useRef(sidebarWidth);

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

  // Drag-to-resize handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    startWidthRef.current = sidebarWidth;
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - dragStartXRef.current;
      const targetWidth = startWidthRef.current + deltaX;

      // Snap to collapsed if dragged below 130px
      if (targetWidth < 130) {
        setSidebarWidth(76);
      } else {
        const clamped = Math.max(180, Math.min(460, targetWidth));
        setSidebarWidth(clamped);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, setSidebarWidth]);

  // Double click to reset to comfortable default 280px
  const handleResetWidth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSidebarWidth(280);
  };

  // Quick width presets
  const presets = [
    { label: 'Kecil', width: 220 },
    { label: 'Normal', width: 280 },
    { label: 'Lebar', width: 340 }
  ];

  return (
    <aside
      style={{ width: `${sidebarWidth}px` }}
      className={`shrink-0 bg-white dark:bg-[#0B101D] border-r border-slate-200 dark:border-[#1A2438] flex flex-col justify-between min-h-screen text-slate-700 dark:text-slate-200 transition-[width] relative select-none z-20 ${
        isDragging ? 'transition-none! ring-1 ring-slate-500/40' : 'duration-150'
      } ${isSidebarCollapsed ? 'p-3' : 'p-4 sm:p-5'}`}
    >
      <div>
        {/* Brand Logo & Tagline + Collapse Toggle */}
        <div className={`flex items-center justify-between mb-6 ${isSidebarCollapsed ? 'flex-col gap-3' : 'gap-2'}`}>
          <div
            onClick={() => handleNavClick('beranda')}
            className={`cursor-pointer group flex items-center min-w-0 ${
              isSidebarCollapsed ? 'justify-center w-full' : 'gap-3'
            }`}
            title="SKILLUP - Beranda"
          >
            <img
              src="/assets/aistudio/skillup_logo_clean.png"
              alt="SKILLUP Logo"
              className={`shrink-0 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-200 ${
                isSidebarCollapsed ? 'h-9 w-9' : 'h-10 w-auto'
              }`}
            />
            {!isSidebarCollapsed && (
              <div className="min-w-0 overflow-hidden">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white block truncate">
                  SKILLUP
                </span>
                <div className="text-[10px] font-semibold tracking-wider text-slate-400 dark:text-slate-400 uppercase truncate">
                  Learn • Practice • Grow
                </div>
              </div>
            )}
          </div>

          {/* Quick Collapse / Expand Button */}
          <button
            onClick={toggleSidebarCollapse}
            className="w-7 h-7 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-[#131C30] hover:bg-slate-200 dark:hover:bg-[#1B2742] text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer shrink-0"
            title={isSidebarCollapsed ? 'Perlebar Sidebar' : 'Ciutkan Sidebar'}
            aria-label="Toggle sidebar width"
          >
            {isSidebarCollapsed ? (
              <ChevronsRight className="w-4 h-4" />
            ) : (
              <ChevronsLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                title={isSidebarCollapsed ? item.label : undefined}
                className={`w-full flex items-center rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  isSidebarCollapsed
                    ? 'justify-center p-2.5'
                    : 'gap-3 px-3.5 py-2.5'
                } ${
                  isActive
                    ? 'bg-[#2D333F] text-white shadow-md shadow-black/20 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-[#131C30]'
                }`}
              >
                <Icon
                  className={`w-4.5 h-4.5 shrink-0 ${
                    isActive ? 'text-white' : 'text-slate-400'
                  }`}
                />
                {!isSidebarCollapsed && (
                  <span className="truncate">{item.label}</span>
                )}
              </button>
            );
          })}

          {/* Instructor & Admin Portal Link */}
          {(currentUser.role === 'instruktur' || currentUser.role === 'admin') && (
            <div className={`pt-2 mt-2 border-t border-slate-200 dark:border-[#1A2438] ${isSidebarCollapsed ? 'flex justify-center' : ''}`}>
              <button
                onClick={() => handleNavClick('instructor_panel')}
                title={isSidebarCollapsed ? (currentUser.role === 'admin' ? 'Admin Portal' : 'Panel Instruktur') : undefined}
                className={`w-full flex items-center rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  isSidebarCollapsed
                    ? 'justify-center p-2.5'
                    : 'gap-3 px-3.5 py-2.5'
                } ${
                  activeTab === 'instructor_panel'
                    ? 'bg-[#262B36] text-white shadow-md shadow-black/20 font-bold border border-slate-600'
                    : 'text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <LayoutDashboard className="w-4.5 h-4.5 shrink-0 text-slate-700 dark:text-slate-300" />
                {!isSidebarCollapsed && (
                  <span className="truncate">
                    {currentUser.role === 'admin' ? 'Admin Portal' : 'Panel Instruktur'}
                  </span>
                )}
              </button>
            </div>
          )}
        </nav>
      </div>

      {/* Bottom Section: Width Presets & Upgrade Pro Banner */}
      <div className="mt-6 space-y-3">
        {/* Quick Width Presets (When expanded) */}
        {!isSidebarCollapsed && sidebarWidth >= 200 && (
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#101728] border border-slate-200/80 dark:border-[#1E2940] flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
            <span className="font-bold flex items-center gap-1">
              <span>Lebar:</span>
              <span className="text-slate-900 dark:text-slate-200 font-extrabold">{sidebarWidth}px</span>
            </span>
            <div className="flex items-center gap-1">
              {presets.map((p) => (
                <button
                  key={p.label}
                  onClick={() => setSidebarWidth(p.width)}
                  className={`px-1.5 py-0.5 rounded-md transition-colors cursor-pointer ${
                    Math.abs(sidebarWidth - p.width) < 15
                      ? 'bg-[#2D333F] text-white font-bold'
                      : 'hover:bg-slate-200 dark:hover:bg-[#18233B]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
              <button
                onClick={handleResetWidth}
                title="Reset ukuran ke default 280px"
                className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-[#18233B] text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {/* Upgrade Pro Card / Icon */}
        {isSidebarCollapsed ? (
          <button
            onClick={() => setShowUpgradeModal(true)}
            title="Upgrade SKILLUP Pro"
            className="w-full p-2.5 rounded-xl bg-gradient-to-br from-[#2D333F] to-slate-800 text-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-black/20 cursor-pointer"
          >
            <Rocket className="w-4 h-4 text-amber-300" />
          </button>
        ) : (
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#262B36] via-[#2F3543] to-[#1C202A] p-4 text-white shadow-xl shadow-black/30 border border-slate-700/60">
            <div className="absolute -right-3 -bottom-3 opacity-20 pointer-events-none">
              <Rocket className="w-24 h-24 text-white" />
            </div>
            <div className="relative z-10">
              <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center mb-3">
                <Rocket className="w-4 h-4 text-amber-300" />
              </div>
              <h4 className="text-sm font-bold leading-snug">
                Jangan berhenti berkembang!
              </h4>
              <p className="text-[11px] text-slate-300 mt-1 mb-3 leading-relaxed line-clamp-2">
                Akses tanpa batas ke seluruh kelas dan konsultasi mentor 1-on-1.
              </p>
              <button
                onClick={() => setShowUpgradeModal(true)}
                className="w-full py-2 px-3 bg-white text-slate-900 font-bold text-xs rounded-xl shadow-xs hover:bg-slate-100 hover:shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Upgrade Pro</span>
                <span>→</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Draggable Resize Handle on the Right Border */}
      <div
        onMouseDown={handleMouseDown}
        onDoubleClick={handleResetWidth}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="absolute top-0 right-0 w-3 h-full cursor-col-resize group z-30 select-none flex items-center justify-center translate-x-1.5"
        title="Tarik untuk mengubah lebar sidebar (Double click untuk reset)"
      >
        {/* Subtle visual vertical bar on hover/drag */}
        <div
          className={`w-1 rounded-full transition-all duration-150 flex items-center justify-center ${
            isDragging
              ? 'bg-slate-500 h-full shadow-lg shadow-black/50 ring-2 ring-slate-500/40'
              : 'bg-transparent group-hover:bg-slate-500 group-hover:h-24 h-12'
          }`}
        >
          <GripVertical className="w-3 h-3 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Floating Width Indicator Tooltip while Dragging or Hovering */}
        {(isDragging || showTooltip) && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none px-2.5 py-1 rounded-lg bg-slate-900/90 text-white text-[11px] font-bold shadow-xl border border-slate-700/60 whitespace-nowrap flex items-center gap-1.5 backdrop-blur-xs z-50">
            <span>Lebar:</span>
            <span className="text-slate-200 font-mono">{sidebarWidth}px</span>
            <span className="text-[9px] text-slate-400 ml-0.5">• Geser</span>
          </div>
        )}
      </div>
    </aside>
  );
};
