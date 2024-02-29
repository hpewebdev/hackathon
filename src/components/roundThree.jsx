import React from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
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
import InputAdornment from "@mui/material/InputAdornment";
import { useForm } from "react-hook-form";
const roundThree = ({ round }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Initialize the hook
  const roundThreeHandler = (data) => {
    console.log(data);
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
            onSubmit={handleSubmit(roundThreeHandler)}
            sx={{ mt: 1 }}
          >
            {" "}
            <InputLabel id="teamlist">Upload Final Presentation</InputLabel>
            <TextField
              sx={{ marginY: "10px" }}
              type="file"
              fullWidth
              display="flex"
              gap={3}
              id="finalPresention"
              name="finalPresention"
              {...register("finalPresention", {
                required: true,
              })}
              error={!!errors.finalPresention}
              helperText={
                errors.finalPresention?.type === "required" &&
                "FinalPresention is required"
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
      </Container>
    </div>
  );
};

export default roundThree;
