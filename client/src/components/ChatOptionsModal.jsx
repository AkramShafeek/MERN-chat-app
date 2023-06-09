import * as React from 'react';
import Box from '@mui/material/Box';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { IconButton, useMediaQuery } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ChatDetailsUi from './ChatDetailsUi';
import { useSelector } from 'react-redux';
import AddUserToGroupOption from './AddUserToGroupOption';
import AddUsersToGroupUi from './AddUsersToGroupUi';


const ChatOptionsModal = ({ children }) => {

  const selectedChat = useSelector((store) => store.chat.selectedChat);

  // local states
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openAddUsers, setOpenAddUsers] = useState(false);
  const isNonMobile = useMediaQuery('(min-width: 700px)');

  const containerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: isNonMobile ? 500 : '90%',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 1,
    paddingBottom: '30px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  };
  
  const handleClose = (event, reason) => {
    if (reason === "backdropClick")
      return;
    setOpen(false);
    setOpenAddUsers(false);
  };

  return (
    <div>
      <span onClick={() => setOpen(true)}>{children}</span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={containerStyle}>
          {loading && <LinearProgress sx={{ borderRadius: "10px" }} />}

          {/* CLOSE BUTTON CONTAINER */}
          <div style={{ display: 'flex', justifyContent: openAddUsers ? 'space-between' : 'flex-end', alignItems: 'center' }} >
            {openAddUsers && <IconButton onClick={() => setOpenAddUsers(false)}><ArrowBackRoundedIcon /></IconButton>}
            <IconButton onClick={handleClose}><CloseRoundedIcon /></IconButton>
          </div>

          {!openAddUsers && <ChatDetailsUi setLoading={setLoading}></ChatDetailsUi>}

          {selectedChat.isGroupChat && !openAddUsers && <AddUserToGroupOption openAddUsers={() => { setOpenAddUsers(true) }} />}

          {openAddUsers && <AddUsersToGroupUi getLoadingStatus={(status) => setLoading(status)} closeAddUsers={() => setOpenAddUsers(false)} />}

        </Box>
      </Modal>
    </div >
  );
}

export default ChatOptionsModal;