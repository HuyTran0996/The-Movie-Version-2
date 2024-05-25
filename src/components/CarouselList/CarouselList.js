import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./CarouselList.scss";
import Card from "../Card/Card";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 5,
  },

  tablet: {
    breakpoint: { max: 1024, min: 720 },
    items: 3,
    slidesToSlide: 3,
  },
  mobile: {
    breakpoint: { max: 720, min: 0 },
    items: 2,
    slidesToSlide: 2,
  },
  // tablet: {
  //   breakpoint: { max: 1024, min: 464 },
  //   items: 3,
  //   slidesToSlide: 3,
  // },
  // mobile: {
  //   breakpoint: { max: 464, min: 0 },
  //   items: 2,
  //   slidesToSlide: 2,
  // },
};

const CarouselList = ({ data = [], heading, trending, media_type }) => {
  let data1 = data.results || [];

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
            <div className="cardInCarousel">
              <Card item={item} media_type={media_type} />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CarouselList;
