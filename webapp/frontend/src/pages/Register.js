import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, selectRegisterStatus } from "../reducers/userSlice";
// import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // const [registered, setRegistered] = useState(false)
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);
  const error = useSelector((state) => state.user.error);
  const navigate = useNavigate();
  const registerStatus = useSelector(selectRegisterStatus);

  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    re_password: "",
  });

  const { email, first_name, last_name, password, re_password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleRegister = () => {
  //   const userData = { first_name, last_name, email, password };
  //   dispatch(registerUser(userData));
  // };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(
      registerUser({ email, first_name, last_name, password, re_password })
    );
    // setRegistered(true)
  };

  useEffect(() => {
    if (registerStatus === "fulfilled") {
      navigate("/login"); // Redirect to the login page after successful registration
    }
  }, [registerStatus, navigate]);

  return (
    <Layout title="Login Page" content="Log in">
      <form className="container mt-5" onSubmit={onSubmit}>
        <h1>Sing Up</h1>
        <p>Register for an Account</p>
        {error && <p>{error}</p>}
        <div className="form-group mt-2">
          <input
            className="form-control"
            type="text"
            name="first_name"
            placeholder="First Name"
            value={first_name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group mt-2">
          {/* <label className="form-label" htmlFor="last_name">
            Last Name
          </label> */}
          <input
            className="form-control"
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={last_name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group mt-2">
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group mt-2">
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group mt-2">
          <input
            className="form-control"
            type="password"
            name="re_password"
            placeholder="Retype Password"
            value={re_password}
            onChange={onChange}
            required
          />
        </div>
        {/* {loading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : ( */}
        {/* <button className="btn btn-primary mt-4">Register</button> */}
        {/* )}  */}
        <button className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Loading..." : "Register"}
        </button>
        {/* <button onClick={handleRegister} disabled={isLoading}>
          {isLoading ? "Loading..." : "Register"}
        </button> */}
      </form>
    </Layout>
  );
};

export default Register;
