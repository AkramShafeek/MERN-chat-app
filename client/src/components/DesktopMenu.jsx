import { rootUrl } from "./utils/api callers/config";
import { useState } from "react";
import { clearChat } from "../redux/features/chatSlice";
import { toggleMode } from "../redux/features/uiModeSlice";
import { useNavigate } from "react-router-dom";
import { clearUserInfo } from "../redux/features/userSlice";
import { clearNotifications } from "../redux/features/notificationSlice";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import Notifications from "./Notifications";
import ThemesList from "./ThemesList";

// icons
import LightModeIcon from '@mui/icons-material/LightMode';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const DesktopMenu = () => {
  const pic = useSelector((store) => store.user.userInfo.pic);
  const uiMode = useSelector((store) => store.ui.mode);
  const dispatch = useDispatch();

  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [anchorElTheme, setAnchorElTheme] = useState(null);
  const themeOpen = Boolean(anchorElTheme);
  const ProfileOpen = Boolean(anchorElProfile);

  const navigate = useNavigate();

  const handleClick = {
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

  return (
    <Box display={"flex"} gap={"1rem"} alignItems={"center"}>

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
        <ThemesList />
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
          <Avatar src={`${rootUrl}/assets/${pic}`} />
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
  );
}

export default DesktopMenu;