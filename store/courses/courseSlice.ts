import { createSlice} from "@reduxjs/toolkit";
import {  ICoursesInitialState } from "./types";
import { Status } from "@/types/status.types";
import { AppDispatch } from "../store";
import API from "@/http";


const courseDatas: ICoursesInitialState = {
    courses: [] ,
    status: Status.LOADING,
};

const courseSlice =createSlice({
    name : "course",
    initialState :courseDatas,
    reducers:{
        setStatus(state,action){
            state.status = action.payload;
        },
        setCourse(state,action){
            state.courses = action.payload;
        },addCourses(state, action) {
            const courseToAdd = action.payload;
                        const exists = state.courses.some(course => 
                course._id === courseToAdd._id
            );
            
            if (!exists) {
                state.courses.push(courseToAdd);
            }
        },resetStatus(state){
            state.status = Status.LOADING;
        },updateCoursesInState(state, action) {
            const index = state.courses.findIndex(
                (course) => course._id === action.payload._id
            );
            if (index !== -1) {
                state.courses[index] = action.payload;
            }
        },
        deleteCourseByIndex(state, action) {
            const index = state.courses.findIndex(
                (course) => course._id === action.payload
            );
            if (index !== -1) {
                state.courses.splice(index, 1);
            }
        }
    }
})
export const {setStatus,setCourse,resetStatus,addCourses,updateCoursesInState,deleteCourseByIndex} = courseSlice.actions

export default courseSlice.reducer;


export function fetchCourses(){
    return async function fetchCoursesThunk(dispatch:AppDispatch){
        try{
            const response = await API.get('/course')
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS));
                dispatch(setCourse(response.data.data));
            }else{
                dispatch(setStatus(Status.ERROR));
            }
        }catch(err){
            console.error(err);
            dispatch(setStatus(Status.ERROR));
        }
    }
}

export function createCourse(data: FormData) {
    return async function createCourseThunk(dispatch: AppDispatch) {
        try {
            const response = await API.post("/course", data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }); 
            if (response.status === 200) {
                if (response.data && response.data.data) {
                    dispatch(addCourses(response.data.data));
                    dispatch(setStatus(Status.SUCCESS));
                }} else {
                dispatch(setStatus(Status.ERROR));
            }
        } catch (err) {
            console.error("Error creating course:", err);
            dispatch(setStatus(Status.ERROR));
        }
    };
}



export function updateCourse(id: string, data: FormData) {
    return async function updateCourseThunk(dispatch: AppDispatch) {
        try {
            const response = await API.patch(`/course/${id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data", 
                },
            });

            if (response.status === 200) {
                dispatch(setStatus(Status.SUCCESS));
                dispatch(updateCoursesInState(response.data.data));
            } else {
                dispatch(setStatus(Status.ERROR));
            }
        } catch (err) {
            console.error("Error updating course:", err);
            dispatch(setStatus(Status.ERROR));
        }
    };
}


export function deleteCourse(id : string){
    return async function deleteCourseThunk(dispatch:AppDispatch){
        try{
            const response = await API.delete(`/course/${id}`)
             if(response.status === 200){
                 dispatch(setStatus(Status.SUCCESS));
                 dispatch(deleteCourseByIndex(id));
                }else{
                 dispatch(setStatus(Status.ERROR));
             }
        }catch(err){
            console.error(err);
            dispatch(setStatus(Status.ERROR));
        }
    }
}