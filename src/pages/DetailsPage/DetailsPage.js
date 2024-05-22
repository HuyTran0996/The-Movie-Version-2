import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

import { useThunk } from "../../hook/use-thunk";
import {
  fetchMovieAndTVDetail,
  fetchMovieAndTVCredits,
} from "../../store/thunks/fetchMovies";
import "./DetailsPage.scss";

const IMG_URL_BANNER = "https://image.tmdb.org/t/p/original";
const IMG_URL = "https://image.tmdb.org/t/p/w400";
const DetailsPage = () => {
  const params = useParams();
  const [doFetchMovieAndTVDetail, isLoading, loadingError] = useThunk(
    fetchMovieAndTVDetail
  );
  const [doFetchMovieAndTVCredits, isLoadingCredits, loadingErrorCredits] =
    useThunk(fetchMovieAndTVCredits);

  const { dataMovieAndTVDetail, dataMovieAndTVCredits } = useSelector(
    (state) => {
      return state.movies;
    }
  );

  useEffect(() => {
    doFetchMovieAndTVDetail(`/${params?.explore}/${params?.id}`);
    doFetchMovieAndTVCredits(`/${params?.explore}/${params?.id}`);
  }, [params]);

  const duration = (dataMovieAndTVDetail?.runtime / 60)?.toFixed(1)?.split(".");

  // const writer = castData?.crew?.filter(el => el?.job === "Writer")?.map(el => el?.name)?.join(", ");
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : loadingError ? (
        <p>Error loading data</p>
      ) : (
        <div className="detailPage">
          <div className="banner">
            <div className="imgBanner">
              <img
                src={IMG_URL_BANNER + dataMovieAndTVDetail.backdrop_path}
                alt="BANNER"
              />
              <div className="blurring"></div>
            </div>
          </div>

          <div className="avatar">
            <img
              src={IMG_URL + dataMovieAndTVDetail.poster_path}
              alt="Poster"
            />
            <button>Play Now</button>
          </div>

          <div className="content">
            <h1 className="title">
              {dataMovieAndTVDetail.title || dataMovieAndTVDetail.name}
            </h1>
            <span>{dataMovieAndTVDetail.tagline}</span>
            <div className="divider"></div>
            <div className="rating">
              <p>
                Rating: {Number(dataMovieAndTVDetail.vote_average).toFixed(1)}+
              </p>
              <span>|</span>
              <p>View: {Number(dataMovieAndTVDetail.vote_count)}</p>
              <span>|</span>
              <p>
                Duration : {duration[0]}h {duration[1]}m
              </p>
            </div>
            <div className="divider"></div>
            <div className="overview">
              <h3>Overview</h3>
              <p>{dataMovieAndTVDetail.overview}</p>
              <div className="divider"></div>
              <div className="status">
                <p>Status: {dataMovieAndTVDetail.status}</p>
                <span>|</span>
                <p>
                  Release Date :
                  {moment(dataMovieAndTVDetail?.release_date).format(
                    "MMMM Do YYYY"
                  )}
                </p>
                <span>|</span>
                <p>Revenue : {Number(dataMovieAndTVDetail?.revenue)}</p>
              </div>
              <div className="divider"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
