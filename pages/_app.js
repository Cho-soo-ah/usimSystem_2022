import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline, useMediaQuery, Link } from "@mui/material";
import { styled } from "@mui/system";
import createEmotionCache from "../src/createEmotionCache";
import theme from "../src/theme";
import PcToolBar from "../component/PcToolBar";
import MobileToolBar from "../component/MobileToolBar";
import "../public/style.css";

const clientSideEmotionCache = createEmotionCache();
export default function App(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const mobileQuery = useMediaQuery("(max-width:1023px)");
  const PcInner = styled("div")({
    width: "calc(100% - 270px)",
    minHeight: "75vh",
    margin: "100px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& .inner": {
      width: "500px",
    },
  });
  const MobileInner = styled("div")({
    width: "100%",
    padding: "0 4%",
    margin: "100px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>NEXT MUI</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <Link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {mobileQuery ? (
          <>
            <MobileToolBar />
            <MobileInner>
              <Component {...pageProps} />
            </MobileInner>
          </>
        ) : (
          <>
            <PcToolBar />
            <PcInner>
              <Component {...pageProps} />
            </PcInner>
          </>
        )}

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
            body::-webkit-scrollbar::-webkit-scrollbar {
              width: 10px;
            }
            body::-webkit-scrollbar-thumb::-webkit-scrollbar-thumb {
              background-color: #2f3542;
              border-radius: 10px;
            }
            body::-webkit-scrollbar-track::-webkit-scrollbar-track {
              background-color: #ddd;
              border-radius: 10px;
            }

            .tableInner {
              width: 100%;
              padding: 20px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            }
            h2 {
              text-align: center;
            }
          `}
        </style>
      </ThemeProvider>
    </CacheProvider>
  );
}
