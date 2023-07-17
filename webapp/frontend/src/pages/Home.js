import React from "react";
import Layout from "../components/Layout";

const Home = () => {
  // useEffect(() => {
  //   dispatch(loadUserAsync());
  // }, []);

  return (
    <Layout title="Login Page" content="Log in">
      <div className="container">
        <div className="jumbotron">
          <h1 className="display-4">Morphosyne</h1>
          <p className="lead">Authorization System</p>
          <hr className="my-4" />
          <p></p>
          <p className="lead">
            <a className="btn btn-primary btn-lg" href="/" role="button">
              Learn more
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
