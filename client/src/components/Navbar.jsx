import { Avatar, Badge, Box, IconButton, InputAdornment, Menu, MenuItem, Paper, TextField, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import SideDrawer from "./SideDrawer";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme, toggleMode } from "../redux/features/uiModeSlice";
import LightModeIcon from '@mui/icons-material/LightMode';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import MailIcon from '@mui/icons-material/Mail';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from "@emotion/react";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import searchUsers from "./utils/util functions/searchUsers";
import NavbarSearchUser from "./NavbarSearchUser";
import Notifications from "./Notifications";
import { useNavigate } from "react-router-dom";
import { clearUserInfo } from "../redux/features/userSlice";
import { clearChat } from "../redux/features/chatSlice";
import { clearNotifications } from "../redux/features/notificationSlice";

const Navbar = () => {
  const pic = useSelector((store) => store.user.userInfo.pic);
  const uiMode = useSelector((store) => store.ui.mode);
  const token = useSelector((store) => store.user.token);
  const notificationsNum = useSelector((store) => store.notifications.messageNotifications.length);
  const dispatch = useDispatch();

  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [anchorElTheme, setAnchorElTheme] = useState(null);
  const notificationsOpen = Boolean(anchorElNotifications);
  const themeOpen = Boolean(anchorElTheme);
  const ProfileOpen = Boolean(anchorElProfile);

  const [searchValue, setSearchValue] = useState("");
  const [clearSearchIcon, setClearSearchIcon] = useState(false);

  const navigate = useNavigate();

  const clearSearch = () => {
    setSearchValue("");
    setClearSearchIcon(false);
  }
  const handleChange = async (event) => {
    setSearchValue(event.target.value);
    var data;
    if (event.target.value) {
      try {
        // setLoading(true);
        setClearSearchIcon(true);
        data = await searchUsers(event.target.value, token);
        // setSearchedUsers(data);
        // setLoading(false);
      } catch (error) {
        console.log(error)
        // setLoading(false);
      }
    }
    else
      setClearSearchIcon(false);
  }

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
    },
    openTheme: (event) => {
      setAnchorElTheme(event.currentTarget);
    }
  }
  const handleClose = {
    notifications: () => {
      setAnchorElNotifications(null);
    },
    profile: () => {
      setAnchorElProfile(null);
    },
    closeTheme: () => {
      setAnchorElTheme(null);
    }
  }

  const logout = () => {
    dispatch(clearUserInfo());
    dispatch(clearChat());
    dispatch(clearNotifications());
    navigate('/');
  }

  const navbarStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: palette.background.alt,
    width: "100%",
    padding: "10px 1.5rem",
    borderRadius: "0px",
  }
  return (
    <Paper sx={navbarStyles} elevation={0}>
      {/* LOGO TEXT */}
      <Typography fontWeight="700" variant="h3" color="primary" >MERN-chat</Typography>

      {/* SEARCH BAR TO SEARCH USERS AND CHAT */}
      <NavbarSearchUser />

      <Box display={"flex"} gap={"1rem"} alignItems={"center"}>
        {/* SIDE DRAWER FOR SEARCH USERS */}
        {/* <SideDrawer /> */}

        {/* THEME SELECTOR */}
        <IconButton onClick={handleClick.openTheme}>
          <ColorLensIcon />
        </IconButton>
        <Menu
          anchorEl={anchorElTheme}
          open={themeOpen}
          onClose={handleClose.closeTheme}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          PaperProps={{
            elevation: 3
          }}
          sx={{
            marginTop: "10px"
          }}>
          <MenuItem onClick={()=>dispatch(selectTheme('purple'))}>Purple theme</MenuItem>
          <MenuItem onClick={()=>dispatch(selectTheme('gold'))}>Gold theme</MenuItem>
          <MenuItem onClick={()=>dispatch(selectTheme('pastelRed'))}>Pastel red theme</MenuItem>
          <MenuItem onClick={()=>dispatch(selectTheme('skyBlue'))}>Sky blue theme</MenuItem>
        </Menu>

        {/* UI MODE TOGGLER */}
        <IconButton onClick={handleClick.toggleUi}>
          {uiMode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>


        {/* NOTIFICATIONS */}
        <Notifications />

        {/* PROFILE OPTIONS */}
        <Tooltip title="Profile Options">
          <IconButton onClick={handleClick.profile}>
            <Avatar src={pic} />
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
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Paper>
  );
}

export default Navbar;