export interface CourseBuilderState {
    id?: string
    step: number
    title: string
    description: string
    category: string
    courseLevel: "beginner" | "intermediate" | "expert" | ""
    courseSkills: string[]

    courseType: "paid" | "credit"
    price: number
    creditCost: number
    thumbnailUrl: string
    status: "draft" | "pending" | "published"
    isSubmitting?: boolean
}