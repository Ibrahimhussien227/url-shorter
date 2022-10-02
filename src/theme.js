import { createTheme } from "@mui/material";

export default createTheme({
  palette: {
    primary: {
      main: "#30C460  ",
      contrastText: "#fff",
    },
    secondary: {
      main: "#24252A",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    button: {
      textTransform: "capitalize",
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
  },
});
