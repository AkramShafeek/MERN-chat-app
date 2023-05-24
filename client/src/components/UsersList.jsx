import { Avatar, Collapse, ListItem, ListItemAvatar, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
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

  const [loadingUser, setLoadingUser] = useState(null);

  if (!props.users)
    return;

  const listButtonStyles = {
    marginTop: "0.5rem",
    marginRight: "0.5rem",
    borderRadius: "10px"
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