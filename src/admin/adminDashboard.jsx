import {
  Typography,
  Container,
  Box,
  TextField,
  Button,
  Grid,
  Alert,
  Pagination,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import React, { useEffect } from "react";
import Header from "../components/Header";
import { useState } from "react";
import { useForm } from "react-hook-form";
import secureLocalStorage from "react-secure-storage";
import InputAdornment from "@mui/material/InputAdornment";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";
import Looks5Icon from "@mui/icons-material/Looks5";
import "../assets/css/AdminPanel.css";
const AdminDashboard = () => {
  const [showTeamName, setTeamName] = useState([{}]);
  const Token = secureLocalStorage.getItem("token");
  const [showErr, setErr] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm(); // Initialize the hook

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust as needed

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const onSubmitResult = (data) => {
    console.log(data);
  };

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://10.64.29.214:8080/api/scoreboard/teams", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setTeamName(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <>
      <Header />
      <Typography variant="h4" marginTop="140px" textAlign={"center"}>
        Team Evaluation Criteria
      </Typography>

      <Container sx={{ marginTop: 5, width: "100%" }}>
        <Box component="form" onSubmit={handleSubmit(onSubmitResult)}>
          {showErr ? (
            <Alert
              sx={{ marginY: "25px" }}
              severity="error"
              onClose={() => {
                setErr(false);
              }}
            >
              <Typography textAlign={"center"}>
                Not Submitted Successfully
              </Typography>
            </Alert>
          ) : null}

          {showTeamName.slice(startIndex, endIndex).map((teamList, index) => (
            <Grid key={index} marginY="2px" container spacing={1}>
              <Grid item xs={12} md={1}>
                <TextField
                  variant="standard"
                  id={`teamname${teamList.Team_Name}`}
                  name={`teamname${teamList.Team_Name}`}
                  label="Team Name"
                  value={teamList.Team_Name}
                  InputProps={{
                    readOnly: true,
                  }}
                  {...register(`teamname${teamList.Team_Name}`, {
                    required: true,
                  })}
                ></TextField>
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  fullWidth
                  id={`innovation${teamList.Team_Name}`}
                  name={`innovation${teamList.Team_Name}`}
                  {...register(`innovation${teamList.Team_Name}`, {
                    required: true,
                  })}
                  error={!!errors.innovation}
                  helperText={
                    errors.innovation?.type === "required" &&
                    "Innovation is required"
                  }
                  label="Innovation"
                  type="number"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <Looks3Icon />
                      </InputAdornment>
                    ),
                    max: 2,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  fullWidth
                  id={`complexity${teamList.Team_Name}`}
                  name={`complexity${teamList.Team_Name}`}
                  {...register(`complexity${teamList.Team_Name}`, {
                    required: true,
                  })}
                  error={!!errors.complexity}
                  helperText={
                    errors.complexity?.type === "required" &&
                    "Complexity is required"
                  }
                  label="Complexity"
                  type="number"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <Looks4Icon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  fullWidth
                  id={`impact${teamList.Team_Name}`}
                  name={`impact${teamList.Team_Name}`}
                  {...register(`impact${teamList.Team_Name}`, {
                    required: true,
                  })}
                  error={!!errors.impact}
                  helperText={
                    errors.impact?.type === "required" && "Impact is required"
                  }
                  label="Impact"
                  type="number"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <Looks5Icon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  fullWidth
                  id={`feasibility${teamList.Team_Name}`}
                  name={`feasibility${teamList.Team_Name}`}
                  {...register(`feasibility${teamList.Team_Name}`, {
                    required: true,
                  })}
                  error={!!errors.feasibility}
                  helperText={
                    errors.feasibility?.type === "required" &&
                    "Feasibility is required"
                  }
                  label="Feasibility"
                  type="number"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <LooksOneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  fullWidth
                  id={`presentation${teamList.Team_Name}`}
                  name={`presentation${teamList.Team_Name}`}
                  {...register(`presentation${teamList.Team_Name}`, {
                    required: true,
                  })}
                  error={!!errors.presentation}
                  helperText={
                    errors.presentation?.type === "required" &&
                    "Presentation is required"
                  }
                  label="Presentation"
                  type="number"
                  inputProps={{ maxLength: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <LooksTwoIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={1}>
                <Button size="small" color="warning" variant="contained">
                  Edit
                </Button>
                <FormControlLabel
                  value="end"
                  control={<Checkbox size="small" color="success" />}
                  label="Selected"
                  labelPlacement="end"
                />
              </Grid>
            </Grid>
          ))}

          <Grid marginY="30px" textAlign={"center"} item md={12} xs={12}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
          {/* Pagination */}
          <Pagination
            variant="text"
            shape="rounded"
            siblingCount={1}
            boundaryCount={2}
            showFirstButton
            showLastButton
            color="primary"
            size="large"
            count={Math.ceil(showTeamName.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
      </Container>
    </>
  );
};

export default AdminDashboard;
