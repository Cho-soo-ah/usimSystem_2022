import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline, useMediaQuery, Link } from "@mui/material";
import { styled } from "@mui/system";
import createEmotionCache from "../src/createEmotionCache";
import theme from "../src/theme";
import UsimToolBar from "../component/UsimToolBar";
import MobileToolBar from "../component/MobileToolBar";
import "../public/style.css";

import { RecoilRoot } from "recoil";

const clientSideEmotionCache = createEmotionCache();

function App(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const mobileQuery = useMediaQuery("(max-width:1023px)");
  const PcInner = styled("div")({
    width: "calc(100% - 270px)",
    minHeight: "75vh",
    margin: "150px 0",
    display: "flex",
    alignItems: "flex-start",
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
        <title>825 SIM</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <Link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* {mobileQuery ? (
          <>
            <MobileToolBar />
            <MobileInner>
              <Component {...pageProps} />
            </MobileInner>
          </>
        ) : (
          <>
            <UsimToolBar />
            <PcInner>
              <RecoilRoot>
                <Component {...pageProps} />
              </RecoilRoot>
            </PcInner>
          </>
        )} */}
        <>
          <UsimToolBar />
          <PcInner>
            <RecoilRoot>
              <Component {...pageProps} />
            </RecoilRoot>
          </PcInner>
        </>
        <style global jsx>
          {`
            * {
              margin: 0;
              padding: 0;
              text-decoration: none;
            }
            body {
              overflow-x: hidden;
              user-select: none;
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
              margin-bottom: 10px;
            }
          `}
        </style>
      </ThemeProvider>
    </CacheProvider>
  );
}
export default App;
