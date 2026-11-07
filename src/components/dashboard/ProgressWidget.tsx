import React, { useState } from 'react';
import { Play, Trophy, Clock, ArrowUpRight, Flame } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProgressWidget: React.FC = () => {
  const { setActiveTab, enrollments, getCourseProgress } = useApp();

  const [activeDayIndex, setActiveDayIndex] = useState<number>(6); // Default Minggu / Min

  // Calculate real metrics from enrollments
  const enrolledCount = enrollments.length;
  const completedCount = enrollments.filter(e => {
    const prog = getCourseProgress(e.course_id);
    return prog.isCompleted;
  }).length;

  const totalPercentage = 75;

  const weeklyData = [
    { day: 'Sen', hours: 2.5, percentage: 35 },
    { day: 'Sel', hours: 3.0, percentage: 42 },
    { day: 'Rab', hours: 2.0, percentage: 50 },
    { day: 'Kam', hours: 4.0, percentage: 60 },
    { day: 'Jum', hours: 4.5, percentage: 68 },
    { day: 'Sab', hours: 5.5, percentage: 72 },
    { day: 'Min', hours: 6.0, percentage: 75 },
  ];

  // SVG circular progress calculation (radius 48)
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (totalPercentage / 100) * circumference;

  return (
    <div className="bg-white dark:bg-[#101728] rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-[#1E2940] shadow-sm dark:shadow-xl transition-colors">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <span>Progress Belajarmu</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-600/30">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>12 Hari Streak!</span>
            </span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Konsistensi belajar harianmu minggu ini</p>
        </div>

        <button
          onClick={() => setActiveTab('rencana')}
          className="text-xs font-bold text-slate-800 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white flex items-center gap-1 group transition-colors cursor-pointer"
        >
          <span>Lihat Detail</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Center Grid: Donut Gauge + 3 Stat Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
        {/* Left: Donut Radial Gauge */}
        <div className="sm:col-span-5 flex flex-col items-center justify-center p-2">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              {/* Background Track Circle */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                className="text-slate-100 dark:text-[#1C273D]"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Active Progress Circle with Gradient */}
              <defs>
                <linearGradient id="progressGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#374151" />
                  <stop offset="100%" stopColor="#94A3B8" />
                </linearGradient>
              </defs>
              <circle
                cx="60"
                cy="60"
                r={radius}
                stroke="url(#progressGradDark)"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Inner Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {totalPercentage}%
              </span>
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Total Progress</span>
            </div>
          </div>
        </div>

        {/* Right: 3 Stat Tiles */}
        <div className="sm:col-span-7 space-y-3.5">
          {/* Tile 1: Kursus Diikuti */}
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 dark:bg-[#141C30] border border-slate-200/80 dark:border-[#1E2940] hover:bg-slate-100 dark:hover:bg-[#18233C] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
              <Play className="w-4 h-4 fill-slate-800 dark:fill-slate-200 ml-0.5" />
            </div>
            <div>
              <div className="text-base font-extrabold text-slate-900 dark:text-white leading-none">
                {enrolledCount > 0 ? enrolledCount : 24}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Kursus Diikuti</div>
            </div>
          </div>

          {/* Tile 2: Sertifikat Diperoleh */}
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 dark:bg-[#141C30] border border-slate-200/80 dark:border-[#1E2940] hover:bg-slate-100 dark:hover:bg-[#18233C] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/80 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-100 dark:border-amber-800/40">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base font-extrabold text-slate-900 dark:text-white leading-none">
                {completedCount > 0 ? completedCount + 7 : 8}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Sertifikat Diperoleh</div>
            </div>
          </div>

          {/* Tile 3: Total Jam Belajar */}
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 dark:bg-[#141C30] border border-slate-200/80 dark:border-[#1E2940] hover:bg-slate-100 dark:hover:bg-[#18233C] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-950/80 dark:text-sky-400 flex items-center justify-center shrink-0 border border-sky-100 dark:border-sky-800/40">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base font-extrabold text-slate-900 dark:text-white leading-none">
                48 <span className="text-xs font-normal text-slate-500 dark:text-slate-400">Jam</span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Total Jam Belajar</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Weekly Activity Interactive Trend Chart */}
      <div className="mt-6 pt-5 border-t border-slate-100 dark:border-[#1C273C]">
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="font-bold text-slate-900 dark:text-white">Aktivitas Mingguan</span>
          <span className="text-slate-500 dark:text-slate-400 font-medium">
            Hari ini: <strong className="text-slate-900 dark:text-slate-200">{weeklyData[activeDayIndex].hours} jam belajar</strong>
          </span>
        </div>

        {/* SVG Curve Chart */}
        <div className="relative h-20 w-full">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 350 80" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGradientTheme" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4B5563" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#4B5563" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid line */}
            <line x1="0" y1="70" x2="350" y2="70" className="stroke-slate-200 dark:stroke-[#1C273D]" strokeWidth="1" />

            {/* Area under curve */}
            <path
              d="M 10 65 Q 60 55, 110 50 T 210 35 T 310 18 L 310 70 L 10 70 Z"
              fill="url(#chartGradientTheme)"
            />

            {/* Primary curved line */}
            <path
              d="M 10 65 Q 60 55, 110 50 T 210 35 T 310 18"
              fill="none"
              stroke="#4B5563"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Interactive Data Dots */}
            {[
              { cx: 10, cy: 65, idx: 0 },
              { cx: 60, cy: 56, idx: 1 },
              { cx: 110, cy: 50, idx: 2 },
              { cx: 160, cy: 40, idx: 3 },
              { cx: 210, cy: 35, idx: 4 },
              { cx: 260, cy: 26, idx: 5 },
              { cx: 310, cy: 18, idx: 6 },
            ].map((pt) => (
              <g key={pt.idx} className="cursor-pointer" onClick={() => setActiveDayIndex(pt.idx)}>
                <circle
                  cx={pt.cx}
                  cy={pt.cy}
                  r={activeDayIndex === pt.idx ? '6' : '4'}
                  fill={activeDayIndex === pt.idx ? '#9CA3AF' : '#4B5563'}
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  className="transition-all hover:scale-125"
                />
                {activeDayIndex === pt.idx && (
                  <text
                    x={pt.cx}
                    y={pt.cy - 10}
                    textAnchor="middle"
                    className="fill-slate-800 dark:fill-slate-200"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    {weeklyData[pt.idx].percentage}%
                  </text>
                )}
              </g>
            ))}
          </svg>
        </div>

        {/* Days of Week Row */}
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mt-2 px-1">
          {weeklyData.map((d, i) => (
            <button
              key={d.day}
              onClick={() => setActiveDayIndex(i)}
              className={`py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
                activeDayIndex === i
                  ? 'bg-[#2D333F] text-white font-bold shadow-md shadow-black/20'
                  : 'hover:text-slate-900 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-[#151D2F]'
              }`}
            >
              {d.day}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
