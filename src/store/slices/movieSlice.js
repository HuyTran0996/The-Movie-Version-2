import { createSlice } from "@reduxjs/toolkit";
import { fetchTrendingData } from "../thunks/fetchMovies";

const initialState = {
  bannerData: [],
  imageURL: "",
};

const movieSlice = createSlice({
  name: "movies",
  initialState: initialState,
  reducers: {
    setBannerData: (state, action) => {
      state.bannerData = action.payload;
    },
    setImageURL: (state, action) => {
      state.imageURL = action.payload;
    },
  },
});

export const movieReducer = movieSlice.reducer;
