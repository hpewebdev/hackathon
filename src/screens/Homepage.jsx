import React from "react";
import "../assets/css/Login.css";
import Login from "./Login";
import Header from "../components/Header";
const Homepage = () => {

  return (
    <>
      <Header />
      <div className="bg-Img verify-Form">
        <Login></Login>
      </div>
    </>
  );
};

export default Homepage;
