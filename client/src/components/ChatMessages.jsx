import { useTheme } from "@emotion/react"
import { Avatar, Box, Collapse, LinearProgress, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { TransitionGroup } from 'react-transition-group';
import { rootUrl } from "./utils/api callers/config";


const ChatMessages = ({ socket, chatMessages, isLoading }) => {
  const { palette } = useTheme();
  const user = useSelector((store) => store.user.userInfo);
  const isNonMobile = useMediaQuery('(min-width:700px)');

  const isShowAvatar = (message, index) => {
    if (message.sender._id === user._id)
      return false;
    else if (chatMessages[index + 1] === undefined || chatMessages[index + 1].sender._id !== message.sender._id)
      return true;
    else
      return false;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {isLoading && <LinearProgress sx={{ width: '100%', borderRadius: '10px', margin: 'auto' }} />}
      <TransitionGroup style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {chatMessages.map((message, index) => {
          return (
            <Collapse key={index}>
              <Box key={index} sx={{ display: 'flex', justifyContent: message.sender._id === user._id ? 'flex-end' : 'flex-start' }}>
                <Box
                  display={'flex'}
                  alignItems={'flex-end'}
                  gap={"10px"}
                  width='fit-content'
                  maxWidth={isNonMobile ? "45%" : "80%"}>
                  {isShowAvatar(message, index) && <Avatar src={`${rootUrl}/assets/${message.sender.pic}`} />}
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