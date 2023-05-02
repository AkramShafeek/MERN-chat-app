import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";

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
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleFormSubmit = async (values, onSubmitProps) => {
    console.log("in handle submit")
    console.log(values);
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
            />
            <TextField
              label='Password'
              variant="outlined"
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
              variant="outlined"
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
            <Typography>
              Upload your profile picture:
            </Typography>
            <TextField type="file" sx={{
              '& > *:hover': {
                cursor: 'pointer'
              }
            }} onChange={acceptImage}>Upload file</TextField>
            <Button type="submit" sx={{ gridColumn: 'span 1' }} variant="contained">
              LOGIN
            </Button>
          </Box>

        </form >
      )}
    </Formik >
  );
};

export default Signup;