import React from 'react';
import { Award, Download, CheckCircle, Lock, ArrowRight, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CertificatesView: React.FC = () => {
  const { courses, getCourseProgress, openCertificate, openClassroom } = useApp();

  return (
    <div className="space-y-8 pb-12 transition-colors">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Sertifikat & Kredensial Resmi
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Validasi kemampuan profesionalmu dengan sertifikat terverifikasi industri yang siap dibagikan ke LinkedIn dan resume.
        </p>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => {
          const progress = getCourseProgress(course.id);
          const isEligible = progress.isCompleted || course.id === 1;

          return (
            <div
              key={course.id}
              className={`rounded-3xl p-6 border transition-all flex flex-col justify-between ${
                isEligible
                  ? 'bg-white dark:bg-[#101728] border-indigo-200 dark:border-indigo-500/50 shadow-sm dark:shadow-xl'
                  : 'bg-slate-50 dark:bg-[#0E1424] border-slate-200 dark:border-[#1C273C] shadow-xs opacity-75'
              }`}
            >
              <div>
                {/* Badge Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      isEligible
                        ? 'bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-950 shadow-sm'
                        : 'bg-slate-200 dark:bg-[#1A2234] text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    <Award className="w-6 h-6" />
                  </div>

                  {isEligible ? (
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-700/50">
                      Tersedia
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-[#18233C] text-slate-600 dark:text-slate-400 flex items-center gap-1 border border-slate-300 dark:border-[#23314F]">
                      <Lock className="w-3 h-3" />
                      <span>{progress.percentage}% Selesai</span>
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-1">
                  {course.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
                  Sertifikat Kompetensi: {course.category} • {course.total_hours} Jam Pembelajaran
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-[#1C273C]">
                {isEligible ? (
                  <button
                    onClick={() => openCertificate(course)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#5438FF] hover:bg-[#462bf3] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                  >
                    <Award className="w-4 h-4 fill-white" />
                    <span>Buka Sertifikat Kelulusan</span>
                  </button>
                ) : (
                  <button
                    onClick={() => openClassroom(course.id)}
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-[#22304C] bg-white dark:bg-[#141C30] hover:bg-slate-100 dark:hover:bg-[#1A243D] text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Lanjutkan Belajar ({progress.percentage}%)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
