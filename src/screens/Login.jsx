import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import "../assets/css/Login.css";

const Login = () => {
  const isAuthenticated = secureLocalStorage.getItem("isAuthenticated");
  const role = secureLocalStorage.getItem("role");
  const navigate = useNavigate();
  useEffect(() => {
    isAuthenticated
      ? role == 2
        ? navigate(`/AdminDashboard`)
        : navigate(`/project`)
      : navigate("/");
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Initialize the hook
  const [showErr, setErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [btnErr, setBtnErr] = useState("primary");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmit = (data) => {
    // Handle form submission logic
    const username = data.username;
    const password = data.password;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      user_id: username,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://10.64.29.214:8080/api/auth", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        {
          result.token
            ? (secureLocalStorage.setItem("token", `${result.token}`),
              secureLocalStorage.setItem("round", `${result.data.round_no}`),
              secureLocalStorage.setItem("user", `${result.data.User_Name}`),
              secureLocalStorage.setItem("role", `${result.data.Role_ID}`),
              secureLocalStorage.setItem(
                "verified",
                `${result.data.Otp_Verified}`
              ),
              secureLocalStorage.setItem("isAuthenticated", true))
            : null;
        }
        // console.log(result);
        setErrorMessage(result.error);
        {
          result.error
            ? (setErr(true), setBtnErr("error"))
            : result.data.Role_ID === 2
            ? navigate(`/AdminDashboard`)
            : navigate(`/project`);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        
        maxWidth: "480px",
        margin: "auto",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
      }}
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

      <Typography
        fontFamily={"monospace"}
        fontWeight="700"
        letterSpacing={"0.3rem"}
        variant="h5"
        textAlign="center"
        autoComplete=""
        color="black"
        marginBottom="10px"
      >
        Generative AI Hackathon
      </Typography>

      <TextField
        fullWidth
        autoComplete="current-username"
        label="Username"
        name="username"
        {...register("username", { required: true })}
        margin="normal"
        variant="outlined"
        error={!!errors.username}
        helperText={
          errors.username?.type === "required" && "Username is required"
        }
        type="text"
        placeholder="Team Name"
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        autoComplete="current-password"
        label="Password"
        name="password"
        {...register("password", { required: true })}
        margin="normal"
        variant="outlined"
        error={!!errors.password}
        helperText={
          errors.password?.type === "required" && "Password  is required"
        }
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword}>
                {showPassword ? <VisibilityOff /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color={btnErr}
        fullWidth
        sx={{ mt: 2 }}
        endIcon={<LoginIcon />}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
