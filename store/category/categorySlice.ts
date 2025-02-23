import { createSlice } from '@reduxjs/toolkit';
import { ICategoryInitialState } from './types';
import { Status } from '@/types/status.types';
import { AppDispatch } from '../store';
import API from '@/http';

const categoryDatas: ICategoryInitialState = {
    categories: [],
    status: Status.LOADING,
};

const categorySlice = createSlice({
    name: 'category',
    initialState: categoryDatas,
    reducers: {
        setStatus(state, action) {
            state.status = action.payload;
        },
        setCategories(state, action) {
            state.categories = action.payload;
        },
        resetStatus(state) {
            state.status = Status.LOADING;
        },
        addCategories(state, action) {
            state.categories.push(action.payload);
        },
        updateCategoryInState(state, action) {
            const index = state.categories.findIndex(
                (category) => category._id === action.payload._id
            );
            if (index !== -1) {
                state.categories[index] = action.payload;
            }
        },
        deleteCategoryByIndex(state, action) {
            const index = state.categories.findIndex(
                (category) => category._id === action.payload
            );
            if (index !== -1) {
                state.categories.splice(index, 1);
            }
        }
    }
});

export const {setCategories,setStatus,resetStatus,addCategories,deleteCategoryByIndex,updateCategoryInState} = categorySlice.actions;

export default categorySlice.reducer;

export function fetchCategories() {
    return async function fetchCategoriesThunk(dispatch: AppDispatch) {
        try {
            const response = await API.get('/category');
            if (response.status === 200) {
                dispatch(setCategories(response.data.data));
            } else {
                dispatch(setStatus(Status.ERROR));
                console.error(response.data.message);
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR));
            console.error(error);
        }
    };
}

export function createCategory(data: { name: string }) {
    return async function createCategoryThunk(dispatch: AppDispatch) {
        try {
            const response = await API.post('/category', data);
            if (response.status === 200) {
                dispatch(setStatus(Status.SUCCESS));
                dispatch(addCategories(response.data.data));
            } else {
                dispatch(setStatus(Status.ERROR));
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR));
            console.error(error);
        }
    };
}

export function updateCategory(data: { id: string; name: string }) {
    return async function updateCategoryThunk(dispatch: AppDispatch) {
        try {
            const response = await API.patch(`/category/${data.id}`, { name: data.name });
            if (response.status === 200) {
                dispatch(setStatus(Status.SUCCESS));
                dispatch(updateCategoryInState(response.data.data));
            } else {
                dispatch(setStatus(Status.ERROR));
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR));
            console.error(error);
        }
    };
}

export function deleteCategory(id: string) {
    return async function deleteCategoryThunk(dispatch: AppDispatch) {
        try {
            const response = await API.delete('/category/' + id);
            if (response.status === 200) {
                dispatch(setStatus(Status.SUCCESS));
                dispatch(deleteCategoryByIndex(id));
            } else {
                dispatch(setStatus(Status.ERROR));
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR));
            console.error(error);
        }
    };
}