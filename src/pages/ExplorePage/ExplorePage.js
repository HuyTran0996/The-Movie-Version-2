import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import "./ExplorePage.scss";

import Card from "../../components/Card/Card";
import { useThunk } from "../../hook/use-thunk";
import { fetchMovieAndTVDiscover } from "../../store/thunks/fetchMovies";

const ExplorePage = () => {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const navigate = useNavigate();
  const params = useParams();

  const [doFetchMovieAndTVDiscover, isLoading, loadingError] = useThunk(
    fetchMovieAndTVDiscover
  );

  const { dataMovieAndTVDiscover } = useSelector((state) => {
    return state.movies;
  });

  useEffect(() => {
    doFetchMovieAndTVDiscover({ type: `${params.explore}`, page });
  }, [params, page]);

  const moveTo = (p) => {
    navigate(`/${params.explore}?page=${p}`);
    setPage(p);
  };

  return (
    <div className="explorePage">
      <div className="container">
        <h3 className="capitalize">Popular {params.explore} show</h3>

        <div className="grid">
          {dataMovieAndTVDiscover?.results?.map((exploreData, index) => {
            return (
              <div className="exploreCard">
                <Card
                  item={exploreData}
                  media_type={params.explore}
                  key={exploreData.id + "exploreSEction"}
                />
              </div>
            );
          })}
        </div>

        <div className="pagination">
          <ResponsivePagination
            current={page}
            total={dataMovieAndTVDiscover?.total_pages || 1}
            onPageChange={moveTo}
          />
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
