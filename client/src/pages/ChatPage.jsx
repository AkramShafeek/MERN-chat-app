import { Box } from "@mui/material";
import Chat from "../components/Chat";
import MyChat from "../components/MyChat";
import Navbar from "../components/Navbar";

const ChatPage = () => {
  
  return (
    <>
      <Navbar />
      <Box
        display={"flex"}
        height={"90%"}
        padding={"10px"}
        gap={"10px"}
        
      >
        <MyChat />
        <Chat />
      </Box>
    </>
  );
};

export default ChatPage;