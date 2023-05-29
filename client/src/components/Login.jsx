import * as yup from "yup";
import axios from "axios";
import { Formik } from "formik";
import { useState } from "react";
import { userLogin } from "../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, Button, TextField, Typography } from "@mui/material";
import { rootUrl } from "./utils/api callers/config";

const initialValuesLogin = {
  email: "akramshafeek70@gmail.com",
  password: "123456789",
};

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const Login = () => {

  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFormSubmit = async (values, onSubmitProps) => {
    console.log("in handle submit")
    try {
      const url = `${rootUrl}/user/auth/login`;
      const response = await axios.post(url, values);
      dispatch(userLogin(response.data));
      navigate('/chat');
    } catch (error) {
      setError(error.response.data.msg);
    }
  }

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesLogin}
      validationSchema={loginSchema}
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
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              autoComplete="off"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 1" }}
              variant="standard"
            />
            {error && (
              <Typography color="red" fontFamily={"Lato"} fontWeight={"700"} textAlign={"center"}>
                {error}
              </Typography>
            )}
            <Button type="submit" sx={{ gridColumn: 'span 1' }} variant="contained">
              LOGIN
            </Button>
          </Box>

        </form >
      )}
    </Formik >
  );
};

export default Login;