import React, { useEffect, useState } from "react";
import { ThemeProvider, CircularProgress, Box } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Account from "./components/Auth";
import Home from "./components/Home";
import theme from "./theme";
import { auth } from "./firebase";
import LinkRedirect from "./components/LinkRedirect";

const App = () => {
  const [user, setUser] = useState(null);
  const { pathname } = useLocation();
  const [initialLoad, SetInitialLoad] = useState(
    pathname === "/" || pathname === "/account" ? true : false
  );

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      SetInitialLoad(false);
    });
  }, []);

  if (initialLoad)
    return (
      <Box mt={5} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Navigate to="/account" /> : <Home />}
        />
        <Route
          path="/account"
          element={user ? <Account /> : <Navigate to="/" />}
        />
        <Route path="/:shortCode" element={<LinkRedirect />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
