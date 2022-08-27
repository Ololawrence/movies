import React, { useEffect } from "react";
import "./Home.scss";
import MovieListing from "../MovieListing/MovieListing";
import { useDispatch } from "react-redux";
import {
  fetcAsynchMovies,
  fetcAsynchShows,
} from "../../features/movies/movieSlice";

//  const token = localStorage.getItem("token");
 
const Home = () => {
  const dispatch = useDispatch();
  const moviesText =  'harry';
  const showTest = 'friends'
  useEffect(() => {
    dispatch(fetcAsynchMovies(moviesText));
    dispatch(fetcAsynchShows(showTest));
  }, [dispatch]);
  return (
    <div className="banner-img">
      <MovieListing />
    </div>
  );
};

export default Home;
