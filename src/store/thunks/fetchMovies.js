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
