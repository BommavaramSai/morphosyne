import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import Layout from "../components/Layout";
import { reset_password } from "../reducers/userSlice";

import { useNavigate } from "react-router-dom";

const RequestPassword = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);
  const error = useSelector((state) => state.user.error);

  // const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(checkAuthenticated());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate("/"); // Redirect to the home page if authenticated navigate.push()
  //   }
  // }, [isAuthenticated, navigate]);
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({ email: "" });
  const { email } = formData;

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

    dispatch(reset_password({ email }));
    setRequestSent(true);
  };

  if (requestSent) {
    return navigate("/");
  }
  return (
    <>
      {/* <Layout title="Login Page" content="Log in"> */}
      <div className="container mt-5">
        <h1>Request Password Reset</h1>
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

            {/* <button className="btn btn-primary" type="submit">
              Log In
            </button> */}
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isLoading}
            >
              {" "}
              {isLoading ? "Loading..." : "Reset Password"}
            </button>
            {/* <button onClick={handleLogin} disabled={isLoading}> {isLoading ? "Loading..." : "Login"}</button> */}
          </div>
        </form>
      </div>
      {/* </Layout> */}
    </>
  );
};

export default RequestPassword;
