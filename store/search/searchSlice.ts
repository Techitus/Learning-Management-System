import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { SearchResults, SearchState } from './types';

const initialState: SearchState = {
  query: '',
  results: {
    courses: [],
    users: [],
  },
  loading: false,
  error: null,
};


export const performSearch = createAsyncThunk(
  'search/performSearch',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error('Search failed');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    clearSearch: (state) => {
      state.query = '';
      state.results = {
        courses: [],
        users: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(performSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(performSearch.fulfilled, (state, action: PayloadAction<SearchResults>) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(performSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setQuery, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;

