import { useTheme } from "@emotion/react";
import { Avatar, Box, Collapse, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Skeleton, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import MySnackbar from "./utils/util components/MySnackbar";
import { loadChat } from "../redux/features/chatSlice";
import LinearProgress from '@mui/material/LinearProgress';
import { useState } from "react";
import { TransitionGroup } from 'react-transition-group';

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

  if (!props.users)
    return;

  const listButtonStyles = {
    marginTop: "0.5rem",
    marginRight: "0.5rem",
    borderRadius: "10px"
  }

  const chumma = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }

  const handleClick = async (user, event) => {
    try {
      setLoadingUser(user._id);
      // this function will give back the event of click
      // use it if needed
      await await props.onUserClick(user, event);
      setLoadingUser(null);
    } catch (error) {
      setLoadingUser(null);
    }
  }

  return (
    <Stack component="nav" aria-label="mailbox folders"
      sx={{
        width: "100%",
        position: 'relative',
        overflowY: props.users.length > props.limit ? 'scroll' : 'visible',
        height: props.users.length > props.limit ? `${props.limit * 73}px` : `${props.users.length * 73}px`
      }}>

      <TransitionGroup>
        {props.users?.map((user) => {
          return (
            <Collapse key={user._id}>
              <ListItemButton sx={listButtonStyles} onClick={(event) => handleClick(user, event)}>
                <ListItem disablePadding>
                  <ListItemAvatar>
                    <Avatar alt="P" src={user.pic} />
                  </ListItemAvatar>
                  <ListItemText primary={userInfo(user)} />
                </ListItem>
              </ListItemButton>
              {loadingUser === user._id && <LinearProgress sx={{ borderRadius: '10px' }} />}
            </Collapse>
          )
        })
        }
      </TransitionGroup>
    </Stack >
  );
}

UsersList.defaultProps = {
  limit: 4
}

export default UsersList;