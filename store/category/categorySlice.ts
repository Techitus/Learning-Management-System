import {createSlice } from '@reduxjs/toolkit'
import { ICategoryInitialState } from './types'
import { Status } from '@/types/status.types'
import { AppDispatch } from '../store'
import API from '@/http'

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

export function fetchCategories(){
    return async function fetchCategoriesThunk(dispatch :AppDispatch ){
        try{
            const response = await API.get('/category')
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setCategories(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
                console.error(response.data.message)
            }

        }catch(error){
            dispatch(setStatus(Status.ERROR))
            console.error(error)
        }
    }
}