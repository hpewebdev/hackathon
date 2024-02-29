import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Container,
  TextField,
  Grid,
  Button,
  Alert,
} from "@mui/material";
import { blue } from '@mui/material/colors';
const bgColor = blue[500]
import InputAdornment from "@mui/material/InputAdornment";
import PinIcon from "@mui/icons-material/Pin";
import { useForm } from "react-hook-form";
import { useState } from "react";
import "../assets/css/Registration.css";
import secureLocalStorage from "react-secure-storage";
const Verification = () => {
  const [showErr, setErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [btnErr, setBtnErr] = useState("primary");
  const [showMsg, setMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState();
  const navigate = useNavigate();
  const Token = secureLocalStorage.getItem("token");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Initialize the hook
  const verifyOtp = (data) => {
    // console.log(data);
    const OTP = data.userotp;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var raw = JSON.stringify({
      otpCode: OTP,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://10.64.29.214:8080/api/valotp", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        if (result.error) {
          setErr(true);
          setErrorMessage(result.error);
          setBtnErr("error");
        } else {
          secureLocalStorage.setItem("verified", `${result.success}`),
            navigate("/project");
        }
      })
      .catch((error) => console.log("error", error));
  };
  const resendOtp = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var raw = "";

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://10.64.29.214:8080/api/regotp", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        result.message ? (setMsg(true), setSuccessMsg(result.message)) : null;
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div>
      <Header />

      <Container
        sx={{ marginTop: 30 }}
        maxWidth="xs"
        marginTop="400px"
        component={Paper}
        elevation="3"
      >
        {showErr ? (
          <Alert
            severity="error"
            onClose={() => {
              setErr(false);
              setBtnErr("primary");
            }}
          >
            {errorMessage}
          </Alert>
        ) : null}
        {showMsg ? (
          <Alert
            severity="success"
            onClose={() => {
              setMsg(false);
            }}
          >
            {successMsg}
          </Alert>
        ) : null}
        <Box 
        bgcolor={bgColor}
        >
          <Typography
            textAlign="center"
            marginTop="2"
            component="h1"
            variant="h5"
            color="white"
            fontFamil= "monospace"
            fontWeight= "700"
            letterSpacing=".3rem"
          >
            Verification
          </Typography>
        </Box>
        <Box
          sx={{
            margintop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography marginY="16px" component="h5" variant="h6">
            Please Enter OTP
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(verifyOtp)}
            sx={{ mt: 1 }}
          >
            <TextField
              type="number"
              fullWidth
              display="flex"
              gap={3}
              id="userotp"
              label="OTP"
              name="userotp"
              {...register("userotp", {
                required: true,
              })}
              error={!!errors.userotp}
              helperText={
                errors.userotp?.type === "required" && "OTP is required"
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <PinIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Grid textAlign="center">
              <Button
                type="submit"
                color={btnErr}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Verify
              </Button>
              <Button
                type="button"
                onClick={resendOtp}
                variant="contained"
                color="success"
                sx={{ mt: 3, mb: 2, mx: 2 }}
              >
                Re-Send OTP
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Verification;
