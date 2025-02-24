import { createSlice } from "@reduxjs/toolkit";
import { IUsersInitialState } from "./types";
import { Status } from "@/types/status.types";
import { AppDispatch } from "../store";
import API from "@/http";
const usersDatas: IUsersInitialState = {
    users: [],
    status: Status.LOADING,
};

const userSlice =createSlice({
    name: 'users',
    initialState : usersDatas,
    reducers:{
        setStatus(state, action) {
            state.status = action.payload;
        },
        setUsers(state,action){
            state.users = action.payload;
        },
        deleteUsersByIndex(state, action) {
            const index = state.users.findIndex(
                (user) => user._id === action.payload
            );
            if (index !== -1) {
                state.users.splice(index, 1);
            }
        }
    }
})
export const {setStatus,setUsers,deleteUsersByIndex} = userSlice.actions
export default  userSlice.reducer

export async function fetchUsers(){
    return async function fetchUserThunk(dispatch: AppDispatch){
        try{
            const response = await API.get('/users')
            if(response.status === 200){
                dispatch(setUsers(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
                console.error(response.data.message)
            }
        }catch(err){
            dispatch(setStatus(Status.ERROR))
            console.error(err)
        }
    }
}

export async function deleteUser(id:string){
return async function deleteUserThunk(dispatch:AppDispatch){
    try{
      const response = await API.delete('/users'+id)
      if(response.status === 200){
        dispatch(setStatus(Status.SUCCESS))
        dispatch(deleteUsersByIndex(id))
      }else{
        dispatch(setStatus(Status.ERROR))
      }
    }catch(err){
        dispatch(setStatus(Status.ERROR))
        console.error(err)

    }
}
}