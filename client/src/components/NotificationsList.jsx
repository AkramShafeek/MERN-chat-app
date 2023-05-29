import {
  Avatar,
  Box,
  Button,
  ListItemAvatar,
  MenuItem,
  Typography
} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { selectChat } from "../redux/features/chatSlice";
import { clearNotifications, removeNotification } from "../redux/features/notificationSlice";
import { rootUrl } from "./utils/api callers/config";

const menuItemStyles = {
  margin: "0.5rem",
  borderRadius: "10px"
}

const NotificationsList = ({ closeNotifications }) => {
  const dispatch = useDispatch();
  const messageNotifications = useSelector((store) => store.notifications.messageNotifications);

  const handleClick = {
    goToChat: (message) => {
      closeNotifications();
      dispatch(selectChat(message.chat));
      dispatch(removeNotification(message.chat._id));
    },
    clearAllNotifications: () => {
      dispatch(clearNotifications());
      closeNotifications();
    }
  }

  return (
    <Box>
      {messageNotifications.length === 0 &&
        <MenuItem disabled>No messages....</MenuItem>}
      {messageNotifications.map((message) => {
        return (
          <MenuItem key={message._id} sx={menuItemStyles} onClick={() => handleClick.goToChat(message)}>
            <ListItemAvatar>
              <Avatar alt="P" src={`${rootUrl}/assets/${message.sender.pic}`} />
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
    </Box>
  )
}

NotificationsList.defaultProps = {
  closeNotifications: () => { }
}

export default NotificationsList;