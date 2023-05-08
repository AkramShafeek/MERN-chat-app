import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { SearchOutlined } from '@mui/icons-material';

export default function SideDrawer() {

  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const buttonStyles = {
    padding: "0.5rem 1rem",
    display: "flex",
    gap: "10px"
  }
  return (
    <Box>
      <Button sx={buttonStyles} variant="outlined" onClick={toggleDrawer}>
        Search users
        <SearchOutlined />
      </Button>
      <Drawer
        anchor={'right'}
        open={open}
        onClose={toggleDrawer}
      >
        Here you can find the users to chat with
      </Drawer>
    </Box>
  );
}