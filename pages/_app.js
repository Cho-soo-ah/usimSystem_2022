import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import createEmotionCache from "../src/createEmotionCache";
import theme from "../src/theme";
import "/styles/globals.css";
import Toolbars from "../component/Toolbar";

const clientSideEmotionCache = createEmotionCache();

export default function App(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>NEXT MUI</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        {/* <meta name="theme-color" content={theme.palette} /> */}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
        <Toolbars />
        <style global jsx>
          {`
            * {
              margin: 0;
              padding: 0;
              text-decoration: none;
            }
            body {
              overflow-x: hidden;
            }
            body::-webkit-scrollbar,
            .MuiTableCell-root::-webkit-scrollbar {
              width: 10px;
            }
            body::-webkit-scrollbar-thumb,
            .MuiTableCell-root::-webkit-scrollbar-thumb {
              background-color: #2f3542;
              border-radius: 10px;
            }
            body::-webkit-scrollbar-track,
            .MuiTableCell-root::-webkit-scrollbar-track {
              background-color: #ddd;
              border-radius: 10px;
            }
            .inner {
              width: calc(100% - 270px);
              min-height: 80vh;
              margin-top: 100px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .tableInner {
              width: calc(100% - 270px);
              padding: 20px;
              margin-top: 100px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            }
            h2 {
              text-align: center;
            }
            .MuiBox-root {
              width: 500px;
            }
          `}
        </style>
      </ThemeProvider>
    </CacheProvider>
  );
}
