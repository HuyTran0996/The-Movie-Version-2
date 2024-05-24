import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import "./SearchPage.scss";

import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";
import { useThunk } from "../../hook/use-thunk";
import { fetchSearchMulti } from "../../store/thunks/fetchMovies";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const navigate = useNavigate();
  const params = useParams();

  const [doFetchMovieAndTVDiscover, isLoading, loadingError] =
    useThunk(fetchSearchMulti);

  const { dataSearchMulti } = useSelector((state) => {
    return state.movies;
  });
  const query = searchParams.get("q");

  useEffect(() => {
    doFetchMovieAndTVDiscover({ query, page });
  }, [params, page]);

  const moveTo = (p) => {
    navigate(`/search?q=${query}&page=${p}`);
    setPage(p);
  };

  if (isLoading) {
    return <Loading />;
  }
  if (loadingError) {
    return <p>Error Loading...</p>;
  }

  return (
    <div className="searchPage">
      <div className="container">
        <h3 className="capitalize">Result of: {query}</h3>

        <div className="grid">
          {dataSearchMulti?.results?.map((exploreData, index) => {
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
            total={dataSearchMulti?.total_pages || 1}
            onPageChange={moveTo}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
