import { Avatar, Box, Button, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { SearchOutlined } from "@mui/icons-material";
import NotificationsIcon from '@mui/icons-material/Notifications';

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const notificationsOpen = Boolean(anchorElNotifications);
  const ProfileOpen = Boolean(anchorElProfile);

  const handleClickNotifications = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };
  const handleClickProfile = (event) => {
    setAnchorElProfile(event.currentTarget);
  };
  const handleNotificationsClose = () => {
    setAnchorElNotifications(null);
  };
  const handleProfileClose = () => {
    setAnchorElProfile(null);
  };
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        backgroundColor="white"
        width="100%"
        padding="10px 15px"
      >
        <Tooltip title="Search users">
          <Button sx={{
            padding: "0.5rem 1rem",
            display: "flex",
            gap: "10px"
          }} variant="outlined">
            Search users
            <SearchOutlined />
          </Button>
        </Tooltip>
        <Typography fontWeight="700" variant="h3" color="primary" >MERN-chat</Typography>
        <Box display={"flex"} gap={"1rem"} alignItems={"center"}>
          <Tooltip title="Message notifications">
            <IconButton onClick={handleClickNotifications}>
              <NotificationsIcon />
            </IconButton>
          </Tooltip>
          <Menu
            id="basic-menu"
            anchorEl={anchorElNotifications}
            open={notificationsOpen}
            onClose={handleNotificationsClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            PaperProps={{
              elevation: 3
            }}
          >
            <MenuItem>Your new messages will appear here</MenuItem>
          </Menu>
          <Tooltip title="Profile Options">
            <IconButton>
              <Avatar onClick={handleClickProfile}>P</Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            id="basic-menu"
            anchorEl={anchorElProfile}
            open={ProfileOpen}
            onClose={handleProfileClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            PaperProps={{
              elevation: 3
            }}
            sx={{
              marginTop: "10px"
            }}
          >
            <MenuItem>Logout</MenuItem>
          </Menu>
        </Box>
      </Box>
    </>
  );
}

export default SideDrawer;