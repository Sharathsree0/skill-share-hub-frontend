import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import type { RootState } from "../../../store/store"
import { updateFields, nextStep } from "../slice/courseCreationSlice"

const basicInfoSchema = z.object({
    title: z.string()
        .min(5, "Title must be at least 5 characters")
        .max(80, "Title cannot exceed 80 characters"),
    description: z.string()
        .min(20, "Description must be at least 20 characters")
        .max(1000, "Description cannot exceed 1000 characters"),
    category: z.string().min(1, "Please select a category"),
    courseLevel: z.enum(["Beginner", "Intermediate", "Expert"]),
})

type BasicInfoFormValues = z.infer<typeof basicInfoSchema>

export default function CourseBasicInfoStep() {
    const dispatch = useDispatch()
    const course = useSelector((state: RootState) => state.courseBuilder)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<BasicInfoFormValues>({
        resolver: zodResolver(basicInfoSchema),
        defaultValues: {
            title: course.title || "",
            description: course.description || "",
            category: course.category || "",
            courseLevel: (course.courseLevel as any) || "Beginner",
        },
    })

    useEffect(() => {
        setValue("title", course.title || "")
        setValue("description", course.description || "")
        setValue("category", course.category || "Design & Creative")
        if (["Beginner", "Intermediate", "Expert"].includes(course.courseLevel)) {
            setValue("courseLevel", course.courseLevel as any)
        }
    }, [course, setValue])

    const onSubmit = (data: BasicInfoFormValues) => {
        dispatch(updateFields(data))
        dispatch(nextStep())
    }

    const titleValue = watch("title") || ""
    const descriptionValue = watch("description") || ""
    const courseLevelValue = watch("courseLevel")

    return (
        <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10 max-w-3xl mx-auto">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Basic Course Information</h2>
                <p className="text-gray-500 text-sm">Let's start with the fundamentals. This information will appear on your course landing page.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Title */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-semibold text-gray-900">Course Title</label>
                        <span className="text-xs text-gray-400 font-medium">{titleValue.length} / 80</span>
                    </div>
                    <input
                        {...register("title")}
                        placeholder="e.g. Mastering Modern UI Design Systems"
                        className={`w-full border ${errors.title ? "border-red-500" : "border-gray-200"} rounded-lg px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-shadow`}
                        maxLength={80}
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
                    <p className="mt-2 text-xs text-gray-500 italic">A catchy title helps your course stand out in the marketplace.</p>
                </div>

                {/* Description */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-semibold text-gray-900">Course Description</label>
                        <span className="text-xs text-gray-400 font-medium">{descriptionValue.length} / 1000</span>
                    </div>
                    <textarea
                        {...register("description")}
                        rows={5}
                        placeholder="Describe what students will learn in this course..."
                        className={`w-full border ${errors.description ? "border-red-500" : "border-gray-200"} rounded-lg px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-shadow resize-none`}
                        maxLength={1000}
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>}
                    <div className="mt-2 flex items-center text-xs text-gray-500">
                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        Use Markdown for formatting your description.
                    </div>
                </div>

                {/* Category & Difficulty */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Category</label>
                        <div className="relative">
                            <select
                                {...register("category")}
                                className={`w-full appearance-none border ${errors.category ? "border-red-500" : "border-gray-200"} rounded-lg px-4 py-3 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent cursor-pointer`}
                            >
                                <option value="" disabled>Select category</option>
                                <option value="Design & Creative">Design & Creative</option>
                                <option value="Development">Development</option>
                                <option value="Business">Business</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                        {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Course Level</label>
                        <div className="flex space-x-2">
                            {["Beginner", "Intermediate", "Expert"].map((level) => (
                                <button
                                    key={level}
                                    type="button"
                                    onClick={() => setValue("courseLevel", level as any)}
                                    className={`flex-1 py-3 text-sm font-medium rounded-lg border focus:outline-none transition-colors ${courseLevelValue === level
                                        ? "bg-green-50 border-green-600 text-green-700"
                                        : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                                        }`}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                        {errors.courseLevel && <p className="mt-1 text-sm text-red-500">{errors.courseLevel.message}</p>}
                    </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <button
                        type="button"
                        className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center transition-colors"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        Cancel
                    </button>

                    <div className="flex space-x-3">
                        <button
                            type="submit"
                            className="flex items-center px-6 py-2.5 bg-[#1F5E45] hover:bg-[#164733] text-white rounded-lg text-sm font-medium transition-colors"
                        >
                            Next Step
                            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}