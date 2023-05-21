import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Avatar, Button, IconButton, Menu, MenuItem, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import UsersList from './UsersList';
import { loadChat, selectChat } from '../redux/features/chatSlice';
import { getChatName, getOppUserEmail, getUserAvatar } from './utils/util functions/getChatDetails';
import { DeleteRounded, EditRounded } from '@mui/icons-material';
import { useEffect } from 'react';
import { saveNewGroupNameApi, removeUserFromGroupApi } from './utils/api callers/groupChatApiCallers';


const ChatDetailsUi = ({ setLoading }) => {

  // redux states
  const chat = useSelector((store) => store.chat.data);
  const token = useSelector((store) => store.user.token);
  const user = useSelector((store) => store.user.userInfo);
  const selectedChat = useSelector((store) => store.chat.selectedChat);

  // local states
  const [isEditOn, setIsEditOn] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [newGroupChatName, setNewGroupChatName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [modifiedChat, setModifiedChat] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (modifiedChat != null) {
      const newChat = chat.filter((element) => element._id !== modifiedChat._id);
      // reload chat list with new group name
      dispatch(loadChat([modifiedChat, ...newChat]));
      // reselect chat with new group name
      dispatch(selectChat(modifiedChat));
    }
  }, [modifiedChat]);

  const handleUserClick = (user, event) => {
    setAnchorEl(event.currentTarget);
    setShowUserMenu(true);
    setSelectedUser(user);
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
    setShowUserMenu(false);
  }

  const handleGroupNameChange = (event) => {
    setNewGroupChatName(event.target.value);
  }


  const removeUserFromGroup = async () => {
    try {
      setLoading(true);
      const modifiedChat = await removeUserFromGroupApi(selectedChat, selectedUser, token);
      // close the user menu
      setShowUserMenu(false);
      setModifiedChat(modifiedChat);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setShowUserMenu(false);
      setLoading(false);
    }
  }

  const saveNewGroupName = async () => {
    try {
      setLoading(true);
      const modifiedChat = await saveNewGroupNameApi(selectedChat, newGroupChatName, token);
      setModifiedChat(modifiedChat);
      setIsEditOn(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setIsEditOn(false);
      setLoading(false);
    }
  }

  return (
    <Box>
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }} >
        <Avatar src={getUserAvatar(selectedChat, user)} sx={{ width: '4rem', height: '4rem' }}></Avatar>
        {
          isEditOn && <><TextField placeholder="Enter group name" onChange={handleGroupNameChange} value={newGroupChatName}></TextField>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Button variant="outlined" onClick={() => setIsEditOn(false)}>Cancel</Button>
              <Button variant="contained" disableElevation disabled={!newGroupChatName} onClick={saveNewGroupName}>Save</Button>
            </div></>
        }

        {
          !isEditOn && <Typography
            variant="h6"
            fontSize={'21px'}
            fontWeight={700}
            fontFamily={"Lato"}
            color={"primary"}
            sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {getChatName(selectedChat, user)}
            {selectedChat.isGroupChat && <IconButton onClick={() => setIsEditOn(true)}><EditRounded /></IconButton>}
          </Typography>
        }

        {
          !selectedChat.isGroupChat &&
          <Typography id="modal-modal-title" variant="h6" fontSize={'15px'} fontWeight={300} fontFamily={"Lato"}>
            {getOppUserEmail(selectedChat, user)}
          </Typography>
        }
      </div>
      {selectedChat.isGroupChat && <UsersList users={selectedChat.users} onUserClick={handleUserClick} limit={3} />}
      {selectedChat.isGroupChat && <Menu
        anchorEl={anchorEl}
        open={showUserMenu}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{
          elevation: 3
        }}>
        <MenuItem>
          <IconButton
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              padding: '0',
              '&:hover': {
                backgroundColor: 'transparent'
              }
            }} disableRipple onClick={removeUserFromGroup}>
            <Typography fontSize="15px">Delete User</Typography>
            <DeleteRounded color='error' />
          </IconButton>
        </MenuItem>
      </Menu>}
    </Box>
  );
}

export default ChatDetailsUi;