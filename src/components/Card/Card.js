import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "./Card.scss";

import noPoster from "../../assets/no-poster.png";

const IMG_URL = "https://image.tmdb.org/t/p/w500";
const Card = ({ item, media_type }) => {
  const navigate = useNavigate();
  const moveTo = (item) => {
    navigate(`/${media_type || item?.media_type}/${item.id}`);
  };
  return (
    <div className="card" onClick={() => moveTo(item)}>
      <img
        src={item.poster_path ? IMG_URL + item.poster_path : noPoster}
        alt="poster_path"
      />

      <div className="cardListContent">
        <h2 className="cardListTitle">{item.title || item.name}</h2>

        <div className="releaseAndRating">
          <p className="cardListReleaseDate">
            {moment(item.release_date).format("MMMM Do YYYY")}
          </p>

          <p className="cardListRating">
            Rating : {Number(item.vote_average).toFixed(1)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
