import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import "./DetailsPage.scss";

import { useThunk } from "../../hook/use-thunk";
import CarouselList from "../../components/CarouselList/CarouselList";
import VideoPlay from "../../components/VideoPlay/VideoPlay";
import {
  fetchMovieAndTVDetail,
  fetchMovieAndTVCredits,
  fetchMovieAndTVSimilar,
  fetchMovieAndTVRecommendations,
} from "../../store/thunks/fetchMovies";
import Loading from "../../components/Loading/Loading";

import noPoster from "../../assets/no-poster.png";

const IMG_URL_BANNER = "https://image.tmdb.org/t/p/original";
const IMG_URL = "https://image.tmdb.org/t/p/w400";

const DetailsPage = () => {
  const [playVideo, setPlayVideo] = useState(false);

  const params = useParams();

  /////////Call useThunk//////////////
  const [doFetchMovieAndTVDetail, isLoading, loadingError] = useThunk(
    fetchMovieAndTVDetail
  );
  const [doFetchMovieAndTVCredits, isLoadingCredits, loadingErrorCredits] =
    useThunk(fetchMovieAndTVCredits);
  const [doFetchMovieAndTVSimilar, isLoadingSimilar, loadingErrorSimilar] =
    useThunk(fetchMovieAndTVSimilar);
  const [
    doFetchMovieAndTVRecommendations,
    isLoadingRecommendations,
    loadingErrorRecommendations,
  ] = useThunk(fetchMovieAndTVRecommendations);
  ///////////////Get data from redux store///
  const {
    dataMovieAndTVDetail,
    dataMovieAndTVCredits,
    dataMovieAndTVSimilar,
    dataMovieAndTVRecommendations,
  } = useSelector((state) => {
    return state.movies;
  });

  const fetch = () => {
    doFetchMovieAndTVDetail(`/${params.explore}/${params.id}`);
    doFetchMovieAndTVCredits(`/${params.explore}/${params.id}`);
    doFetchMovieAndTVSimilar(`/${params.explore}/${params.id}`);
    doFetchMovieAndTVRecommendations(`/${params.explore}/${params.id}`);
  };

  useEffect(() => {
    fetch();
  }, [params]);

  const handlePlayVideo = (e) => {
    e.preventDefault();
    setPlayVideo(true);
  };

  const duration = (dataMovieAndTVDetail?.runtime / 60)?.toFixed(1)?.split(".");

  const Ifwriter = dataMovieAndTVCredits?.crew
    ?.filter((el) => el?.job === "Writer")
    ?.map((el) => el?.name);

  const writer =
    Ifwriter.length > 0
      ? Ifwriter.join(", ")
      : "No writer information available";

  const Ifcast = dataMovieAndTVCredits?.cast
    ?.filter((e) => e.profile_path)
    .slice(0, 20)
    .map((actor, index) => {
      return (
        <div className="actor">
          <img src={IMG_URL + actor.profile_path} alt="" />
          <p>{actor.name}</p>
        </div>
      );
    });
  const cast = Ifcast.length > 0 ? Ifcast : "No cast information available";

  if (
    isLoading ||
    isLoadingCredits ||
    isLoadingSimilar ||
    isLoadingRecommendations
  ) {
    return <Loading />;
  }

  if (
    loadingError ||
    loadingErrorCredits ||
    loadingErrorSimilar ||
    loadingErrorRecommendations
  ) {
    return <p>Error loading data</p>;
  } else {
    return (
      <div className="detailPage">
        <div className="banner">
          <div className="imgBanner">
            <img
              src={
                dataMovieAndTVDetail?.backdrop_path
                  ? IMG_URL_BANNER + dataMovieAndTVDetail?.backdrop_path
                  : noPoster
              }
              alt="BANNER"
            />
            <div className="blurring"></div>
          </div>
        </div>

        <div className="avatar">
          <img
            src={
              dataMovieAndTVDetail?.poster_path
                ? IMG_URL + dataMovieAndTVDetail?.poster_path
                : noPoster
            }
            alt="Poster"
          />
          <button onClick={handlePlayVideo}>Trailer</button>
        </div>

        <div className="content">
          <h1 className="title">
            {dataMovieAndTVDetail?.title || dataMovieAndTVDetail?.name}
          </h1>
          <p>{dataMovieAndTVDetail?.tagline}</p>

          <div className="divider"></div>

          <div className="rating">
            <p>
              <span>Rating: </span>
              {Number(dataMovieAndTVDetail?.vote_average).toFixed(1)}+
            </p>
            <span className="line">|</span>
            <p>
              <span>View: </span>
              {Number(dataMovieAndTVDetail?.vote_count)}
            </p>
            <span className="line">|</span>
            <p>
              <span>Duration: </span>
              {duration[0]}h {duration[1]}m
            </p>
          </div>
          <div className="divider"></div>

          <div className="overview">
            <h3>Overview</h3>
            <p>{dataMovieAndTVDetail?.overview}</p>
            <div className="divider"></div>
            <div className="status">
              <p>
                <span>Status: </span>
                {dataMovieAndTVDetail?.status}
              </p>
              <span className="line">|</span>
              <p>
                <span> Release Date: </span>

                {moment(dataMovieAndTVDetail?.release_date).format(
                  "MMMM Do YYYY"
                )}
              </p>
              <span className="line">|</span>
              <p>
                <span>Revenue: </span>
                {Number(dataMovieAndTVDetail?.revenue).toLocaleString()}$
              </p>
            </div>
          </div>

          <div className="divider"></div>
          <div className="director">
            <p>
              <span>Director: </span>
              {dataMovieAndTVCredits?.crew &&
              dataMovieAndTVCredits.crew.length > 0
                ? dataMovieAndTVCredits.crew[0].name
                : "No director information available"}
            </p>
            <div className="divider"></div>
            <p>
              <span>Writer: </span>
              {writer}
            </p>
          </div>
          <div className="divider"></div>
          <h2>Cast:</h2>
          <div className="cast">{cast}</div>
        </div>

        <div className="similar">
          <div className="similarCarousel">
            <CarouselList
              data={dataMovieAndTVSimilar}
              heading={"Similar " + params.explore}
              media_type={params.explore}
            />
          </div>
          <div className="similarCarousel">
            <CarouselList
              data={dataMovieAndTVRecommendations}
              heading={"Recommendation " + params.explore}
              media_type={params.explore}
            />
          </div>
        </div>

        {playVideo && (
          <VideoPlay params={params} close={() => setPlayVideo(false)} />
        )}
      </div>
    );
  }
};

export default DetailsPage;
