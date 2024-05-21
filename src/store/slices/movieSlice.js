import { createSlice } from "@reduxjs/toolkit";
import { fetchTrendingAll } from "../thunks/fetchMovies";

const initialState = {
  dataTrendingAll: [],
  dataPopularMovie: null,
  dataUpComing: null,
  dataTopRated: null,
  dataSearch: null,
  dataFilter: null,
  dataDetail: null,
};

const movieSlice = createSlice({
  name: "movies",
  initialState: initialState,
  extraReducers(builder) {
    builder.addCase(fetchTrendingAll.fulfilled, (state, action) => {
      state.dataTrendingAll = action.payload;
    });
  },
});

export const movieReducer = movieSlice.reducer;
