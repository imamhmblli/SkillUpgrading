import React from 'react';
import { X, Rocket, Check, Sparkles, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';

export const UpgradeProModal: React.FC = () => {
  const { showUpgradeModal, setShowUpgradeModal } = useApp();

  if (!showUpgradeModal) return null;

  const handleUpgrade = () => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });
    alert('🎉 Selamat! Anda telah berhasil upgrade ke SKILLUP Pro Membership!');
    setShowUpgradeModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#101728] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-[#1E2940] p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        <button
          onClick={() => setShowUpgradeModal(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#18233C] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#242A38] via-[#2F3647] to-[#1E232F] border border-slate-700/60 flex items-center justify-center mx-auto shadow-lg shadow-black/20">
            <Rocket className="w-8 h-8 text-amber-300" />
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            SKILLUP Pro Membership
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
            Akselerasi percepatan karir dengan akses tanpa batas ke semua kursus premium dan bimbingan mentor 1-on-1 prioritas.
          </p>
        </div>

        {/* Benefits list */}
        <div className="space-y-3 my-6 bg-slate-50 dark:bg-[#141C30] p-4 rounded-2xl border border-slate-100 dark:border-[#1E2940]">
          {[
            'Akses tanpa batas ke 120+ kursus industri terakreditasi',
            'Sesi konsultasi 1-on-1 bersama Lead Tech Mentor per bulan',
            'Code review personal & bedah portofolio siap lamar',
            'Sertifikat kelulusan fisik & digital ber-verifikasi blockchain',
            'Akses ke komunitas alumni & bursa lowongan kerja eksklusif'
          ].map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        {/* Price & CTA */}
        <div className="text-center space-y-3">
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            Rp 99.000 <span className="text-xs font-normal text-slate-400">/ bulan (Tagihan Tahunan)</span>
          </div>

          <button
            onClick={handleUpgrade}
            className="w-full py-3 rounded-xl bg-[#2D333F] hover:bg-[#20242D] text-white font-extrabold text-xs shadow-md shadow-black/20 transition-all cursor-pointer"
          >
            Mulai Upgrade Pro Sekarang
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Garansi 14 hari uang kembali tanpa syarat</span>
          </div>
        </div>
      </div>
    </div>
  );
};
