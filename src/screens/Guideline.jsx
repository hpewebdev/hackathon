import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import secureLocalStorage from "react-secure-storage";
import Header from "../components/Header";
import "../assets/css/Login.css";
const Guideline = () => {
  const navigate = useNavigate();
  const RegisterHandler = () => {
    navigate("/registration");
  };
  const Token = secureLocalStorage.getItem("token");
  return (
    <>
      <Header />

      <Container sx={{ marginTop: 20 }}>
        <Box elevation={1}>
          <Typography
            sx={{ marginY: 3 }}
            textAlign="center"
            variant="h4"
            gutterBottom
            fontFamily={"monospace"}
            fontWeight="700"
            letterSpacing={"0.3rem"}
          >
            🚀 Hackathon Rules and Evaluation Criteria 🌟
          </Typography>
          <Typography color="red" variant="h6" gutterBottom>
            <strong>Team Creation:</strong>
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="👥 Participants must be CRIS employees or on deputation." />
            </ListItem>
            <ListItem>
              <ListItemText primary="🤝 Form teams of up to 4 members with diverse skill sets." />
            </ListItem>
            <ListItem>
              <ListItemText primary="🎨 Get creative! Give your team a unique name." />
            </ListItem>
          </List>
          <Typography color="red" variant="h6" gutterBottom>
            <strong>General Guidelines:</strong>
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="⏰ All work must be completed within the designated time frame." />
            </ListItem>
            <ListItem>
              <ListItemText primary="🎨 Originality matters! Create fresh solutions during the Hackathon." />
            </ListItem>
            <ListItem>
              <ListItemText primary="🎤 Present your projects confidently to the judges." />
            </ListItem>
            <ListItem>
              <ListItemText primary="🏆 Projects will be evaluated based on specific criteria." />
            </ListItem>
            <ListItem>
              <ListItemText primary="🔒 Protect organization data—avoid database connections during the event." />
            </ListItem>
          </List>
          {!Token ? (
            <Grid sx={{ marginTop: 12 }} textAlign="center">
              <Button onClick={RegisterHandler} variant="contained">
                Register Team
              </Button>
            </Grid>
          ) : null}
        </Box>
      </Container>
    </>
  );
};

export default Guideline;
