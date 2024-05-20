import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../../app/apiService";

export const fetchTrendingData = createAsyncThunk("movies/fetch", async () => {
  const res = await apiService.get("/trending/all/week");
  console.log("fetchMovies", res);
  return res.data;
});
