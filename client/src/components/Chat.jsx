import { useTheme } from "@emotion/react";
import { BorderColor, SendRounded } from "@mui/icons-material";
import { Box, Button, Divider, IconButton, TextField, Typography } from "@mui/material";
import DemoChats from "./DemoChats";

const Chat = () => {

  const { palette } = useTheme();

  const containerStyles = {
    display: "flex",
    flexDirection: "column",
    // gap: '1rem',
    alignItems: "center",
    backgroundColor: palette.background.alt,
    justifyContent: "space-between",
    // padding: "1rem",
    height: "100%",
    width: "68%",
    minWidth: "620px",
    borderRadius: "10px",
  }
  return (
    <Box sx={containerStyles}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"100%"}
        padding={"1.5rem 2rem"}
        sx={{
          borderBottom: '1px solid',
          borderColor: palette.neutral.light
        }}>
        <Typography variant="h3">Header</Typography>
        <Button>Options</Button>
      </Box>
      {/* <Divider sx={{width:'100%'}}/> */}
      <Box
        height={'100%'}
        width={"100%"}        
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"flex-end"}
        padding={"1rem"}
        >
        <DemoChats />
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
          <TextField InputProps={{
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
            placeholder="message">Message</TextField>
          <IconButton sx={{
            height: '120%',
            padding: '10px',
            backgroundColor: palette.primary.main,
            '&:hover': {
              backgroundColor: palette.primary.dark,
            }
          }}>
            <SendRounded fontSize="large" sx={{ color: 'white' }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export default Chat;