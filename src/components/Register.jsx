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
import { register } from "../utilities/helpers.js";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [serverResponse, setServerResponse] = useState("");
  const signupData = {
    name: username,
    email: email,
    password: password,
  };

  // const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Form validation
    const errors = {};
    if (!username.trim()) {
      errors.username = "Username is required";
    }
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

    register(signupData, (data) => {
      setLoading(false);
      if (data.status === 200) {
        //successful
        setServerResponse(data.message);
      } else if (data.status === 409) {
        //user already exists
        setServerResponse(data.message);
      } else if (data.status === 500) {
        //server error
        setServerError(data.message);
      }
    });
  };

  return (
    <div>
      <Container component="main" maxWidth="sm">
        <Card elevation={20}>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Register
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                error={!!errors.username}
                helperText={errors.username}
                value={signupData.username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    username: "",
                  }));
                }}
              />
              <br />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Email"
                name="email"
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email}
                type="email"
                value={signupData.email}
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
                autoComplete="new-password"
                error={!!errors.password}
                helperText={errors.password}
                type="password"
                value={signupData.password}
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
                Register
              </Button>
            </form>
            <span style={{ color: "red" }}>
              {serverError !== "" && serverError}
            </span>
            <span style={{ color: "green" }}>
              {serverResponse !== "" && serverResponse}
            </span>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
