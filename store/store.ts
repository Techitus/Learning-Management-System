import { configureStore } from '@reduxjs/toolkit'
import categorySlice from './category/categorySlice'
import userSlice from './users/userSlice'
import courseSlice from './courses/courseSlice'
import lessonSlice from './Lessons/lessonSlice'
import noteSlice from './Notes/noteSlice'
export const makeStore = () => {
  return configureStore({
    reducer: {
        categories : categorySlice,
        users: userSlice,
        courses : courseSlice,
        lessons : lessonSlice,
        notes : noteSlice

    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']