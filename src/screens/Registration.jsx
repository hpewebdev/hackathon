import * as React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import {
  Button,
  TextField,
  Grid,
  Alert,
  Box,
  Typography,
  Container,
  Paper,
  InputAdornment,
  Divider,
  Snackbar,
} from "@mui/material";
import { blue } from "@mui/material/colors";
const bgColor = blue[700];
import AccountCircle from "@mui/icons-material/AccountCircle";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import StayPrimaryPortraitIcon from "@mui/icons-material/StayPrimaryPortrait";
import IconButton from "@mui/material/IconButton";
import "../assets/css/Registration.css";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(false);
  const handleCloseEmpo = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setData(false);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const [showErr, setErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [helperText, setHelperText] = useState("");
  const [passwordErr, setpasswordErr] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showCPassword, setShowCPassword] = React.useState(false);
  const [isLoading, setLoading] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowCPassword = () => setShowCPassword((showc) => !showc);
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Initialize the hook
  const [teamNameError, setTeamNameError] = useState(false);
  const [teamNameValid, setTeamNameValid] = useState(false);

  // TeamName ValidationHandler
  const validateTeamName = async (teamName) => {
    if (teamName == "" || teamName == null) {
      setTeamNameError(true);
      setHelperText("Team Name is required");
    } else {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          teamName: teamName, // Use the input teamName here
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        const response = await fetch(
          "http://10.64.29.214:8080/api/teamname",
          requestOptions
        );
        const result = await response.json();

        if (result.message === "Team Valid You Can Proceed") {
          setTeamNameError(false); // No error if valid
          setTeamNameValid(true); // Show success message
        } else {
          setTeamNameError(true); // Show error if not valid
          setTeamNameValid(false);
        }
      } catch (error) {
        console.error("Error checking team name:", error);
      }
    }
  };
  // TeamName ValidationHandler End's Here

  // API call for Employee Id Verification

  const EmpIdApiHandler = (id) => {
    return new Promise((resolve, reject) => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify({
        empNo: id,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch("http://10.64.29.214:8080/api/emp", requestOptions)
        .then((res) => res.json())
        .then((resp) => {
          /*   console.log(resp); */ // Log the response value
          resolve(resp); // Resolve the promise with the response value
        })
        .catch((error) => {
          /*  console.error('Error fetching data:', error); */
          reject(error); // Reject the promise with the error
        });
    });
  };

  // Team Name Verification API Handler Function

  const [LeaderInfo, setLeaderInfo] = useState();
  const [getLeaderInfo, setgetLeaderInfo] = useState();
  const [MemberOneInfo, setMemberOneInfo] = useState();
  const [MemberOne, setMemberOne] = useState();
  const [MemberTwoInfo, setMemberTwoInfo] = useState();
  const [MemberTwo, setMemberTwo] = useState();
  const [MemberThreeInfo, setMemberThreeInfo] = useState();
  const [MemberThree, setThree] = useState();

  const verificationHandler = (person, empid) => {
    const employeeId = person; // Example value

    switch (employeeId) {
      case "leader":
        EmpIdApiHandler(empid)
          .then((data) => {
            console.log("Received data:", data);
            data.error
              ? alert(data.error)
              : data.message
              ? alert(data.message)
              : setgetLeaderInfo(data);
            // Use the data as needed
          })
          .catch((err) => {
            console.error("Error:", err);
            // Handle the error
          });

        break;
      case "memberOne":
        // Code for handling PersonmemberOneandEmpId13
        EmpIdApiHandler(empid)
          .then((data) => {
            console.log("Received data:", data);
            data.error
              ? alert(data.error)
              : data.message
              ? alert(data.message)
              : setMemberOne(data);
            // Use the data as needed
          })
          .catch((err) => {
            console.error("Error:", err);
            // Handle the error
          });

        break;
      case "memberTwo":
        // Code for handling PersonmemberTwoandEmpId14
        EmpIdApiHandler(empid)
          .then((data) => {
            console.log("Received data:", data);
            data.error
              ? alert(data.error)
              : data.message
              ? alert(data.message)
              : setMemberTwo(data);
            // Use the data as needed
          })
          .catch((err) => {
            console.error("Error:", err);
            // Handle the error
          });

        break;
      case "memberThree":
        // Code for handling PersonmemberThreeandEmpId15
        EmpIdApiHandler(empid)
          .then((data) => {
            console.log("Received data:", data);
            data.error
              ? alert(data.error)
              : data.message
              ? alert(data.message)
              : setThree(data);
            // Use the data as needed
          })
          .catch((err) => {
            console.error("Error:", err);
            // Handle the error
          });

        break;
      default:
        // Default case (if none of the above conditions match)
        // console.log(`Unknown employee ID${empid}`);
        break;
    }
  };
  // console.log(MemberThree ? MemberThree : null);
  // Team Name Verification API Handler Function End's Here

  // Handle Passwor Check

  // End Password Check

  // Form Submit Handler
  const handleRegister = (data) => {
    console.log(data);
    const UserName = data.teamName;
    const password = data.password;
    const leaderId = data.EmpIDLeader;
    const Team_Name = data.teamName;
    const Mobile_Number = data.mobileno;
    const MemberOneID = data.memberOneEmpId;
    const MemberTwoID = data.memberTwoEmpId;
    const MemberThreeID = data.memberThreeEmpId;
    const Cpassword = data.cpassword;
    setLoading(true);
    {
      if (password === Cpassword) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          UserName: UserName,
          password: password,
          Leader_ID: leaderId,
          Team_Name: Team_Name,
          Mobile_Number: Mobile_Number,
          Member2: MemberOneID,
          Member3: MemberTwoID,
          Member4: MemberThreeID,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch("http://10.64.29.214:8080/api/registration", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            setTimeout(() => {
              setLoading(false);
            }, 1800);
            setErrorMessage(result.message);
            setErr(true);
            setTimeout(() => {
              navigate("/");
            }, 4800);
          })
          .catch((error) => console.log("error", error));
      } else {
        setpasswordErr(true);
      }
    }

    // Handle Register Logic
  };

  return (
    <div>
      <Header />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Employee not found!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={data}
        autoHideDuration={6000}
        onClose={handleCloseEmpo}
      >
        <Alert
          onClose={handleCloseEmpo}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Please Enter Employee Id
        </Alert>
      </Snackbar>
      <Container  elevation={2} component={Paper} sx={{ marginTop: "155px" }}>
        <Box bgcolor={bgColor}>
          <Typography
            color="white"
            fontFamil="monospace"
            fontWeight="700"
            letterSpacing=".3rem"
            variant="h4"
            fontStyle="oblique"
            textAlign={"center"}
          >
            Create Account <AccountCircle />
          </Typography>
        </Box>
        <Box
          sx={{ marginY: 5 }}
          component="form"
          onSubmit={handleSubmit(handleRegister)}
          noValidate
        >
          {passwordErr ? (
            <Alert
              sx={{ marginY: 3 }}
              severity="error"
              onClose={() => {
                setErr(false);
              }}
            >
              {/* {errorMessage} */}
              Password not matched with Confirm Password.
            </Alert>
          ) : null}
          {showErr ? (
            <Alert
              sx={{ marginY: 3 }}
              severity="success"
              onClose={() => {
                setErr(false);
              }}
            >
              {errorMessage}
            </Alert>
          ) : null}
          <Grid container spacing={1}>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                id="teamName"
                name="teamName"
                label="Team Name"
                {...register("teamName", { required: true })}
                onBlur={(e) => validateTeamName(e.target.value)} // onBlur validation
                error={errors.teamName || teamNameError}
                helperText={
                  helperText || errors.teamName
                    ? "Team Name is required" // Show this message if the field is empty or touched
                    : teamNameError
                    ? "TeamName Already Registered"
                    : teamNameValid
                    ? "Team Name Available"
                    : ""
                }
                variant="outlined"
                color={teamNameValid && teamNameValid ? "success" : "error"} // Set color based on validity
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AssignmentIndIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                variant="outlined"
                autoComplete="given-name"
                name="mobileno"
                fullWidth
                id="mobileno"
                label="Mobile No"
                type="number"
                {...register("mobileno", { required: true, maxLength: 10 })}
                error={!!errors.mobileno}
                helperText={
                  errors.mobileno?.type === "required"
                    ? "Mobile No. is required"
                    : errors.mobileno?.type === "maxLength"
                    ? "Mobile No. should be 10 digits"
                    : ""
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <StayPrimaryPortraitIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                variant="outlined"
                autoComplete="given-name"
                name="password"
                fullWidth
                id="password"
                label="Password"
                autoFocus
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
                {...register("password", { required: true })}
                error={!!errors.password}
                helperText={
                  errors.password?.type === "required" && "Password is required"
                }
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                variant="outlined"
                autoComplete="given-name"
                name="cpassword"
                fullWidth
                id="cpassword"
                label="Confirm Password"
                autoFocus
                type={showCPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowCPassword}>
                        {showCPassword ? <VisibilityOff /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                {...register("cpassword", { required: true })}
                error={!!errors.cpassword}
                helperText={
                  errors.cpassword?.type === "required" &&
                  "Confirm Password is required"
                }
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider>
                <Typography variant="h6" textAlign="center">
                  Leader's Information
                </Typography>
              </Divider>
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                variant="outlined"
                autoComplete="given-name"
                name="EmpIDLeader"
                fullWidth
                id="EmpIDLeader"
                {...register("EmpIDLeader", { required: true })}
                error={!!errors.EmpIDLeader}
                helperText={
                  errors.EmpIDLeader?.type === "required" &&
                  "Employee Id is required"
                }
                label="EmployeeId"
                autoFocus
                type="number"
                onChange={(e) => setLeaderInfo(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                          verificationHandler("leader", LeaderInfo);
                        }}
                      >
                        Load
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                variant="outlined"
                // autoComplete="given-name"
                name="email"
                fullWidth
                disabled
                id="email"
                autoFocus
                placeholder="Leader Email"
                value={getLeaderInfo && getLeaderInfo.EMAIL_ID}
                type="email"
                {...register("email", { required: false })}
                error={!!errors.email}
                helperText={
                  errors.email?.type === "required" && "Email is required"
                }
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                variant="outlined"
                autoComplete="given-name"
                name="firstName"
                fullWidth
                disabled
                id="firstName"
                autoFocus
                type="text"
                value={getLeaderInfo ? getLeaderInfo.OFFICER_NAME : null}
                {...register("firstName", { required: false })}
                error={!!errors.firstName}
                helperText={
                  errors.firstName?.type === "required" &&
                  "Firstname is required"
                }
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                variant="outlined"
                name="leaderProjectGroup"
                fullWidth
                disabled
                id="leaderProjectGroup"
                autoFocus
                type="text"
                value={getLeaderInfo && getLeaderInfo.OFFICER_DEPT_CODE}
                {...register("leaderProjectGroup", { required: false })}
                error={!!errors.leaderProjectGroup}
                helperText={
                  errors.leaderProjectGroup?.type === "required" &&
                  "ProjectGroup is required"
                }
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider>
                <Typography variant="h6" textAlign="center">
                  Member One Information
                </Typography>
              </Divider>
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                variant="outlined"
                autoComplete="given-name"
                name="memberOneEmpId"
                fullWidth
                id="memberOneEmpId"
                label="EmployeeId"
                autoFocus
                type="number"
                {...register("memberOneEmpId")}
                onChange={(e) => setMemberOneInfo(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => {
                          verificationHandler("memberOne", MemberOneInfo);
                        }}
                      >
                        Load
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                variant="outlined"
                autoComplete="given-name"
                name="memberOneEmail"
                fullWidth
                disabled
                value={MemberOne && MemberOne.EMAIL_ID}
                id="memberOneEmail"
                autoFocus
                placeholder="Member Email"
                type="email"
                {...register("memberOneEmail", { required: false })}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                variant="outlined"
                autoComplete="given-name"
                name="memberOneName"
                value={MemberOne && MemberOne.OFFICER_NAME}
                fullWidth
                disabled
                id="memberOneName"
                autoFocus
                type="text"
                {...register("memberOneName", { required: false })}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                variant="outlined"
                autoComplete="given-name"
                name="memberOneProject"
                fullWidth
                disabled
                id="memberOneProject"
                autoFocus
                type="text"
                value={MemberOne && MemberOne.OFFICER_DEPT_CODE}
                {...register("memberOneProject", { required: false })}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider>
                <Typography variant="h6" textAlign="center">
                  Member Two Information
                </Typography>
              </Divider>
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                variant="outlined"
                autoComplete="given-name"
                name="memberTwoEmpId"
                fullWidth
                id="memberTwoEmpId"
                label="EmployeeId"
                autoFocus
                type="number"
                {...register("memberTwoEmpId")}
                onChange={(e) => setMemberTwoInfo(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => {
                          verificationHandler("memberTwo", MemberTwoInfo);
                        }}
                      >
                        Load
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                disabled
                variant="outlined"
                autoComplete="given-name"
                name="memberTwoEmail"
                fullWidth
                id="memberTwoEmail"
                placeholder="Member Email"
                autoFocus
                type="email"
                {...register("memberTwoEmail")}
                value={MemberTwo && MemberTwo.EMAIL_ID}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                variant="outlined"
                autoComplete="given-name"
                name="memberTwoName"
                fullWidth
                id="memberTwoName"
                autoFocus
                disabled
                type="text"
                {...register("memberTwoName")}
                value={MemberTwo && MemberTwo.OFFICER_NAME}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                disabled
                variant="outlined"
                autoComplete="given-name"
                name="memberTwoProjectGroup"
                fullWidth
                id="memberTwoProjectGroup"
                autoFocus
                type="text"
                {...register("memberTwoProjectGroup")}
                value={MemberTwo && MemberTwo.OFFICER_DEPT_CODE}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider>
                <Typography variant="h6" textAlign="center">
                  Member Three Information
                </Typography>
              </Divider>
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                variant="outlined"
                autoComplete="given-name"
                name="memberThreeEmpId"
                fullWidth
                id="memberThreeEmpId"
                label="EmployeeId "
                autoFocus
                type="number"
                {...register("memberThreeEmpId")}
                onChange={(e) => {
                  setMemberThreeInfo(e.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => {
                          verificationHandler("memberThree", MemberThreeInfo);
                        }}
                      >
                        Load
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                disabled
                variant="outlined"
                autoComplete="given-name"
                name="memberThreeEmail"
                fullWidth
                id="memberThreeEmail"
                placeholder="Member Email"
                autoFocus
                type="email"
                {...register("memberThreeEmail")}
                value={MemberThree && MemberThree.EMAIL_ID}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                disabled
                variant="outlined"
                autoComplete="given-name"
                name="memberThreeName"
                fullWidth
                id="memberThreeName"
                autoFocus
                type="text"
                {...register("memberThreeName")}
                value={MemberThree && MemberThree.OFFICER_NAME}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                disabled
                variant="outlined"
                autoComplete="given-name"
                name="memberThreeProjectGroup"
                fullWidth
                id="memberThreeProjectGroup"
                autoFocus
                type="text"
                {...register("memberThreeProjectGroup")}
                value={MemberThree ? MemberThree.OFFICER_DEPT_CODE : null}
              />
            </Grid>

            <Grid textAlign={"center"} item md={12} xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                disabled={teamNameError && !teamNameValid} // Also disable if teamNameValid is false
              >
                {isLoading ? <> Registering...</> : <>Submit</>}
              </Button>
            </Grid>
          </Grid>
        </Box>
        <DevTool control={control} />
      </Container>
    </div>
  );
}
