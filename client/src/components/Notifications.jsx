import {
  Badge,
  IconButton,
  Menu,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux"
import NotificationsList from "./NotificationsList";
import { Message } from "@mui/icons-material";


const Notifications = () => {

  const badgeNum = useSelector((store) => store.notifications.messageNotifications.length);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const isNotificationsOpen = Boolean(anchorElNotifications);

  const openNotifications = (event) => {
    setAnchorElNotifications(event.currentTarget);
  }

  const closeNotifications = () => { setAnchorElNotifications(null); }


  return (
    <>
      <Tooltip title="Message notifications">
        <IconButton onClick={openNotifications}>
          <Badge badgeContent={badgeNum} color="primary">
            <Message color="action" />
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorElNotifications}
        open={isNotificationsOpen}
        onClose={closeNotifications}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{
          elevation: 3
        }}>
        <NotificationsList closeNotifications={closeNotifications} />
      </Menu>
    </>
  )
}

export default Notifications;