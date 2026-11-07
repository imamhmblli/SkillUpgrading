import React from 'react';
import { Sparkles, ArrowRight, Lightbulb, PlayCircle, BarChart3 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HeroBanner: React.FC = () => {
  const { openClassroom } = useApp();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-100 p-8 sm:p-10 mb-8">
      {/* Subtle backdrop decorative circles */}
      <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 right-1/3 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left Column: Heading, Subtitle & Action Button */}
        <div className="md:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-indigo-100 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Platform Pembelajaran Karir No. 1</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white">
            Tingkatkan Skillmu <br className="hidden sm:inline" />
            Bersama <span className="text-amber-300">SKILLUP!</span>
          </h1>

          <p className="text-sm sm:text-base text-indigo-100 max-w-lg leading-relaxed font-normal">
            Akses ribuan materi pembelajaran berkualitas industri untuk masa depan yang lebih baik, dibimbing langsung oleh praktisi berpengalaman.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => openClassroom(1)} // Opens Python untuk Data Science
              className="group px-6 py-3.5 bg-white text-indigo-800 font-bold text-sm rounded-2xl shadow-lg shadow-indigo-900/20 hover:bg-indigo-50 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2"
            >
              <span>Mulai Belajar</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center gap-2 text-xs text-indigo-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>100% Interaktif & Bersertifikat</span>
            </div>
          </div>
        </div>

        {/* Right Column: High-fidelity Vector Illustration matching the showcase screenshot */}
        <div className="md:col-span-5 relative flex justify-center items-center">
          <div className="relative w-full max-w-[280px] aspect-4/3 flex items-center justify-center">
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-400/20 to-amber-300/20 rounded-full blur-xl" />

            {/* Floating Graphic Badges */}
            <div className="absolute -top-3 left-4 p-2.5 rounded-2xl bg-amber-400/20 backdrop-blur-md border border-amber-300/40 text-amber-300 shadow-lg animate-bounce duration-1000">
              <Lightbulb className="w-5 h-5" />
            </div>

            <div className="absolute top-2 right-2 p-2.5 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg">
              <PlayCircle className="w-5 h-5 text-indigo-200" />
            </div>

            <div className="absolute bottom-2 -right-2 p-2 rounded-xl bg-purple-500/30 backdrop-blur-md border border-purple-300/30 text-purple-200 shadow-lg">
              <BarChart3 className="w-4 h-4" />
            </div>

            {/* Central Student & Laptop Vector Illustration */}
            <svg
              className="w-full h-auto drop-shadow-2xl"
              viewBox="0 0 320 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Desk / Base */}
              <ellipse cx="160" cy="215" rx="130" ry="16" fill="rgba(255,255,255,0.12)" />

              {/* Student Body (Purple Hoodie) */}
              <path
                d="M100 220C100 170 120 150 160 150C200 150 220 170 220 220H100Z"
                fill="#312E81"
              />
              <path
                d="M125 150C125 150 140 170 160 170C180 170 195 150 195 150"
                stroke="#6366F1"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Student Face / Hair */}
              <circle cx="160" cy="115" r="28" fill="#FCD34D" />
              {/* Hair */}
              <path
                d="M135 110C135 90 150 82 170 82C188 82 192 92 192 105C186 100 176 100 168 103C155 107 142 106 135 110Z"
                fill="#1E1B4B"
              />
              {/* Friendly Eyes and Smile */}
              <circle cx="152" cy="116" r="2.5" fill="#1E1B4B" />
              <circle cx="168" cy="116" r="2.5" fill="#1E1B4B" />
              <path
                d="M156 126C158 129 162 129 164 126"
                stroke="#1E1B4B"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Modern Sleek Laptop */}
              <path
                d="M120 185L135 140H185L200 185H120Z"
                fill="#0F172A"
              />
              <rect
                x="133"
                y="143"
                width="54"
                height="36"
                rx="3"
                fill="#1E293B"
              />
              {/* Code lines on laptop screen */}
              <line x1="138" y1="151" x2="160" y2="151" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
              <line x1="138" y1="157" x2="175" y2="157" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" />
              <line x1="144" y1="163" x2="168" y2="163" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
              <line x1="138" y1="169" x2="154" y2="169" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" />

              {/* Laptop Keyboard Base */}
              <path
                d="M110 185H210L220 200H100L110 185Z"
                fill="#475569"
              />
              <rect x="145" y="190" width="30" height="4" rx="2" fill="#94A3B8" />

              {/* Coffee Cup / Learning accessory */}
              <rect x="228" y="180" width="16" height="20" rx="3" fill="#F8FAFC" />
              <path d="M244 184H248C250 184 251 186 251 188V192C251 194 250 196 248 196H244" stroke="#F8FAFC" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
