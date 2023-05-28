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
        {messageNotifications.length === 0 &&
          <MenuItem disabled>No messages....</MenuItem>}
        {messageNotifications.map((message) => {
          return (
            <MenuItem key={message._id} sx={listButtonStyles} onClick={() => handleClick.goToChat(message)}>
              <ListItemAvatar>
                <Avatar alt="P" src={message.sender.pic} />
              </ListItemAvatar>
              <Box>
                <Typography fontWeight={700}>{
                  message.chat.isGroupChat ? message.chat.chatName : message.sender.name
                }</Typography>
                <Typography fontSize={12}>{message.content}</Typography>
              </Box>
            </MenuItem>
          )
        })}
        <MenuItem disabled={messageNotifications.length === 0} sx={{
          display: 'flex', justifyContent: 'center', '&:hover': {
            backgroundColor: 'transparent'
          }
        }} disableRipple disableTouchRipple>
          <Button disabled={messageNotifications.length === 0}
            onClick={handleClick.clearAllNotifications}>
            clear all
          </Button>
        </MenuItem>
      </Menu>
    </>
  )
}

export default Notifications;