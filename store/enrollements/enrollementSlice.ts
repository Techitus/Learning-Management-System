import { createSlice } from "@reduxjs/toolkit";
import { IEnrollmentState } from "./types";
import { Status } from "@/types/status.types";
import { AppDispatch } from "../store";
import API from "@/http";
import { EnrollmentStatus } from "@/database/models/enrolement.schema";
const enrollemtDatas: IEnrollmentState = {
    enrollments: [] ,
    status: Status.LOADING,
    };
const enrollmentSlice =createSlice({
    name : "enrollment",
    initialState : enrollemtDatas,
    reducers : {
        setStatus(state,action){
            state.status = action.payload;
        },
        setEnrollment(state,action){
            state.enrollments = action.payload;
        },
        addEnrollment(state, action) {
            state.enrollments.push(action.payload);
        },
        resetStatus(state){
            state.status = Status.LOADING;
        },
        deleteEnrollmentByIndex(state, action) {
            const index = state.enrollments.findIndex(
                (enrollment) => enrollment._id === action.payload
            );
            if (index !== -1) {
                state.enrollments.splice(index, 1);
            }
        }
    }

})
export const {setStatus,setEnrollment,resetStatus,addEnrollment,deleteEnrollmentByIndex} = enrollmentSlice.actions
export default enrollmentSlice.reducer;

export function createEnrollment(data: FormData) {
    return async function createEnrollmentThunk(dispatch: AppDispatch) {
        try {
            const response = await API.post("/enrollment", data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }); 
            if (response.status === 200) {
                dispatch(setStatus(Status.SUCCESS));
                dispatch(addEnrollment(response.data.data));
            } else {
                dispatch(setStatus(Status.ERROR));
            }
        } catch (err) {
            console.error("Error creating course:", err);
            dispatch(setStatus(Status.ERROR));
        }
    };
}

export function fetchEnrollments(){
    return async function fetchEnrollmentsThunk(dispatch:AppDispatch){
        try {
            const response = await API.get('/enrollment')
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS));
                dispatch(setEnrollment(response.data.data));
            }else{
                dispatch(setStatus(Status.ERROR));
            }
        }catch(err){
            console.error(err);
       dispatch(setStatus(Status.ERROR));
        }
}
}
export function fetchEnrollment(id:string){
    return async function fetchEnrollmentThunk(dispatch:AppDispatch){
        try {
            const response = await API.get(`/enrollment/${id}`)
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS));
                dispatch(setEnrollment(response.data.data));
            }else{
                dispatch(setStatus(Status.ERROR));
            }
        }catch(err){
            console.error(err);
       dispatch(setStatus(Status.ERROR));
        }
}
}
export function deleteEnrollment(id: string) {
    return async function deleteEnrollmentThunk(dispatch: AppDispatch) {
        try {
            const response = await API.delete(`/enrollment/${id}`);
            if (response.status === 200) {
                dispatch(setStatus(Status.SUCCESS));
                dispatch(deleteEnrollmentByIndex(id));
            } else {
                dispatch(setStatus(Status.ERROR));
            }
        } catch (err) {
            console.error("Error deleting course:", err);
            dispatch(setStatus(Status.ERROR));
        }
    };
}

export function changeEnrollmentStatus(status:EnrollmentStatus,id:string){
    return async function changeEnrollmentStatusThunk(dispatch:AppDispatch){
        try {
            const response = await API.patch(`/enrollment/${id}`,{status : status})
            if(response.status == 200){
                dispatch(setStatus(Status.SUCCESS))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.error(error)
            dispatch(setStatus(Status.ERROR))
        
        }
    }
}