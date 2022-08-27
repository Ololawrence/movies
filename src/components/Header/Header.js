import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useDispatch,

} from "react-redux";
import "./Header.scss";
// import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  fetcAsynchMovies,
  fetcAsynchShows,
} from "./../../features/movies/movieSlice";
// import { logOutUser } from "../../features/auth/authSlice";

const Header = () => {
  const [term, setTerm] = useState("");
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const auth = useSelector((state) => state.auth);
  // const token = localStorage.getItem('token');

  const submitHandler = (e) => {
    e.preventDefault();
    if (term === "") {
      return alert("search term cannot be empty");
    }
    dispatch(fetcAsynchMovies(term));
    dispatch(fetcAsynchShows(term));
    setTerm("");
  };
  return (
    <>
  
        <div className="header">
          <div>
            <Link to="/">
              <div className="logo"> Movie App </div>
            </Link>
          </div>
          <div className="search-bar">
            <form onSubmit={submitHandler}>
              <input
                type="text"
                value={term}
                placeholder="search for movies or show"
                onChange={(e) => setTerm(e.target.value)}
              />

              <button type="submit" className="search">
                {" "}
                search
              </button>
            </form>
          </div>

          {/* <img src={user} alt="User" /> */}
          {/* <p
            className="logout"
            onClick={() => {
              dispatch(logOutUser(null));
              navigate("/signin");
              toast.warning("logged out successfully", {
                position: "top-left",
              });
              <ToastContainer />;
            }}
          >
            {" "}
          </p> */}
        </div>

    
    </>
  );
};

export default Header;
