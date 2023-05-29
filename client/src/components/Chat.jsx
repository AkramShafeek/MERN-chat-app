import { rootUrl } from "./utils/api callers/config";
import { useTheme } from "@emotion/react";
import { SendRounded } from "@mui/icons-material";
import { loadNotifications } from "../redux/features/notificationSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChatName, getUserAvatar } from "./utils/util functions/getChatDetails";
import { fetchMessagesApi, sendMessageApi } from "./utils/api callers/messageApiCallers";
import { Avatar, Box, Button, Collapse, IconButton, TextField, Typography, useMediaQuery } from "@mui/material";
import io from 'socket.io-client';
import mernLogo from "../images/mern.png";
import ChatMessages from "./ChatMessages";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChatOptionsModal from "./ChatOptionsModal";

var socket;
var typingTimeout = null;

const Chat = ({ navigateToChatList }) => {

  const { palette } = useTheme();
  const isNonMobile = useMediaQuery('(min-width:700px)');
  const user = useSelector((store) => store.user.userInfo);
  const token = useSelector((store) => store.user.token);
  const selectedChat = useSelector((store) => store.chat.selectedChat);
  const messageNotifications = useSelector((store) => store.notifications.messageNotifications);
  const dispatch = useDispatch();

  const [enteredMessage, setEnteredMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [isSomeoneTyping, setIsSomeoneTyping] = useState(false);
  const [typingUser, setTypingUser] = useState(null);

  useEffect(() => {
    socket = io(rootUrl);
    socket.emit('setup', user);
    socket.on('connected', () => setSocketConnected(true));
    socket.on('typing', (roomId, userPic) => {
      setIsSomeoneTyping(true);
      setTypingUser(`${rootUrl}/assets/${userPic}`)
    });
    socket.on('stop typing', () => { setIsSomeoneTyping(false); });
    return () => {
      socket.off('typing');
      socket.off('stop typing');
      socket.disconnect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {

    if (selectedChat) {
      setLoading(true);
      fetchMessagesApi(selectedChat, token)
        .then((data) => {
          setChatMessages(data);
          setLoading(false);
          socket.emit('join chat', selectedChat._id)
        })
        .catch((error) => {
          setLoading(false);
          console.log(error)
        });
    }

    // clean up logic
    return () => {
      setChatMessages([]);
      setIsUserTyping(false);
      setIsSomeoneTyping(false);
      clearTimeout(typingTimeout);

      // leaving the previous chat room
      if (selectedChat) {
        socket.emit("leave chat", selectedChat._id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (!selectedChat || selectedChat._id !== newMessageReceived.chat._id)
        dispatch(loadNotifications([newMessageReceived, ...messageNotifications]));
      else
        setChatMessages([...chatMessages, newMessageReceived]);
    })

    // clean up code to stop listening to message events
    return () => {
      socket.off("message received");
    }
  });

  const containerStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: palette.background.alt,
    justifyContent: "space-between",
    height: "100%",
    width: isNonMobile ? "68%" : "100%",
    minWidth: isNonMobile ? "620px" : "200px",
    borderRadius: isNonMobile ? "10px" : "0px",
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

      socket.emit("stop typing", selectedChat._id);
      socket.emit('new message', data);

      setChatMessages([...chatMessages, data]);
    } catch (error) {
      console.log("Some error");
    }
  }

  if (!selectedChat) {
    return (
      <Box sx={{ ...containerStyles }}>
        {/* here insert the component that displays a message
        when no chat is selected */}
        <Box sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '3rem',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Box width="50%">
            <img src={mernLogo} alt="" width="100%" style={{ opacity: '50%' }} />
          </Box>
          <Typography
            fontSize={25}
            fontFamily={'lato'}
            color={palette.neutral.medium}
            fontWeight={300}
            letterSpacing={8}
            textAlign={"center"}>
            Select a chat to continue
          </Typography>
        </Box>
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
        padding={isNonMobile ? "1.5rem 2rem" : "1.5rem 0.5rem"}
        sx={{
          borderBottom: '1px solid',
          borderColor: palette.neutral.light
        }}>
        <Box display={"flex"} gap={isNonMobile ? "1rem" : "0.5rem"} alignItems="center">
          {!isNonMobile &&
            <IconButton onClick={() => navigateToChatList()}>
              <ArrowBackIcon />
            </IconButton>}
          <Avatar src={getUserAvatar(selectedChat, user)}></Avatar>
          <Typography variant={isNonMobile ? "h3" : "h6"}>{getChatName(selectedChat, user)}</Typography>
        </Box>
        <ChatOptionsModal>
          <Button>options</Button>
        </ChatOptionsModal>
      </Box>
      <Box
        height={'100%'}
        width={"100%"}
        display={"flex"}
        flexDirection={"column-reverse"}
        justifyContent={"flex-start"}
        padding={"1rem"}
        sx={{ overflowY: "scroll" }}
      >
        {<div>
          <Collapse in={!isUserTyping && isSomeoneTyping} >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
              <Avatar src={typingUser} />Typing....
            </div>
          </Collapse>
        </div>}

        {/* CHAT MESSAGES COMPONENT WHICH RENDERS THE MESSAGES ON THE SCREEN */}
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