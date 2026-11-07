import { User, Course, Lesson, Quiz, Mentor, DiscussionMessage, StudyScheduleItem, NotificationItem } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 1,
    username: 'admin',
    full_name: 'Administrator SKILLUP',
    email: 'admin@skillup.id',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    headline: 'Head of Learning Operations',
    bio: 'Mengelola ekosistem pembelajaran dan kurikulum industri di platform SKILLUP.'
  },
  {
    id: 2,
    username: 'instruktur1',
    full_name: 'Budi Santoso, M.Kom',
    email: 'budi@skillup.id',
    role: 'instruktur',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    headline: 'Senior Principal Data Engineer & Certified Mentor',
    bio: 'Praktisi teknologi 10+ tahun, ex-Tech Lead di Tokopedia & GoTo. Telah membimbing lebih dari 15.000 talenta digital.'
  },
  {
    id: 3,
    username: 'siswa1',
    full_name: 'Imam Hambali',
    email: 'skilup1515@gmail.com',
    role: 'siswa',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    headline: 'Aspiring Data Scientist & Developer',
    bio: 'Sedang giat mempelajari Python, SQL, dan Machine Learning untuk akselerasi karir profesional.'
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 1,
    title: 'Python untuk Data Science',
    description: 'Pelajari dasar-dasar pemrograman Python, pengolahan dataframe dengan Pandas, komputasi numerik NumPy, dan visualisasi data menggunakan Matplotlib dari nol hingga siap kerja.',
    instructor_id: 2,
    instructor_name: 'Budi Santoso, M.Kom',
    instructor_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    category: 'Data Science',
    level: 'pemula',
    price: 0,
    rating: 4.8,
    review_count: 12480,
    total_hours: 12,
    total_lessons: 5,
    thumbnail_icon: 'python',
    is_popular: true
  },
  {
    id: 2,
    title: 'MySQL Database Fundamental',
    description: 'Kuasai perancangan database relasional, query DDL, DML, relasi join tabel, indexing, transaksi, dan optimasi performa query database modern.',
    instructor_id: 2,
    instructor_name: 'Budi Santoso, M.Kom',
    instructor_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    category: 'Programming',
    level: 'pemula',
    price: 0,
    rating: 4.7,
    review_count: 9820,
    total_hours: 8,
    total_lessons: 4,
    thumbnail_icon: 'mysql',
    is_popular: true
  },
  {
    id: 3,
    title: 'Web Development with React',
    description: 'Bangun web aplikasi modern berkinerja tinggi menggunakan React 19, TypeScript, state management kontemporer, Tailwind CSS, dan integrasi RESTful API.',
    instructor_id: 2,
    instructor_name: 'Sarah Pratama',
    instructor_avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    category: 'Programming',
    level: 'menengah',
    price: 150000,
    rating: 4.8,
    review_count: 8430,
    total_hours: 15,
    total_lessons: 6,
    thumbnail_icon: 'react',
    is_popular: true
  },
  {
    id: 4,
    title: 'Data Analysis with Python',
    description: 'Lakukan eksplorasi data mendalam (EDA), data cleaning, statistical hypothesis testing, serta pembuatan interactive insight dashboard bisnis.',
    instructor_id: 2,
    instructor_name: 'Budi Santoso, M.Kom',
    instructor_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    category: 'Data Science',
    level: 'pemula',
    price: 0,
    rating: 4.7,
    review_count: 11200,
    total_hours: 10,
    total_lessons: 4,
    thumbnail_icon: 'data',
    is_popular: false
  },
  {
    id: 5,
    title: 'Dasar UI/UX Design & Prototyping',
    description: 'Pelajari metodologi Design Thinking, wireframing interaktif di Figma, user research, heuristic evaluation, dan design system profesional.',
    instructor_id: 2,
    instructor_name: 'Maya Anindya',
    instructor_avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    category: 'Design',
    level: 'pemula',
    price: 150000,
    rating: 4.9,
    review_count: 7650,
    total_hours: 10,
    total_lessons: 5,
    thumbnail_icon: 'design',
    is_popular: true
  },
  {
    id: 6,
    title: 'Digital Business & Product Strategy',
    description: 'Panduan strategis merancang MVP, product-market fit, unit economics, conversion rate optimization, dan scaling produk digital di Indonesia.',
    instructor_id: 1,
    instructor_name: 'Rian Dewantara',
    instructor_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    category: 'Business',
    level: 'menengah',
    price: 200000,
    rating: 4.7,
    review_count: 4320,
    total_hours: 14,
    total_lessons: 4,
    thumbnail_icon: 'business',
    is_popular: false
  }
];

export const INITIAL_LESSONS: Lesson[] = [
  // Course 1: Python untuk Data Science (Matching mockup bottom-left: Pendahuluan, Import Library, Analisis Data, Latihan Soal)
  {
    id: 101,
    course_id: 1,
    title: 'Pendahuluan',
    order_num: 1,
    duration_minutes: 5,
    content: `Selamat datang di kursus Python untuk Data Science!

Pada modul pembuka ini, Anda akan memahami mengapa Python menjadi bahasa pemrograman de-facto terpopuler dalam dunia data science, machine learning, dan automasi.

Poin Pembahasan:
1. Ekosistem Python untuk pengolahan data.
2. Filosofi kode yang bersih dan mudah dibaca (Zen of Python).
3. Struktur kerja data scientist di industri teknologi.
4. Setup environment Google Colab, Jupyter Notebook, dan VS Code.`,
    video_url: 'https://www.youtube-nocookie.com/embed/kqtD5dpn9C8',
    code_language: 'python',
    code_snippet: `# Selamat datang di SKILLUP Python Interactive Sandbox!
name = "Imam"
role = "Data Science Explorer"
print(f"Halo {name}! Selamat datang di dunia {role}.")

tools = ["Pandas", "NumPy", "Matplotlib", "Seaborn"]
print(f"Alat utama yang akan kita pelajari: {', '.join(tools)}")`,
    expected_output: `Halo Imam! Selamat datang di dunia Data Science Explorer.\nAlat utama yang akan kita pelajari: Pandas, NumPy, Matplotlib, Seaborn`
  },
  {
    id: 102,
    course_id: 1,
    title: 'Import Library',
    order_num: 2,
    duration_minutes: 10,
    content: `Memahami Library Esensial Data Science

Library Python adalah kumpulan modul yang mempercepat pengembangan aplikasi tanpa harus menulis kode dari nol.

Library Standar Industri:
- pandas (pd): Manipulasi dataset tabular (DataFrames).
- numpy (np): Operasi vektor dan komputasi array multi-dimensi.
- matplotlib.pyplot (plt): Pembuatan grafik dan visualisasi dasar.`,
    video_url: 'https://www.youtube-nocookie.com/embed/vmEHCJofslg',
    code_language: 'python',
    code_snippet: `import pandas as pd
import numpy as np

# Membuat simulasi dataset penjualan mingguan
data = {
    'Hari': ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
    'Penjualan_Unit': [120, 145, 110, 195, 230, 310, 280],
    'Pengunjung': [350, 410, 320, 520, 680, 920, 850]
}

df = pd.DataFrame(data)
print("Preview DataFrame:")
print(df.to_string(index=False))`,
    expected_output: `Preview DataFrame:
   Hari  Penjualan_Unit  Pengunjung
  Senin             120         350
 Selasa             145         410
   Rabu             110         320
  Kamis             195         520
  Jumat             230         680
  Sabtu             310         920
 Minggu             280         850`
  },
  {
    id: 103,
    course_id: 1,
    title: 'Analisis Data',
    order_num: 3,
    duration_minutes: 15,
    content: `Eksplorasi dan Kalkulasi Metrik Agregasi

Dalam modul ini, kita menghitung metrik statistik ringkasan seperti mean, median, standard deviation, dan conversion rate.

Langkah-langkah Analisis:
1. Menghitung Conversion Rate (Penjualan / Pengunjung * 100).
2. Menemukan hari dengan performa tertinggi.
3. Melakukan agregasi ringkasan data.`,
    video_url: 'https://www.youtube-nocookie.com/embed/dcqPhpY7tWk',
    code_language: 'python',
    code_snippet: `import pandas as pd

# Load dataset simulasi metrik
data = {
    'Produk': ['Kursus Python', 'Kursus React', 'Kursus MySQL', 'Kursus UI/UX'],
    'Siswa_Aktif': [1420, 890, 1150, 960],
    'Tingkat_Penyelesaian_%': [78.5, 82.1, 74.0, 91.2]
}

df = pd.DataFrame(data)
print("Statistik Deskriptif:")
print(f"Rata-rata Siswa per Kursus: {df['Siswa_Aktif'].mean():.1f}")
print(f"Kursus dengan Kelulusan Tertinggi: {df.loc[df['Tingkat_Penyelesaian_%'].idxmax()]['Produk']}")`,
    expected_output: `Statistik Deskriptif:
Rata-rata Siswa per Kursus: 1105.0
Kursus dengan Kelulusan Tertinggi: Kursus UI/UX`
  },
  {
    id: 104,
    course_id: 1,
    title: 'Latihan Soal',
    order_num: 4,
    duration_minutes: 10,
    content: `Uji Pemahaman: Querying dan Filtering DataFrame

Selesaikan studi kasus interaktif untuk menyaring transaksi di atas batas nominal tertentu dan cetak hasilnya.`,
    video_url: 'https://www.youtube-nocookie.com/embed/e60ItwlZTKM',
    code_language: 'python',
    code_snippet: `# Tantangan: Filter kursus dengan rating di atas 4.7
kursus_list = [
    {"nama": "Python Data Science", "rating": 4.8, "level": "Pemula"},
    {"nama": "MySQL Fundamental", "rating": 4.7, "level": "Pemula"},
    {"nama": "React Development", "rating": 4.8, "level": "Menengah"},
    {"nama": "UI/UX Masterclass", "rating": 4.9, "level": "Pemula"}
]

rekomendasi = [k for k in kursus_list if k["rating"] >= 4.8]
print(f"Ditemukan {len(rekomendasi)} kursus unggulan:")
for k in rekomendasi:
    print(f"- {k['nama']} (Rating: {k['rating']})")`,
    expected_output: `Ditemukan 3 kursus unggulan:
- Python Data Science (Rating: 4.8)
- React Development (Rating: 4.8)
- UI/UX Masterclass (Rating: 4.9)`
  },
  {
    id: 105,
    course_id: 1,
    title: 'Visualisasi Data dengan Matplotlib',
    order_num: 5,
    duration_minutes: 20,
    content: `Membuat Grafik Batang & Tren Garis

Visualisasi data memungkinkan pengambil keputusan memahami pola dan anomali secara instan.

Tipe grafik utama:
- Line Plot: Menampilkan perubahan terhadap waktu (Time Series).
- Bar Chart: Perbandingan kategori diskrit.
- Histogram: Distribusi probabilitas variabel kontinu.`,
    video_url: 'https://www.youtube-nocookie.com/embed/3ZWYJ3hVQeU',
    code_language: 'python',
    code_snippet: `hari = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']
jam_belajar = [1.5, 2.0, 1.2, 2.5, 3.0, 4.5, 3.8]

print("Visualisasi ASCII Distribusi Jam Belajar Mingguan:")
for h, jam in zip(hari, jam_belajar):
    bar = "█" * int(jam * 5)
    print(f"{h} [{jam:3.1f}h] {bar}")`,
    expected_output: `Visualisasi ASCII Distribusi Jam Belajar Mingguan:
Sen [1.5h] ███████
Sel [2.0h] ██████████
Rab [1.2h] ██████
Kam [2.5h] ████████████
Jum [3.0h] ███████████████
Sab [4.5h] ██████████████████████
Min [3.8h] ███████████████████`
  },

  // Course 2: MySQL Database Fundamental
  {
    id: 201,
    course_id: 2,
    title: 'Pengantar Basis Data Relasional & RDBMS',
    order_num: 1,
    duration_minutes: 25,
    content: 'Mempelajari arsitektur DBMS, tabel, primary key, foreign key, dan prinsip normalisasi bentuk 1NF, 2NF, dan 3NF.',
    code_language: 'sql',
    code_snippet: `-- Perancangan Relasi Siswa & Kursus
CREATE TABLE siswa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

SELECT "Table siswa created successfully!" AS status;`,
    expected_output: `status
Table siswa created successfully!`
  },
  {
    id: 202,
    course_id: 2,
    title: 'Sintaks DDL & DML Dasar',
    order_num: 2,
    duration_minutes: 30,
    content: 'Mengoperasikan perintah CREATE TABLE, ALTER TABLE, INSERT INTO, UPDATE, dan DELETE dengan klausul WHERE yang aman.',
    code_language: 'sql',
    code_snippet: `INSERT INTO siswa (nama, email) VALUES
('Imam Hambali', 'imam@skillup.id'),
('Ani Wijaya', 'ani@skillup.id');

SELECT * FROM siswa;`,
    expected_output: `id | nama         | email
1  | Imam Hambali | imam@skillup.id
2  | Ani Wijaya   | ani@skillup.id`
  },
  {
    id: 203,
    course_id: 2,
    title: 'Query Relasi JOIN (INNER, LEFT, RIGHT)',
    order_num: 3,
    duration_minutes: 40,
    content: 'Menggabungkan beberapa tabel relasional untuk mengekstrak data komprehensif tanpa redundansi data.',
    code_language: 'sql',
    code_snippet: `SELECT e.id, u.full_name, c.title, e.status
FROM enrollments e
INNER JOIN users u ON u.id = e.user_id
INNER JOIN courses c ON c.id = e.course_id;`,
    expected_output: `id | full_name    | title                    | status
1  | Imam Hambali | Python untuk Data Science| aktif
2  | Ani Wijaya   | Dasar UI/UX Design       | selesai`
  },
  {
    id: 204,
    course_id: 2,
    title: 'Studi Kasus & Optimasi Indexing',
    order_num: 4,
    duration_minutes: 35,
    content: 'Menganalisis query plan dengan EXPLAIN dan mengimplementasikan B-Tree Indexing untuk query throughput jutaan baris.',
    code_language: 'sql',
    code_snippet: `EXPLAIN SELECT * FROM users WHERE email = 'budi@skillup.id';`,
    expected_output: `select_type: SIMPLE | table: users | type: const | possible_keys: unique_email | key: unique_email | rows: 1`
  }
];

export const INITIAL_QUIZZES: Record<number, Quiz> = {
  1: {
    course_id: 1,
    title: 'Evaluasi Kompetensi: Python untuk Data Science',
    passingScore: 80,
    questions: [
      {
        id: 1,
        question: 'Library Python manakah yang paling utama digunakan untuk manipulasi dan analisis data tabular berbentuk DataFrame?',
        options: ['Pandas', 'Requests', 'Flask', 'Turtle'],
        correctIndex: 0,
        explanation: 'Pandas menyediakan struktur data DataFrame dan Series yang dirancang khusus untuk manipulasi data tabular berkecepatan tinggi.'
      },
      {
        id: 2,
        question: 'Apa fungsi dari method `df.head()` pada pustaka Pandas?',
        options: [
          'Menghapus baris paling atas dari DataFrame',
          'Menampilkan 5 baris pertama dari DataFrame secara default',
          'Menghitung total jumlah memori yang terpakai',
          'Mengubah nama kolom header tabel'
        ],
        correctIndex: 1,
        explanation: '`df.head()` secara default menampilkan 5 baris pertama untuk inspeksi data kilat.'
      },
      {
        id: 3,
        question: 'Manakah cara yang tepat untuk menghitung rata-rata dari kolom numerik "Nilai" pada DataFrame `df`?',
        options: ['df["Nilai"].average()', 'df["Nilai"].mean()', 'mean(df["Nilai"])', 'df.calc("Nilai")'],
        correctIndex: 1,
        explanation: 'Pada Pandas, fungsi untuk menghitung rata-rata aritmetika kolom adalah method `.mean()`.'
      },
      {
        id: 4,
        question: 'Dalam modul visualisasi data Matplotlib, perintah apa yang digunakan untuk menampilkan canvas grafik ke layar?',
        options: ['plt.render()', 'plt.draw()', 'plt.show()', 'plt.canvas()'],
        correctIndex: 2,
        explanation: '`plt.show()` digunakan untuk merender dan menampilkan plot visualisasi secara interaktif.'
      }
    ]
  }
};

export const INITIAL_MENTORS: Mentor[] = [
  {
    id: 1,
    name: 'Budi Santoso, M.Kom',
    role_title: 'Senior Principal Data Engineer',
    company: 'Ex-Tokopedia / GoTo',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviews_count: 342,
    expertise: ['Python', 'Big Data', 'MySQL', 'System Design'],
    hourly_rate: 150000,
    available_slots: ['Senin, 19:30 WIB', 'Rabu, 20:00 WIB', 'Sabtu, 14:00 WIB'],
    bio: 'Fokus membimbing transisi karir ke Data Science, persiapan technical interview FAANG, dan bedah portfolio nyata.'
  },
  {
    id: 2,
    name: 'Sarah Pratama',
    role_title: 'Staff Frontend Architect',
    company: 'Traveloka',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviews_count: 289,
    expertise: ['React 19', 'TypeScript', 'Next.js', 'Web Performance'],
    hourly_rate: 175000,
    available_slots: ['Selasa, 19:00 WIB', 'Kamis, 20:30 WIB', 'Minggu, 10:00 WIB'],
    bio: 'Membantu developer menguasai Clean Code, architecture design pattern, dan arsitektur aplikasi berskala jutaan pengguna.'
  },
  {
    id: 3,
    name: 'Maya Anindya',
    role_title: 'Lead Product Designer',
    company: 'Bukalapak',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviews_count: 215,
    expertise: ['UI/UX', 'Figma Systems', 'User Research', 'Design Sprint'],
    hourly_rate: 125000,
    available_slots: ['Jumat, 16:00 WIB', 'Sabtu, 11:00 WIB'],
    bio: 'Spesialis kurasi portofolio UI/UX berstandar global, usability testing, dan navigasi karir desainer produk.'
  }
];

export const INITIAL_DISCUSSIONS: DiscussionMessage[] = [
  {
    id: 'disc-1',
    course_id: 1,
    user_name: 'Imam Hambali',
    user_role: 'siswa',
    user_avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    timestamp: '2 jam yang lalu',
    message: 'Halo Mentor Budi! Pada bagian manipulasi dataframe, kapan sebaiknya kita memakai `df.loc[]` dibandingkan `df.iloc[]`?'
  },
  {
    id: 'disc-2',
    course_id: 1,
    user_name: 'Budi Santoso, M.Kom',
    user_role: 'instruktur',
    user_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    timestamp: '1 jam yang lalu',
    message: 'Pertanyaan bagus sekali, Imam! Singkatnya: `.loc[]` berbasis label (nama kolom dan index nama), sedangkan `.iloc[]` berbasis index integer angka (posisi urutan 0, 1, 2). Jika ingin memilih kolom bernama "Gaji", gunakan `df.loc[:, "Gaji"]`. Terus semangat belajarnya!',
    is_mentor_reply: true
  }
];

export const INITIAL_SCHEDULE: StudyScheduleItem[] = [
  {
    id: 'sch-1',
    day: 'Senin',
    time: '19:00 - 20:30',
    course_title: 'Python untuk Data Science',
    topic: 'Pendahuluan & Setup Library',
    completed: true
  },
  {
    id: 'sch-2',
    day: 'Rabu',
    time: '19:30 - 21:00',
    course_title: 'Python untuk Data Science',
    topic: 'Analisis Data & Agregasi',
    completed: true
  },
  {
    id: 'sch-3',
    day: 'Jumat',
    time: '20:00 - 21:30',
    course_title: 'Python untuk Data Science',
    topic: 'Latihan Soal & Quiz Kelulusan',
    completed: true
  },
  {
    id: 'sch-4',
    day: 'Sabtu',
    time: '14:00 - 15:30',
    course_title: 'Bimbingan Mentor 1-on-1',
    topic: 'Review Portofolio Data bersama Mentor Budi',
    completed: false
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Mentor Membalas Diskusimu',
    message: 'Budi Santoso, M.Kom menjawab pertanyaanmu tentang manipulasi DataFrame.',
    time: '1 jam yang lalu',
    read: false,
    type: 'mentor'
  },
  {
    id: 'notif-2',
    title: 'Materi Baru Tersedia',
    message: 'Modul "Visualisasi Data dengan Matplotlib" telah dibuka pada kursus Python.',
    time: '3 jam yang lalu',
    read: false,
    type: 'course'
  },
  {
    id: 'notif-3',
    title: 'Selamat! Target Belajar Tercapai',
    message: 'Kamu telah mempertahankan 12 hari beruntun belajar di SKILLUP.',
    time: '1 hari yang lalu',
    read: true,
    type: 'system'
  }
];
