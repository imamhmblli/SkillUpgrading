import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Circle,
  Plus,
  Flame,
  Clock,
  Target,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudyPlanner: React.FC = () => {
  const { schedule, toggleScheduleItem, courses, openClassroom } = useApp();

  const [weeklyGoalHours] = useState(10);
  const currentCompletedHours = 7.5;

  return (
    <div className="space-y-8 pb-12 transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Rencana & Jadwal Belajar
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Atur rutinitas belajarmu secara teratur untuk mencapai target karir impian.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-600/40 text-amber-700 dark:text-amber-300 text-xs font-bold self-start">
          <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
          <span>12 Hari Belajar Beruntun! Pertahankan ritmemu!</span>
        </div>
      </div>

      {/* Target Progress Card */}
      <div className="bg-white dark:bg-[#101728] rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-[#1E2940] shadow-sm dark:shadow-xl transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="space-y-1">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <Target className="w-4 h-4" />
              <span>Target Jam Mingguan</span>
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {currentCompletedHours} / {weeklyGoalHours} <span className="text-sm font-normal text-slate-500 dark:text-slate-400">Jam Selesai</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Tersisa 2.5 jam lagi untuk mencapai target mingguanmu.</p>
          </div>

          <div className="md:col-span-2 space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
              <span>Pencapaian Target</span>
              <span className="text-indigo-600 dark:text-indigo-400">75%</span>
            </div>
            <div className="w-full h-3 bg-slate-100 dark:bg-[#1C263D] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-[#5438FF] rounded-full transition-all duration-700"
                style={{ width: '75%' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Items List */}
      <div className="bg-white dark:bg-[#101728] rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-[#1E2940] shadow-sm dark:shadow-xl space-y-4 transition-colors">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-[#1E2940]">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Agenda Pembelajaran Pekan Ini</span>
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
            {schedule.filter(s => s.completed).length} dari {schedule.length} Selesai
          </span>
        </div>

        <div className="space-y-3">
          {schedule.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                item.completed
                  ? 'bg-slate-100/60 dark:bg-[#0E1524]/60 border-slate-200 dark:border-[#1A2336] opacity-60'
                  : 'bg-slate-50 dark:bg-[#141C30] border-slate-200 dark:border-[#1E2940] hover:border-indigo-500/40 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <button
                  onClick={() => toggleScheduleItem(item.id)}
                  className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  {item.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>

                <div>
                  <div className={`text-sm font-bold ${item.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                    {item.topic}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">{item.day}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {item.time}
                    </span>
                    <span>•</span>
                    <span className="text-slate-600 dark:text-slate-300">{item.course_title}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => openClassroom(1)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#1C263D] dark:hover:bg-[#23314F] border border-slate-200 dark:border-[#2B3B5C] text-indigo-700 dark:text-indigo-300 text-xs font-bold transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Buka Kelas</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
