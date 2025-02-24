import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUsers, IUsersInitialState } from "./types";
import { Status } from "@/types/status.types";
import { AppDispatch } from "../store";
import API from "@/http";
import { Role } from "@/database/models/user.schema";
const usersDatas: IUsersInitialState = {
    users: [],
    status: Status.LOADING,
};

const userSlice = createSlice({
    name: 'users',
    initialState : usersDatas,
    reducers: {
        setUsers: (state, action: PayloadAction<IUsers[]>) => {
            state.users = action.payload;
            state.status = Status.SUCCESS;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        deleteUser: (state, action: PayloadAction<string>) => {
            state.users = state.users.filter(user => user._id !== action.payload);
        },
        updateUserRole: (state, action: PayloadAction<{ userId: string; role: Role }>) => {
            state.users = state.users.map(user =>
                user._id === action.payload.userId 
                    ? { ...user, role: action.payload.role }
                    : user
            );
        }
    }
});

export const { setUsers, setStatus, deleteUser, updateUserRole } = userSlice.actions;
export default userSlice.reducer
export const fetchUsers = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setStatus(Status.LOADING));
        const response = await API.get('/users');
        if (response.status === 200) {
            dispatch(setUsers(response.data.data));
        } else {
            dispatch(setStatus(Status.ERROR));
        }
    } catch (error) {
        dispatch(setStatus(Status.ERROR));
        console.error('Error fetching users:', error);
    }
};

export const deleteUserById = (userId: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await API.delete(`/users/${userId}`);
        if (response.status === 200) {
            dispatch(deleteUser(userId));
        }
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};

export const promoteToTeacher = (userId: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await API.patch(`/users/${userId}`, { role: Role.Teacher });
        if (response.status === 200) {
            dispatch(updateUserRole({ userId, role: Role.Teacher }));
        }
    } catch (error) {
        console.error('Error promoting user:', error);
    }
};

