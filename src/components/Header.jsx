import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { deepOrange } from "@mui/material/colors";
import secureLocalStorage from "react-secure-storage";
import LoginIcon from "@mui/icons-material/Login";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
function Header() {
  const Token = secureLocalStorage.getItem("token");
  const username = secureLocalStorage.getItem("user");
  const role = secureLocalStorage.getItem("role");
  const round = secureLocalStorage.getItem("round");
  const verified = secureLocalStorage.getItem("verified");

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const LogoutHandler = () => {
    secureLocalStorage.clear();
    navigate("/");
  };

  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Hackathon
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  onClick={() => {
                    navigate("/participants");
                  }}
                  textAlign="center"
                >
                  Participant
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  onClick={() => {
                    navigate("/result");
                  }}
                  textAlign="center"
                >
                  Result
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  onClick={() => {
                    navigate("/Guideline");
                  }}
                  textAlign="center"
                >
                  Guidelines
                </Typography>
              </MenuItem>
              {role == 1 ? (
                verified == 1 ? (
                  <>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography
                        onClick={() => {
                          navigate("/contact");
                        }}
                        textAlign="center"
                      >
                        Contact
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography
                        onClick={() => {
                          navigate("/project");
                        }}
                        textAlign="center"
                      >
                        Round {round}
                      </Typography>
                    </MenuItem>
                  </>
                ) : null
              ) : null}

              {role == 2 ? (
                verified == 1 ? (
                  <>
                    {" "}
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography
                        onClick={() => {
                          navigate("/AdminDashboard");
                        }}
                        textAlign="center"
                      >
                        Team Evaluation
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography
                        onClick={() => {
                          navigate("/ProjectEntries");
                        }}
                        textAlign="center"
                      >
                        Project Entries
                      </Typography>
                    </MenuItem>
                  </>
                ) : null
              ) : null}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            HACKATHON
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => {
                navigate("/participants");
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Partcipant's
            </Button>
            <Button
              onClick={() => {
                navigate("/result");
              }}
              sx={{ color: "white" }}
            >
              Result
            </Button>
            <Button
              onClick={() => {
                navigate("/Guideline");
              }}
              sx={{ color: "white" }}
            >
              Guidelines
            </Button>
            {role == 2 ? (
              verified == 1 ? (
                <>
                  <Button
                    onClick={() => {
                      navigate("/ProjectEntries");
                    }}
                    sx={{ color: "white" }}
                  >
                    Project Entries
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/AdminDashboard");
                    }}
                    sx={{ color: "white" }}
                  >
                    Team Evaluation
                  </Button>
                </>
              ) : null
            ) : role == 1 ? (
              verified == 1 ? (
                <>
                  <Button
                    onClick={() => {
                      navigate("/contact");
                    }}
                    sx={{ color: "white" }}
                  >
                    Contact
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/project");
                    }}
                    sx={{ color: "white" }}
                  >
                    Round {round}
                  </Button>
                </>
              ) : null
            ) : null}
          </Box>
          {Token ? (
            <>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip arrow title={username}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      sx={{ bgcolor: deepOrange[500] }}
                      alt={username}
                      src="/broken-image.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {/* <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem> */}
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Button
                      onClick={LogoutHandler}
                      sx={{ color: "white" }}
                      endIcon={<ExitToAppIcon />}
                      variant="contained"
                    >
                      Logout
                    </Button>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          ) : (
            <>
              <Box
                sx={{ textAlign: "end", display: { xs: "flex", md: "flex" } }}
              >
                <Button
                  onClick={() => {
                    navigate("/");
                  }}
                  sx={{ color: "white" }}
                  endIcon={<LoginIcon />}
                >
                  Login
                </Button>
                <Button
                  onClick={() => {
                    navigate("/registration");
                  }}
                  sx={{ color: "white" }}
                  endIcon={<PersonIcon />}
                >
                  Register
                </Button>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
