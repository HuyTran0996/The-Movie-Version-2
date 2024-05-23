import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import "./VideoPlay.scss";
import { useSelector } from "react-redux";
import { useThunk } from "../../hook/use-thunk";
import { fetchMovieAndTVVideos } from "../../store/thunks/fetchMovies";

const VideoPlay = ({ params, close }) => {
  const [doFetchMovieAndTVVideos, isLoading, loadingError] = useThunk(
    fetchMovieAndTVVideos
  );
  const { dataMovieAndTVVideos } = useSelector((state) => state.movies);

  console.log("params là", params);
  useEffect(() => {
    doFetchMovieAndTVVideos(`/${params.explore}/${params.id}`);
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (loadingError) {
    return <p>Error loading data</p>;
  }
  if (!isLoading && !loadingError) {
    const uniqueJobs = dataMovieAndTVVideos?.results?.find((video) => {
      if (video.type === "Trailer" && video.site === "YouTube") return video;
    });
    return (
      <section className="section" onClick={close}>
        <div className="div">
          <IoClose className="button" onClick={close} size={46} />

          <iframe
            src={`https://www.youtube.com/embed/${uniqueJobs?.key}`}
            className="iframe"
          />
        </div>
      </section>
    );
  }
};

export default VideoPlay;
