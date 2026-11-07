import React, { useState } from 'react';
import { Search, Filter, BookOpen, Layers } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CourseCard } from '../dashboard/CourseCard';
import { CategoryFilter } from '../dashboard/CategoryFilter';

export const CourseCatalog: React.FC = () => {
  const { courses, searchQuery, selectedCategory, isEnrolled, getCourseProgress } = useApp();

  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Filter courses based on search, category, level, and enrollment status
  const filteredCourses = courses.filter((c) => {
    // Search query match
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = c.title.toLowerCase().includes(q);
      const matchDesc = c.description.toLowerCase().includes(q);
      const matchInstructor = c.instructor_name.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchInstructor) return false;
    }

    // Category match
    if (selectedCategory !== 'Semua' && c.category !== selectedCategory) {
      return false;
    }

    // Level filter
    if (selectedLevel !== 'all' && c.level !== selectedLevel) {
      return false;
    }

    // Status filter
    if (selectedStatus === 'enrolled' && !isEnrolled(c.id)) {
      return false;
    }
    if (selectedStatus === 'completed') {
      const prog = getCourseProgress(c.id);
      if (!prog.isCompleted) return false;
    }

    return true;
  });

  return (
    <div className="space-y-8 pb-12 transition-colors">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Katalog Kursus Profesional
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Eksplorasi modul pembelajaran interaktif berstandar kurikulum industri teknologi.
        </p>
      </div>

      {/* Filter and Category Row */}
      <div className="space-y-4">
        <CategoryFilter />

        {/* Secondary filters (Level & Status) */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </div>

          {/* Level Filter */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-[#101728] rounded-xl border border-slate-200 dark:border-[#1E2940]">
            {['all', 'pemula', 'menengah', 'lanjutan'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
                  selectedLevel === lvl
                    ? 'bg-[#2D333F] text-white shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {lvl === 'all' ? 'Semua Level' : lvl}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-[#101728] rounded-xl border border-slate-200 dark:border-[#1E2940]">
            {[
              { id: 'all', label: 'Semua Status' },
              { id: 'enrolled', label: 'Diikuti' },
              { id: 'completed', label: 'Selesai' }
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedStatus(st.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  selectedStatus === st.id
                    ? 'bg-[#2D333F] text-white shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Course Grid */}
      {filteredCourses.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-[#101728] rounded-3xl border border-slate-200 dark:border-[#1E2940] space-y-3 shadow-xs">
          <BookOpen className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto" />
          <h4 className="text-base font-bold text-slate-900 dark:text-white">Tidak ada kursus yang cocok</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Coba ubah kata kunci pencarian atau sesuaikan filter level dan kategori di atas.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      )}
    </div>
  );
};
