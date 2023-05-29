import { Box, Collapse, IconButton, Paper, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import NavbarSearchUser from "./NavbarSearchUser";
import { ArrowBack } from "@mui/icons-material";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";

const Navbar = () => {

  const [isOpenSearch, setIsOpenSearch] = useState(false);

  const isNonMobile = useMediaQuery('(min-width:700px)');

  const { palette } = useTheme();

  const navbarStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: palette.background.alt,
    width: "100%",
    padding: "10px 1.5rem",
    borderRadius: "0px",
  }
  return (
    <Paper sx={navbarStyles} elevation={0}>
      {/* LOGO TEXT */}
      {isNonMobile && <Typography fontWeight="700" variant="h3" color="primary" >MERN-chat</Typography>}
      {!isNonMobile && !isOpenSearch && <Typography fontWeight="700" variant="h3" color="primary" >MERN-chat</Typography>}
      {!isNonMobile && isOpenSearch && <IconButton onClick={() => setIsOpenSearch(false)}><ArrowBack /></IconButton>}

      {/* SEARCH BAR TO SEARCH USERS AND CHAT */}
      {isNonMobile && <Box width="40%"><NavbarSearchUser /></Box>}
      {!isNonMobile && <Collapse in={isOpenSearch} orientation="horizontal"><Box width="100%"><NavbarSearchUser /></Box></Collapse>}

      {isNonMobile && <DesktopMenu />}

      {!isNonMobile &&
        <Box display='flex' gap='1rem'>
          {!isOpenSearch &&
            <IconButton onClick={() => setIsOpenSearch(true)}>
              <SearchRoundedIcon />
            </IconButton>}
          <MobileMenu />
        </Box>}

    </Paper>
  );
}

export default Navbar;