import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchTrendingAll } from "../thunks/fetchMovies";

const initialState = {
  dataTrendingAll: [],
};

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTrendingAll.fulfilled, (state, action) => {
      state.dataTrendingAll = action.payload;
    });
  },
});

export const movieReducer = movieSlice.reducer;
