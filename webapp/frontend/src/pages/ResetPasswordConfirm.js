import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
// import Layout from "../components/Layout";
import { reset_password_confirm } from "../reducers/userSlice";
import { useNavigate } from "react-router-dom";

const ResetPasswordConfirm = () => {
  // const { uid, token } = useParams();
  const params = useParams();
  const { uid, token } = params;
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
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });
  const { new_password, re_new_password } = formData;

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

    dispatch(
      reset_password_confirm({ uid, token, new_password, re_new_password })
    );
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
              type="password"
              placeholder="New Password"
              name="new_password"
              value={new_password}
              onChange={(e) => onChange(e)}
              required
            />
            <input
              className="form-control"
              type="password"
              placeholder="Confirm New Password"
              name="re_new_password"
              value={re_new_password}
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

export default ResetPasswordConfirm;
