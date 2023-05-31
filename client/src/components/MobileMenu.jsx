import { ArrowBack, ColorLens, DarkMode, LightMode, Logout, MenuRounded, Message } from "@mui/icons-material";
import { Avatar, Badge, Box, Divider, IconButton, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMode } from "../redux/features/uiModeSlice";
import NotificationsList from "./NotificationsList";
import ThemesList from "./ThemesList";
import { clearUserInfo } from "../redux/features/userSlice";
import { clearChat } from "../redux/features/chatSlice";
import { clearNotifications, loadNotifications } from "../redux/features/notificationSlice";
import { useNavigate } from "react-router-dom";
import { rootUrl } from "./utils/api callers/config";
import io from 'socket.io-client';

var socket;

const MobileMenu = () => {

  const user = useSelector((store) => store.user.userInfo);
  const uiMode = useSelector((store) => store.ui.mode);
  const badgeNum = useSelector((store) => store.notifications.messageNotifications.length);
  const messageNotifications = useSelector((store) => store.notifications.messageNotifications);
  const selectedChat = useSelector((store) => store.chat.selectedChat);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isThemeOpen, setisThemeOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [navigationStack, setNavigationStack] = useState([]);


  useEffect(() => {
    socket = io(rootUrl);
    socket.emit('setup', user);
    return () => {
      console.log("Disconnecting socket from mobile menu");
      socket.disconnect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (!selectedChat || selectedChat._id !== newMessageReceived.chat._id)
        dispatch(loadNotifications([newMessageReceived, ...messageNotifications]));
    })

    // clean up code to stop listening to message events
    return () => {
      console.log("Removing socket event listener from mobile menu");
      socket.off("message received");
    }
  }, [selectedChat, messageNotifications]);


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
    setAnchorEl(false);
    setIsMobileMenuOpen(false);
    setisThemeOpen(false);
    setIsNotificationsOpen(false);
  }

  const navigateBack = () => {
    let lastOption;
    let newNavStack;
    if (navigationStack.length !== 0) {
      lastOption = navigationStack[navigationStack.length - 1];
      newNavStack = navigationStack.filter((element, index) => index !== navigationStack.length - 1);
      setNavigationStack(newNavStack);
      lastOption(false);
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
        <Badge badgeContent={badgeNum} color="primary" >
          <MenuRounded />
        </Badge>
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
            <Badge badgeContent={badgeNum} color="primary">
              <Message />
            </Badge>
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