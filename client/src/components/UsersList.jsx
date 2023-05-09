import { useTheme } from "@emotion/react";
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Skeleton, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import MySnackbar from "./utils/MySnackbar";
import { loadChat } from "../redux/features/chatSlice";
import LinearProgress from '@mui/material/LinearProgress';
import { useState } from "react";

const userInfo = (user) => {
  return (
    <div>
      <Typography>{user.name}</Typography>
      <Typography sx={{ fontSize: "11px" }}>{user.email}</Typography>
    </div>
  )
}

const UsersList = (props) => {

  const token = useSelector((store) => store.user.token);
  const chat = useSelector((store) => store.chat.data);
  const dispatch = useDispatch()

  const [loadingUser, setLoadingUser] = useState(null);

  if (!props.searchedUsers)
    return;

  const listButtonStyles = {
    marginTop: "0.5rem",
    borderRadius: "10px"
  }

  const handleClick = async (user) => {
    try {
      setLoadingUser(user._id);
      await props.onUserClick(user);
      setLoadingUser(null);
    } catch (error) {
      setLoadingUser(null);
    }
  }

  return (
    <List component="nav" aria-label="mailbox folders"
      sx={{
        position: 'relative',
        overflowY: props.searchedUsers.length > props.limit ? 'scroll' : 'visible',
        height: `${props.limit * 73}px`
      }}>
      {props.searchedUsers?.map((user) => {
        return (
          <div key={user._id}>
            <ListItemButton sx={listButtonStyles} onClick={() => handleClick(user)}>
              <ListItem disablePadding>
                <ListItemAvatar>
                  <Avatar alt="P" src={user.pic} />
                </ListItemAvatar>
                <ListItemText primary={userInfo(user)} />
              </ListItem>
            </ListItemButton>
            {loadingUser === user._id && <LinearProgress sx={{ borderRadius: '10px' }} />}
          </div>
        )
      })
      }
    </List>
  );
}

UsersList.defaultProps = {
  limit: 4
}

export default UsersList;