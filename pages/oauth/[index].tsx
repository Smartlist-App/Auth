import React, { useRef, useState } from "react";
import useSWR from "swr";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import toast from "react-hot-toast";
import Link from "next/link";
import Cookies from "universal-cookie";
import LoadingButton from "@mui/lab/LoadingButton";
import emailjs from "@emailjs/browser";

function App() {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, toggleShowPassword] = useState(true);
  const [show2fa, setShow2fa] = useState(false);
  const fetcher = (e: any, o: any) => fetch(e, o).then((res) => res.json());
  const cookies = new Cookies();

  const url = "https://api.smartlist.tech/v2/public/oauth/fetch-app/";
  const { data, error } = useSWR(url, () =>
    fetcher(url, {
      method: "POST",
      body: new URLSearchParams({
        appId: window.location.pathname.split("oauth/")[1],
      }),
    })
  );
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      twoFactorCode: "",
    },
    onSubmit: (values) => {
      setButtonLoading(true);
      fetch("/api/auth", {
        method: "POST",
        body: new URLSearchParams({
          appId: window.location.pathname.split("oauth/")[1],
          email: values.email,
          password: values.password,
          ...(show2fa && {
            twoFactorCode: values.twoFactorCode,
          }),
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          let styles = {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
              padding: "10px",
              paddingLeft: "20px",
            },
          };
          setButtonLoading(false);
          if (res.success === false && res["2fa"] === false) {
            toast.error("Invalid email or password", styles);
          } else if (res.success === false && res["2fa"] === true) {
            if (show2fa === true) {
              toast.error("Invalid 2FA code", styles);
            }
            setShow2fa(true);
          } else {
            // alert("Login successful! Token: " + res.token);
            cookies.set("accessToken", res.token, { path: "/" });
            window.location.href = `${res.redirectUri}?token=${res.token}`;
            // toast.success("Success!", styles);
            // emailjs
            //   .send(
            //     "service_bhq01y6",
            //     "template_nbjdq1i",
            //     {
            //       to_email: values.email,
            //     },
            //     "6Q4BZ_DN9bCSJFZYM"
            //   )
            //   .then(
            //     () => {
            //       window.location.href = `${res.data.redirect_uri}?token=${res.data.token}`;
            //     },
            //     () => {
            //       window.location.href = `${res.data.redirect_uri}?token=${res.data.token}`;
            //     }
            //   )
            //   .catch((err) => alert(err));
            setLoading(true);
          }
        });
    },
  });
  if (error)
    return (
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        An error has occured
      </Box>
    );

  if (!data || loading)
    return (
      <Box sx={{ textAlign: "center", pt: 10 }}>
        <CircularProgress disableShrink sx={{ animationDuration: ".6s" }} />
      </Box>
    );

  // render data
  return (
    <>
      <Box sx={{ textAlign: "center", mt: { sm: 3, xs: 4 } }}>
        <Paper
          sx={{
            background: { xs: "transparent" },
            borderRadius: 5,
            mx: "auto",
            maxWidth: "100vw",
            width: { sm: "400px" },
            p: 5,
          }}
          elevation={0}
        >
          {window.location.pathname.split("oauth/")[1] !==
            "eccbc87e4b5ce2fe28308fd9f2a7baf3" && (
            <Avatar
              sx={{
                width: 70,
                height: 70,
                margin: "auto",
                mb: 3,
              }}
              src={
                data.data.logo ||
                "https://i.ibb.co/1vTLKw4/Carbon-Home-inventory-and-finance-tracking-5.png"
              }
            />
          )}
          <Typography
            gutterBottom
            variant={
              window.location.pathname.split("oauth/")[1] !==
              "eccbc87e4b5ce2fe28308fd9f2a7baf3"
                ? "h4"
                : "h2"
            }
            sx={{
              textAlign: "center",
              ...(window.location.pathname.split("oauth/")[1] ===
                "eccbc87e4b5ce2fe28308fd9f2a7baf3" && { my: 4, mb: 5 }),
              ...(window.location.pathname.split("oauth/")[1] !==
                "eccbc87e4b5ce2fe28308fd9f2a7baf3" && { fontWeight: "700" }),
            }}
          >
            Sign into {data.data.name}
          </Typography>
          {window.location.pathname.split("oauth/")[1] !==
            "eccbc87e4b5ce2fe28308fd9f2a7baf3" && (
            <Typography sx={{ mb: 2, textAlign: "center" }}>
              Using your Carbon account
            </Typography>
          )}

          <form onSubmit={formik.handleSubmit}>
            <Dialog
              open={show2fa}
              keepMounted
              BackdropProps={{
                sx: {
                  background: "rgba(0,0,0,0.2)",
                  backdropFilter: "blur(15px)",
                },
              }}
              PaperProps={{
                elevation: 0,
                sx: {
                  borderRadius: 5,
                  width: "500px",
                  maxWidth: "calc(100vw - 10px)",
                },
              }}
              onClose={() => setShow2fa(false)}
            >
              <DialogContent sx={{ p: 5 }}>
                <Typography variant="h5" sx={{ mb: 1, fontWeight: "600" }}>
                  2-factor authentication
                </Typography>
                <Typography sx={{ mb: 3 }}>
                  Enter the six-digit code on the Google Authenticator app.
                </Typography>
                <TextField
                  autoFocus
                  name="twoFactorCode"
                  value={formik.values.twoFactorCode}
                  onChange={formik.handleChange}
                  variant="filled"
                  placeholder="******"
                  label="6 digit code (no spaces)"
                  fullWidth
                />
                <LoadingButton
                  loading={buttonLoading}
                  type="submit"
                  variant="contained"
                  fullWidth
                  onClick={() => document.getElementById("_loading")!.click()}
                  sx={{
                    py: 1,
                    borderRadius: 2,
                    mt: 2,
                    textTransform: "none",
                    transition: "none",
                  }}
                  disableElevation
                >
                  Verify
                  <span
                    style={{ marginLeft: "10px" }}
                    className="material-symbols-rounded"
                  >
                    chevron_right
                  </span>
                </LoadingButton>
              </DialogContent>
            </Dialog>
            <TextField
              autoFocus
              label="Your email"
              fullWidth
              name="email"
              type="email"
              autoComplete={"off"}
              onChange={formik.handleChange}
              value={formik.values.email}
              InputProps={{ sx: { borderRadius: 2, fontWeight: "700" } }}
            />
            <Link
              href={
                "../forgot-password/" +
                window.location.pathname.split("oauth/")[1]
              }
            >
              <Button
                sx={{
                  textTransform: "none",
                  my: 1,
                  py: 0,
                  transition: "none",
                  float: "right",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Forgot password?
              </Button>
            </Link>
            <TextField
              label="Password"
              autoComplete={"off"}
              fullWidth
              sx={{ mb: 2 }}
              name="password"
              type={!showPassword ? "text" : "password"}
              onChange={formik.handleChange}
              value={formik.values.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => toggleShowPassword(!showPassword)}
                      edge="end"
                      sx={{ mr: 0.1 }}
                    >
                      <span className="material-symbols-rounded">
                        {showPassword ? "visibility" : "visibility_off"}
                      </span>
                    </IconButton>
                  </InputAdornment>
                ),
                sx: { borderRadius: 2, fontWeight: "700" },
              }}
            />
            <LoadingButton
              loading={buttonLoading}
              type="submit"
              variant="contained"
              id="_loading"
              fullWidth
              sx={{
                py: 2,
                borderRadius: 2,
                mt: 2,
                textTransform: "none",
                transition: "none",
              }}
              disableElevation
              size="large"
            >
              Continue
              <span
                style={{ marginLeft: "10px" }}
                className="material-symbols-rounded"
              >
                chevron_right
              </span>
            </LoadingButton>
          </form>
        </Paper>
        <Link href={"/signup/" + window.location.pathname.split("oauth/")[1]}>
          <Button
            sx={{
              textTransform: "none",
              mt: 1,
              py: 0,
              transition: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Create an account
          </Button>
        </Link>
      </Box>
    </>
  );
}

export default App;
