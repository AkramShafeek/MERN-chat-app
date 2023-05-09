import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { loadChat, selectChat } from "../redux/features/chatSlice";
import { useEffect } from "react";
import { Avatar, Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import GroupChatModal from "./GroupChatModel";


const MyChat = () => {
  const token = useSelector((store) => store.user.token);
  const user = useSelector((store) => store.user.userInfo);
  const chat = useSelector((store) => store.chat.data);
  const selectedChat = useSelector((store) => store.chat.selectedChat);
  const dispatch = useDispatch();

  const { palette } = useTheme();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      };
      const url = "http://localhost:3001/api/chat"
      const response = await axios.get(url, config);
      dispatch(loadChat(response.data));
    } catch (error) {
      console.log(error);
    }
  }

  const getChatName = (data, user) => {
    if (data.isGroupChat)
      return data.chatName;
    return (data.users[0]._id === user._id ? data.users[1].name : data.users[0].name)
  }
  const getUserAvatar = (data, user) => {
    if (data.isGroupChat)
      return 'http://localhost:3001/assets/group-avatar.png';
    return (data.users[0]._id === user._id ? data.users[1].pic : data.users[0].pic)
  }

  const handleClick = (chatId) => {
    dispatch(selectChat(chatId));
  }

  useEffect(() => {
    fetchChats();
  }, []);

  const welcomeStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    padding: '0px 2.5rem',
    textAlign: 'center'
  }

  const containerStyles = {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    alignItems: "center",
    backgroundColor: "white",
    padding: "1rem",
    height: "90%",
    width: "31%",
    minWidth: "280px",
    margin: "10px",
    borderRadius: "10px",
  }

  return (
    <Paper
      sx={containerStyles}
      elevation={0}
    >
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        padding={"1rem"}
        backgroundColor={palette.primary.main}
        borderRadius={"5px"}>
        <Typography fontWeight={700} fontSize={"15px"} fontFamily={"Lato"} color={"white"}>My Chat</Typography>
        <GroupChatModal>
          <Button sx={{
            backgroundColor: "white", '&:hover': {
              backgroundColor: "white"
            }
          }}>Create Group +</Button>
        </GroupChatModal>
      </Box>

      {/* WELCOME MESSAGE */}
      {chat.length === 0 && <Box sx={welcomeStyle}><Typography fontFamily={"Lato"} fontWeight={300} fontSize={"25px"} color="#9c9c9c">You haven't talked to anybody recently :(</Typography></Box>
      }
      {chat.length !== 0 && <Stack spacing={2} width={"100%"}>
        {/* {chat.length === 0 && <Box><Typography fontFamily={"Lato"} fontWeight={300} fontSize={"15px"} color="#9c9c9c">Welcome to MERN-chat where you can waste some more time apart from other social medias</Typography></Box>} */}
        {chat.map((data) => {
          return (
            <Box
              key={data._id}
              backgroundColor={data._id === selectedChat ? palette.primary.light : "transparent"}
              onClick={() => { handleClick(data._id) }}
              display={"flex"}
              alignItems={"center"}
              gap={"1rem"}
              sx={{
                transition: 'all ease-in-out',
                transitionDuration: '100ms',
                padding: "0.5rem 1rem",
                borderRadius: "5px",
                '&:hover': {
                  backgroundColor: data._id !== selectedChat ? '#f0f0f0' : "",
                  cursor: 'pointer'
                }
              }}>
              <Avatar alt="P" src={getUserAvatar(data, user)} />
              <Typography fontWeight={700}>
                {getChatName(data, user)}
              </Typography>
            </Box>
          )
        })}
      </Stack>}
    </Paper>
  )
}

export default MyChat;