export interface TeacherApplication {
  id: string
  name: string
  email: string
  phone: string
  location: string
  subject: string
  specializations: string[]
  education: string
  experience: number
  statement: string
  avatar: string
  appliedAt: string
}

export const mockTeacherApplications: TeacherApplication[] = [
  {
    id: "t1",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "(555) 123-4567",
    location: "Boston, MA",
    subject: "Mathematics",
    specializations: ["Calculus", "Statistics", "Algebra"],
    education: "Ph.D. in Mathematics, MIT",
    experience: 8,
    statement:
      "I believe in making complex mathematical concepts accessible to all students through real-world applications and visual learning techniques.",
    avatar: "/placeholder.svg?height=200&width=200",
    appliedAt: "2023-11-15T14:30:00Z",
  },
  {
    id: "t2",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "(555) 234-5678",
    location: "San Francisco, CA",
    subject: "Computer Science",
    specializations: ["Programming", "Web Development", "AI"],
    education: "M.S. in Computer Science, Stanford University",
    experience: 5,
    statement:
      "My teaching philosophy centers around project-based learning, allowing students to build real applications while mastering programming concepts.",
    avatar: "/placeholder.svg?height=200&width=200",
    appliedAt: "2023-11-16T09:15:00Z",
  },
  {
    id: "t3",
    name: "Dr. Amara Okafor",
    email: "amara.okafor@example.com",
    phone: "(555) 345-6789",
    location: "Chicago, IL",
    subject: "Biology",
    specializations: ["Molecular Biology", "Genetics", "Ecology"],
    education: "Ph.D. in Biological Sciences, University of Chicago",
    experience: 10,
    statement:
      "I strive to inspire scientific curiosity by connecting classroom learning to current research and environmental challenges facing our world today.",
    avatar: "/placeholder.svg?height=200&width=200",
    appliedAt: "2023-11-14T11:45:00Z",
  },
  {
    id: "t4",
    name: "James Rodriguez",
    email: "james.rodriguez@example.com",
    phone: "(555) 456-7890",
    location: "Miami, FL",
    subject: "History",
    specializations: ["World History", "American History", "Political Science"],
    education: "M.A. in History, University of Florida",
    experience: 7,
    statement:
      "History is more than dates and facts—it's about understanding human experiences and learning from our past to create a better future.",
    avatar: "/placeholder.svg?height=200&width=200",
    appliedAt: "2023-11-17T13:20:00Z",
  },
  {
    id: "t5",
    name: "Emily Zhang",
    email: "emily.zhang@example.com",
    phone: "(555) 567-8901",
    location: "Seattle, WA",
    subject: "English Literature",
    specializations: ["Creative Writing", "Poetry", "Contemporary Literature"],
    education: "M.F.A. in Creative Writing, University of Washington",
    experience: 6,
    statement:
      "I believe in the power of stories to transform lives and develop critical thinking. My classroom is a place where diverse voices are celebrated.",
    avatar: "/placeholder.svg?height=200&width=200",
    appliedAt: "2023-11-18T10:30:00Z",
  },
  {
    id: "t6",
    name: "Robert Patel",
    email: "robert.patel@example.com",
    phone: "(555) 678-9012",
    location: "Austin, TX",
    subject: "Physics",
    specializations: ["Mechanics", "Quantum Physics", "Astronomy"],
    education: "Ph.D. in Physics, University of Texas",
    experience: 9,
    statement:
      "Physics explains how our universe works, from the smallest particles to the largest galaxies. I make these concepts tangible through hands-on experiments.",
    avatar: "/placeholder.svg?height=200&width=200",
    appliedAt: "2023-11-13T15:45:00Z",
  },
  {
    id: "t7",
    name: "Sophia Martinez",
    email: "sophia.martinez@example.com",
    phone: "(555) 789-0123",
    location: "Denver, CO",
    subject: "Art",
    specializations: ["Painting", "Digital Art", "Art History"],
    education: "B.F.A. in Fine Arts, Rhode Island School of Design",
    experience: 4,
    statement:
      "Art education develops creative problem-solving skills essential for any career path. I foster an inclusive studio environment where students can express themselves authentically.",
    avatar: "/placeholder.svg?height=200&width=200",
    appliedAt: "2023-11-19T09:00:00Z",
  },
]

