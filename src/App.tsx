/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { HomeDashboard } from './components/dashboard/HomeDashboard';
import { CourseCatalog } from './components/courses/CourseCatalog';
import { CoursePlayer } from './components/classroom/CoursePlayer';
import { StudyPlanner } from './components/schedule/StudyPlanner';
import { CertificatesView } from './components/certificate/CertificatesView';
import { MentorHub } from './components/mentor/MentorHub';
import { InstructorPanel } from './components/instructor/InstructorPanel';
import { SettingsView } from './components/settings/SettingsView';
import { CertificateModal } from './components/certificate/CertificateModal';
import { UpgradeProModal } from './components/modals/UpgradeProModal';

const AppContent: React.FC = () => {
  const { activeTab, activeCourseId } = useApp();

  // If student opened a course, show the dedicated CoursePlayer Classroom view
  if (activeCourseId !== null) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#090D16] dark:text-[#F1F5F9] transition-colors duration-150">
        <CoursePlayer />
        <CertificateModal />
        <UpgradeProModal />
      </div>
    );
  }

  // Otherwise, render full standard layout with Sidebar + Header + Content
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#090D16] dark:text-[#F1F5F9] flex font-['Plus_Jakarta_Sans',sans-serif] transition-colors duration-150">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto max-h-screen">
        <Header />

        <main className="flex-1 p-5 sm:p-7 max-w-7xl w-full mx-auto">
          {activeTab === 'beranda' && <HomeDashboard />}
          {activeTab === 'kursus' && <CourseCatalog />}
          {activeTab === 'rencana' && <StudyPlanner />}
          {activeTab === 'sertifikat' && <CertificatesView />}
          {activeTab === 'komunitas' && <MentorHub />}
          {activeTab === 'pengaturan' && <SettingsView />}
          {activeTab === 'instructor_panel' && <InstructorPanel />}
        </main>
      </div>

      {/* Modals & Overlays */}
      <CertificateModal />
      <UpgradeProModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
