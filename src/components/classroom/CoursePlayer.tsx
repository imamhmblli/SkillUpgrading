import React, { useState } from 'react';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  CheckCircle,
  Circle,
  Play,
  Pause,
  Volume2,
  Subtitles,
  Settings,
  Maximize2,
  Lock,
  MessageSquare,
  Award,
  BookOpen,
  Send,
  HelpCircle,
  Check,
  ChevronRight,
  ChevronLeft,
  Code2,
  Video
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { InteractiveCodeEditor } from './InteractiveCodeEditor';

export const CoursePlayer: React.FC = () => {
  const {
    activeCourseId,
    activeLessonId,
    setActiveLessonId,
    closeClassroom,
    courses,
    lessons,
    markLesson,
    progressList,
    savedCourses,
    toggleBookmark,
    enrollments,
    currentUser,
    quizzes,
    completedQuizzes,
    submitQuizScore,
    discussions,
    addDiscussion,
    openCertificate
  } = useApp();

  // Active course & lesson
  const course = courses.find((c) => c.id === activeCourseId);
  const courseLessons = lessons.filter((l) => l.course_id === activeCourseId);
  const currentLesson = courseLessons.find((l) => l.id === activeLessonId) || courseLessons[0];

  const [activeTab, setActiveTab] = useState<'materi' | 'diskusi' | 'quiz'>('materi');
  const [playerMode, setPlayerMode] = useState<'code' | 'video'>('code');

  // Simulated Video Player Controls
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressSec, setProgressSec] = useState(0);
  const totalSec = (currentLesson?.duration_minutes || 10) * 60;

  // Discussion state
  const [commentText, setCommentText] = useState('');

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  if (!course) return null;

  const userEnrollment = enrollments.find(
    (e) => e.course_id === course.id && e.user_id === currentUser.id
  );
  const enrollmentId = userEnrollment ? userEnrollment.id : 1;

  // Check completion for current lesson
  const isCurrentLessonCompleted = progressList.some(
    (p) => p.enrollment_id === enrollmentId && p.lesson_id === currentLesson?.id && p.is_completed
  );

  const completedCount = courseLessons.filter((l) =>
    progressList.some(
      (p) => p.enrollment_id === enrollmentId && p.lesson_id === l.id && p.is_completed
    )
  ).length;

  const isCourseFullyCompleted =
    courseLessons.length > 0 && completedCount === courseLessons.length;

  const handleToggleCompletion = () => {
    if (!currentLesson) return;
    const nextState = !isCurrentLessonCompleted;
    markLesson(course.id, currentLesson.id, nextState);

    // If completing the last lesson, celebrate!
    if (nextState && completedCount + 1 >= courseLessons.length) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleNextLesson = () => {
    const currentIndex = courseLessons.findIndex((l) => l.id === currentLesson.id);
    if (currentIndex < courseLessons.length - 1) {
      setActiveLessonId(courseLessons[currentIndex + 1].id);
      setIsPlaying(false);
      setProgressSec(0);
    }
  };

  const handlePrevLesson = () => {
    const currentIndex = courseLessons.findIndex((l) => l.id === currentLesson.id);
    if (currentIndex > 0) {
      setActiveLessonId(courseLessons[currentIndex - 1].id);
      setIsPlaying(false);
      setProgressSec(0);
    }
  };

  const handleSendDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addDiscussion(course.id, commentText.trim());
    setCommentText('');
  };

  const courseQuiz = quizzes[course.id];
  const previousQuizResult = completedQuizzes[course.id];

  const handleQuizSubmit = () => {
    if (!courseQuiz) return;
    let correct = 0;
    courseQuiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });

    const calculatedScore = Math.round((correct / courseQuiz.questions.length) * 100);
    const passed = calculatedScore >= courseQuiz.passingScore;
    submitQuizScore(course.id, calculatedScore, passed);
    setQuizSubmitted(true);

    if (passed) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    }
  };

  const isBookmarked = savedCourses.includes(course.id);

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="bg-slate-50 dark:bg-[#090D16] min-h-screen pb-12 text-slate-900 dark:text-[#F1F5F9] transition-colors">
      {/* Top Classroom Bar */}
      <div className="bg-white dark:bg-[#0B101D] border-b border-slate-200 dark:border-[#1A2438] px-6 py-4 sticky top-0 z-20 flex items-center justify-between gap-4 transition-colors">
        <div className="flex items-center gap-3">
          <button
            onClick={closeClassroom}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#151E33] transition-colors cursor-pointer"
            title="Kembali ke Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white leading-tight">
              {course.title}
            </h1>
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <span>{currentLesson?.title}</span>
              <span>•</span>
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                {completedCount}/{courseLessons.length} Materi Selesai
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => toggleBookmark(course.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              isBookmarked
                ? 'bg-[#5438FF] text-white shadow-sm'
                : 'bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200 dark:bg-[#151E33] dark:border-[#202E4A] dark:text-slate-300 dark:hover:text-white dark:hover:bg-[#1B2742]'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-white' : ''}`} />
            <span>Simpan Materi</span>
          </button>

          {isCourseFullyCompleted && (
            <button
              onClick={() => openCertificate(course)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Award className="w-3.5 h-3.5 fill-white" />
              <span>Lihat Sertifikat</span>
            </button>
          )}

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: course.title, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Tautan kursus berhasil disalin!');
              }
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#151E33] transition-colors"
            title="Bagikan Kursus"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Classroom Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Interactive Code Sandbox / Video Player */}
          <div className="lg:col-span-8 space-y-4">
            {/* Mode Switcher (Code Sandbox vs Video Tutorial) */}
            <div className="flex items-center justify-between bg-white dark:bg-[#101728] rounded-2xl p-2 border border-slate-200 dark:border-[#1E2940] transition-colors shadow-xs">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPlayerMode('code')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    playerMode === 'code'
                      ? 'bg-[#5438FF] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-[#162035]'
                  }`}
                >
                  <Code2 className="w-4 h-4" />
                  <span>Interactive Code Player</span>
                </button>
                <button
                  onClick={() => setPlayerMode('video')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    playerMode === 'video'
                      ? 'bg-[#5438FF] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-[#162035]'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>Video Materi</span>
                </button>
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 hidden sm:flex items-center gap-2 font-medium">
                <span>Modul {currentLesson?.order_num}</span>
                <span>•</span>
                <span>{currentLesson?.duration_minutes} Menit</span>
              </div>
            </div>

            {/* Stage: Interactive Code Sandbox or Video Player */}
            {playerMode === 'code' ? (
              <div className="min-h-[420px] bg-[#0D1117] rounded-3xl overflow-hidden shadow-xl border border-slate-800">
                <InteractiveCodeEditor
                  initialCode={
                    currentLesson?.code_snippet ||
                    `import pandas as pd\nimport matplotlib.pyplot as plt\n\n# Load dataset\ndf = pd.read_csv('data.csv')\nprint(df.head())`
                  }
                  expectedOutput={currentLesson?.expected_output}
                  language={currentLesson?.code_language || 'python'}
                />
              </div>
            ) : (
              <div className="relative aspect-video bg-black rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between p-4 group">
                {/* Mock Video Stream / YouTube iframe embed or simulated video screen */}
                {currentLesson?.video_url ? (
                  <iframe
                    src={`${currentLesson.video_url}?autoplay=0&rel=0`}
                    title={currentLesson.title}
                    className="absolute inset-0 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900 text-white">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-16 h-16 rounded-full bg-indigo-600/90 hover:bg-indigo-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-8 h-8 fill-white" /> : <Play className="w-8 h-8 fill-white ml-1" />}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Lesson Navigation & Completion Action Bar */}
            <div className="bg-white dark:bg-[#101728] rounded-2xl p-4 border border-slate-200 dark:border-[#1E2940] flex flex-wrap items-center justify-between gap-3 shadow-xs transition-colors">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevLesson}
                  className="px-3 py-2 rounded-xl border border-slate-200 dark:border-[#202E4A] hover:bg-slate-100 dark:hover:bg-[#18233C] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>
                <button
                  onClick={handleNextLesson}
                  className="px-3 py-2 rounded-xl border border-slate-200 dark:border-[#202E4A] hover:bg-slate-100 dark:hover:bg-[#18233C] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Selanjutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Mark Lesson Complete Button */}
              <button
                onClick={handleToggleCompletion}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer ${
                  isCurrentLessonCompleted
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                    : 'bg-[#5438FF] text-white hover:bg-[#462bf3]'
                }`}
              >
                {isCurrentLessonCompleted ? (
                  <>
                    <CheckCircle className="w-4 h-4 fill-white text-emerald-500" />
                    <span>✓ Ditandai Selesai</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4" />
                    <span>Tandai Selesai Modul Ini</span>
                  </>
                )}
              </button>
            </div>

            {/* Lesson Text Content */}
            <div className="bg-white dark:bg-[#101728] rounded-3xl p-6 border border-slate-200 dark:border-[#1E2940] shadow-xs transition-colors">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">
                {currentLesson?.title}
              </h2>
              <div className="prose dark:prose-invert max-w-none text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                {currentLesson?.content}
              </div>
            </div>
          </div>

          {/* Right Column: Tabbed Deck matching the bottom-left mockup */}
          <div className="lg:col-span-4 bg-white dark:bg-[#101728] rounded-3xl p-5 border border-slate-200 dark:border-[#1E2940] shadow-xs space-y-4 transition-colors">
            {/* Tab Buttons: [Materi] [Diskusi] [Quiz] */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-[#090D16] border border-slate-200 dark:border-[#1C273C] rounded-2xl">
              <button
                onClick={() => setActiveTab('materi')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  activeTab === 'materi'
                    ? 'bg-[#5438FF] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                Materi
              </button>
              <button
                onClick={() => setActiveTab('diskusi')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all relative ${
                  activeTab === 'diskusi'
                    ? 'bg-[#5438FF] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Diskusi
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  activeTab === 'quiz'
                    ? 'bg-[#5438FF] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Quiz
              </button>
            </div>

            {/* Tab 1: Materi (Lessons Playlist) */}
            {activeTab === 'materi' && (
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1 flex items-center justify-between">
                  <span>Daftar Materi Pembelajaran</span>
                  <span className="text-indigo-400 font-bold">
                    {Math.round((completedCount / courseLessons.length) * 100)}%
                  </span>
                </div>

                {courseLessons.map((lesson) => {
                  const isCurrent = lesson.id === currentLesson?.id;
                  const isDone = progressList.some(
                    (p) =>
                      p.enrollment_id === enrollmentId &&
                      p.lesson_id === lesson.id &&
                      p.is_completed
                  );

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => {
                        setActiveLessonId(lesson.id);
                        setIsPlaying(false);
                      }}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        isCurrent
                          ? 'bg-indigo-50 border-[#5438FF] text-indigo-900 font-bold dark:bg-[#5438FF]/20 dark:border-[#5438FF] dark:text-white shadow-xs'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700 dark:bg-[#141C30] dark:border-[#1E2940] dark:hover:bg-[#18233C] dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                            isDone
                              ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/80 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-600/40'
                              : isCurrent
                              ? 'bg-[#5438FF] text-white'
                              : 'bg-slate-200 dark:bg-[#090D16] text-slate-500'
                          }`}
                        >
                          {isDone ? (
                            <Check className="w-4 h-4 stroke-[3]" />
                          ) : isCurrent ? (
                            <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                          ) : (
                            <Lock className="w-3.5 h-3.5" />
                          )}
                        </div>

                        <div>
                          <div className="text-xs font-bold line-clamp-1">{lesson.title}</div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                            {lesson.duration_minutes} menit
                          </div>
                        </div>
                      </div>

                      {isDone && (
                        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-300 dark:border-emerald-700/40">
                          Selesai
                        </span>
                      )}
                    </button>
                  );
                })}

                {/* Celebration when completed */}
                {isCourseFullyCompleted && (
                  <div className="p-4 rounded-2xl bg-amber-50 dark:bg-[#1A162B] border border-amber-300 dark:border-amber-500/40 text-center space-y-2 mt-4">
                    <Award className="w-8 h-8 text-amber-500 mx-auto fill-amber-400/20" />
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      Selamat! Kamu telah menyelesaikan semua materi kursus ini!
                    </p>
                    <button
                      onClick={() => openCertificate(course)}
                      className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
                    >
                      Buka Sertifikat Kelulusan
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Diskusi & Bimbingan Mentor */}
            {activeTab === 'diskusi' && (
              <div className="space-y-4">
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">
                  Forum Tanya Jawab & Mentor
                </div>

                {/* Mentor Quick Info */}
                <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-[#141C30] border border-indigo-100 dark:border-[#1E2940] flex items-center gap-3">
                  <img
                    src={course.instructor_avatar}
                    alt={course.instructor_name}
                    className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-200 dark:ring-indigo-500/30"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{course.instructor_name}</div>
                    <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">Mentor Utama Kursus</div>
                  </div>
                </div>

                {/* Discussion Thread */}
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {discussions
                    .filter((d) => d.course_id === course.id)
                    .map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-3 rounded-2xl text-xs leading-relaxed ${
                          msg.is_mentor_reply
                            ? 'bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/40 text-purple-950 dark:text-purple-200'
                            : 'bg-slate-50 dark:bg-[#131C30] border border-slate-200 dark:border-[#1E2940] text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold flex items-center gap-1.5 text-slate-900 dark:text-white">
                            {msg.user_name}
                            {msg.is_mentor_reply && (
                              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200">
                                Mentor
                              </span>
                            )}
                          </span>
                          <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                        </div>
                        <p className="text-[12px]">{msg.message}</p>
                      </div>
                    ))}
                </div>

                {/* Post comment form */}
                <form onSubmit={handleSendDiscussion} className="space-y-2 pt-2 border-t border-slate-100 dark:border-[#1A2438]">
                  <div className="relative">
                    <textarea
                      rows={2}
                      placeholder="Tanyakan kebingunganmu ke mentor..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="w-full p-3 bg-slate-50 dark:bg-[#101728] border border-slate-200 dark:border-[#1E2940] rounded-xl text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-indigo-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!commentText.trim()}
                    className="w-full py-2 bg-[#5438FF] hover:bg-[#462bf3] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Pertanyaan</span>
                  </button>
                </form>
              </div>
            )}

            {/* Tab 3: Interactive Quiz & Assessment */}
            {activeTab === 'quiz' && (
              <div className="space-y-4">
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">
                  Evaluasi Kompetensi Mandiri
                </div>

                {courseQuiz ? (
                  <div className="space-y-4">
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Selesaikan kuis evaluasi untuk memvalidasi pemahaman materi Anda. Syarat lulus:{' '}
                      <strong>{courseQuiz.passingScore}%</strong>.
                    </p>

                    {previousQuizResult && (
                      <div
                        className={`p-3 rounded-2xl text-xs font-bold flex items-center justify-between ${
                          previousQuizResult.passed
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-600/30'
                            : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-600/30'
                        }`}
                      >
                        <span>Skor Terakhir: {previousQuizResult.score}%</span>
                        <span>{previousQuizResult.passed ? '✓ LULUS' : 'Belum Lulus'}</span>
                      </div>
                    )}

                    <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                      {courseQuiz.questions.map((q, qIndex) => (
                        <div key={q.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#141C30] border border-slate-200 dark:border-[#1E2940] space-y-2">
                          <p className="text-xs font-bold text-slate-800 dark:text-white">
                            {qIndex + 1}. {q.question}
                          </p>

                          <div className="space-y-1.5">
                            {q.options.map((opt, optIndex) => {
                              const isSelected = selectedAnswers[q.id] === optIndex;
                              const isCorrect = optIndex === q.correctIndex;
                              let stateClass = 'hover:bg-slate-100 dark:hover:bg-[#18233C] border-slate-200 dark:border-[#1E2940] text-slate-700 dark:text-slate-300';

                              if (quizSubmitted) {
                                if (isCorrect) {
                                  stateClass = 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-400 dark:border-emerald-600 text-emerald-900 dark:text-emerald-300 font-bold';
                                } else if (isSelected && !isCorrect) {
                                  stateClass = 'bg-rose-100 dark:bg-rose-950/60 border-rose-400 dark:border-rose-600 text-rose-900 dark:text-rose-300';
                                }
                              } else if (isSelected) {
                                stateClass = 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-400 dark:border-indigo-500 text-indigo-900 dark:text-indigo-300 font-semibold';
                              }

                              return (
                                <button
                                  key={optIndex}
                                  onClick={() => {
                                    if (!quizSubmitted) {
                                      setSelectedAnswers((prev) => ({ ...prev, [q.id]: optIndex }));
                                    }
                                  }}
                                  className={`w-full text-left p-2 rounded-xl border text-xs transition-colors flex items-center justify-between cursor-pointer ${stateClass}`}
                                >
                                  <span>{opt}</span>
                                  {quizSubmitted && isCorrect && (
                                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {quizSubmitted && (
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-[#1E2940] leading-relaxed">
                              💡 <strong>Penjelasan:</strong> {q.explanation}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      {!quizSubmitted ? (
                        <button
                          onClick={handleQuizSubmit}
                          disabled={
                            Object.keys(selectedAnswers).length < courseQuiz.questions.length
                          }
                          className="w-full py-2.5 rounded-xl bg-[#5438FF] hover:bg-[#462bf3] disabled:opacity-50 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
                        >
                          Periksa Jawaban Kuis
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setQuizSubmitted(false);
                            setSelectedAnswers({});
                          }}
                          className="w-full py-2 rounded-xl border border-slate-200 dark:border-[#1E2940] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#18233C] font-bold text-xs transition-colors cursor-pointer"
                        >
                          Ulangi Kuis
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center text-slate-400 text-xs">
                    Kuis untuk modul ini sedang dipersiapkan oleh instruktur.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
