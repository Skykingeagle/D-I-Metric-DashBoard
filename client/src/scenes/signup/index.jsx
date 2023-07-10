import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "state/api";
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

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Import useNavigate
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, { isLoading }] = useRegisterMutation();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Call the register mutation
      const { data } = await register({
        firstName,
        lastName,
        email,
        password,
      });

      dispatch(setLogin(data)); // Update user state in Redux store
      localStorage.setItem("token", data.token); // Store the token in local storage
      navigate("/"); // Redirect to dashboard page
    } catch (error) {
      console.log("Signup error:", error);
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
          Sign Up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSignup}
          sx={{ width: "100%", mt: 3 }}
        >
          <TextField
            label="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
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
            Sign Up
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link component={RouterLink} to="/">
              Sign in here
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
