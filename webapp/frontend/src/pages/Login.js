import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import Layout from "../components/Layout";
import { loginUser, checkAuthenticated } from "../reducers/userSlice";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);
  const error = useSelector((state) => state.user.error);

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkAuthenticated());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Redirect to the home page if authenticated navigate.push()
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  // const handleLogin = () => {
  //   const userData = { username, password };
  //   dispatch(loginUser(userData));
  // };

  // useEffect(() => {
  //   dispatch(resetRegistered());
  // }, []);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser({ email, password }));
  };

  if (isAuthenticated) {
    return navigate("/");
  }

  return (
    <>
      {/* <Layout title="Login Page" content="Log in"> */}
      <div className="container mt-5">
        <h1>Sign In</h1>
        <p>Sign in to your account</p>
        {error && <p>{error}</p>}
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              required
            />
            {/* <button className="btn btn-primary" type="submit">
              Log In
            </button> */}
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isLoading}
            >
              {" "}
              {isLoading ? "Loading..." : "Login"}
            </button>
            {/* <button onClick={handleLogin} disabled={isLoading}> {isLoading ? "Loading..." : "Login"}</button> */}
          </div>
        </form>
        <p className="mt-3">
          Don't have a account?<Link to="/register">Sign up</Link>
        </p>
        <p className="mt-3">
          Forgot Password?<Link to="/reset-password">Reset Password</Link>
        </p>
      </div>
      {/* </Layout> */}
    </>
  );
};

export default Login;
