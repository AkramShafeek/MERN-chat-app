import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import axios from "axios";
import { rootUrl } from "./utils/api callers/config";

const initialValuesSignup = {
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const signupSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  confirmPassword: yup.string().required("required"),
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMismatched, setPasswordMismatched] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (values.confirmPassword !== values.password) {
      setPasswordMismatched(true);
      setTimeout(() => { setPasswordMismatched(false) }, 3000);
      return;
    }
    delete values.confirmPassword;
    try {
      setLoading(true);
      const url = `${rootUrl}/user/auth/register`;
      await axios.post(url, values);
      setSuccess('Registered successfully, continue to login');
    } catch (error) {
      setError(error.response.data.msg);
    } finally {
      setLoading(false);
    }

  }

  const acceptImage = (event) => {
    console.log(event.target.files)
  }

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesSignup}
      validationSchema={signupSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns={"repeat(1,minmax(0,1fr"}>

            <TextField
              label="Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              name="name"
              error={Boolean(touched.name) && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              sx={{ gridColumn: "span 1" }}
              variant="standard"
            />
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 1" }}
              variant="standard"
            />
            <TextField
              label='Password'
              variant="standard"
              type={showPassword ? "text" : "password"} // <-- This is where the magic happens
              onChange={handleChange}
              onBlur={handleBlur}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              autoComplete="off"
              InputProps={{ // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              label='Confirm password'
              variant="standard"
              type={showPassword ? "text" : "password"} // <-- This is where the magic happens
              onChange={handleChange}
              onBlur={handleBlur}
              name="confirmPassword"
              error={Boolean(touched.confirmPassword) && Boolean(errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
              autoComplete="off"
              InputProps={{ // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            {passwordMismatched && (
              <Typography color="red" fontFamily={"Lato"} fontWeight={"700"} textAlign={"center"}>
                Password doesn't match, try again
              </Typography>
            )}
            {error && (
              <Typography color="red" fontFamily={"Lato"} fontWeight={"700"} textAlign={"center"}>
                {error}
              </Typography>
            )}
            {success && (
              <Typography color="green" fontFamily={"Lato"} fontWeight={"700"} textAlign={"center"}>
                {success}
              </Typography>
            )}
            <Typography>
              Upload your profile picture:
            </Typography>
            <TextField type="file" sx={{
              '& > *:hover': {
                cursor: 'pointer'
              }
            }} onChange={acceptImage}>Upload file</TextField>
            <Button type="submit" sx={{ gridColumn: 'span 1' }} variant="contained" disabled={loading}>
              Register
            </Button>
            {loading && <CircularProgress color="primary" sx={{ margin: 'auto' }} />}
          </Box>

        </form >
      )}
    </Formik >
  );
};

export default Signup;