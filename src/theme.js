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
          scrollbarColor: "#6b6b6b #0000000a",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#0000000a",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#6b6b6b",
            width: 10,
            minHeight: 32,
            border: "3px solid #0000000a",
          },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#0000000a",
          },
        },
      },
    },
  },
});

export default theme;
