import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography
} from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { clearChat, selectChat } from "../redux/features/chatSlice";
import { clearNotifications, removeNotification } from "../redux/features/notificationSlice";
import NotificationsList from "./NotificationsList";

const listButtonStyles = {
  margin: "0.5rem",
  borderRadius: "10px"
}

const Notifications = () => {
  const dispatch = useDispatch();
  const messageNotifications = useSelector((store) => store.notifications.messageNotifications);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const isNotificationsOpen = Boolean(anchorElNotifications);

  const handleClick = {
    openNotifications: (event) => {
      setAnchorElNotifications(event.currentTarget);
    },
    goToChat: (message) => {
      handleClose.closeNotifications();
      dispatch(selectChat(message.chat));
      dispatch(removeNotification(message.chat._id));
    },
    clearAllNotifications: () => {
      dispatch(clearNotifications());
      handleClose.closeNotifications();
    }
  }

  const handleClose = {
    closeNotifications: () => { setAnchorElNotifications(null); }
  }

  return (
    <>
      <Tooltip title="Message notifications">
        <IconButton onClick={handleClick.openNotifications}>
          <Badge badgeContent={messageNotifications.length} color="primary">
            <MailIcon color="action" />
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorElNotifications}
        open={isNotificationsOpen}
        onClose={handleClose.closeNotifications}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{
          elevation: 3
        }}>
        <NotificationsList closeNotifications={handleClose.closeNotifications}/>
      </Menu>
    </>
  )
}

export default Notifications;