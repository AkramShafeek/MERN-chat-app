import { useTheme } from "@emotion/react"
import { Avatar, Box, CircularProgress, Collapse, Fade, Grow, LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { TransitionGroup } from 'react-transition-group';
import { demoChats } from "./utils/util functions/demoChats";
import { useEffect, useState } from "react";
import axios from 'axios';
import io from 'socket.io-client';

const ChatMessages = ({ socket, chatMessages, isLoading }) => {
  const { palette } = useTheme();
  const user = useSelector((store) => store.user.userInfo);
  const token = useSelector((store) => store.user.token);
  const selectedChat = useSelector((store) => store.chat.selectedChat);
  // const [chatMessages, setChatMessages] = useState([]);

  // useEffect(() => {
  //   setChatMessages([]);
  //   fetchChat();
  // }, [selectedChat]);

  // const fetchChat = async () => {
  //   try {
  //     setLoading(true);
  //     const url = `http://localhost:3001/api/message/${selectedChat._id}`;
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     }
  //     const response = await axios.get(url, config);
  //     setChatMessages(response.data);
  //     setLoading(false);
  //     socket.emit('join chat', selectedChat._id);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // }
  const isShowAvatar = (message, index) => {
    if (message.sender._id === user._id)
      return false;
    else if (chatMessages[index + 1] === undefined || chatMessages[index + 1].sender._id !== message.sender._id)
      return true;
    else
      return false;
  }

  return (
    <Box display={"flex"}>
      {isLoading && <LinearProgress sx={{ width: '100%', borderRadius: '10px', margin: 'auto' }} />}
      <TransitionGroup style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {chatMessages.map((message, index) => {
          return (
            <Collapse key={index}>
              <Box sx={{ display: 'flex', justifyContent: message.sender._id === user._id ? 'flex-end' : 'flex-start' }}>
                <Box
                  display={'flex'}
                  alignItems={'flex-end'}
                  gap={"10px"}
                  width='fit-content'
                  maxWidth={"45%"}>
                  {isShowAvatar(message, index) && <Avatar src={message.sender.pic} />}
                  <Box sx={{
                    marginLeft: !isShowAvatar(message, index) && "51px",
                    padding: '0.8rem 1rem',
                    borderRadius: '23px',
                    backgroundColor: message.sender._id === user._id ? palette.primary.main : palette.neutral.light,
                    width: 'fit-content',
                    color: message.sender._id === user._id ? "white" : "",
                  }}>
                    {message.content}
                  </Box>
                </Box>
              </Box>
            </Collapse>
          )
        })}
      </TransitionGroup>
    </Box>
  );
}

export default ChatMessages;