import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { Link } from "react-router-dom";
import { loginUser } from "../../../features/auth/authSlice";

const Login = () => {
  const [user, setUser] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
const navigate = useNavigate()

  useEffect(() => {
    if (auth.token) {
      navigate("/");
    }
  }, [dispatch, navigate, auth.token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(user));
  };

  return (
    <div className="wrapper">
      <div className="login-left">
        <h3>Login on movie app to view search and view movie informations</h3>
      </div>

      <div className="login-right">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <button className="btn">Login</button>

          <p>
            dont have an account?, click here to
            <Link to="/">register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
