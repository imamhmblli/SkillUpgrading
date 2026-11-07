import React, { useState } from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  BookOpen,
  Users,
  Video,
  Clock,
  CheckCircle,
  FileText,
  DollarSign,
  TrendingUp,
  Trash2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CourseLevel, Course } from '../../types';

export const InstructorPanel: React.FC = () => {
  const {
    currentUser,
    courses,
    lessons,
    createCourse,
    deleteCourse,
    addLesson,
    enrollments,
    progressList
  } = useApp();

  const [panelTab, setPanelTab] = useState<'courses' | 'create_course' | 'lessons' | 'statistics'>('courses');

  // New Course Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<'Programming' | 'Data Science' | 'Design' | 'Business'>('Programming');
  const [newLevel, setNewLevel] = useState<CourseLevel>('pemula');
  const [newPrice, setNewPrice] = useState<number>(0);
  const [newTotalHours, setNewTotalHours] = useState<number>(10);
  const [createSuccessMsg, setCreateSuccessMsg] = useState('');

  // Manage Lessons Form State
  const [selectedCourseId, setSelectedCourseId] = useState<number>(courses[0]?.id || 1);
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonContent, setLessonContent] = useState('');
  const [lessonVideoUrl, setLessonVideoUrl] = useState('');
  const [lessonDuration, setLessonDuration] = useState<number>(15);
  const [lessonOrder, setLessonOrder] = useState<number>(1);
  const [lessonSuccessMsg, setLessonSuccessMsg] = useState('');

  // Filter courses for this instructor (or show all if admin)
  const instructorCourses = currentUser.role === 'admin'
    ? courses
    : courses.filter((c) => c.instructor_id === currentUser.id || c.instructor_id === 2);

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    createCourse({
      title: newTitle.trim(),
      description: newDesc.trim() || 'Kursus praktis terstruktur dengan studi kasus nyata.',
      instructor_id: currentUser.id,
      category: newCategory,
      level: newLevel,
      price: Number(newPrice) || 0,
      rating: 4.8,
      total_hours: Number(newTotalHours) || 8,
      thumbnail_icon: newCategory === 'Data Science' ? 'data' : newCategory === 'Design' ? 'design' : 'react'
    });

    setCreateSuccessMsg(`Kursus "${newTitle}" berhasil dibuat!`);
    setNewTitle('');
    setNewDesc('');
    setNewPrice(0);

    setTimeout(() => {
      setCreateSuccessMsg('');
      setPanelTab('courses');
    }, 1500);
  };

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonTitle.trim()) return;

    addLesson({
      course_id: selectedCourseId,
      title: lessonTitle.trim(),
      content: lessonContent.trim() || 'Ringkasan materi dan langkah-langkah praktikum.',
      video_url: lessonVideoUrl.trim() || undefined,
      duration_minutes: Number(lessonDuration) || 15,
      order_num: Number(lessonOrder) || 1,
      code_language: 'python'
    });

    setLessonSuccessMsg(`Materi "${lessonTitle}" berhasil ditambahkan!`);
    setLessonTitle('');
    setLessonContent('');
    setLessonVideoUrl('');

    setTimeout(() => {
      setLessonSuccessMsg('');
    }, 2000);
  };

  const activeCourseForLessons = courses.find((c) => c.id === selectedCourseId);
  const courseLessonsList = lessons.filter((l) => l.course_id === selectedCourseId);

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-800 via-indigo-900 to-slate-900 rounded-3xl p-7 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300">
              {currentUser.role === 'admin' ? 'Administrator Console' : 'Instructor Management Portal'}
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight mt-1">
              Dashboard Instruktur & Kurikulum
            </h2>
            <p className="text-xs text-purple-200 mt-1">
              Kelola kursus, publikasikan silabus materi, dan evaluasi statistik kelulusan siswa secara komprehensif.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-purple-700/60 border border-purple-400/40 text-purple-100">
              👤 {currentUser.full_name} ({currentUser.role})
            </span>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 dark:border-[#1E2940] pb-2">
        <button
          onClick={() => setPanelTab('courses')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            panelTab === 'courses'
              ? 'bg-[#5438FF] text-white shadow-md shadow-[#5438FF]/30'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-[#131C30]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>1. Kursus Saya ({instructorCourses.length})</span>
        </button>

        <button
          onClick={() => setPanelTab('create_course')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            panelTab === 'create_course'
              ? 'bg-[#5438FF] text-white shadow-md shadow-[#5438FF]/30'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-[#131C30]'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>2. Buat Kursus Baru</span>
        </button>

        <button
          onClick={() => setPanelTab('lessons')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            panelTab === 'lessons'
              ? 'bg-[#5438FF] text-white shadow-md shadow-[#5438FF]/30'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-[#131C30]'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>3. Kelola Materi Kursus</span>
        </button>

        <button
          onClick={() => setPanelTab('statistics')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            panelTab === 'statistics'
              ? 'bg-[#5438FF] text-white shadow-md shadow-[#5438FF]/30'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-[#131C30]'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>4. Statistik Siswa</span>
        </button>
      </div>

      {/* Tab 1: Kursus Saya */}
      {panelTab === 'courses' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Daftar Kursus yang Anda Kelola
            </h3>
            <button
              onClick={() => setPanelTab('create_course')}
              className="px-3.5 py-1.5 rounded-xl bg-[#5438FF] text-white text-xs font-bold hover:bg-[#462bf3] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Tambah Kursus Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {instructorCourses.map((c) => {
              const cLessons = lessons.filter((l) => l.course_id === c.id);
              return (
                <div
                  key={c.id}
                  className="bg-white dark:bg-[#101728] rounded-3xl p-5 border border-slate-200 dark:border-[#1E2940] shadow-sm dark:shadow-xl flex flex-col justify-between transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                      <span className="uppercase">{c.category}</span>
                      <span className="capitalize px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#162035] text-slate-600 dark:text-slate-300">
                        Level: {c.level}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-base text-slate-900 dark:text-white mb-2">{c.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {c.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-[#1C273C] flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                        {cLessons.length} Materi Pembelajaran
                      </span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {c.price === 0 ? 'Gratis' : `Rp ${c.price.toLocaleString('id-ID')}`}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setSelectedCourseId(c.id);
                          setPanelTab('lessons');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#162035] hover:bg-slate-200 dark:hover:bg-[#1E2A45] text-indigo-700 dark:text-indigo-300 text-xs font-bold transition-colors cursor-pointer"
                      >
                        Kelola Materi
                      </button>
                      <button
                        onClick={() => deleteCourse(c.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                        title="Hapus Kursus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Buat Kursus Baru */}
      {panelTab === 'create_course' && (
        <div className="bg-white dark:bg-[#101728] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-[#1E2940] shadow-sm dark:shadow-xl max-w-2xl text-slate-900 dark:text-white transition-colors">
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-1">Form Buat Kursus Baru</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Publikasikan kurikulum baru ke direktori pembelajaran SKILLUP.
          </p>

          {createSuccessMsg && (
            <div className="p-3.5 mb-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-600/40 text-emerald-800 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{createSuccessMsg}</span>
            </div>
          )}

          <form onSubmit={handleCreateCourse} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Judul Kursus:</label>
              <input
                type="text"
                required
                placeholder="Contoh: Belajar Next.js 15 Full-Stack"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-[#141C30] border border-slate-200 dark:border-[#202E4A] rounded-xl text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Deskripsi:</label>
              <textarea
                rows={3}
                required
                placeholder="Jelaskan target pembelajaran dan apa yang akan dibuat oleh siswa."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-[#141C30] border border-slate-200 dark:border-[#202E4A] rounded-xl text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Kategori:</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#141C30] border border-slate-200 dark:border-[#202E4A] rounded-xl text-xs text-slate-900 dark:text-white"
                >
                  <option value="Programming">Programming</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Design">Design</option>
                  <option value="Business">Business</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Level (pemula/menengah/lanjutan):
                </label>
                <select
                  value={newLevel}
                  onChange={(e) => setNewLevel(e.target.value as CourseLevel)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#141C30] border border-slate-200 dark:border-[#202E4A] rounded-xl text-xs text-slate-900 dark:text-white"
                >
                  <option value="pemula">Pemula</option>
                  <option value="menengah">Menengah</option>
                  <option value="lanjutan">Lanjutan</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Harga (Rp, 0 = Gratis):
                </label>
                <input
                  type="number"
                  min="0"
                  step="10000"
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  className="w-full p-2.5 bg-[#141C30] border border-[#202E4A] rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Estimasi Jam:</label>
                <input
                  type="number"
                  min="1"
                  value={newTotalHours}
                  onChange={(e) => setNewTotalHours(Number(e.target.value))}
                  className="w-full p-2.5 bg-[#141C30] border border-[#202E4A] rounded-xl text-xs text-white"
                />
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3 bg-[#5438FF] hover:bg-[#462bf3] text-white font-bold text-xs rounded-xl shadow-md shadow-[#5438FF]/30 transition-colors"
              >
                Buat Kursus Sekarang
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 3: Kelola Materi Kursus */}
      {panelTab === 'lessons' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Select Course & View Existing Lessons */}
          <div className="lg:col-span-6 bg-white dark:bg-[#101728] rounded-3xl p-6 border border-slate-200 dark:border-[#1E2940] shadow-sm dark:shadow-xl space-y-4 transition-colors">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Pilih Kursus:</label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 dark:bg-[#141C30] border border-slate-200 dark:border-[#202E4A] rounded-xl text-xs font-bold text-slate-900 dark:text-white"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    [{c.id}] {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-2">
              <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Daftar Materi Saat Ini ({courseLessonsList.length})
              </h4>

              {courseLessonsList.length === 0 ? (
                <div className="p-6 text-center text-slate-400 text-xs">
                  Belum ada materi untuk kursus ini. Silakan tambahkan pada form di samping.
                </div>
              ) : (
                <div className="space-y-2">
                  {courseLessonsList.map((l) => (
                    <div
                      key={l.id}
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-[#141C30] border border-slate-200 dark:border-[#1E2940] flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white">
                          Pertemuan {l.order_num}: {l.title}
                        </span>
                        <span className="block text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          Durasi: {l.duration_minutes} menit
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-[#5438FF]/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-[#5438FF]/40">
                        Aktif
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Form Tambah Materi */}
          <div className="lg:col-span-6 bg-white dark:bg-[#101728] rounded-3xl p-6 border border-slate-200 dark:border-[#1E2940] shadow-sm dark:shadow-xl space-y-4 transition-colors">
            <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
              Tambah Materi Baru #{selectedCourseId}
            </h4>

            {lessonSuccessMsg && (
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-600/40 text-emerald-800 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{lessonSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleAddLesson} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Judul Materi:</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Instalasi Environment & Setup Editor"
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#141C30] border border-slate-200 dark:border-[#202E4A] rounded-xl text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Konten / Ringkasan:</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Isi pembahasan materi atau petunjuk pengerjaan."
                  value={lessonContent}
                  onChange={(e) => setLessonContent(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#141C30] border border-slate-200 dark:border-[#202E4A] rounded-xl text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  URL Video (Opsional):
                </label>
                <input
                  type="url"
                  placeholder="https://www.youtube.com/embed/..."
                  value={lessonVideoUrl}
                  onChange={(e) => setLessonVideoUrl(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#141C30] border border-slate-200 dark:border-[#202E4A] rounded-xl text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Urutan Materi:</label>
                  <input
                    type="number"
                    min="1"
                    value={lessonOrder}
                    onChange={(e) => setLessonOrder(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#141C30] border border-slate-200 dark:border-[#202E4A] rounded-xl text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Durasi (Menit):
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={lessonDuration}
                    onChange={(e) => setLessonDuration(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#141C30] border border-slate-200 dark:border-[#202E4A] rounded-xl text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#5438FF] hover:bg-[#462bf3] text-white font-bold text-xs rounded-xl shadow-md shadow-[#5438FF]/30 transition-colors cursor-pointer"
                >
                  Simpan & Publikasikan Materi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tab 4: Statistik Siswa (Matching SQL specification in PDF) */}
      {panelTab === 'statistics' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#101728] rounded-3xl p-6 border border-slate-200 dark:border-[#1E2940] shadow-sm dark:shadow-xl">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-1">
              Statistik Siswa & Tingkat Penyelesaian
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Pantau progress belajar tiap siswa per materi sesuai query relasional sistem.
            </p>

            <div className="space-y-6">
              {instructorCourses.map((c) => {
                const cLessons = lessons.filter((l) => l.course_id === c.id);
                // Simulated student enrollment data
                const studentsData = [
                  { name: 'Imam Hambali', status: 'aktif', completed: 3, total: cLessons.length || 5 },
                  { name: 'Ani Wijaya', status: 'selesai', completed: cLessons.length || 5, total: cLessons.length || 5 },
                  { name: 'Rizky Ramadhan', status: 'aktif', completed: 2, total: cLessons.length || 5 }
                ];

                return (
                  <div key={c.id} className="p-5 rounded-2xl bg-slate-50 dark:bg-[#141C30] border border-slate-200 dark:border-[#1E2940]">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {c.title} ({studentsData.length} Siswa Terdaftar)
                      </h4>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        Level: {c.level}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {studentsData.map((s, idx) => {
                        const pct = Math.round((s.completed / (s.total || 1)) * 100);
                        return (
                          <div
                            key={idx}
                            className="p-3 bg-white dark:bg-[#101728] rounded-xl border border-slate-200 dark:border-[#1E2940] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 dark:text-white">{s.name}</span>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  s.status === 'selesai'
                                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700/50'
                                    : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700/50'
                                }`}
                              >
                                [{s.status.toUpperCase()}]
                              </span>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="text-slate-500 dark:text-slate-400 font-medium">
                                {s.completed}/{s.total} Materi ({pct}%)
                              </span>
                              <div className="w-28 h-2 bg-slate-200 dark:bg-[#1C263D] rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${pct === 100 ? 'bg-emerald-500' : 'bg-[#5438FF]'}`}
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
