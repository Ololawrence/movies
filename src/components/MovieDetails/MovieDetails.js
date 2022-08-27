import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { CircleLoader } from "react-spinners";
import {
  fetcAsynchMovieOrShowDetails,
  getSelectedMovieOrShow,
  removeSelectedMovieOrShow,
} from "./../../features/movies/movieSlice";
import "./MovieDetails.scss";

const MovieDetails = () => {
  const { imdbID } = useParams();
  const dispatch = useDispatch();
  const data = useSelector(getSelectedMovieOrShow);

  useEffect(() => {
    dispatch(fetcAsynchMovieOrShowDetails(imdbID));

    return () => {
      dispatch(removeSelectedMovieOrShow());
    };
  }, [dispatch, imdbID]);

  return (
    <div className="movie-section">
      {Object.keys(data).length === 0 ? (
        <div>
          {" "}
          <CircleLoader
            color="#ace"
            cssOverride={{}}
            size={70}
            speedMultiplier={1}
          />{" "}
          ....loading{" "}
        </div>
      ) : (
        <>
          <div className="section-left">
            <div className="section-title"> {data.Title}</div>
            <div className="movie-rating">
              <span>
                IMDB Rating: <i className="fa fa star">{data.imdbRating}</i>
              </span>
              <span>
                IMDB Votes: <i className="fa fa star">{data.imdbVotes}</i>
              </span>
              <span>
                Runtime: <i className="fa fa star">{data.Runtime}</i>
              </span>
              <span>
                Year: <i className="fa fa star">{data.Year}</i>
              </span>
            </div>
            <div className="movie-plot">{data.Plot}</div>

            <div className="movie-info">
              <div>
                <span>Director</span>
                <span>{data.Director}</span>
              </div>

              <div>
                <span>Stars</span>
                <span>{data.Actors}</span>
              </div>

              <div>
                <span>Genres</span>
                <span>{data.Genre}</span>
              </div>

              <div>
                <span>Language</span>
                <span>{data.Language}</span>
              </div>

              <div>
                <span>Awards</span>
                <span>{data.Awards}</span>
              </div>
            </div>
          </div>

          <div className="section-right">
            <img src={data.Poster} alt="movie Poster" />
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
