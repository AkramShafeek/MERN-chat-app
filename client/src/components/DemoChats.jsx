import { useTheme } from "@emotion/react"
import { Avatar, Box, CircularProgress, LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { demoChats } from "./utils/util functions/demoChats";
import { useEffect, useState } from "react";
import axios from 'axios';

const DemoChats = () => {
  const { palette } = useTheme();
  const user = useSelector((store) => store.user.userInfo);
  const token = useSelector((store) => store.user.token);
  const selectedChat = useSelector((store) => store.chat.selectedChat);
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setChatMessages([]);
    fetchChat();
  }, [selectedChat]);

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
    }
  }

  return (
    <Box display={"flex"} flexDirection={"column-reverse"} gap={"0.5rem"}>
      {loading && <CircularProgress sx={{ borderRadius: '10px', margin: 'auto' }} />}
      {chatMessages.map((message, index) => {
        return (
          <Box key={index} sx={{ display: 'flex', justifyContent: message.sender._id === user._id ? 'flex-end' : 'flex-start' }}>
            <Box
              display={'flex'}
              alignItems={'center'}
              flexDirection={message.sender._id === user._id ? 'row-reverse' : 'row'}
              gap={"10px"}
              width='fit-content'
              maxWidth={"45%"}>
              <Avatar src={message.sender.pic} />
              <Box sx={{
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
        )
      })}
    </Box>
  );
}

export default DemoChats;