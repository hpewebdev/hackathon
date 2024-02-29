import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import Header from "../components/Header";
import { useState } from "react";
import { Alert } from "@mui/material";
import secureLocalStorage from "react-secure-storage";
import SendSharpIcon from '@mui/icons-material/SendSharp';
import MessageSharpIcon from '@mui/icons-material/MessageSharp';
import InputAdornment from "@mui/material/InputAdornment";
import SubjectIcon from '@mui/icons-material/Subject';
export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm(); // Initialize the hook
  const Token = secureLocalStorage.getItem("token");
  const [showErr, setErr] = useState(false);
  const [getMessage, setMessage] = useState({});
  const handleContact = (data) => {
    // console.log(data);
    const subject = data.subject;
    const message = data.msg;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      subject: subject,
      mailBody: message,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch("http://10.64.29.214:8080/api/contactus", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setMessage(result.message);
        setErr(true);
        reset();
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <Header />
      <Container sx={{ marginTop: 30 }} maxWidth="lg">
        <CssBaseline />
        <Box
          mt="12"
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography my={2} component="h1" variant="h5">
            Contact us for queries
          </Typography>
          {showErr ? (
            <Alert
              sx={{ marginY: "25px" }}
              severity="success"
              onClose={() => {
                setErr(false);
              }}
            >
              {getMessage}
            </Alert>
          ) : null}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(handleContact)}
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} lg={12}>
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  name="subject"
                  label="Subject"
                  type="text"
                  id="subject"
                  {...register("subject", {
                    required: true,
                  })}
                  error={!!errors.subject}
                  helperText={
                    errors.subject?.type === "required" && "Subject is required"
                  }
                  autoComplete="Subject"
                  inputProps={{ maxLength: 25 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <SubjectIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="msg"
                  name="msg"
                  label="Message"
                  multiline
                  rows={5}
                  inputProps={{ maxLength: 200 }}
                  {...register("msg", {
                    required: true,
                  })}
                  error={!!errors.msg}
                  helperText={
                    errors.msg?.type === "required" && "Message is required"
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <MessageSharpIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Grid textAlign={"center"} mb={8}>
              <Button    endIcon={<SendSharpIcon />} type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                Submit
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
      {/* <Footer/> */}
    </>
  );
}
