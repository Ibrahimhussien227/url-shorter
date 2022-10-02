import React, { useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import AuthModal from "./AuthModal";
import "./index.css";

const Home = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  return (
    <Box
      display="flex"
      flexDirection="column"
      p={3}
      boxSizing="border-box"
      height="100vh"
      className="gradient"
      color="#fff"
    >
      {openAuthModal && <AuthModal onClose={() => setOpenAuthModal(false)} />}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4">Shorter</Typography>
        <Button onClick={() => setOpenAuthModal(true)} color="inherit">
          Login/Signup
        </Button>
      </Box>

      <Box display="flex" flexGrow={1} alignItems="center">
        <Box>
          <Typography variant="h3">Short links, big results</Typography>
          <Box my={2}>
            <Typography>
              Powerful link shorter to help your brand to grow
            </Typography>
          </Box>
          <Button
            disableElevation
            variant="contained"
            size="large"
            color="inherit"
            style={{ background: "#00c9b7", borderRadius: "50px" }}
            onClick={() => setOpenAuthModal(true)}
          >
            Get Started
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
