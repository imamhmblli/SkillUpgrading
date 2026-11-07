import React, { useRef } from 'react';
import { Award, Download, X, CheckCircle, Share2, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';

export const CertificateModal: React.FC = () => {
  const {
    showCertificateModal,
    certificateCourse,
    closeCertificate,
    currentUser
  } = useApp();

  const certRef = useRef<HTMLDivElement>(null);

  if (!showCertificateModal || !certificateCourse) return null;

  const issueDate = '6 November 2026';
  const certId = `SKL-2026-${certificateCourse.title.substring(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const handlePrint = () => {
    window.print();
  };

  const handleTriggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={closeCertificate}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-600 hover:text-slate-900 flex items-center justify-center shadow-md transition-all no-print"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Printable Canvas (matching bottom-right mockup) */}
        <div
          ref={certRef}
          className="relative bg-white text-slate-800 p-8 sm:p-12 text-center overflow-hidden flex flex-col items-center justify-between min-h-[460px] border-8 border-slate-200"
        >
          {/* Top Wavy Scallop Header Background matching mockup */}
          <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-r from-[#242A38] via-[#2F3647] to-[#1E232F] pointer-events-none">
            {/* Scallop wave curve overlay */}
            <svg
              className="absolute bottom-0 w-full text-white"
              viewBox="0 0 1440 320"
              fill="currentColor"
            >
              <path d="M0,192L60,197.3C120,203,240,213,360,197.3C480,181,600,139,720,138.7C840,139,960,181,1080,192C1200,203,1320,181,1380,170.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
            </svg>

            {/* Confetti / stars shapes */}
            <div className="absolute top-4 left-10 w-2.5 h-2.5 rounded-full bg-amber-300 opacity-70 animate-pulse" />
            <div className="absolute top-10 right-16 w-3 h-3 rotate-45 bg-amber-400 opacity-60" />
            <div className="absolute top-12 left-1/4 w-2 h-4 rotate-12 bg-slate-300 opacity-60" />
            <div className="absolute top-6 right-1/4 w-3 h-3 rounded-full bg-amber-400 opacity-70" />
          </div>

          {/* Golden Medal Ribbon Seal (matching bottom-right mockup) */}
          <div className="relative z-10 -mt-2 mb-4">
            <div className="relative flex items-center justify-center">
              {/* Gold Medal Outer Ring */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 p-1.5 shadow-xl shadow-amber-500/20 flex items-center justify-center">
                <div className="w-full h-full rounded-full border-2 border-dashed border-amber-600/40 flex items-center justify-center bg-gradient-to-b from-amber-300 to-yellow-400 text-amber-900">
                  <Award className="w-10 h-10 fill-amber-500 text-amber-800" />
                </div>
              </div>
              {/* Ribbon tails below medal */}
              <div className="absolute -bottom-4 flex gap-1 z-0">
                <div className="w-3.5 h-6 bg-rose-600 transform -rotate-12 rounded-b-xs" />
                <div className="w-3.5 h-6 bg-rose-700 transform rotate-12 rounded-b-xs" />
              </div>
            </div>
          </div>

          {/* Certificate Main Text */}
          <div className="relative z-10 space-y-3 mt-3 max-w-md">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Sertifikat Kelulusan
            </h2>

            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
              Diberikan kepada:
            </p>

            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-serif tracking-wide border-b-2 border-slate-300 pb-2">
              {currentUser.full_name}
            </div>

            <p className="text-xs text-slate-500 leading-relaxed pt-1">
              Atas keberhasilannya menyelesaikan seluruh modul dan evaluasi kursus:
            </p>

            <div className="text-lg sm:text-xl font-bold text-slate-900">
              {certificateCourse.title}
            </div>
          </div>

          {/* Certificate Footer: Date, Signature & SKILLUP Brand */}
          <div className="relative z-10 w-full pt-8 mt-6 border-t border-slate-100 flex items-end justify-between text-left text-xs text-slate-500">
            <div>
              <div className="text-[11px] text-slate-400 font-medium">Tanggal Kelulusan:</div>
              <div className="font-bold text-slate-800">{issueDate}</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">ID: {certId}</div>
            </div>

            {/* Signature Area */}
            <div className="text-center">
              <div className="font-serif italic text-base text-slate-900 font-bold tracking-wider mb-1">
                {certificateCourse.instructor_name.split(',')[0]}
              </div>
              <div className="w-24 h-0.5 bg-slate-300 mx-auto mb-1" />
              <div className="text-[10px] font-bold text-slate-600">Lead Instructor</div>
            </div>

            {/* Logo Lockup */}
            <div className="flex items-center gap-2">
              <img
                src="/assets/aistudio/skillup_logo_clean.png"
                alt="SKILLUP Logo"
                className="h-8 w-auto object-contain drop-shadow-sm"
              />
              <div className="text-left leading-none">
                <span className="font-extrabold text-sm tracking-tight text-slate-900">
                  SKILLUP
                </span>
                <span className="text-[9px] block text-slate-400">Verified Certificate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Bar */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 no-print">
          <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Kredensial Resmi Terverifikasi</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-white text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak</span>
            </button>

            {/* Download Certificate Button (matching bottom-right mockup: Download Sertifikat) */}
            <button
              onClick={() => {
                handleTriggerConfetti();
                handlePrint();
              }}
              className="px-5 py-2.5 rounded-xl bg-[#2D333F] hover:bg-[#20242D] text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-md shadow-black/20 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Sertifikat</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
