import Box from "@mui/material/Box";
import Head from "next/head";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Login &bull; Smartlist</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://i.ibb.co/2snZjPZ/48x48-modified-1.png"
          rel="shortcut icon"
        />
        <link
          rel="stylesheet"
          href="https://fonts.sandbox.google.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@40,500,1,200"
        />
      </Head>
      <ThemeProvider theme={darkTheme}>
        <Box
          sx={{
            "& *:not(.material-symbols-rounded)": {
              fontFamily: "'Outfit', sans-serif!important"
            }
          }}
        >
          <Toaster />
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "url(https://i.ibb.co/31Grmz3/image.png)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "& .MuiTouchRipple-rippleVisible": {
                animationDuration: ".35s!important"
              },
              "& .MuiTouchRipple-child": {
                filter: "opacity(0.4) !important"
              }
            }}
          >
            {router ? <Component {...pageProps} /> : "Loading..."}
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
