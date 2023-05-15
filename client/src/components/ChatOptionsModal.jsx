import * as React from 'react';
import Box from '@mui/material/Box';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { Avatar, Button, IconButton, InputAdornment, Menu, MenuItem, Skeleton, TextField } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useDispatch, useSelector } from 'react-redux';
import searchUsers from './utils/searchUsers';
import UsersList from './UsersList';
import { useTheme } from '@emotion/react';
import axios from 'axios';
import { loadChat, selectChat } from '../redux/features/chatSlice';
import LinearProgress from '@mui/material/LinearProgress';
import { getChatName, getOppUserEmail, getUserAvatar } from './utils/getChatDetails';
import { AdminPanelSettings, DeleteOutlineRounded, DeleteRounded, EditRounded } from '@mui/icons-material';
import { useEffect } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 1,
  paddingBottom: '30px',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const ChatOptionsModal = ({ children }) => {
  // redux states
  const chat = useSelector((store) => store.chat.data);
  const token = useSelector((store) => store.user.token);
  const user = useSelector((store) => store.user.userInfo);
  const selectedChat = useSelector((store) => store.chat.selectedChat);

  // local states
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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

  // theme
  const { palette } = useTheme();

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === "backdropClick")
      return;
    setOpen(false);
    setNewGroupChatName("");
    setIsEditOn(false);
  };


  const handleUserClick = (user, event) => {
    setAnchorEl(event.currentTarget);
    setShowUserMenu(true);
    console.log("User " + user.name + " will be deleted here\n");
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
    const payload = {
      chatId: selectedChat._id,
      userId: selectedUser._id,
    }
    const url = "http://localhost:3001/api/chat/groupremove";
    const config = {
      headers: {
        'Content-type': "application/json",
        'Authorization': `Bearer ${token}`,
      }
    }
    try {
      setLoading(true);
      const response = await axios.put(url, payload, config);

      // close the user menu
      setShowUserMenu(false);
      setModifiedChat(response.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setShowUserMenu(false);
      setLoading(false);
    }
  }

  const saveNewGroupName = async () => {
    const payload = {
      chatId: selectedChat._id,
      chatName: newGroupChatName,
    }
    const url = "http://localhost:3001/api/chat/grouprename";
    const config = {
      headers: {
        'Content-type': "application/json",
        'Authorization': `Bearer ${token}`,
      }
    }
    try {
      setLoading(true);
      const response = await axios.put(url, payload, config);
      setModifiedChat(response.data);
      setIsEditOn(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setIsEditOn(false);
      setLoading(false);
    }
  }


  return (
    <div>
      <span onClick={handleOpen}>{children}</span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading && <LinearProgress sx={{ borderRadius: "10px" }} />}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }} >
            <IconButton onClick={handleClose}><CloseRoundedIcon /></IconButton>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }} >
            <Avatar src={getUserAvatar(selectedChat, user)} sx={{ width: '4rem', height: '4rem' }}></Avatar>
            {isEditOn && <><TextField placeholder="Enter group name" onChange={handleGroupNameChange} value={newGroupChatName}></TextField>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <Button variant="outlined" onClick={() => setIsEditOn(false)}>Cancel</Button>
                <Button variant="contained" disableElevation disabled={!newGroupChatName} onClick={saveNewGroupName}>Save</Button>
              </div></>}
            {!isEditOn && <Typography
              id="modal-modal-title"
              variant="h6"
              fontSize={'21px'}
              fontWeight={700}
              fontFamily={"Lato"}
              color={"primary"}
              sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {getChatName(selectedChat, user)}
              {selectedChat.isGroupChat && <IconButton onClick={() => setIsEditOn(true)}>
                <EditRounded></EditRounded>
              </IconButton>}
            </Typography>}
            <Typography id="modal-modal-title" variant="h6" fontSize={'15px'} fontWeight={300} fontFamily={"Lato"}>
              {getOppUserEmail(selectedChat, user)}
            </Typography>
          </div>
          {selectedChat.isGroupChat && <UsersList users={selectedChat.users} onUserClick={handleUserClick} limit={3} />}
          <Menu
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
                }} disableRipple>
                <div style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
                  onClick={removeUserFromGroup}>
                  <Typography fontSize="15px">Delete User</Typography>
                  <DeleteRounded color='error' />
                </div>
              </IconButton>
            </MenuItem>
          </Menu>
        </Box>
      </Modal>
    </div >
  );
}

export default ChatOptionsModal;