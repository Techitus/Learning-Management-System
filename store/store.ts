import { configureStore } from "@reduxjs/toolkit";
import categorySlice from './category/categorySlice'

configureStore({
    reducer : {
        category : categorySlice
    }
})