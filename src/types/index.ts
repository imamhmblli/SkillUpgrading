export type UserRole = 'siswa' | 'instruktur' | 'admin';

export interface User {
  id: number;
  username: string;
  full_name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  headline?: string;
  bio?: string;
}

export type CourseLevel = 'pemula' | 'menengah' | 'lanjutan';

export interface Lesson {
  id: number;
  course_id: number;
  title: string;
  content: string;
  video_url?: string;
  order_num: number;
  duration_minutes: number;
  code_snippet?: string;
  code_language?: string;
  expected_output?: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  instructor_id: number;
  instructor_name: string;
  instructor_avatar?: string;
  category: 'Programming' | 'Data Science' | 'Design' | 'Business';
  level: CourseLevel;
  price: number; // 0 for free
  rating: number;
  review_count: number;
  total_hours: number;
  total_lessons: number;
  thumbnail_icon: 'python' | 'mysql' | 'react' | 'data' | 'design' | 'business';
  color_theme?: string;
  is_popular?: boolean;
}

export interface Enrollment {
  id: number;
  user_id: number;
  course_id: number;
  enrolled_at: string;
  status: 'aktif' | 'selesai' | 'batal';
}

export interface LessonProgress {
  id: number;
  enrollment_id: number;
  lesson_id: number;
  is_completed: boolean;
  completed_at?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  course_id: number;
  title: string;
  passingScore: number;
  questions: QuizQuestion[];
}

export interface Mentor {
  id: number;
  name: string;
  role_title: string;
  company: string;
  avatar: string;
  rating: number;
  reviews_count: number;
  expertise: string[];
  hourly_rate: number;
  available_slots: string[];
  bio: string;
}

export interface DiscussionMessage {
  id: string;
  course_id: number;
  user_name: string;
  user_role: UserRole;
  user_avatar: string;
  timestamp: string;
  message: string;
  is_mentor_reply?: boolean;
}

export interface StudyScheduleItem {
  id: string;
  day: string;
  time: string;
  course_title: string;
  topic: string;
  completed: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'course' | 'mentor' | 'certificate' | 'system';
}
