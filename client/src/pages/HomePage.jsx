import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import Login from '../components/Login';
import Signup from '../components/Signup';
import { useMediaQuery } from '@mui/material';
import bgImg from '../1185202.png';
import { useTheme } from '@emotion/react';
import Login2 from '../components/Login2';


const initialValuesRegister = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};


const HomePage = () => {
  const isNonMobile = useMediaQuery("(min-width:700px)");
  const [value, setValue] = useState(1);
  const isLogin = value == 1;
  const isSignup = value == 2;
  const { palette } = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  const handleFormSubmit = async (values, onSubmitProps) => {
    console.log("in handle submit")
    console.log(values);
    // return;
  };
  return (
    <div style={{
      display: "flex",
      minHeight: "100%",
      width: "100%",
      alignItems: isNonMobile ? "center" : "flex-start",
      padding: "0px"
    }}>
      {isNonMobile && <div style={{
        width: '100%',
        height: '100vh',
        boxSizing: 'border-box',
      }}><img src={bgImg} style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }} /></div>}
      <Container maxWidth="l" sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
        padding: "2rem"
      }}>
        <Box
          sx={{
            backgroundColor: palette.primary.main,
            padding: "1rem",
            width: isNonMobile ? "400px" : "100%",
            borderRadius: "10px"
          }}>
          <Typography align='center' color={"white"}>MERN-chat</Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: palette.background.alt,
            padding: isNonMobile ? "2rem" : "1rem",
            width: isNonMobile ? "400px" : "100%",
            borderRadius: "10px",
            border: "1px solid " + palette.primary.light
          }}>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs onChange={handleChange} value={value} centered variant="fullWidth">
                <Tab label="Login" value={1} />
                <Tab label="Sign Up" value={2} />
                <Tab label="Guest" value={3} />
              </Tabs>
            </Box>
            <Box padding={"2rem 0rem"}>
              {value == 1 && <Login />}
              {value === 2 && <Signup />}
              {value === 3 && <Login2 />}
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default HomePage;