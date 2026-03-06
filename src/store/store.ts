import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import courseCreationReducer from '../features/courses/slice/courseCreationSlice'

const store = configureStore({
  reducer: {
    user: authReducer,
    courseBuilder: courseCreationReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;