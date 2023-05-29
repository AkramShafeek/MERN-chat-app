import { Box, Divider, useMediaQuery } from "@mui/material";
import Chat from "../components/Chat";
import MyChat from "../components/MyChat";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ChatPage = () => {

  const isNonMobile = useMediaQuery("(min-width:700px)");

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showChatList, setShowChatList] = useState(true);
  const [showChat, setShowChat] = useState(false);

  const navigate = useNavigate();
  const user = useSelector((store) => store.user.userInfo);
  const token = useSelector((store) => store.user.token);

  useEffect(() => {
    console.log("checking authorization")
    if (!user || !token)
      navigate('/');
    else
      setIsAuthorized(true);
  }, []);

  const containerStyles = {
    display: "flex",
    height: isNonMobile ? "90%" : (showChat ? "100%" : "90%"),
    padding: isNonMobile ? "10px" : "0px",
    gap: isNonMobile ? "10px" : "0px",
  }

  return (
    isAuthorized &&
    <>
      {isNonMobile && <Navbar />}
      {!isNonMobile && !showChat && <Navbar />}
      {!isNonMobile && <Divider sx={{ width: '100%' }} />}
      <Box sx={containerStyles}>
        {!isNonMobile ? showChatList && <MyChat navigateToChat={() => { setShowChatList(false); setShowChat(true) }} /> : <MyChat />}
        {!isNonMobile ? showChat && <Chat navigateToChatList={() => { setShowChatList(true); setShowChat(false) }} /> : <Chat />}
      </Box>
    </>
  );
};

export default ChatPage;