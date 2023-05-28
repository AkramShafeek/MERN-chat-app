import { useTheme } from "@emotion/react";
import { BorderColor, CollectionsBookmarkTwoTone, SendRounded } from "@mui/icons-material";
import { Avatar, Box, Button, CircularProgress, Collapse, Divider, IconButton, TextField, Typography } from "@mui/material";
import DemoChats from "./DemoChats";
import { selectChat } from "../redux/features/chatSlice";
import { getChatName, getUserAvatar } from "./utils/util functions/getChatDetails";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ChatOptionsModal from "./ChatOptionsModal";
import ChatMessages from "./ChatMessages";
import { sendMessageApi } from "./utils/api callers/messageApiCallers";
import io from 'socket.io-client';
import axios from "axios";
import { loadNotifications } from "../redux/features/notificationSlice";

const ENDPOINT = "http://localhost:3001";
var socket, selectedChatCompare;
var chatMessagesSetter;
var typingTimeout = null;

const Chat = () => {

  const { palette } = useTheme();
  const user = useSelector((store) => store.user.userInfo);
  const token = useSelector((store) => store.user.token);
  const selectedChat = useSelector((store) => store.chat.selectedChat);
  const messageNotifications = useSelector((store) => store.notifications.messageNotifications);
  const dispatch = useDispatch();

  const [prevSelectedChat, setPrevSelectedChat] = useState(null);
  const [enteredMessage, setEnteredMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [isSomeoneTyping, setIsSomeoneTyping] = useState(false);
  const [typingUser, setTypingUser] = useState(null);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('setup', user);
    socket.on('connected', () => setSocketConnected(true));
    socket.on('typing', (userPic) => { setIsSomeoneTyping(true); setTypingUser(userPic) });
    socket.on('stop typing', () => { setIsSomeoneTyping(false); });

    return () => {
      socket.disconnect();
    }
  }, []);

  useEffect(() => {

    if (selectedChat) {
      fetchChat()
        .then(() => socket.emit('join chat', selectedChat._id))
        .catch((error) => console.log(error));
    }

    // clean up logic
    return () => {
      setChatMessages([]);
      setIsUserTyping(false);
      setIsSomeoneTyping(false);
      setTypingUser(null);

      if (prevSelectedChat)
        socket.emit("leave chat", prevSelectedChat._id);

      setPrevSelectedChat(selectedChat);
    }
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (!selectedChat || selectedChat._id != newMessageReceived.chat._id) {
        // send notification here        
        dispatch(loadNotifications([...messageNotifications, newMessageReceived]));
      }
      else {
        setChatMessages([...chatMessages, newMessageReceived]);
      }

    })
    return () => {
      socket.off("message received");
    }
  });

  const fetchChat = async () => {
    try {
      setLoading(true);
      const url = `http://localhost:3001/api/message/${selectedChat._id}`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.get(url, config);
      setChatMessages(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      throw error;
    }
  }

  const containerStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: palette.background.alt,
    justifyContent: "space-between",
    height: "100%",
    width: "68%",
    minWidth: "620px",
    borderRadius: "10px",
  }

  const handleChange = (event) => {
    setEnteredMessage(event.target.value);
    if (!socketConnected)
      return;
    if (!isUserTyping) {
      setIsUserTyping(true);
      socket.emit("typing", selectedChat._id, user.pic);
    }

    if (typingTimeout)
      clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {
      setIsUserTyping(false);
      setTypingUser(null);
      socket.emit("stop typing", selectedChat._id);
    }, 3000);

  }

  const sendMessage = async () => {
    try {
      setEnteredMessage("");
      const data = await sendMessageApi(selectedChat, enteredMessage, token);

      setIsUserTyping(false);
      setIsSomeoneTyping(false);
      setTypingUser(null);

      socket.emit("stop typing", selectedChat._id);
      socket.emit('new message', data);

      setChatMessages([...chatMessages, data]);
    } catch (error) {
      console.log("Some error");
    }
  }

  if (!selectedChat) {
    return (
      <Box sx={containerStyles}>
        {/* here insert the component that displays a message
        when no chat is selected */}
        <div>Select a chat to continue</div>
      </Box>
    )
  }
  return (
    <Box sx={containerStyles}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"100%"}
        padding={"1.5rem 2rem"}
        sx={{
          borderBottom: '1px solid',
          borderColor: palette.neutral.light
        }}>
        <Box display={"flex"} gap="1rem" alignItems="center">
          <Avatar src={getUserAvatar(selectedChat, user)}></Avatar>
          <Typography variant="h3">{getChatName(selectedChat, user)}</Typography>
        </Box>
        <ChatOptionsModal>
          <Button>options</Button>
        </ChatOptionsModal>
      </Box>
      {/* <Divider sx={{width:'100%'}}/> */}
      <Box
        height={'100%'}
        width={"100%"}
        display={"flex"}
        flexDirection={"column-reverse"}
        justifyContent={"flex-start"}
        padding={"1rem"}
        sx={{ overflowY: "scroll" }}
      >
        {<div><Collapse in={!isUserTyping && isSomeoneTyping} ><div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}><Avatar src={typingUser} />Typing....</div></Collapse></div>}
        <ChatMessages socket={socket} chatMessages={chatMessages} isLoading={loading} />
      </Box>
      <Box height={'15%'} width='100%'
        sx={{
          display: "flex",
          alignItems: 'center',
          gap: '1rem',
          padding: '0rem 1rem',
          borderTop: '1px solid',
          borderColor: palette.neutral.light
        }}>
        <Box sx={{
          width: '100%',
          display: "flex",
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          padding: '0rem 1rem',
        }}>
          <TextField value={enteredMessage} InputProps={{
            sx: {
              borderRadius: '25px',
              backgroundColor: palette.neutral.light,
              border: 'none',
              outline: 'none',
              '&:hover': {
                border: 'none',
                outline: 'none'
              }
            },
          }}
            fullWidth
            placeholder="message" onChange={handleChange}>Message</TextField>
          <IconButton sx={{
            height: '120%',
            padding: '10px',
            backgroundColor: palette.primary.main,
            '&:hover': {
              backgroundColor: palette.primary.dark,
            }
          }} onClick={sendMessage}>
            <SendRounded fontSize="large" sx={{ color: 'white' }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export default Chat;