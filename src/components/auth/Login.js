import React, { useEffect } from "react";
import { StyledForm } from "../auth/form.styled";
import useForm from "./../../features/auth/useForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  const formLogin = () => {};
  const { errors, handleLoginSubmit, values, handleLoginChange } =
    useForm(formLogin);
//   const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.loginStatus === "success") {
      navigate("/");
    }
  }, [navigate,auth.loginStatus]);

  return (
    <>
      <StyledForm onSubmit={handleLoginSubmit}>
        <h2>Login</h2>

        <input
          type="username"
          placeholder="username"
          name="username"
          value={values.username || ""}
          onChange={handleLoginChange}
        />
        {errors.username && <p className="error">{errors.username}</p>}
        <input
          type="password"
          name="password"
          value={values.password || ""}
          placeholder="password"
          onChange={handleLoginChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}
        <button>
          {auth?.loginStatus === "pending" ? "Submitting..." : "  Login"}
        </button>
        {auth?.loginStatus === "rejected" ? (
          <p className="error">{auth?.loginError?.message}</p>
        ) : null}
      </StyledForm>
    </>
  );
};

export default Login;
