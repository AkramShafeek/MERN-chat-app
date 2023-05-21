/**
 * WHAT DOES USERS SEARCH BAR DO?
 *  
 * It handles the input from users to search other users,
 * then calls the search user function which calls the api
 * to get the array of searched users. The received array
 * is passed back to the parent element, eg. navbar, group add...
 * the callback function has to be passed as a prop -> getSearchedUsers
 * in order to get back the searched users.
 * 
 * If the parent requires the loading status in order to display some 
 * skeleton, then it can be accessed by another callback function passed
 * as a prop -> getLoadingStatus
 * 
 */


import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import searchUsers from "../util functions/searchUsers";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Box, CircularProgress, IconButton, InputAdornment, TextField } from "@mui/material";


const UsersSearchBar = ({ getSearchedUsers, getLoadingStatus, borderRadius }) => {
  const [searchValue, setSearchValue] = useState("");
  const [clearSearchIcon, setClearSearchIcon] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = useSelector((store) => store.user.token);

  useEffect(() => {
    // the below code sends back the searched users value to
    // the parent component.
    // the parent component could be anything such as navbar,
    // group modal, add user modal, etc..
    getSearchedUsers(searchedUsers);
  }, [searchedUsers]);

  const clearSearch = () => {
    setSearchValue("");
    setClearSearchIcon(false);
  }

  const handleChange = async (event) => {
    setSearchValue(event.target.value);
    let data;
    if (event.target.value) {
      try {
        setLoading(true);
        getLoadingStatus(true);
        setClearSearchIcon(true);

        data = await searchUsers(event.target.value, token);

        setSearchedUsers(data);
        getLoadingStatus(false);
        setLoading(false);

      } catch (error) {
        console.log(error);

        getLoadingStatus(false);
        setLoading(false);
      }
    }
    else
      setClearSearchIcon(false);
  }
  return (
    <Box width={"100%"}>
      <TextField size="small" placeholder="search users eg: akram..." fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {clearSearchIcon ?
                <IconButton onClick={clearSearch}
                  sx={{
                    padding: '0',
                    '&:hover': {
                      backgroundColor: 'transparent'
                    }
                  }}>
                  {loading ? <CircularProgress size={"18px"} /> : <CloseRoundedIcon />}
                </IconButton> : <SearchRoundedIcon />}
            </InputAdornment>
          ),
          sx: {
            borderRadius: borderRadius ? borderRadius : '12px',
          }
        }} onChange={handleChange} />
    </Box>
  );
}

UsersSearchBar.defaultProps = {
  getSearchedUsers: () => { },
  getLoadingStatus: () => { }
}

export default UsersSearchBar;