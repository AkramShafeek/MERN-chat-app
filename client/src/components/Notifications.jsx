import { Avatar, Box, ListItem, ListItemAvatar, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux"

const listButtonStyles = {
  marginTop: "0.5rem",
  marginRight: "0.5rem",
  borderRadius: "10px"
}

const Notifications = () => {
  const messageNotifications = useSelector((store) => store.notifications.messageNotifications);

  useEffect(() => {
    console.log(messageNotifications);
  }, [messageNotifications]);

  const handleClick = () => {

  }

  return (
    <Stack>
      {messageNotifications.map((message) => {
        return (
          <ListItemButton sx={listButtonStyles} onClick={() => handleClick()}>
            <ListItem disablePadding>
              <ListItemAvatar>
                <Avatar alt="P" src={message.sender.pic} />
              </ListItemAvatar>
              <Box>
                <Typography fontWeight={700}>{message.sender.name}</Typography>
                <Typography fontSize={12}>{message.content}</Typography>
              </Box>
            </ListItem>
          </ListItemButton>
        )
      })}
    </Stack>
  )
}

export default Notifications;