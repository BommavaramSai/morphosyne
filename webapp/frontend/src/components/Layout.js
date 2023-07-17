import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "./Navbar";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser, checkAuthenticated } from "../reducers/userSlice";

const Layout = ({ title, content, children }) => {
  const dispatch = useDispatch();
  // const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    dispatch(checkAuthenticated(), loadUser());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={content} />
      </Helmet>
      <Navbar />
      {/* {isAuthenticated ? <h1>Welcome, User!</h1> : <h1>Please log in.</h1>} */}
      <div className="container mt-5">{children}</div>
    </>
  );
};

export default Layout;
