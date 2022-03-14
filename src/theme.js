import { createTheme } from "@mui/material/styles";

const mainColor = "#bf3434";

const theme = createTheme({
  palette: {
    primary: {
      main: mainColor,
    },
  },
  typography: {
    fontFamily: '"Noto Sans KR", sans-serif',
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
  breakpoints: {
    values: {
      laptop: 1024,
    },
  },
});

export default theme;
