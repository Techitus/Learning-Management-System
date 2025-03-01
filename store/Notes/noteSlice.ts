import { createSlice } from "@reduxjs/toolkit";
import { Status } from "@/types/status.types";
import { AppDispatch } from "../store";
import API from "@/http";
import { INotes, INotesInitialState } from "./types";

const notesDatas: INotesInitialState = {
    notes: [] ,
    status: Status.LOADING,
    };
    const noteSlice = createSlice({
    name : "notes",
    initialState : notesDatas,
    reducers:{
        setStatus(state,action){
            state.status = action.payload;
        },
        setNotes(state,action){
            state.notes = action.payload;
        },addNotes(state, action) {
            state.notes.push(action.payload);
        },resetStatus(state){
            state.status = Status.LOADING;
        },
        deleteNotesByIndex(state, action) {
            const index = state.notes.findIndex(
                (note) => note._id === action.payload
            );
            if (index !== -1) {
                state.notes.splice(index, 1);
            }
        }
    }
})
export const {setStatus,setNotes,resetStatus,addNotes,deleteNotesByIndex} = noteSlice.actions
export default noteSlice.reducer;

export function fetchNotes(id:string){
    return async function fetchNotesThunk(dispatch:AppDispatch){
        try {
            //get request ma query ko from ma data pass lesson?courseId="
            const response = await API.get("/notes?courseId=" + id)
            if(response.status == 200){
                dispatch(setNotes(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setNotes([]))
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}
export function createNotes(data:INotes){
    return async function createNotesThunk(dispatch:AppDispatch){
        try {
            const response = await API.post("/notes",data)
            if(response.status == 201){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(addNotes(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function deleteNote(id:string){
    return async function deleteNoteThunk(dispatch:AppDispatch){
        try {
            const response = await API.delete("/notes/" + id)
            if(response.status == 200){
                dispatch(deleteNotesByIndex(id))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}