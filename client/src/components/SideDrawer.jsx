import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { SearchOutlined } from '@mui/icons-material';
import { Skeleton, TextField } from '@mui/material';
import UsersList from './UsersList';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function SideDrawer() {
  const token = useSelector((store) => store.user.token);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchedUsers, setSearchedUsers] = useState(null);

  const toggleDrawer = () => {
    setOpen(!open);
    setSearchedUsers(null);
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  }

  const handleSearch = async () => {
    if(!search)
      return;
    
    try {
      setLoading(true);
      const url = `http://localhost:3001/user/auth/allUsers?searchuser=${search}`;
      const config = {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios.get(url,config);
      console.log(response.data);
      setSearchedUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

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
        <Box padding={"1rem"} display={"flex"} flexDirection={"column"} gap={"1.5rem"}>
          <Box display={"flex"} gap={"0.5rem"}>
            <TextField sx={{ padding: '0' }} onChange={handleChange}></TextField>
            <Button sx={{}} variant='contained' disableElevation onClick={handleSearch}>
              <SearchOutlined />
            </Button>
          </Box>
          {/* <Divider /> */}
          {loading ?
            <div>
              <Skeleton animation="wave" height={50} />
              <Skeleton animation="wave" height={50} />
              <Skeleton animation="wave" height={50} />
              <Skeleton animation="wave" height={50} />
            </div> : <UsersList searchedUsers={searchedUsers}/>
          }
        </Box>
      </Drawer>
    </Box>
  );
}