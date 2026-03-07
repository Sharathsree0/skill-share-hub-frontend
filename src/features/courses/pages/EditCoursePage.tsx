import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import type { RootState } from "../../../store/store"
import { setCourse } from "../slice/courseCreationSlice"
import { getCourseById } from "../api/courses.api"

import CourseStepper from "../components/CourseStepper"
import CourseBasicInfoStep from "../components/CourseBasicInfoStep"
import CourseCategoryStep from "../components/CourseCategoryStep"
import CoursePricingStep from "../components/CoursePricingStep"
import CoursePublishStep from "../components/CoursePublishStep"
import { toast } from "react-hot-toast"

export default function EditCoursePage() {
    const { id } = useParams<{ id: string }>()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)

    const step = useSelector(
        (state: RootState) => state.courseBuilder.step
    )

    useEffect(() => {
        const fetchCourse = async () => {
            if (!id) return
            try {
                setIsLoading(true)
                const response = await getCourseById(id)
                if (response.success) {
                    const courseData = response.data
                    // Map backend data to frontend state
                    dispatch(setCourse({
                        id: courseData._id,
                        step: 1, // Start at step 1 for editing
                        title: courseData.title,
                        description: courseData.description,
                        category: courseData.category,
                        courseLevel: courseData.courseLevel,
                        courseSkills: courseData.courseSkills || [],
                        courseType: courseData.courseType,
                        price: courseData.price,
                        creditCost: courseData.creditCost,
                        thumbnailUrl: courseData.thumbnailUrl,
                        status: courseData.status,
                        isSubmitting: false
                    }))
                }
            } catch (error) {
                console.error("Failed to fetch course data", error)
                toast.error("Failed to load course details")
            } finally {
                setIsLoading(false)
            }
        }

        fetchCourse()

        // Clean up on unmount? Maybe not, usually course state is global
        // but it's good to reset if we leave the edit flow
        return () => {
            // dispatch(resetCourse()) // optionally reset
        }
    }, [id, dispatch])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1F5E45]"></div>
            </div>
        )
    }

    return (
        <div className="bg-[#eff4f3] min-h-screen pb-20 pt-10 px-4 flex flex-col items-center font-sans">
            <div className="w-full max-w-4xl">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">Edit Course</h1>
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">ID: {id}</span>
                </div>

                <CourseStepper step={step} />

                <div className="mt-8">
                    {step === 1 && <CourseBasicInfoStep />}
                    {step === 2 && <CourseCategoryStep />}
                    {step === 3 && <CoursePricingStep />}
                    {step === 4 && <CoursePublishStep />}
                </div>
            </div>
        </div>
    )
}
