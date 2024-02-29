import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
const PageNotFound = () => {
  // Get the navigate function from the hook
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    // Return a cleanup function to clear the timer
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div>
      <Header />

      <Typography
        fontFamily={"monospace"}
        fontWeight="700"
        letterSpacing={"0.9rem"}
        variant="h4"
        component="p"
        marginTop={"420px"}
        textAlign={"center"}
      >
        404 Page N😯t Found
      </Typography>
    </div>
  );
};

export default PageNotFound;
