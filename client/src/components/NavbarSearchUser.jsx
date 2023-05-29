import { Box, Paper, Skeleton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import UsersSearchBar from "./utils/util components/UsersSearchBar";
import UsersList from "./UsersList";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loadChat, selectChat } from "../redux/features/chatSlice";

const NavbarSearchUser = () => {

  const token = useSelector((store) => store.user.token);
  const chat = useSelector((store) => store.chat.data);

  const dispatch = useDispatch();

  const [searchedUsers, setSearchedUsers] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchedUsers.length)
      setOpenMenu(true);
    else
      setOpenMenu(false);
  }, [searchedUsers]);


  /* LOGIC TO HANDLE CLICK OUTSIDE THE SEARCH MENU*/
  const refOne = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  }, []);

  const handleClickOutside = (event) => {
    if (refOne.current) {
      if (!refOne.current.contains(event.target)) {
        setOpenMenu(false);
      }
    }
  }
  /* I HAVE NO IDEA HOW IT WORKS, WILL FIGURE IT OUT LATER */

  const accessChat = async (user, event) => {
    try {
      const url = 'http://localhost:3001/api/chat/';
      const config = {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      const payload = { userId: user._id };
      const response = await axios.post(url, payload, config);

      // if the selected user doesn't exist in the chat list, only then append it
      if (!chat.find(element => element._id === response.data._id))
        dispatch(loadChat([response.data, ...chat]));
      dispatch(selectChat(response.data));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box position={"relative"} width={"100%"}>
      <UsersSearchBar
        getSearchedUsers={(data) => { setSearchedUsers(data) }}
        getLoadingStatus={(status) => { setLoading(status) }}
        borderRadius={"30px"} />
      {openMenu && <Paper sx={{
        position: "absolute",
        zIndex: 2,
        width: "100%",
        padding: "0.5rem"
      }}
        ref={refOne} elevation={3}>
        <UsersList users={searchedUsers} limit={5} onUserClick={accessChat} />
      </Paper>}
    </Box>
  );
}

export default NavbarSearchUser;