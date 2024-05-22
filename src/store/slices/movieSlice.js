import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTrendingAll,
  fetchNowPlayingMovie,
  fetchTopRatedMovie,
  fetchMovieAndTVDetail,
  fetchMovieAndTVCredits,
} from "../thunks/fetchMovies";

const initialState = {
  dataTrendingAll: [],
  dataNowPlayingMovie: [],
  dataTopRatedMovie: [],
  dataMovieAndTVDetail: [],
  dataMovieAndTVCredits: [],
};

const movieSlice = createSlice({
  name: "movies",
  initialState: initialState,
  extraReducers(builder) {
    builder.addCase(fetchTrendingAll.fulfilled, (state, action) => {
      state.dataTrendingAll = action.payload;
    });
    builder.addCase(fetchNowPlayingMovie.fulfilled, (state, action) => {
      state.dataNowPlayingMovie = action.payload;
    });
    builder.addCase(fetchTopRatedMovie.fulfilled, (state, action) => {
      state.dataTopRatedMovie = action.payload;
    });
    builder.addCase(fetchMovieAndTVDetail.fulfilled, (state, action) => {
      state.dataMovieAndTVDetail = action.payload;
    });
    builder.addCase(fetchMovieAndTVCredits.fulfilled, (state, action) => {
      state.dataMovieAndTVCredits = action.payload;
    });
  },
});

export const movieReducer = movieSlice.reducer;
