import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { CourseBuilderState } from "../types/course.types"
import { submitCourse } from "../thunk/course.thunk";

const initialState: CourseBuilderState = {
    id: undefined,
    step: 1,

    title: "",
    description: "",

    category: "",
    courseLevel: "",
    courseSkills: [],

    courseType: "paid",

    price: 0,
    creditCost: 0,

    thumbnailUrl: "",

    status: "draft",

    isSubmitting: false
}



const courseBuilderSlice = createSlice({
    name: "courseBuilder",
    initialState,

    reducers: {

        updateField(
            state,
            action: PayloadAction<{ field: keyof CourseBuilderState; value: any }>
        ) {
            (state as any)[action.payload.field] = action.payload.value
        },

        updateFields(state, action: PayloadAction<Partial<CourseBuilderState>>) {
            Object.assign(state, action.payload)
        },

        setCourse(state, action: PayloadAction<CourseBuilderState>) {
            return {
                ...action.payload,
                step: state.step // preserve current step if needed, or maybe reset to 1? usually reset to 1 for new edit page
            }
        },

        nextStep(state) {
            state.step += 1
        },

        prevStep(state) {
            state.step -= 1
        },

        resetCourse() {
            return initialState
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitCourse.pending, (state) => {
                state.isSubmitting = true;
            })
            .addCase(submitCourse.fulfilled, (state) => {
                state.isSubmitting = false;
            })
            .addCase(submitCourse.rejected, (state) => {
                state.isSubmitting = false;
            });
    }
})

export const { updateField, updateFields, setCourse, nextStep, prevStep, resetCourse } =
    courseBuilderSlice.actions

export default courseBuilderSlice.reducer