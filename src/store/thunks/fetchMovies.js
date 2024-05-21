import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../../app/apiService";

export const fetchTrendingAll = createAsyncThunk(
  "moviesAndTVs/fetchTrendingAll",
  async () => {
    const res = await apiService.get("/trending/all/week?language=en-US");
    console.log("fetchTrendingAll", res);
    return res.data;
  }
);
export const fetchNowPlayingMovie = createAsyncThunk(
  "movies/fetchNowPlayingMovie",
  async () => {
    const res = await apiService.get(
      "/movie/now_playing?language=en-US&page=1"
    );
    console.log("fetchNowPlayingMovie", res);
    return res.data;
  }
);
export const fetchTopRatedMovie = createAsyncThunk(
  "movies/fetchTopRatedMovie",
  async () => {
    const res = await apiService.get("/movie/top_rated?language=en-US&page=1");
    console.log("fetchTopRatedMovie", res);
    return res.data;
  }
);
