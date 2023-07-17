import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
// import Layout from "../components/Layout";
import { verify } from "../reducers/userSlice";

import { useNavigate } from "react-router-dom";

const Activate = () => {
  const [verified, setVerified] = useState(false);
  const params = useParams();
  const { uid, token } = params;
  const dispatch = useDispatch();
  // const isLoading = useSelector((state) => state.user.isLoading);
  const error = useSelector((state) => state.user.error);

  const navigate = useNavigate();

  const verify_account = (e) => {
    dispatch(verify({ uid, token }));
    setVerified(true);
  };

  if (verified) {
    return navigate("/login");
  }

  return (
    <div className="container mt-5">
      <div
        className="d-flex flex-column justify-content-center items-align-center"
        style={{ marginTop: "200px" }}
      >
        <h1>verify your account</h1>
        <button
          className="btn btn-primary"
          type="button"
          onClick={verify_account}
          style={{ marginTop: "50px" }}
        >
          verify
        </button>
      </div>
    </div>
  );
};

export default Activate;
