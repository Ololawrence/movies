import { useState } from "react";
import { omit } from "lodash";
import { useDispatch } from "react-redux";
import { registerUser } from "./authSlice";
import { loginUser } from "../../features/auth/authSlice";

const useForm = (callback) => {
  const dispatch = useDispatch();
    // const auth = useSelector((state) => state.auth);
  // formValues

  const [values, setValues] = useState({});

  const [errors, setErrors] = useState({});

  const validate = (event, name, value) => {
    switch (name) {
      case "username":
        if (value.length <= 4) {
          setErrors({
            ...errors,
            username: "username must have a value greater then 4 characters",
          });
        } else {
          let newObj = omit(errors, "username");
          setErrors(newObj);
        }
        break;
      case "email":
        if (
          !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(value)
        ) {
          setErrors({
            ...errors,
            email: "Enter a valid email address",
          });
        } else {
          let newObj = omit(errors, "email");
          setErrors(newObj);
        }

        break;

      case "password":
        if (
          !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)
        ) {
          setErrors({
            ...errors,
            password:
              "Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers",
          });
        } else {
          let newObj = omit(errors, "password");
          setErrors(newObj);
        }
        break;

      default:
        break;
    }
  };
  const validateLogin = (event, name, value) => {
  switch (name) {
    case "username":
      if (value.length <= 4) {
        setErrors({
          ...errors,
          username: "username must have a value greater then 4 characters",
        });
      } else {
        let newObj = omit(errors, "username");
        setErrors(newObj);
      }

      break;

    case "password":
      if (
        !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)
      ) {
        setErrors({
          ...errors,
          password:
            "Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers",
        });
      } else {
        let newObj = omit(errors, "password");
        setErrors(newObj);
      }
      break;

    default:
      break;
  }
  };

  //A method to handle form inputs
  const handleChange = (event) => {
    //To stop default events
    event.persist();

    let name = event.target.name;
    let val = event.target.value;

    validate(event, name, val);

    //Let's set these values in state
    setValues({
      ...values,
      [name]: val,
    });
  };
  //A method to handle form inputs
  const handleLoginChange = (event) => {
    //To stop default events
    event.persist();

    let name = event.target.name;
    let val = event.target.value;

    validateLogin(event, name, val);

    //Let's set these values in state
    setValues({
      ...values,
      [name]: val,
    });
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    dispatch(registerUser(values));

    if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
      callback();
    } else {
      // toast.warning("cheack the form field and correct the nessesary error", {
      //   position: "bottom-right",
      // }
      // );
    }
  };
  const handleLoginSubmit = (event) => {
    if (event) event.preventDefault();
    dispatch(loginUser(values));
  // const token = localStorage.getItem("token");

  
    if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
      callback();
    } 

    
    // if (auth?.token?.accessToken || token) {
    //   navigate("/");
    // }

  };

  return {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleLoginChange,
    handleLoginSubmit,
  };
};

export default useForm;
