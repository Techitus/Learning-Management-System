import { createSlice } from "@reduxjs/toolkit";
import { ICourses, ICoursesInitialState } from "./types";
import { Status } from "@/types/status.types";
import { AppDispatch } from "../store";
import API from "@/http";


const courseDatas: ICoursesInitialState = {
    courses: [],
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
export const {setStatus,setCourse,resetStatus,updateCoursesInState,deleteCourseByIndex} = courseSlice.actions

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

export function createCourse(data : ICourses){
    return async function createCourseThunk(dispatch:AppDispatch){
        try{
            const response = await API.post('/course',data)
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

export function updateCourse(data : ICourses){  
    return async function updateCourseThunk(dispatch:AppDispatch){
        try{
            const response = await API.patch(`/course/${data._id}`,data)
             if(response.status === 200){
                 dispatch(setStatus(Status.SUCCESS));
                 dispatch(updateCoursesInState(response.data.data));
             }else{
                 dispatch(setStatus(Status.ERROR));
             }
        }catch(err){
            console.error(err);
            dispatch(setStatus(Status.ERROR));
        }
    }
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