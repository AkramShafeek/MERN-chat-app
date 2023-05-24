import { Alert, Box, Button, Collapse, Grow, IconButton, Skeleton } from "@mui/material";
import UsersSearchBar from "./utils/util components/UsersSearchBar";
import UsersList from "./UsersList";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { addUsersToGroupApi } from "./utils/api callers/groupChatApiCallers";
import { useDispatch, useSelector } from "react-redux";
import { TransitionGroup } from 'react-transition-group';
import { loadChat, selectChat } from "../redux/features/chatSlice";


const AddUsersToGroupUi = ({ getLoadingStatus, closeAddUsers }) => {
  const chat = useSelector((store) => store.chat.data);
  const token = useSelector((store) => store.user.token);
  const selectedChat = useSelector((store) => store.chat.selectedChat);

  const { palette } = useTheme();

  const [searchedUsers, setSearchedUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUserAlreadyExists, setIsUserAlreadyExists] = useState(false);

  const dispatch = useDispatch();

  const addUser = async (selectedUser) => {
    // if user already exists in the selected group, then don't add
    if (selectedChat.users.find((user) => user._id === selectedUser._id)) {
      setIsUserAlreadyExists(true);
      setTimeout(() => {
        setIsUserAlreadyExists(false);
      }, 4000);
      return;
    }
    setIsUserAlreadyExists(false);
    // if user does not exist in selected list, then append them
    if (!selectedUsers.find(element => element._id === selectedUser._id))
      setSelectedUsers([...selectedUsers, selectedUser]);
  }
  const removeUser = async (userId) => {
    const filteredUsers = selectedUsers.filter((user) => user._id != userId);
    setSelectedUsers(filteredUsers);
  }

  const pause = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 5000);
    })
  }

  const addUsersToGroup = async () => {
    try {
      getLoadingStatus(true);
      const modifiedChat = await addUsersToGroupApi(selectedChat, selectedUsers, token);
      const newChat = chat.filter((element) => element._id !== modifiedChat._id);
      // reload chat list with new group name
      dispatch(loadChat([modifiedChat, ...newChat]));
      // reselect chat with new group name
      dispatch(selectChat(modifiedChat));
      getLoadingStatus(false);
      closeAddUsers();
    } catch (error) {
      getLoadingStatus(false);
    }
  }

  return (
    <Box padding={"0rem 1rem"} display={"flex"} flexDirection={"column"} gap={"0.5rem"}>
      <UsersSearchBar
        getSearchedUsers={(data) => setSearchedUsers(data)}
        getLoadingStatus={(status) => setLoading(status)}
        borderRadius={"20px"} />
      {<Collapse in={isUserAlreadyExists}>
        <Alert severity="error" sx={{ display: "flex", alignItems: "center" }} variant="outlined">User already exists in the group</Alert>
      </Collapse>}
      <Box display={"flex"} gap={"0.8rem"} flexWrap={"wrap"}>
        <TransitionGroup style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
          {selectedUsers.map((user) => {
            return (
              <Grow key={user._id}>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} gap={"10px"} borderRadius={"5px"} backgroundColor={palette.primary.light} padding={"10px 15px"}>
                  {user.name}
                  <IconButton onClick={() => removeUser(user._id)}
                    sx={{
                      padding: '0',
                      '&:hover': {
                        backgroundColor: 'transparent'
                      }
                    }}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
              </Grow>
            )
          })}
        </TransitionGroup>
      </Box>
      {loading ? (
        <div>
          <Skeleton animation="wave" height={50} />
          <Skeleton animation="wave" height={50} />
        </div>
      ) : <UsersList users={searchedUsers} onUserClick={addUser} limit={4} />}
      <Box display={"flex"} justifyContent={"flex-end"}>
        <Button variant="contained" disabled={!selectedUsers.length} onClick={addUsersToGroup}>Add</Button>
      </Box>
    </Box>
  )
}

export default AddUsersToGroupUi;