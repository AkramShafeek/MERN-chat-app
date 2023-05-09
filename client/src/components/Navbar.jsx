import { Avatar, Box, IconButton, Menu, MenuItem, Paper, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import SideDrawer from "./SideDrawer";
import { useDispatch, useSelector } from "react-redux";
import { toggleMode } from "../redux/features/uiModeSlice";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from "@emotion/react";

const Navbar = () => {
  const pic = useSelector((store) => store.user.userInfo.pic);
  const uiMode = useSelector((store) => store.ui.theme);
  const dispatch = useDispatch();

  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const notificationsOpen = Boolean(anchorElNotifications);
  const ProfileOpen = Boolean(anchorElProfile);

  const { palette } = useTheme();

  const handleClick = {
    notifications: (event) => {
      setAnchorElNotifications(event.currentTarget);
    },
    profile: (event) => {
      setAnchorElProfile(event.currentTarget);
    },
    toggleUi: () => {
      dispatch(toggleMode());
    }
  }
  const handleClose = {
    notifications: () => {
      setAnchorElNotifications(null);
    },
    profile: () => {
      setAnchorElProfile(null);
    }
  }

  const navbarStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: palette.background.alt,
    width: "100%",
    padding: "10px 1.5rem",
    borderRadius: "0px"
  }
  return (
    <Paper sx={navbarStyles} elevation={0}>
      {/* LOGO TEXT */}
      <Typography fontWeight="700" variant="h3" color="primary" >MERN-chat</Typography>

      <Box display={"flex"} gap={"1rem"} alignItems={"center"}>
        {/* SIDE DRAWER FOR SEARCH USERS */}
        <SideDrawer />

        {/* UI MODE TOGGLER */}
        <IconButton onClick={handleClick.toggleUi}>
          {uiMode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        {/* NOTIFICATIONS */}
        <Tooltip title="Message notifications">
          <IconButton onClick={handleClick.notifications}>
            <NotificationsIcon />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorElNotifications}
          open={notificationsOpen}
          onClose={handleClose.notifications}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          PaperProps={{
            elevation: 3
          }}>
          <MenuItem>Your new messages will appear here</MenuItem>
        </Menu>

        {/* PROFILE OPTIONS */}
        <Tooltip title="Profile Options">
          <IconButton onClick={handleClick.profile}>
            <Avatar>
              {pic ? <img src={pic} style={{ height: "100%", width: "100%", objectFit: "cover" }} /> : "P"}
            </Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorElProfile}
          open={ProfileOpen}
          onClose={handleClose.profile}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          PaperProps={{
            elevation: 3
          }}
          sx={{
            marginTop: "10px"
          }}>
          <MenuItem>Logout</MenuItem>
        </Menu>
      </Box>
    </Paper>
  );
}

export default Navbar;