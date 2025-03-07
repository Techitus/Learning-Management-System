import { createSlice } from "@reduxjs/toolkit";
import {  ILessonInitialState } from "./types";
import { Status } from "@/types/status.types";
import { AppDispatch } from "../store";
import API from "@/http";

const lessonDatas: ILessonInitialState = {
    lessons: [] ,
    status: Status.LOADING,
    };
    const lessonSlice = createSlice({
    name : "lessons",
    initialState : lessonDatas,
    reducers:{
        setStatus(state,action){
            state.status = action.payload;
        },
        setLesson(state,action){
            state.lessons = action.payload;
        },addLesson(state, action) {
            state.lessons.push(action.payload);
        },resetStatus(state){
            state.status = Status.LOADING;
        },
        deleteLessonByIndex(state, action) {
            const index = state.lessons.findIndex(
                (lesson) => lesson._id === action.payload
            );
            if (index !== -1) {
                state.lessons.splice(index, 1);
            }
        }
    }
})
export const {setStatus,setLesson,resetStatus,addLesson,deleteLessonByIndex} = lessonSlice.actions
export default lessonSlice.reducer;

export function fetchLessons(id:string){
    return async function fetchLessonsThunk(dispatch:AppDispatch){
        try {
            //get request ma query ko from ma data pass lesson?courseId="
            const response = await API.get("/lesson?courseId=" + id)
            if(response.status == 200){
                dispatch(setLesson(response.data.data))
            }else{
                dispatch(setLesson([]))
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setLesson([]))
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}
export function createLesson(data:FormData){
    return async function createLessonThunk(dispatch:AppDispatch){
        try {
            const response = await API.post("/lesson",data,{headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            )
            if(response.status == 201){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(addLesson(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function deleteLesson(id:string){
    return async function deleteLessonThunk(dispatch:AppDispatch){
        try {
            const response = await API.delete("/lesson/" + id)
            if(response.status == 200){
                dispatch(deleteLessonByIndex(id))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}