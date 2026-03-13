export type UserRole = "student" | "tutor" | "premiumTutor"

export interface ProfileFormData {
  name: string
  avatarUrl: string
  email: string
  bio?: string
  skills?: string[]
  interests?: string[]
  experience?: string
}

export interface UpdateProfilePayload {
  name: string
  avatarUrl: string
  studentProfile?: {
    bio?: string
    skills?: string[]
    interests?: string[]
  }
  tutorProfile?: {
    bio?: string
    skills?: string[]
    experience?: string
  }
}