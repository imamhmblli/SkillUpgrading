import React, { useState } from 'react';
import {
  Users,
  Calendar,
  Star,
  CheckCircle,
  Video,
  Clock,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Mentor } from '../../types';

export const MentorHub: React.FC = () => {
  const { mentors, mentorBookings, bookMentorSession } = useApp();

  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('2026-11-12');
  const [bookingNotes, setBookingNotes] = useState<string>('');
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  const handleOpenBooking = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setSelectedSlot(mentor.available_slots[0] || '19:00 WIB');
    setBookingNotes('');
    setBookingSuccess(false);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentor) return;

    bookMentorSession(
      selectedMentor.id,
      selectedDate,
      selectedSlot,
      bookingNotes || 'Konsultasi akselerasi karir dan bedah portofolio.'
    );
    setBookingSuccess(true);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#242A38] via-[#2F3647] to-[#1E232F] rounded-3xl p-8 text-white relative overflow-hidden shadow-xl border border-slate-700/50">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Bimbingan 1-on-1 Eksklusif</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Konsultasi Langsung dengan Mentor Industri
          </h2>
          <p className="text-sm text-slate-200 leading-relaxed">
            Dapatkan arahan karir, code review mendalam, dan simulasi technical interview langsung dari para praktisi senior top tech companies.
          </p>
        </div>
      </div>

      {/* Booked Sessions Overview */}
      {mentorBookings.length > 0 && (
        <div className="bg-white dark:bg-[#101728] rounded-3xl p-6 border border-slate-200 dark:border-[#1E2940] shadow-sm dark:shadow-xl transition-colors">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            <span>Jadwal Sesi Mentoring Aktif ({mentorBookings.length})</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mentorBookings.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-[#141C30] border border-slate-200 dark:border-[#1E2940] flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{b.mentorName}</div>
                  <div className="text-[11px] text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    <span>{b.date} • {b.timeSlot}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 pt-1 line-clamp-1">{b.notes}</p>
                </div>

                <div className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-700/50 text-[10px] font-extrabold shrink-0 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>Terkonfirmasi</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mentor List Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
            Daftar Mentor Tersedia
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {mentors.length} Mentor Aktif
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white dark:bg-[#101728] rounded-3xl p-6 border border-slate-200 dark:border-[#1E2940] shadow-sm dark:shadow-xl hover:border-slate-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Mentor Avatar & Role */}
                <div className="flex items-center gap-3.5 mb-4">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-400 dark:ring-slate-600"
                  />
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{mentor.name}</h4>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold">{mentor.role_title}</p>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{mentor.company}</div>
                  </div>
                </div>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-3 mb-3 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1 text-amber-700 dark:text-amber-300 font-bold bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-lg border border-amber-200 dark:border-amber-600/40">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{mentor.rating}</span>
                  </div>
                  <span>({mentor.reviews_count} sesi selesai)</span>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {mentor.bio}
                </p>

                {/* Expertise tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {mentor.expertise.map((exp) => (
                    <span
                      key={exp}
                      className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-[#162035] border border-slate-200 dark:border-[#22304F] px-2.5 py-1 rounded-lg"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action row */}
              <div className="pt-4 border-t border-slate-100 dark:border-[#1C273C] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Tarif Sesi 1 Jam</span>
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                    Rp {mentor.hourly_rate.toLocaleString('id-ID')}
                  </span>
                </div>

                <button
                  onClick={() => handleOpenBooking(mentor)}
                  className="px-4 py-2 bg-[#2D333F] hover:bg-[#20242D] text-white font-bold text-xs rounded-xl shadow-md shadow-black/20 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Jadwalkan</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#0F1626] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 dark:border-[#22304A] text-slate-900 dark:text-white relative">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-1">
              Jadwalkan Sesi Konsultasi
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
              Bersama {selectedMentor.name} ({selectedMentor.role_title})
            </p>

            {bookingSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-600/40 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Sesi Mentoring Berhasil Dipesan!
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  Tautan Google Meet dan pengingat kalender telah dikirim ke email akunmu.
                </p>
                <button
                  onClick={() => setSelectedMentor(null)}
                  className="px-6 py-2.5 bg-[#2D333F] text-white font-bold text-xs rounded-xl hover:bg-[#20242D] transition-colors cursor-pointer"
                >
                  Selesai
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitBooking} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Pilih Tanggal:
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#141C30] border border-slate-200 dark:border-[#22304A] rounded-xl text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Pilih Slot Jam:
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedMentor.available_slots.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-colors cursor-pointer ${
                          selectedSlot === slot
                            ? 'bg-slate-200 dark:bg-slate-800 border-slate-500 text-slate-900 dark:text-white font-bold'
                            : 'border-slate-200 dark:border-[#22304A] hover:bg-slate-50 dark:hover:bg-[#141C30] text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Topik yang ingin didiskusikan:
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Contoh: Diskusi arsitektur pipeline data, review resume, atau tips interview teknis."
                    value={bookingNotes}
                    onChange={(e) => setBookingNotes(e.target.value)}
                    className="w-full p-3 bg-slate-50 dark:bg-[#141C30] border border-slate-200 dark:border-[#22304A] rounded-xl text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-slate-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-[#1C273C]">
                  <button
                    type="button"
                    onClick={() => setSelectedMentor(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#141C30] cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#2D333F] hover:bg-[#20242D] text-white font-bold text-xs shadow-md shadow-black/20 cursor-pointer"
                  >
                    Konfirmasi Booking
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
