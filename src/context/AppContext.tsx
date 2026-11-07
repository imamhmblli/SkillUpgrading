import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  User,
  UserRole,
  Course,
  Lesson,
  Enrollment,
  LessonProgress,
  Mentor,
  DiscussionMessage,
  StudyScheduleItem,
  NotificationItem,
  Quiz
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_COURSES,
  INITIAL_LESSONS,
  INITIAL_QUIZZES,
  INITIAL_MENTORS,
  INITIAL_DISCUSSIONS,
  INITIAL_SCHEDULE,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';

interface MentorBooking {
  id: string;
  mentorId: number;
  mentorName: string;
  date: string;
  timeSlot: string;
  notes: string;
  status: 'confirmed' | 'completed';
}

interface AppContextType {
  currentUser: User;
  switchRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Courses
  courses: Course[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  createCourse: (newCourse: Omit<Course, 'id' | 'instructor_name' | 'instructor_avatar' | 'review_count' | 'total_lessons'>) => number;
  deleteCourse: (id: number) => void;
  
  // Classroom
  activeCourseId: number | null;
  activeLessonId: number | null;
  openClassroom: (courseId: number, lessonId?: number) => void;
  closeClassroom: () => void;
  setActiveLessonId: (lessonId: number) => void;
  
  // Lessons
  lessons: Lesson[];
  addLesson: (lesson: Omit<Lesson, 'id'>) => void;
  
  // Enrollments & Progress
  enrollments: Enrollment[];
  enrollCourse: (courseId: number) => { success: boolean; message: string };
  isEnrolled: (courseId: number) => boolean;
  progressList: LessonProgress[];
  markLesson: (courseId: number, lessonId: number, completed: boolean) => void;
  getCourseProgress: (courseId: number) => { total: number; done: number; percentage: number; isCompleted: boolean };
  
  // Bookmarks
  savedCourses: number[];
  toggleBookmark: (courseId: number) => void;
  
  // Quizzes
  quizzes: Record<number, Quiz>;
  completedQuizzes: Record<number, { score: number; passed: boolean }>;
  submitQuizScore: (courseId: number, score: number, passed: boolean) => void;
  
  // Mentors & Community
  mentors: Mentor[];
  mentorBookings: MentorBooking[];
  bookMentorSession: (mentorId: number, date: string, timeSlot: string, notes: string) => void;
  discussions: DiscussionMessage[];
  addDiscussion: (courseId: number, message: string) => void;
  
  // Schedule
  schedule: StudyScheduleItem[];
  toggleScheduleItem: (id: string) => void;
  
  // Certificate
  showCertificateModal: boolean;
  certificateCourse: Course | null;
  openCertificate: (course: Course) => void;
  closeCertificate: () => void;
  
  // Notifications & UI modals
  notifications: NotificationItem[];
  unreadNotifCount: number;
  markAllNotificationsAsRead: () => void;
  showUpgradeModal: boolean;
  setShowUpgradeModal: (open: boolean) => void;
  showMobileSimulator: boolean;
  setShowMobileSimulator: (open: boolean) => void;
  showQrModal: boolean;
  setShowQrModal: (open: boolean) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state: dark by default as requested in screenshot
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('skillup_theme');
    return (saved as 'dark' | 'light') || 'dark';
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('skillup_theme', next);
      return next;
    });
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Current user state (Default to admin as in screenshot, or saved role)
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('skillup_role');
    return (saved as UserRole) || 'admin';
  });

  const [showQrModal, setShowQrModal] = useState<boolean>(false);

  const currentUser = useMemo(() => {
    if (currentRole === 'instruktur') return INITIAL_USERS[1];
    if (currentRole === 'admin') return INITIAL_USERS[0];
    return INITIAL_USERS[2]; // siswa1: Imam Hambali
  }, [currentRole]);

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    localStorage.setItem('skillup_role', role);
  };

  // Active Tab
  const [activeTab, setActiveTab] = useState<string>('beranda');

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  // Courses
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('skillup_courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  useEffect(() => {
    localStorage.setItem('skillup_courses', JSON.stringify(courses));
  }, [courses]);

  // Lessons
  const [lessons, setLessons] = useState<Lesson[]>(() => {
    const saved = localStorage.getItem('skillup_lessons');
    return saved ? JSON.parse(saved) : INITIAL_LESSONS;
  });

  useEffect(() => {
    localStorage.setItem('skillup_lessons', JSON.stringify(lessons));
  }, [lessons]);

  // Enrollments (Default: enrolled in Python untuk Data Science with some progress)
  const [enrollments, setEnrollments] = useState<Enrollment[]>(() => {
    const saved = localStorage.getItem('skillup_enrollments');
    return saved ? JSON.parse(saved) : [
      { id: 1, user_id: 3, course_id: 1, enrolled_at: '2026-11-01', status: 'aktif' },
      { id: 2, user_id: 3, course_id: 2, enrolled_at: '2026-11-03', status: 'aktif' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('skillup_enrollments', JSON.stringify(enrollments));
  }, [enrollments]);

  // Progress (Default: Lessons 101, 102 completed, so 75% or 50% initial state)
  const [progressList, setProgressList] = useState<LessonProgress[]>(() => {
    const saved = localStorage.getItem('skillup_progress');
    return saved ? JSON.parse(saved) : [
      { id: 1, enrollment_id: 1, lesson_id: 101, is_completed: true, completed_at: '2026-11-02' },
      { id: 2, enrollment_id: 1, lesson_id: 102, is_completed: true, completed_at: '2026-11-03' },
      { id: 3, enrollment_id: 1, lesson_id: 103, is_completed: true, completed_at: '2026-11-04' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('skillup_progress', JSON.stringify(progressList));
  }, [progressList]);

  // Classroom State
  const [activeCourseId, setActiveCourseId] = useState<number | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);

  const openClassroom = (courseId: number, lessonId?: number) => {
    // If not enrolled, auto-enroll student seamlessly
    if (!isEnrolled(courseId)) {
      enrollCourse(courseId);
    }
    setActiveCourseId(courseId);
    const courseLessons = lessons.filter(l => l.course_id === courseId);
    if (lessonId) {
      setActiveLessonId(lessonId);
    } else if (courseLessons.length > 0) {
      setActiveLessonId(courseLessons[0].id);
    }
  };

  const closeClassroom = () => {
    setActiveCourseId(null);
    setActiveLessonId(null);
  };

  // Saved / Bookmarked
  const [savedCourses, setSavedCourses] = useState<number[]>(() => {
    const saved = localStorage.getItem('skillup_saved');
    return saved ? JSON.parse(saved) : [1];
  });

  const toggleBookmark = (courseId: number) => {
    setSavedCourses(prev => {
      const next = prev.includes(courseId) ? prev.filter(id => id !== courseId) : [...prev, courseId];
      localStorage.setItem('skillup_saved', JSON.stringify(next));
      return next;
    });
  };

  const isEnrolled = (courseId: number) => {
    return enrollments.some(e => e.course_id === courseId && e.user_id === currentUser.id && e.status !== 'batal');
  };

  const enrollCourse = (courseId: number) => {
    if (isEnrolled(courseId)) {
      return { success: false, message: 'Sudah terdaftar di kursus ini.' };
    }
    const newEnrollment: Enrollment = {
      id: Date.now(),
      user_id: currentUser.id,
      course_id: courseId,
      enrolled_at: new Date().toISOString().split('T')[0],
      status: 'aktif'
    };
    setEnrollments(prev => [...prev, newEnrollment]);
    return { success: true, message: 'Berhasil mendaftar kursus! Selamat belajar.' };
  };

  const markLesson = (courseId: number, lessonId: number, completed: boolean) => {
    const userEnrollment = enrollments.find(e => e.course_id === courseId && e.user_id === currentUser.id);
    const enrollmentId = userEnrollment ? userEnrollment.id : 1;

    setProgressList(prev => {
      const existingIndex = prev.findIndex(p => p.enrollment_id === enrollmentId && p.lesson_id === lessonId);
      let updated: LessonProgress[];
      if (existingIndex >= 0) {
        updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          is_completed: completed,
          completed_at: completed ? new Date().toISOString() : undefined
        };
      } else {
        updated = [
          ...prev,
          {
            id: Date.now(),
            enrollment_id: enrollmentId,
            lesson_id: lessonId,
            is_completed: completed,
            completed_at: completed ? new Date().toISOString() : undefined
          }
        ];
      }

      // Check if all lessons are completed to auto-update enrollment status to 'selesai'
      const courseLessons = lessons.filter(l => l.course_id === courseId);
      const completedCount = courseLessons.filter(l => {
        if (l.id === lessonId) return completed;
        const prog = updated.find(p => p.enrollment_id === enrollmentId && p.lesson_id === l.id);
        return prog ? prog.is_completed : false;
      }).length;

      if (courseLessons.length > 0 && completedCount === courseLessons.length) {
        setEnrollments(prevEnr =>
          prevEnr.map(e => e.id === enrollmentId ? { ...e, status: 'selesai' } : e)
        );
      } else {
        setEnrollments(prevEnr =>
          prevEnr.map(e => e.id === enrollmentId && e.status === 'selesai' ? { ...e, status: 'aktif' } : e)
        );
      }

      return updated;
    });
  };

  const getCourseProgress = (courseId: number) => {
    const courseLessons = lessons.filter(l => l.course_id === courseId);
    if (courseLessons.length === 0) return { total: 0, done: 0, percentage: 0, isCompleted: false };

    const userEnrollment = enrollments.find(e => e.course_id === courseId && e.user_id === currentUser.id);
    if (!userEnrollment) return { total: courseLessons.length, done: 0, percentage: 0, isCompleted: false };

    const doneCount = courseLessons.filter(l => {
      const prog = progressList.find(p => p.enrollment_id === userEnrollment.id && p.lesson_id === l.id);
      return prog ? prog.is_completed : false;
    }).length;

    const percentage = Math.round((doneCount / courseLessons.length) * 100);
    return {
      total: courseLessons.length,
      done: doneCount,
      percentage,
      isCompleted: userEnrollment.status === 'selesai' || doneCount === courseLessons.length
    };
  };

  // Quizzes
  const [quizzes] = useState<Record<number, Quiz>>(INITIAL_QUIZZES);
  const [completedQuizzes, setCompletedQuizzes] = useState<Record<number, { score: number; passed: boolean }>>(() => {
    const saved = localStorage.getItem('skillup_quizzes');
    return saved ? JSON.parse(saved) : {};
  });

  const submitQuizScore = (courseId: number, score: number, passed: boolean) => {
    setCompletedQuizzes(prev => {
      const next = { ...prev, [courseId]: { score, passed } };
      localStorage.setItem('skillup_quizzes', JSON.stringify(next));
      return next;
    });
  };

  // Mentors & Bookings
  const [mentors] = useState<Mentor[]>(INITIAL_MENTORS);
  const [mentorBookings, setMentorBookings] = useState<MentorBooking[]>(() => {
    const saved = localStorage.getItem('skillup_mentor_bookings');
    return saved ? JSON.parse(saved) : [
      {
        id: 'mb-1',
        mentorId: 1,
        mentorName: 'Budi Santoso, M.Kom',
        date: '2026-11-09',
        timeSlot: '19:30 WIB',
        notes: 'Diskusi persiapan karir Data Science dan review code latihan Pandas.',
        status: 'confirmed'
      }
    ];
  });

  const bookMentorSession = (mentorId: number, date: string, timeSlot: string, notes: string) => {
    const mentor = mentors.find(m => m.id === mentorId);
    const newBooking: MentorBooking = {
      id: `mb-${Date.now()}`,
      mentorId,
      mentorName: mentor ? mentor.name : 'Mentor SKILLUP',
      date,
      timeSlot,
      notes,
      status: 'confirmed'
    };
    setMentorBookings(prev => {
      const updated = [newBooking, ...prev];
      localStorage.setItem('skillup_mentor_bookings', JSON.stringify(updated));
      return updated;
    });
  };

  // Discussions
  const [discussions, setDiscussions] = useState<DiscussionMessage[]>(() => {
    const saved = localStorage.getItem('skillup_discussions');
    return saved ? JSON.parse(saved) : INITIAL_DISCUSSIONS;
  });

  const addDiscussion = (courseId: number, message: string) => {
    const newMsg: DiscussionMessage = {
      id: `disc-${Date.now()}`,
      course_id: courseId,
      user_name: currentUser.full_name,
      user_role: currentUser.role,
      user_avatar: currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      timestamp: 'Baru saja',
      message
    };
    setDiscussions(prev => {
      const updated = [...prev, newMsg];
      localStorage.setItem('skillup_discussions', JSON.stringify(updated));
      return updated;
    });

    // If student asked question, simulate mentor helpful response after a short moment
    if (currentUser.role === 'siswa') {
      setTimeout(() => {
        const mentorReply: DiscussionMessage = {
          id: `disc-reply-${Date.now()}`,
          course_id: courseId,
          user_name: 'Budi Santoso, M.Kom',
          user_role: 'instruktur',
          user_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          timestamp: '1 menit yang lalu',
          message: `Pertanyaan yang sangat relevan, ${currentUser.full_name.split(' ')[0]}! Terus eksplorasi kodenya ya. Jangan ragu bookmark modul ini dan coba langsung di code editor interaktif di atas!`,
          is_mentor_reply: true
        };
        setDiscussions(curr => {
          const withReply = [...curr, mentorReply];
          localStorage.setItem('skillup_discussions', JSON.stringify(withReply));
          return withReply;
        });
      }, 1200);
    }
  };

  // Schedule
  const [schedule, setSchedule] = useState<StudyScheduleItem[]>(() => {
    const saved = localStorage.getItem('skillup_schedule');
    return saved ? JSON.parse(saved) : INITIAL_SCHEDULE;
  });

  const toggleScheduleItem = (id: string) => {
    setSchedule(prev => {
      const updated = prev.map(s => s.id === id ? { ...s, completed: !s.completed } : s);
      localStorage.setItem('skillup_schedule', JSON.stringify(updated));
      return updated;
    });
  };

  // Certificate Modal
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);
  const [certificateCourse, setCertificateCourse] = useState<Course | null>(null);

  const openCertificate = (course: Course) => {
    setCertificateCourse(course);
    setShowCertificateModal(true);
  };

  const closeCertificate = () => {
    setShowCertificateModal(false);
    setCertificateCourse(null);
  };

  // UI Modals
  const [showUpgradeModal, setShowUpgradeModal] = useState<boolean>(false);
  const [showMobileSimulator, setShowMobileSimulator] = useState<boolean>(false);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const unreadNotifCount = notifications.filter(n => !n.read).length;

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Instructor Methods (from PDF specification)
  const createCourse = (newCourseData: Omit<Course, 'id' | 'instructor_name' | 'instructor_avatar' | 'review_count' | 'total_lessons'>) => {
    const newId = Date.now();
    const created: Course = {
      ...newCourseData,
      id: newId,
      instructor_id: currentUser.id,
      instructor_name: currentUser.full_name,
      instructor_avatar: currentUser.avatar,
      review_count: 0,
      total_lessons: 0
    };
    setCourses(prev => [created, ...prev]);
    return newId;
  };

  const deleteCourse = (id: number) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    setLessons(prev => prev.filter(l => l.course_id !== id));
  };

  const addLesson = (lessonData: Omit<Lesson, 'id'>) => {
    const newId = Date.now();
    const newLesson: Lesson = {
      ...lessonData,
      id: newId
    };
    setLessons(prev => [...prev, newLesson]);
    setCourses(prev => prev.map(c => c.id === lessonData.course_id ? { ...c, total_lessons: c.total_lessons + 1 } : c));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        switchRole,
        activeTab,
        setActiveTab,
        courses,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        createCourse,
        deleteCourse,
        activeCourseId,
        activeLessonId,
        openClassroom,
        closeClassroom,
        setActiveLessonId,
        lessons,
        addLesson,
        enrollments,
        enrollCourse,
        isEnrolled,
        progressList,
        markLesson,
        getCourseProgress,
        savedCourses,
        toggleBookmark,
        quizzes,
        completedQuizzes,
        submitQuizScore,
        mentors,
        mentorBookings,
        bookMentorSession,
        discussions,
        addDiscussion,
        schedule,
        toggleScheduleItem,
        showCertificateModal,
        certificateCourse,
        openCertificate,
        closeCertificate,
        notifications,
        unreadNotifCount,
        markAllNotificationsAsRead,
        showUpgradeModal,
        setShowUpgradeModal,
        showMobileSimulator,
        setShowMobileSimulator,
        showQrModal,
        setShowQrModal,
        theme,
        toggleTheme
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
