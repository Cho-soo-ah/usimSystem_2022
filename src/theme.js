import { createTheme } from "@mui/material/styles";

const mainColor = "#bf3434";

const theme = createTheme({
  palette: {
    primary: {
      main: mainColor,
    },
  },
  components: {
    MuiListItemText: {
      styleOverrides: {
        root: {
          color: "#000",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: mainColor,
          "&:hover": {
            backgroundColor: "#cf4747",
          },
        },
      },
    },
  },
});

export default theme;
