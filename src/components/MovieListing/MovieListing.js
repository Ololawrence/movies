import React from "react";
import Slider from "react-slick";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { CircleLoader } from "react-spinners";
import { getAllMovies, getAllShows } from "../../features/movies/movieSlice";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieListing.scss";
import { settings } from "./../../common/settings";

const MovieListing = () => {
  const movies = useSelector(getAllMovies);
  const shows = useSelector(getAllShows);
// const token = localStorage.getItem('token');
// const navigate = useNavigate();
  let renderMovies,
    renderShows = "";
    renderMovies =
    movies.Response === "True" ? (
      movies.Search.map((movie, index) => (
        <MovieCard key={index} data={movie} />
      ))
    ) : (
      <div className="movies-error">
        <h3>{movies.Error}</h3>
      </div>
    );

  renderShows =
    shows.Response === "True" ? (
      shows.Search.map((shows, index) => <MovieCard key={index} data={shows} />)
    ) : (
      <div className="movies-error">
        <h3>{movies.Error}</h3>
      </div>
    );

  return (
    <>
  
      <div className="movie-container">
        <div className="movie-list">
          <h2>Movies </h2>
          {movies?.pending ? (
            <div className="loader">
              <CircleLoader
                color="#ace"
                cssOverride={{}}
                size={70}
                speedMultiplier={1}
              />
              <p style={{ color: "white" }}>Loading....</p>
            </div>
          ) : null}

          <div className="movie-container">
            <Slider {...settings}> {renderMovies}</Slider>
          </div>
        </div>
      </div>

      <div className="show-container">
        <div className="show-list">
          <h2>Shows </h2>
          <div className="show-container">
            <Slider {...settings}> {renderShows}</Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieListing;
