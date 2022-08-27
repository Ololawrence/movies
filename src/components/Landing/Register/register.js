import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./register.scss";
import { Link } from "react-router-dom";
import { loadUser, registerUser } from "../../../features/auth/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const [register, setRegister] = useState({
    email: "",
    password: "",
  });
  const auth = useSelector((state) => state.auth);
  
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(loadUser(null))
    if (token) {
      navigate("/movies");
    }
  }, [navigate, token, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(register));
  };

  return (
    <div className="wrapper">
      <div className="register-left">
        <h3>
          Register on movie app to view search and view movie informations
        </h3>
      </div>

      <div className="register-right">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="email"
            onChange={(e) =>
              setRegister({ ...register, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) =>
              setRegister({ ...register, password: e.target.value })
            }
          />
          <button className="btn">Register</button>
          {auth.registerStatus === "rejected" ? (
            <p className="error">{auth.registerError.message}</p>
          ) : null}
          <p className="p">
            if already register, click here to <Link to="/login">login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
