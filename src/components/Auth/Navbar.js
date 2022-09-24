import React from "react";
import { Button, Typography, AppBar, Toolbar, Box } from "@mui/material";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  return (
    <>
      <AppBar elevation={0} color="secondary" position="static">
        <Toolbar>
          <Typography variant="h6">Shorter</Typography>
          <Box ml="auto">
            <Button color="inherit">Links</Button>
            <Button onClick={() => signOut(auth)} color="inherit">
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
