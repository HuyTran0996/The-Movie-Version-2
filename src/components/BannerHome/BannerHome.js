import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "./BannerHome.scss";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const IMG_URL = "https://image.tmdb.org/t/p/original";

const BannerHome = () => {
  const { dataTrendingAll } = useSelector((state) => {
    return state.movies;
  });

  const data = dataTrendingAll.results || [];

  return (
    <Carousel
      className="carouselBanner"
      responsive={responsive}
      transitionDuration={300}
      infinite={true}
      ssr={true}
      autoPlay={true}
      autoPlaySpeed={5000}
    >
      {data?.map((item) => {
        return (
          <div className="banner">
            <img src={IMG_URL + item.backdrop_path} alt="backdrop_path" />

            <div className="blurring"></div>

            <div className="content">
              <h1 className="title">{item.title || item.name}</h1>
              <p className="overview">{item.overview}</p>
              <div className="ratingAndView">
                <p className="rating">
                  Rating : {Number(item.vote_average).toFixed(1)}+
                </p>
                <span>|</span>
                <p className="view">
                  View : {Number(item.popularity).toFixed(0)}
                </p>
              </div>
              <Link to={`/${item?.media_type}/${item.id}`} className="detail">
                View Detail
              </Link>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default BannerHome;
