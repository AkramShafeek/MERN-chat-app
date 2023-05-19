import { Box, Paper, Skeleton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import UsersSearchBar from "./utils/util components/UsersSearchBar";
import UsersList from "./UsersList";

const NavbarSearchUser = () => {
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

  return (
    <Box position={"relative"} width={"40%"}>
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
        backgroundColor="white" ref={refOne} elevation={3}>
        <UsersList users={searchedUsers} limit={5}/>
      </Paper>}
    </Box>
  );
}

export default NavbarSearchUser;