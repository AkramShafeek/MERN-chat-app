import { useTheme } from "@emotion/react"
import { Avatar, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { demoChats } from "./utils/util functions/demoChats";
const DemoChats = () => {
  const { palette } = useTheme();
  const user = useSelector((store) => store.user.userInfo);
  const selectedChat = useSelector((store) => store.chat.selectedChat);
  return (
    <Box>
      {demoChats.map((message, index) => {
        return (
          <Box key={index} sx={{ display: 'flex', marginTop: "0.5rem", justifyContent: message.user === 'me' ? 'flex-end' : 'flex' }}>
            <Box
              display={'flex'}
              alignItems={'center'}
              flexDirection={message.user === 'me' ? 'row-reverse' : 'row'}
              gap={"10px"}
              width='fit-content'
              maxWidth={"45%"}>
              <Avatar src={"http://192.168.43.215:3001/assets/Ac unity icon.ico"} />
              <Box sx={{
                padding: '0.8rem 1rem',
                borderRadius: '23px',
                backgroundColor: message.user === 'me' ? palette.primary.main : palette.neutral.light,
                width: 'fit-content',
                color: message.user === 'me' ? "white" : "",
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