import { Box } from "@mui/material";
import Chat from "../components/Chat";
import MyChat from "../components/MyChat";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ChatPage = () => {

  const [isAuthorized, setIsAuthorized] = useState(false);

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
    height: "90%",
    padding: "10px",
    gap: "10px",
  }

  return (
    isAuthorized &&
    <>
      <Navbar />
      <Box sx={containerStyles}>
        <MyChat />        
        <Chat />
      </Box>
    </>
  );
};

export default ChatPage;