import React from 'react';
import { Star, Play, Bookmark, Clock, User } from 'lucide-react';
import { Course } from '../../types';
import { useApp } from '../../context/AppContext';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { openClassroom, savedCourses, toggleBookmark, getCourseProgress, isEnrolled } = useApp();
  const isBookmarked = savedCourses.includes(course.id);
  const enrolled = isEnrolled(course.id);
  const progress = getCourseProgress(course.id);

  // Render stylized thumbnail matching the showcase
  const renderThumbnail = () => {
    switch (course.thumbnail_icon) {
      case 'python':
        return (
          <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-[#1C2337] flex items-center justify-center p-2.5 transition-transform group-hover:scale-105 border border-slate-200 dark:border-[#2B3857]">
            <svg viewBox="0 0 128 128" className="w-10 h-10">
              <path
                fill="#38BDF8"
                d="M63.5 12.3c-23.7 0-22.2 10.3-22.2 10.3l.1 10.7h22.6v3.2H32.6S17 34.7 17 58.4c0 23.6 13.6 22.8 13.6 22.8h8.1v-11.4s-.4-13.6 13.3-13.6h22.8s12.9.2 12.9-12.6V25.2s1.8-12.9-24.2-12.9zm-13.3 6.9c2.4 0 4.4 2 4.4 4.4s-2 4.4-4.4 4.4-4.4-2-4.4-4.4 2-4.4 4.4-4.4z"
              />
              <path
                fill="#FBBF24"
                d="M64.5 115.7c23.7 0 22.2-10.3 22.2-10.3l-.1-10.7H64v-3.2h31.4s15.6 1.8 15.6-21.9c0-23.6-13.6-22.8-13.6-22.8h-8.1v11.4s.4 13.6-13.3 13.6H53.2s-12.9-.2-12.9 12.6v19.8s-1.8 12.9 24.2 12.9zm13.3-6.9c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4 4.4-2 4.4-4.4 4.4-4.4 4.4-4.4z"
              />
            </svg>
          </div>
        );
      case 'mysql':
        return (
          <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-[#1C2337] flex items-center justify-center p-2.5 transition-transform group-hover:scale-105 border border-slate-200 dark:border-[#2B3857]">
            <svg viewBox="0 0 64 64" className="w-10 h-10" fill="none">
              <rect x="12" y="10" width="40" height="14" rx="7" fill="#0284C7" />
              <rect x="12" y="25" width="40" height="14" rx="7" fill="#38BDF8" />
              <rect x="12" y="40" width="40" height="14" rx="7" fill="#0369A1" />
              <ellipse cx="32" cy="17" rx="14" ry="4" fill="#E0F2FE" opacity="0.6" />
            </svg>
          </div>
        );
      case 'react':
        return (
          <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-[#1C2337] flex items-center justify-center p-2.5 transition-transform group-hover:scale-105 border border-slate-200 dark:border-[#2B3857]">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-mono font-bold text-base shadow-sm">
              {'</>'}
            </div>
          </div>
        );
      case 'data':
        return (
          <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-[#1C2337] flex items-center justify-center p-2.5 transition-transform group-hover:scale-105 border border-slate-200 dark:border-[#2B3857]">
            <div className="flex items-end gap-1.5 h-8">
              <div className="w-2.5 h-3.5 bg-blue-400 rounded-t-sm" />
              <div className="w-2.5 h-5.5 bg-blue-500 rounded-t-sm" />
              <div className="w-2.5 h-7.5 bg-indigo-500 rounded-t-sm" />
            </div>
          </div>
        );
      case 'design':
        return (
          <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-[#1C2337] flex items-center justify-center p-2.5 transition-transform group-hover:scale-105 border border-slate-200 dark:border-[#2B3857]">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
          </div>
        );
      default:
        return (
          <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-[#1C2337] flex items-center justify-center p-2.5 transition-transform group-hover:scale-105 border border-slate-200 dark:border-[#2B3857]">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      onClick={() => openClassroom(course.id)}
      className="group bg-white dark:bg-[#101728] rounded-3xl p-5 border border-slate-200 dark:border-[#1E2940] shadow-sm hover:shadow-lg dark:shadow-xl hover:border-indigo-500/60 dark:hover:border-indigo-500/60 hover:bg-slate-50/50 dark:hover:bg-[#131D33] transition-all duration-300 flex flex-col justify-between cursor-pointer relative"
    >
      <div>
        {/* Top Header: Bookmark & Rating */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            {renderThumbnail()}
          </div>

          <div className="flex items-center gap-2">
            {/* Rating pill */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/40 text-amber-700 dark:text-amber-300 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{course.rating.toFixed(1)}</span>
            </div>

            {/* Bookmark button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(course.id);
              }}
              className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-600 dark:bg-indigo-600/30 dark:border-indigo-500 dark:text-indigo-400'
                  : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700 dark:bg-[#151D2F] dark:border-[#222E46] dark:text-slate-400 dark:hover:text-white'
              }`}
              title={isBookmarked ? 'Hapus dari Simpanan' : 'Simpan Kursus'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-indigo-600 dark:fill-indigo-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Course Title */}
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-[#5438FF] transition-colors line-clamp-1 mb-1.5">
          {course.title}
        </h3>

        {/* Instructor */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
          <User className="w-3.5 h-3.5 text-slate-400" />
          <span className="truncate">{course.instructor_name}</span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {course.description}
        </p>
      </div>

      <div>
        {/* Progress Bar (if enrolled) */}
        {enrolled && (
          <div className="mb-3.5 pt-1">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="font-semibold text-slate-500 dark:text-slate-400">
                {progress.percentage === 100 ? '🎉 Selesai' : `Progress: ${progress.done}/${progress.total} materi`}
              </span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400">{progress.percentage}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 dark:bg-[#1C263D] rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  progress.percentage === 100 ? 'bg-emerald-500' : 'bg-[#5438FF]'
                }`}
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Bottom Card Row: Duration, Level & Play Action Button */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-[#1C273C]">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{course.total_hours} Jam</span>
            <span>•</span>
            <span className="capitalize">{course.level}</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              openClassroom(course.id);
            }}
            className="w-9 h-9 rounded-full bg-[#5438FF] hover:bg-[#462bf3] text-white flex items-center justify-center shadow-md shadow-[#5438FF]/30 group-hover:scale-110 transition-transform cursor-pointer"
            title="Buka Kelas"
          >
            <Play className="w-4 h-4 fill-white ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
