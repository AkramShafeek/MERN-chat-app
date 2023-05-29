import * as React from 'react';
import axios from 'axios';
import UsersList from './UsersList';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import searchUsers from './utils/util functions/searchUsers';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { loadChat } from '../redux/features/chatSlice';
import { useDispatch, useSelector } from 'react-redux';
import { TransitionGroup } from 'react-transition-group';
import { Button, Grow, IconButton, InputAdornment, Skeleton, TextField, useMediaQuery } from '@mui/material';


const GroupChatModal = ({ children }) => {
  const token = useSelector((store) => store.user.token);
  const chat = useSelector((store) => store.chat.data);
  const [open, setOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [clearSearchIcon, setClearSearchIcon] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const dispatch = useDispatch();

  const { palette } = useTheme();
  
  const isNonMobile = useMediaQuery('(min-width: 700px)');

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isNonMobile ? 500 : '90%',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  };

  const handleOpen = () => setOpen(true);
  const handleClose = (event, reason) => {
    if (reason === "backdropClick")
    return;
    setOpen(false)
    setSelectedUsers([]);
  };

  const clearSearch = (event) => {
    setSearchValue("");
    setClearSearchIcon(false);
  }

  const handleSearch = async (event) => {
    setSearchValue(event.target.value);
    var data;
    if (event.target.value) {
      try {
        setLoading(true);
        setClearSearchIcon(true);
        data = await searchUsers(event.target.value, token);
        setSearchedUsers(data);
        setLoading(false);
      } catch (error) {
        console.log(error)
        setLoading(false);
      }
    }
    else
      setClearSearchIcon(false);
  }

  const addUserToGroup = async (user) => {
    // if user does not exist in selected list, then append them
    if (!selectedUsers.find(element => element._id === user._id))
      setSelectedUsers([...selectedUsers, user]);
  }
  const removeUser = async (userId) => {
    const filteredUsers = selectedUsers.filter((user) => user._id !== userId);
    setSelectedUsers(filteredUsers);
  }

  const createGroup = async () => {
    if (!groupChatName || !selectedUsers.length)
      return
    try {
      setCreating(true);
      const url = "http://localhost:3001/api/chat/group";
      const config = {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
      const response = await axios.post(url, { name: groupChatName, users: selectedUsers }, config);
      // console.log(response.data);

      // append group chat to my chat display
      dispatch(loadChat([...chat, response.data]));
      setCreating(false);
      handleClose(null, "group created");
      return;
    } catch (error) {
      setCreating(false);
      console.log("some error boss");
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
          {creating && <LinearProgress sx={{ borderRadius: "10px" }} />}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
            <Typography id="modal-modal-title" variant="h6" fontSize={'19px'} fontWeight={700} fontFamily={"Lato"} color={"primary"}>
              Create group chat
            </Typography>
            <IconButton onClick={handleClose}><CloseRoundedIcon /></IconButton>
          </div>
          <TextField value={groupChatName} fullWidth placeholder="Enter Group Name" onChange={(event) => setGroupChatName(event.target.value)} />
          <TextField value={searchValue} fullWidth placeholder="search users eg: akram..."
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {clearSearchIcon ?
                    <IconButton onClick={clearSearch}
                      sx={{
                        padding: '0',
                        '&:hover': {
                          backgroundColor: 'transparent'
                        }
                      }}>
                      <CloseRoundedIcon />
                    </IconButton> : <SearchRoundedIcon />}
                </InputAdornment>
              )
            }} onChange={handleSearch} />
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
          ) : <UsersList users={searchedUsers} onUserClick={addUserToGroup} limit={3} />}
          <Box display="flex" gap="1rem" justifyContent={"flex-end"}>
            <Button variant="contained" sx={{ padding: "0.5rem 2rem" }} disableElevation onClick={createGroup} disabled={!(groupChatName && selectedUsers.length)}>Create Group</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default GroupChatModal;