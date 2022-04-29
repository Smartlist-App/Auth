import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Head from "next/head";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
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
        <Toaster />
        <Box
          sx={{
            display: "flex",
            color: "white",
            alignItems: "center",
            gap: "10px",
            userSelect: "none",
            px: 2,
            mt: -3
          }}
        >
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAABORJREFUeF7tmk+I3FQcx9/sYcuc9rKz3TibbDIvIworCBX02pa2ZwWLh+JBqLR4EkEU/AeK7UVK6aEFQWjpoT0VBb31UA896UFaRJyXTSbZ2cHOwfWyg7tK5A1JGYbJ7JvsvHwz+NvLHjaZb97nk2/ey9upMPqBEqhA0ymckQDwTUACSACYADieGkACwATA8dQAEgAmAI6nBpAAMAFwPDWABIAJgOOpASQATAAcTw0gAWAC4HhqAAkAEwDHUwNIAJgAOJ4aQALABMDx1AASACYAjqcGkAAwAXA8NYAEgAmA46kBJABMABxPDSABYALgeGoACQATAMfPbQPiOF7xPG9D8uOcP5a/K5XKEzDPqePnUkAC/w3O+VU5Ys/z3uec35xHCRAB7Xb72P7+/sro7bKwsPDP6urqb9Vq9e+su1nCb7fbn6yvr78zfH4Yhl9blvXRvEkoXIAEyBj7I6urQRBctm37yjgBB52bfObReZJQOgFRFH1jmuaHowIU4ade50ZC6QSEYXjDsqxPhwXs7u6a1Wo1nGaG6/f71qRH2TSfpfPY0gkIguCKbduXUwFhGG6YpvkoD4ROp/NivV7vlnl1VDoBYRi+ZFlWJIH7vv+c4zgPsuD7vv95HMe7jUbj0oRjTjuO80tZ54VSCRiGL4Q447rurSywrVbrrWaz+X2yDD3OOb+jcmzZ2lAaAb1e79larfaXhLi5uXmx0Wh8lgXU87yTwy9fcoI+qC3p6qpsTSiLgGcYY/9KOJ1O51q9Xj+bBT+KohdM03wy7k7e3t5+3jCMX7PO7Xa73xqG8XaZJJRBwGDJmPxkvh/Iv6usbBRXTKVZpqIFSBDLjLE/GWPbB6x0lKEpvjMMWoeeEyACoihakY8RCb/X6+3XarXfZwU//RwVCem8g5RQuAAJKIHDwjA0Lcv6KQt++lKW95ktc4Ig+MC27XezMoIgeMW2bT9vRp73k+FzCheQwhdCvOy67ndZAxBCvOe67u3DgpF5rVbrtWazeX1C1uuu6/542Kw8MgoVkML3PO/pVvK4i/Y871XO+cNZAUm2r49xzn+YsLSFbGkXJiCFP24reRiKzkeC3AY/4JFX+JZ2IQJS+JO2oaWEIibFnZ0dZ2lpaXPWk36ex8+g4XlPVD1PFT5jrLBlocoKiTGmvOxVZTHuOK0C5ED7/f4Rha3kQgY7DEBFgsqL32Hga22AHGCy3s/cSu52u/cMw7gwq8l2WhjyGre2tr5aW1s7l3Wu7i3tmTdgaKWzwTm/nzUw3/e/dBxn8E915ItQspF33nGcLyZcq7YtbS0CptlKRsJPgUsJQohT6XvHOBFCiPPyvWXW16tFwKTVzuhW8rSPDV3Hq2xpy4m59AIkoDiOjXGba5O2knWBnfZzs7a0dU3IM29AOuDRgegawLSAVY4f3dLWeeNoEyAHKoQ4sbi4+Oby8vLH8/ANhZFlqhFF0aW9vb27nPOfZ/3oSbO0CkgeR4NvwOkagModnfeYdEWn89q1C8g7+P/LeSQAbJoEkAAwAXA8NYAEgAmA46kBJABMABxPDSABYALgeGoACQATAMdTA0gAmAA4nhpAAsAEwPHUABIAJgCOpwaQADABcDw1gASACYDjqQEkAEwAHE8NIAFgAuB4agAJABMAx1MDSACYADieGkACwATA8f8BmoQgfyukaHgAAAAASUVORK5CYII="
            width="56"
            height="56"
            alt="logo"
          />
          <Typography variant="h5">Smartlist</Typography>
        </Box>
        {router ? <Component {...pageProps} /> : "Loading..."}
      </ThemeProvider>
    </>
  );
}

export default MyApp;
