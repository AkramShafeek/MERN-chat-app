import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";

const initialValuesLogin = {
  email: "",
  password: "",
};

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const Login = () => {

  const handleFormSubmit = async (values, onSubmitProps) => {
    console.log("in handle submit")
    console.log(values);
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
            />
            <Button type="submit" sx={{gridColumn:'span 1'}} variant="contained">
              LOGIN
            </Button>
          </Box>

        </form >
      )}
    </Formik >
  );
};

export default Login;