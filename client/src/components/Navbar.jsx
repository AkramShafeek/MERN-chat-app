import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import SideDrawer from "./SideDrawer";
import { useSelector } from "react-redux";

const Navbar = () => {
  const pic = useSelector((store) => store.user.userInfo.pic);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const notificationsOpen = Boolean(anchorElNotifications);
  const ProfileOpen = Boolean(anchorElProfile);

  const handleClick = {
    notifications: (event) => {
      setAnchorElNotifications(event.currentTarget);
    },
    profile: (event) => {
      setAnchorElProfile(event.currentTarget);
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
    backgroundColor: "white",
    width: "100%",
    padding: "10px 1.5rem"
  }
  return (
    <Box sx={navbarStyles}>
      {/* LOGO TEXT */}
      <Typography fontWeight="700" variant="h3" color="primary" >MERN-chat</Typography>

      <Box display={"flex"} gap={"1rem"} alignItems={"center"}>
        {/* SIDE DRAWER FOR SEARCH USERS */}
        <SideDrawer />

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
    </Box>
  );
}

export default Navbar;