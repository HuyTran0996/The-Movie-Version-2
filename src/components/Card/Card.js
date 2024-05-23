import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "./Card.scss";

const IMG_URL = "https://image.tmdb.org/t/p/w500";
const Card = ({ item, media_type }) => {
  const navigate = useNavigate();
  const moveTo = (item) => {
    navigate(`/${media_type || item?.media_type}/${item.id}`);
  };
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
};

export default Card;
