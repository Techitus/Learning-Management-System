import {createSlice } from '@reduxjs/toolkit'
import { ICategoryInitialState } from './types'
import { Status } from '@/types/status.types'

const categoryDatas : ICategoryInitialState = {
    categories : [],
    status : Status.LOADING,
}
const categorySlice = createSlice({
    name : 'category',
    initialState : categoryDatas,
    reducers :{
        setStatus(state,action){
            state.status = action.payload
        },setCategories(state,action){
            state.categories = action.payload
        }
    }
})

 export const {setCategories,setStatus} = categorySlice.actions
export default categorySlice.reducer