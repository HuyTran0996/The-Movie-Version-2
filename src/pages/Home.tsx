import React, { useState, useEffect } from "react";
import { useAppSelector, useThunk } from "../hook/useThunk";
import { fetchTrendingAll } from "../store/thunks/fetchMovies";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dataTrendingAll } = useAppSelector((state) => state.movies);
  const runThunk = useThunk(fetchTrendingAll);

  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await runThunk();
      console.log(`data: `, data);
    } catch (err: any) {
      setError(err);
      console.log(`error: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return <div>Home</div>;
};

export default Home;
