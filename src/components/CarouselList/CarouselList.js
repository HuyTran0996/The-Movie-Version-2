import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./CarouselList.scss";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const IMG_URL = "https://image.tmdb.org/t/p/w500";

const CarouselList = ({ data = [], heading, trending, media_type }) => {
  const navigate = useNavigate();

  let data1 = data.results || [];
  const moveTo = (item) => {
    navigate(`/${media_type || item?.media_type}/${item.id}`);
  };
  return (
    <div className="carouselBox">
      <p className="heading">{heading}</p>
      <Carousel
        className="carousel"
        responsive={responsive}
        transitionDuration={300}
        infinite={true}
        ssr={true}
      >
        {data1?.map((item) => {
          return (
            <div className="carouselList" onClick={() => moveTo(item)}>
              <img src={IMG_URL + item.poster_path} alt="poster_path" />

              <div className="carouselListContent">
                <h2 className="carouselListTitle">{item.title || item.name}</h2>

                <div className="releaseAndRating">
                  <p className="carouselListReleaseDate">
                    {moment(item.release_date).format("MMMM Do YYYY")}
                  </p>

                  <p className="carouselListRating">
                    Rating : {Number(item.vote_average).toFixed(1)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CarouselList;
