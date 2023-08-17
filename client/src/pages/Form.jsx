import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  useMediaQuery,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup"; //validation library
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";
import { toast } from "react-toastify";

//yup validation schema
const registerSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  name: "",
  email: "",
  password: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("register");
  const [showPassword, setShowPassword] = useState("password");
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const apiUrl = process.env.REACT_APP_API_URL;
  const dispatch = useDispatch();

  const register = async (values, onSubmitProps) => {
    const savedUserResponse = await axios.post(
      `${apiUrl}auth/register`,
      values
    );
    if (savedUserResponse) {
      toast.success("Registered Successfully!");
      setPageType("login");
    }
  };

  const afterLoginTasks = async (loggedInResponse, onSubmitProps) => {
    onSubmitProps.resetForm();
    if (loggedInResponse) {
      localStorage.setItem("token", loggedInResponse.token);
      localStorage.setItem("uid", loggedInResponse.user._id);
      dispatch(
        setLogin({
          token: loggedInResponse.token,
          name: loggedInResponse.user.name,
          uid: loggedInResponse.user._id,
        })
      );
      navigate("/");
    }
    await axios
      .post(`${apiUrl}time`, {
        uid: String(loggedInResponse.user._id),
      })
      .then((res) => {
        console.log("Created data");
      });
  };

  const login = async (values, onSubmitProps) => {
    await axios
      .post(`${apiUrl}auth/login`, values)
      .then((res) => {
        afterLoginTasks(res.data, onSubmitProps);
      })
      .catch((error) => {
        console.log({ err: error });
        if (error.response.status === 400) {
          toast.error("User does not exist");
        } else {
          toast.error("Something went wrong, couldn't login");
        }
      });
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };
  const togglePassword = () => {
    setShowPassword(showPassword === "password" ? "" : "password");
  };
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
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
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isDesktop ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  autoFocus={true}
                  label="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={Boolean(touched.name) && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 4" }}
                />
              </>
            )}
            <TextField
              label="Email"
              autoFocus={isLogin}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <div className="col-span-4 flex flex-col">
              <TextField
                label="Password"
                type={showPassword}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <FormControlLabel
                control={<Checkbox onClick={togglePassword} />}
                color="rgb(22, 78, 99)"
                sx={{ color: "rgb(22, 78, 99)" }}
                label="Show password"
              />
            </div>
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                m: "2rem 0",
                p: "1rem",
                color: "white",
                "&:hover": {
                  //   color: palette.primary.main,
                  //   backgroundColor: palette.primary.alt,
                },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: "rgb(22, 78, 99)",
                "&:hover": {
                  cursor: "pointer",
                  //   color: palette.primary.dark,
                },
              }}
              className="w-max"
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
