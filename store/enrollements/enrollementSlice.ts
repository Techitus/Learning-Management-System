import { createSlice } from "@reduxjs/toolkit";
import { IEnrollmentState } from "./types";
import { Status } from "@/types/status.types";
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


