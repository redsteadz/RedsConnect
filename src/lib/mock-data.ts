
// Mock data for the student dashboard

// Types based on the schemas
export interface Student {
  _id: string
  name: string
  email: string
  subjects: string[]
  educationLevel: "school" | "undergraduate" | "postgraduate"
  institution: string
}

export interface Teacher {
  _id: string
  name: string
  email: string
  qualifications: string[]
  bio: string
  yoe: number // years of experience
  subjects: string[]
  hourlyRate: number
  availability: ("online" | "in-person")[]
  averageRating?: number
}

export interface Session {
  _id: string
  teacherId: string
  studentId: string
  teacher?: Teacher // Populated field
  dateTime: Date
  duration: number // in minutes
  status: "pending" | "accepted" | "rejected" | "completed"
  subject: string
}

export interface Review {
  _id: string
  teacherId: string
  studentId: string
  rating: number
  review: string
}

// Mock current student
export const currentStudent: Student = {
  _id: "s1",
  name: "Ahmed Khan",
  email: "ahmed.khan@example.com",
  subjects: ["Mathematics", "Physics", "Computer Science"],
  educationLevel: "undergraduate",
  institution: "National University of Computer & Emerging Sciences",
}

// Mock teachers
export const teachers: Teacher[] = [
  {
    _id: "t1",
    name: "Dr. Fatima Ali",
    email: "fatima.ali@example.com",
    qualifications: ["PhD in Mathematics", "MSc in Applied Mathematics"],
    bio: "Experienced mathematics professor with 10 years of teaching experience at university level.",
    yoe: 10,
    subjects: ["Mathematics", "Calculus", "Linear Algebra"],
    hourlyRate: 2500,
    availability: ["online", "in-person"],
    averageRating: 4.8,
  },
  {
    _id: "t2",
    name: "Prof. Imran Ahmed",
    email: "imran.ahmed@example.com",
    qualifications: ["MSc in Physics", "BSc in Engineering"],
    bio: "Physics expert specializing in mechanics and electromagnetism with practical industry experience.",
    yoe: 8,
    subjects: ["Physics", "Mechanics", "Electromagnetism"],
    hourlyRate: 2000,
    availability: ["online"],
    averageRating: 4.5,
  },
  {
    _id: "t3",
    name: "Sara Malik",
    email: "sara.malik@example.com",
    qualifications: ["MSc in Computer Science", "Oracle Certified Professional"],
    bio: "Software engineer and educator with expertise in programming languages and database systems.",
    yoe: 6,
    subjects: ["Computer Science", "Programming", "Database Systems"],
    hourlyRate: 1800,
    availability: ["online", "in-person"],
    averageRating: 4.9,
  },
  {
    _id: "t4",
    name: "Ali Hassan",
    email: "ali.hassan@example.com",
    qualifications: ["MA in English Literature", "TEFL Certification"],
    bio: "English language specialist with experience teaching academic writing and communication skills.",
    yoe: 7,
    subjects: ["English", "Academic Writing", "Communication Skills"],
    hourlyRate: 1500,
    availability: ["online"],
    averageRating: 4.6,
  },
  {
    _id: "t5",
    name: "Zainab Qureshi",
    email: "zainab.qureshi@example.com",
    qualifications: ["MSc in Chemistry", "BSc in Biochemistry"],
    bio: "Chemistry educator specializing in organic chemistry and biochemistry with lab experience.",
    yoe: 5,
    subjects: ["Chemistry", "Organic Chemistry", "Biochemistry"],
    hourlyRate: 1900,
    availability: ["in-person"],
    averageRating: 4.7,
  },
]

// Mock sessions
export const sessions: Session[] = [
  {
    _id: "ses1",
    teacherId: "t1",
    studentId: "s1",
    dateTime: new Date("2025-03-25T16:00:00"),
    duration: 90, // 90 minutes
    status: "accepted",
    subject: "Mathematics - Calculus",
  },
  {
    _id: "ses2",
    teacherId: "t2",
    studentId: "s1",
    dateTime: new Date("2025-03-26T14:00:00"),
    duration: 90,
    status: "accepted",
    subject: "Physics - Mechanics",
  },
  {
    _id: "ses3",
    teacherId: "t3",
    studentId: "s1",
    dateTime: new Date("2025-03-28T10:00:00"),
    duration: 120,
    status: "pending",
    subject: "Computer Science - Data Structures",
  },
  {
    _id: "ses4",
    teacherId: "t1",
    studentId: "s1",
    dateTime: new Date("2025-03-20T15:00:00"),
    duration: 90,
    status: "completed",
    subject: "Mathematics - Linear Algebra",
  },
  {
    _id: "ses5",
    teacherId: "t4",
    studentId: "s1",
    dateTime: new Date("2025-03-22T11:00:00"),
    duration: 60,
    status: "completed",
    subject: "English - Academic Writing",
  },
  {
    _id: "ses6",
    teacherId: "t5",
    studentId: "s1",
    dateTime: new Date("2025-03-29T13:00:00"),
    duration: 90,
    status: "pending",
    subject: "Chemistry - Organic Chemistry",
  },
  {
    _id: "ses7",
    teacherId: "t2",
    studentId: "s1",
    dateTime: new Date("2025-03-18T14:00:00"),
    duration: 90,
    status: "rejected",
    subject: "Physics - Electromagnetism",
  },
]

// Mock reviews
export const reviews: Review[] = [
  {
    _id: "r1",
    teacherId: "t1",
    studentId: "s1",
    rating: 5,
    review:
      "Dr. Fatima is an excellent teacher. She explains complex mathematical concepts in a very clear and understandable way.",
  },
  {
    _id: "r2",
    teacherId: "t2",
    studentId: "s1",
    rating: 4,
    review:
      "Prof. Imran has deep knowledge of physics and provides practical examples that help understand the theory.",
  },
  {
    _id: "r3",
    teacherId: "t4",
    studentId: "s1",
    rating: 5,
    review: "Ali is a great English teacher. My writing skills have improved significantly after his sessions.",
  },
]

// Helper function to get teacher by ID
export function getTeacherById(id: string): Teacher | undefined {
  return teachers.find((teacher) => teacher._id === id)
}

// Helper function to get sessions with populated teacher data
export function getSessionsWithTeachers(): (Session & { teacher: Teacher })[] {
  return sessions.map((session) => {
    const teacher = getTeacherById(session.teacherId)
    return {
      ...session,
      teacher: teacher!,
    }
  })
}

// Helper function to get reviews for a teacher
export function getReviewsForTeacher(teacherId: string): Review[] {
  return reviews.filter((review) => review.teacherId === teacherId)
}

