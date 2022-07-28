import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Head from "next/head";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import { brown } from "@mui/material/colors";

const darkTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: brown[900],
    },
  },
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Login &bull; Carbon</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap"
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
        <Toaster />
        <Box
          sx={{
            display: "flex",
            color: "#232323",
            alignItems: "center",
            gap: "10px",
            userSelect: "none",
            px: 2,
            mt: -3,
          }}
        >
          <picture>
            <img
              src="https://i.ibb.co/1vTLKw4/Carbon-Home-inventory-and-finance-tracking-5.png"
              width="100"
              height="100"
              alt="logo"
            />
          </picture>
          <Typography variant="h5">Carbon</Typography>
        </Box>
        {router ? <Component {...pageProps} /> : "Loading..."}
      </ThemeProvider>
    </>
  );
}

export default MyApp;
