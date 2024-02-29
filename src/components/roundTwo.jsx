import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  Alert,
  InputLabel,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useForm } from "react-hook-form";
import secureLocalStorage from "react-secure-storage";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InputAdornment from "@mui/material/InputAdornment";
const roundTwo = ({ round }) => {
  const Token = secureLocalStorage.getItem("token");
  const [errorMessage, setErrorMessage] = useState();
  const [showErr, setErr] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm(); // Initialize the hook
  const roundTwoHandler = (data) => {
    // console.log(data);
    const UploadPresention = data.uploadSourceCode[0];
    const UploadSourceCode = data.uploadPresention[0];
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);
    var formdata = new FormData();
    formdata.append("files", UploadSourceCode, UploadSourceCode.name);
    formdata.append("files", UploadPresention, UploadPresention.name);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    fetch("http://10.64.29.214:8080/api/rounds/round2", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setErrorMessage(result);
        setErr(true);
        reset();
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div>
      <Container
        sx={{ marginTop: 10 }}
        maxWidth="xs"
        marginTop="400px"
        component="div"
      >
        <Box
          sx={{
            margintop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {showErr ? (
            <Alert
              sx={{ marginY: "25px" }}
              severity="success"
              onClose={() => {
                setErr(false);
              }}
            >
              {errorMessage}
            </Alert>
          ) : null}
          <Typography marginY="16px" component="h1" variant="h5">
            Round {round}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(roundTwoHandler)}
            sx={{ mt: 1 }}
          >
            <InputLabel id="teamlist">Upload Project Source Code</InputLabel>
            <TextField
              sx={{ marginY: "10px" }}
              type="file"
              fullWidth
              display="flex"
              gap={3}
              id="uploadSourceCode"
              name="uploadSourceCode"
              {...register("uploadSourceCode", {
                required: true,
              })}
              error={!!errors.uploadSourceCode}
              helperText={
                errors.uploadSourceCode?.type === "required" &&
                "SourceCode is required"
              }
              accept=".zip"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <AttachFileIcon />
                  </InputAdornment>
                ),
              }}
            />
            <InputLabel id="teamlist">Upload Presentation</InputLabel>
            <TextField
              sx={{ marginY: "10px" }}
              type="file"
              fullWidth
              display="flex"
              gap={3}
              id="uploadPresention"
              name="uploadPresention"
              {...register("uploadPresention", {
                required: true,
              })}
              error={!!errors.uploadPresention}
              helperText={
                errors.uploadPresention?.type === "required" &&
                "Presention is required"
              }
              accept=".zip"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <AttachFileIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              startIcon={<CloudUploadIcon />}
            >
              Upload
            </Button>
          </Box>
          <Typography color="black">
            <strong>Note</strong>: Every team should submit a <strong>ZIP/RAR</strong> file named as     <Typography color="red" marginY="10px">Team Name:</Typography>
            📂  Following folder hierarchy to be followed:
              <List>
                <ListItem>
                  <ListItemText
                    primary="📝 Source – Final source code to be submitted.
."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="📜 Documents – Presentations, screenshots, demo video, etc.
                    .
."
                  />
                </ListItem>
              </List>
            </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default roundTwo;
