import React from "react";

import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

function App() {

  return (
    <>
      <div className="App">
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/movie/:imdbID" element={<MovieDetails />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
