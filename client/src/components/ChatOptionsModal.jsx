import * as React from 'react';
import Box from '@mui/material/Box';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { Avatar, Button, IconButton, InputAdornment, Skeleton, TextField } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useDispatch, useSelector } from 'react-redux';
import searchUsers from './utils/searchUsers';
import UsersList from './UsersList';
import { useTheme } from '@emotion/react';
import axios from 'axios';
import { loadChat, selectChat } from '../redux/features/chatSlice';
import LinearProgress from '@mui/material/LinearProgress';
import { getChatName, getOppUserEmail, getUserAvatar } from './utils/getChatDetails';
import { EditRounded } from '@mui/icons-material';

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
  const token = useSelector((store) => store.user.token);
  const chat = useSelector((store) => store.chat.data);
  const selectedChat = useSelector((store) => store.chat.selectedChat);
  const user = useSelector((store) => store.user.userInfo);
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [isShowEdit, setShowEdit] = useState(false);
  const [isEditOn, setIsEditOn] = useState(false);
  const [newGroupChatName, setNewGroupChatName] = useState("");
  const dispatch = useDispatch();

  const { palette } = useTheme();

  const handleOpen = () => setOpen(true);
  const handleClose = (event, reason) => {
    if (reason === "backdropClick")
      return;
    setOpen(false);
    setNewGroupChatName("");
    setIsEditOn(false);
  };

  const clearSearch = (event) => {

  }

  const handleSearch = async (event) => {

  }

  const addUserToGroup = async (user) => {

  }
  const removeUser = async (userId) => {

  }

  const showEdit = () => {
    setShowEdit(true);
  }
  const hideEdit = () => {
    setShowEdit(false);
  }

  const handleGroupNameChange = (event) => {
    setNewGroupChatName(event.target.value);
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
      const newChat = chat.filter((element) => element._id !== response.data._id);
      dispatch(loadChat([response.data, ...newChat]));
      dispatch(selectChat(response.data));
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
              onMouseEnter={showEdit}
              onMouseLeave={hideEdit}
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
          {selectedChat.isGroupChat && <UsersList users={selectedChat.users} onUserClick={addUserToGroup} limit={3} />}
          <Box display="flex" gap="1rem" justifyContent={"center"}>
            {/* <Button variant="outlined" sx={{ padding: "0.5rem 2rem" }}>Delete Users</Button>
            <Button variant="contained" sx={{ padding: "0.5rem 2rem" }} disableElevation>Save</Button> */}
          </Box>
        </Box>
      </Modal>
    </div >
  );
}

export default ChatOptionsModal;