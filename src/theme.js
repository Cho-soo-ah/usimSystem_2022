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
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#d4d4d4",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#ededed",
            width: 10,
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            backgroundColor: "#d4d4d4",
            minHeight: 32,
          },
        },
      },
    },
  },
});

export default theme;
