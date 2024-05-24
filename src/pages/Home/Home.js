import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { useThunk } from "../../hook/use-thunk";
import {
  fetchTrendingAll,
  fetchNowPlayingMovie,
  fetchTopRatedMovie,
} from "../../store/thunks/fetchMovies";
import { fetchPopularTV, fetchOnTheAirTV } from "../../store/thunks/fetchTV";

import BannerHome from "../../components/BannerHome/BannerHome";
import "./Home.scss";
import CarouselList from "../../components/CarouselList/CarouselList";
import Loading from "../../components/Loading/Loading";

const Home = () => {
  //Movie
  const [doFetchTrendingAll, isLoading, loadingError] =
    useThunk(fetchTrendingAll);

  const [doFetchNowPlaying, isLoadingNowPlaying, loadingNowPlayingError] =
    useThunk(fetchNowPlayingMovie);

  const [doFetchTopRated, isLoadingTopRated, loadingTopRatedError] =
    useThunk(fetchTopRatedMovie);

  //TV
  const [doFetchPopularTV, isLoadingPopularTV, loadingPopularTVError] =
    useThunk(fetchPopularTV);
  const [doFetchOnTheAirTV, isLoadingOnTheAirTV, loadingOnTheAirTVError] =
    useThunk(fetchOnTheAirTV);

  //get data from store
  const { dataTrendingAll, dataNowPlayingMovie, dataTopRatedMovie } =
    useSelector((state) => {
      return state.movies;
    });
  const { dataPopularTV, dataOnTheAir } = useSelector((state) => {
    return state.tvs;
  });

  useEffect(() => {
    doFetchTrendingAll();
    doFetchNowPlaying();
    doFetchTopRated();
    //TV
    doFetchPopularTV();
    doFetchOnTheAirTV();
  }, []);

  if (isLoading || isLoadingNowPlaying || isLoadingTopRated) {
    return <Loading />;
  }
  if (loadingError || loadingNowPlayingError || loadingTopRatedError) {
    return <p>Error loading data</p>;
  } else {
    return (
      <div className="home">
        <>
          <BannerHome />
          <div className="homeCarousel">
            <CarouselList data={dataTrendingAll} heading={"Trending"} />
            <CarouselList
              data={dataNowPlayingMovie}
              heading={"Now Playing"}
              media_type={"movie"}
            />
            <CarouselList
              data={dataTopRatedMovie}
              heading={"Top Rated Movies"}
              media_type={"movie"}
            />

            <CarouselList
              data={dataPopularTV}
              heading={"Popular TV Show"}
              media_type={"tv"}
            />
            <CarouselList
              data={dataOnTheAir}
              heading={"On The Air"}
              media_type={"tv"}
            />
          </div>
        </>
      </div>
    );
  }
};

export default Home;
