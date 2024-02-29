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
import AttachFileIcon from "@mui/icons-material/AttachFile";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import InputAdornment from "@mui/material/InputAdornment";
import DescriptionIcon from "@mui/icons-material/Description";
import { useForm } from "react-hook-form";
import secureLocalStorage from "react-secure-storage";
const roundOne = ({ round }) => {
  const [errorMessage, setErrorMessage] = useState({});
  const [showErr, setErr] = useState(false);
  const Token = secureLocalStorage.getItem("token");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm(); // Initialize the hook
  const roundOneHandler = (roundOneData) => {
    // console.log(data);
    const IdeaName = roundOneData.ideaName;
    const IdeaDescription = roundOneData.ideaDescription;
    const UploadPresention = roundOneData.uploadPresention[0];
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

    var formdata = new FormData();
    formdata.append("Project_Title", IdeaName);
    formdata.append("Project_Description", IdeaDescription);
    formdata.append("file", UploadPresention, UploadPresention.name);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("http://10.64.29.214:8080/api/rounds", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setErrorMessage(result.message);
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
          <Typography marginY="16px" component="h1" variant="h5">
            Round {round}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(roundOneHandler)}
            sx={{ mt: 1 }}
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
            <TextField
              sx={{ marginY: "10px" }}
              fullWidth
              display="flex"
              gap={3}
              id="ideaName"
              name="ideaName"
              variant="standard"
              {...register("ideaName", {
                required: true,
              })}
              label="Idea Title"
              error={!!errors.ideaName}
              helperText={
                errors.ideaName?.type === "required" && "Ideaname is required"
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LightbulbIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              sx={{ marginY: "10px" }}
              fullWidth
              id="ideaDescription"
              name="ideaDescription"
              label="Proejct Description"
              multiline
              rows={5}
              inputProps={{ maxLength: 200 }}
              {...register("ideaDescription", {
                required: true,
              })}
              error={!!errors.ideaDescription}
              helperText={
                errors.ideaDescription?.type === "required" &&
                "Project Description is required"
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <DescriptionIcon />
                  </InputAdornment>
                ),
              }}
            />
            <InputLabel id="teamlist">Upload Project Source Code</InputLabel>
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
            >
              {round == 1 ? "Submit" : "Upload"}
            </Button>
            <Typography color="black">
            <strong>Note</strong>: Every team should submit a <strong>ZIP</strong> file  named as     <Typography color="red" marginY="10px">Team Name:</Typography>
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
        </Box>
      </Container>
    </div>
  );
};

export default roundOne;
