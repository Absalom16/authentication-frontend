import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { login } from "../utilities/helpers.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [serverResponse, setServerResponse] = useState("");

  // Function to parse query parameters from URL
  const getQueryParameters = () => {
    const queryString = window.location.search.substring(1);
    const parameters = {};
    queryString.split("&").forEach((param) => {
      const [key, value] = param.split("=");
      parameters[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return parameters;
  };

  const parameters = getQueryParameters();
  const callbackURL = parameters.callbackURL;
  sessionStorage.setItem("callbackURL", callbackURL);

  const signinData = {
    email: email,
    password: password,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Form validation
    const errors = {};
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!password.trim()) {
      errors.password = "Password is required";
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setLoading(false); // Set loading to false when validation fails
      return;
    }

    login(signinData, (data) => {
      setLoading(false);
      if (data.status === 200) {
        //successfull
        setServerResponse(data.message);
        // Define parameters to be passed in the URL
        const responseParams = {
          isLoggedIn: true,
          user: data.user.username,
          email: data.user.email,
        };

        // Encode parameters into a query string
        const parameterString = Object.keys(responseParams)
          .map(
            (key) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(
                responseParams[key]
              )}`
          )
          .join("&");

        // Append parameters to the redirection URL
        const redirectURL = `${sessionStorage.getItem(
          "callbackURL"
        )}?${parameterString}`;

        setTimeout(() => {
          window.location.href = redirectURL;
        }, 1000);
      } else if (data.status === 401) {
        //unsuccessfull/ wrong password
        setServerResponse(data.message);
      } else if (data.status === 404) {
        //user not found
        setServerResponse(data.message);
      } else if (data.status === 500) {
        //server error
        setServerError(data.message);
      }
    });
  };
  return (
    <Container component="main" maxWidth="sm">
      <Card elevation={20}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              error={!!errors.email}
              helperText={errors.email}
              type="email"
              value={signinData.email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  email: "",
                }));
              }}
            />

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Password"
              name="password"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password}
              type="password"
              value={signinData.password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  password: "",
                }));
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} />}
            >
              Login
            </Button>
          </form>
          <span style={{ color: "green" }}>
            {serverResponse !== "" && serverResponse}
          </span>

          <span style={{ color: "red" }}>
            {serverError !== "" && serverError}
          </span>
        </CardContent>
      </Card>
    </Container>
  );
}
