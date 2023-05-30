import { Box, Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import UsersSearchBar from "./utils/util components/UsersSearchBar";
import UsersList from "./UsersList";
import { useDispatch, useSelector } from "react-redux";
import { loadChat, selectChat } from "../redux/features/chatSlice";
import { accessChatApi } from "./utils/api callers/chatApiCallers";

const NavbarSearchUser = () => {

  const token = useSelector((store) => store.user.token);
  const chat = useSelector((store) => store.chat.data);

  const dispatch = useDispatch();

  const [searchedUsers, setSearchedUsers] = useState([]);
  const [openSearchedList, setOpenSearchedList] = useState(false);

  useEffect(() => {
    if (searchedUsers.length)
      setOpenSearchedList(true);
    else
      setOpenSearchedList(false);
  }, [searchedUsers]);


  /* LOGIC TO HANDLE CLICK OUTSIDE THE SEARCH MENU*/
  const refOne = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  }, []);

  const handleClickOutside = (event) => {
    if (refOne.current) {
      if (!refOne.current.contains(event.target)) {
        setOpenSearchedList(false);
      }
    }
  }
  /* I HAVE NO IDEA HOW IT WORKS, WILL FIGURE IT OUT LATER */

  const accessChat = async (user, event) => {
    try {
      const data = await accessChatApi(user, token);

      // if the selected user doesn't exist in the chat list, only then append it
      if (!chat.find(element => element._id === data._id))
        dispatch(loadChat([data, ...chat]));
      dispatch(selectChat(data));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box position={"relative"} width={"100%"}>
      <UsersSearchBar
        getSearchedUsers={(data) => { setSearchedUsers(data) }}
        borderRadius={"30px"} />
      {openSearchedList && <Paper sx={{
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