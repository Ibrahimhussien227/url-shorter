import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const AuthModal = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm((oldForm) => ({ ...oldForm, [e.target.name]: e.target.value }));

  const handleAuth = async () => {
    setLoading(true);
    try {
      if (isSignIn) {
        await signInWithEmailAndPassword(auth, form.email, form.password);
      } else {
        await createUserWithEmailAndPassword(auth, form.email, form.password);
      }
    } catch (e) {
      setLoading(false);
      switch (e.code) {
        case "auth/missing-email":
          return setError("Please write your email and password");
        case "auth/wrong-password":
          return setError("Sorry, that password isn't right");
        case "auth/user-not-found":
          return setError(
            "Sorry, we couldn't find an account with that email, Please check your email"
          );
        case "auth/invalid-email":
          return setError("Invalid Email");
        case "auth/weak-password":
          return setError("Weak password");
        default:
          return setError("Please try again later");
      }
    }
  };

  return (
    <Dialog open fullWidth onClose={onClose}>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {isSignIn ? "Sign In" : "Sign Up"}
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        {" "}
        <TextField
          style={{ marginBottom: "24px" }}
          variant="filled"
          fullWidth
          value={form.email}
          name="email"
          onChange={handleChange}
          label="Email"
        />
        <TextField
          variant="filled"
          fullWidth
          type="password"
          value={form.password}
          name="password"
          onChange={handleChange}
          label="Password"
        />
        <Box mt={2} color="red">
          <Typography>{error}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          mb={1}
          mx={2}
        >
          <Typography onClick={() => setIsSignIn((i) => !i)}>
            {isSignIn ? "Don't have an account?" : "Already have an account"}
          </Typography>
          <Button
            disableElevation
            variant="contained"
            color="primary"
            onClick={handleAuth}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={22} color="inherit" />
            ) : isSignIn ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}{" "}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default AuthModal;
