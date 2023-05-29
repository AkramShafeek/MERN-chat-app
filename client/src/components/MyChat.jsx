import { useDispatch, useSelector } from "react-redux"
import { loadChat, selectChat } from "../redux/features/chatSlice";
import { useEffect, useState } from "react";
import { Avatar, Box, Button, Paper, Skeleton, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import GroupChatModal from "./GroupChatModal";
import { getChatName, getUserAvatar } from "./utils/util functions/getChatDetails";
import GroupsIcon from '@mui/icons-material/Groups';
import { fetchChatsApi } from "./utils/api callers/chatApiCallers";


const MyChat = ({ navigateToChat }) => {
  const token = useSelector((store) => store.user.token);
  const user = useSelector((store) => store.user.userInfo);
  const chat = useSelector((store) => store.chat.data);
  const selectedChat = useSelector((store) => store.chat.selectedChat);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const { palette } = useTheme();
  const isNonMobile = useMediaQuery('(min-width:700px)');

  const handleClick = (chat) => {
    dispatch(selectChat(chat));
    if (!isNonMobile)
      navigateToChat();
  }

  useEffect(() => {
    fetchChatsApi(token)
      .then((data) => {
        dispatch(loadChat(data))
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    backgroundColor: palette.background.alt,
    padding: "1rem",
    height: "100%",
    width: isNonMobile ? "31%" : "100%",
    minWidth: "280px",
    borderRadius: isNonMobile ? "10px" : "0px",
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
            backgroundColor: "white",
            display: 'flex',
            gap: '1rem',
            '&:hover': {
              backgroundColor: "white"
            }
          }}>Create Group
            <GroupsIcon /></Button>
        </GroupChatModal>
      </Box>


      {loading &&
        <div width="100%">
          <Skeleton animation="wave" height={60} />
          <Skeleton animation="wave" height={60} />
          <Skeleton animation="wave" height={60} />
          <Skeleton animation="wave" height={60} />
        </div>}
      {/* WELCOME MESSAGE */}
      {
        !loading && chat.length === 0 && <Box sx={welcomeStyle}>
          <Typography fontFamily={"Lato"} fontWeight={300} fontSize={"25px"} color="#9c9c9c">
            You haven't talked to anybody recently :(
          </Typography>
        </Box>
      }
      {!loading && chat.length !== 0 && <Stack spacing={2} width={"100%"}>
        {chat.map((data) => {
          return (
            <Box
              key={data._id}
              onClick={() => { handleClick(data) }}
              sx={{
                backgroundColor: data._id === selectedChat?._id ? palette.primary.light : "transparent",
                transition: 'all ease-in-out',
                transitionDuration: '100ms',
                padding: "0.5rem 1rem",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                '&:hover': {
                  backgroundColor: data._id !== selectedChat?._id ? palette.neutral.light : "",
                  cursor: 'pointer'
                }
              }}>
              <Avatar alt="P" src={getUserAvatar(data, user)} />
              <Box>
                <Typography fontWeight={700}>
                  {getChatName(data, user)}
                </Typography>
              </Box>
            </Box>
          )
        })}
      </Stack>}
    </Paper>
  )
}

export default MyChat;