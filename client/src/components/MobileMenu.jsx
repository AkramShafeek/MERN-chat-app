import { ArrowBack, ColorLens, DarkMode, LightMode, Logout, MenuRounded, Message } from "@mui/icons-material";
import { Avatar, Box, Divider, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMode } from "../redux/features/uiModeSlice";
import NotificationsList from "./NotificationsList";
import ThemesList from "./ThemesList";
import { clearUserInfo } from "../redux/features/userSlice";
import { clearChat } from "../redux/features/chatSlice";
import { clearNotifications } from "../redux/features/notificationSlice";
import { useNavigate } from "react-router-dom";
import { rootUrl } from "./utils/api callers/config";

const MobileMenu = () => {

  const user = useSelector((store) => store.user.userInfo);
  const uiMode = useSelector((store) => store.ui.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(null);
  const [isThemeOpen, setisThemeOpen] = useState(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(null);
  const [navigationStack, setNavigationStack] = useState([]);


  const handleOpen = {
    openMobileMenu: (event) => {
      setNavigationStack([...navigationStack, setIsMobileMenuOpen]);
      setAnchorEl(event.currentTarget);
      setIsMobileMenuOpen(true);
    },
    openTheme: () => {
      setNavigationStack([...navigationStack, setisThemeOpen]);
      setisThemeOpen(true);
    },
    openNotifications: () => {
      setNavigationStack([...navigationStack, setIsNotificationsOpen]);
      setIsNotificationsOpen(true);
    }
  }

  const handleClose = () => {
    setAnchorEl(null);
    setIsMobileMenuOpen(null);
    setisThemeOpen(null);
    setIsNotificationsOpen(null);
  }

  const navigateBack = () => {
    let lastOption;
    let newNavStack;
    if (navigationStack.length !== 0) {
      lastOption = navigationStack[navigationStack.length - 1];
      newNavStack = navigationStack.filter((element, index) => index !== navigationStack.length - 1);
      setNavigationStack(newNavStack);
      lastOption(null);
    }
  }

  const logout = () => {
    dispatch(clearUserInfo());
    dispatch(clearChat());
    dispatch(clearNotifications());
    navigate('/');
  }

  return (
    <Box>
      <IconButton onClick={handleOpen.openMobileMenu}>
        <MenuRounded />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={isMobileMenuOpen}
        onClose={handleClose}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <IconButton disableRipple onClick={navigateBack}>
            <ArrowBack />
          </IconButton>
        </Box>
        <Divider sx={{ width: '100%' }} />
        {!isThemeOpen && !isNotificationsOpen && <Box>
          <MenuItem sx={{ display: 'flex', gap: '0.8rem' }}>
            <Avatar src={`${rootUrl}/assets/${user.pic}`} />
            Change profile
          </MenuItem>
          <MenuItem sx={{ display: 'flex', gap: '0.8rem' }} onClick={handleOpen.openTheme}>
            <ColorLens />
            Theme
          </MenuItem>
          <MenuItem sx={{ display: 'flex', gap: '0.8rem' }} onClick={() => dispatch(toggleMode())}>
            {uiMode === 'dark' ? <LightMode /> : <DarkMode />}
            {uiMode === 'dark' ? "Light mode" : "Dark mode"}
          </MenuItem>
          <MenuItem sx={{ display: 'flex', gap: '0.8rem' }} onClick={handleOpen.openNotifications}>
            <Message />
            Notifications
          </MenuItem>
          <MenuItem sx={{ display: 'flex', gap: '0.8rem' }} onClick={logout}>
            <Logout />
            Logout
          </MenuItem>
        </Box>}
        {isThemeOpen && <ThemesList />}

        {isNotificationsOpen && <NotificationsList closeNotifications={handleClose} />}
      </Menu>
    </Box>
  );
}

export default MobileMenu;