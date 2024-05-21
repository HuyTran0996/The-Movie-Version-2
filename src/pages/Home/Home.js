import React, { useEffect } from "react";

import { useThunk } from "../../hook/use-thunk";
import { fetchTrendingAll } from "../../store/thunks/fetchMovies";

import BannerHome from "../../components/BannerHome/BannerHome";
import "./Home.scss";

const Home = () => {
  const [doFetchTrendingAll, isLoading, loadingError] =
    useThunk(fetchTrendingAll);

  useEffect(() => {
    doFetchTrendingAll();
  }, []);
  return (
    <div className="home">
      {isLoading ? (
        <p>Loading...</p>
      ) : loadingError ? (
        <p>Error loading data</p>
      ) : (
        <>
          <BannerHome />
        </>
      )}
    </div>
  );
};

export default Home;
