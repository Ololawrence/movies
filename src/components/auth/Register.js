import { useEffect } from "react";
import { StyledForm } from "./form.styled";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useForm from "./../../features/auth/useForm";
const Register = () => {
  const formLogin = () => {};
  const { errors, handleSubmit, values, handleChange } = useForm(formLogin);
  const navigate = useNavigate();

const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.token) {
      navigate("/signin");
    }
  }, [navigate, auth?.token]);
  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={values.username || ""}
          onChange={handleChange}
        />

        {errors.username && <p className="error">{errors.username}</p>}
        <input
          type="email"
          placeholder="email"
          name="email"
          value={values.email || ""}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}
        <input
          type="password"
          name="password"
          value={values.password || ""}
          placeholder="password"
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}
        <button>
          {auth?.rigisterStatus === "pending" ? "Submitting..." : "Register"}
        </button>
        {auth?.registerStatus === "rejected" ? (
          <p>{auth?.registerError?.message}</p>
        ) : null}
      </StyledForm>
    </>
  );
};

export default Register;
