import { configureStore } from '@reduxjs/toolkit'
import categorySlice from './category/categorySlice'
import userSlice from './users/userSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        categories : categorySlice,
        users: userSlice
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']