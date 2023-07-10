import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "state/api";
import { setLogin } from "state";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
} from "@mui/material";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({ email, password });
      dispatch(setLogin(data)); // Update user state in Redux store
      localStorage.setItem("user", JSON.stringify(data.user)); // Store user information in local storage
      localStorage.setItem("token", data.token); // Store token in local storage
      navigate("/dashboard"); // Redirect to dashboard page
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "40px",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ width: "100%", mt: 3 }}
        >
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            fullWidth
            sx={{ mt: 3 }}
          >
            Login
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Link component={RouterLink} to="/signup">
              Sign up here
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
