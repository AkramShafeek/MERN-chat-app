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
    borderRadius: "5px",
    marginTop: "0.5rem",
    borderRadius: "10px"
  }

  const handleClick = async (userId) => {
    try {
      setLoadingUser(userId);
      const url = "http://localhost:3001/api/chat/";
      const config = {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
      const response = await axios.post(url, { userId }, config);
      console.log(response.data);

      // if received chat is not available in my chat list for display
      // then append it
      if (!chat.find(element => element._id === response.data._id))
        dispatch(loadChat([...chat, response.data]));

      setLoadingUser(null);

    } catch (error) {
      console.log("some error boss");
    }
  }

  return (
    <List component="nav" aria-label="mailbox folders" sx={{ position: 'relative' }}>
      {props.searchedUsers?.map((user) => {
        return (
          <>
            <ListItemButton key={user._id} sx={listButtonStyles} onClick={() => handleClick(user._id)}>
              <ListItem disablePadding>
                <ListItemAvatar>
                  <Avatar alt="P" src={user.pic} />
                </ListItemAvatar>
                <ListItemText primary={userInfo(user)} />
              </ListItem>
            </ListItemButton>
            {loadingUser === user._id && <LinearProgress sx={{ borderRadius: '10px' }} />}
          </>
        )
      })
      }
    </List>
  );
}

export default UsersList;