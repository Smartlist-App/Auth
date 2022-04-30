import { useState } from "react";
import useSWR from "swr";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
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

function App() {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, toggleShowPassword] = useState(true);
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const cookies = new Cookies();
  // cookies.set(
  //   "accessToken",
  //   "2d8a0db9ca24b84453d7e12368cb9d18c5397b1cf6d96a8d2381dcf448ca60caf9cc28e8f0d41c559cb9df0daf16f37e5440ceed52203b860e9b4950d42d5c90f8a84474b8f5fd4b0599a2fe66d2fc4f86ceaad7e6ef44b503e10d28eb0b60af8fc86168154cb58cdcad0f893c2f61cc21030036217e702250cd6cfd66060e58349c1c8b79dd5427f62808e8e978533b73159c27b72d0692218b54b7eca9dd63fd266505d29d634e938528ac1118d3616ce47ce4b458d1747482e36d682b4f30dcf2c00ee59b772aff0ad4d77130778f1e9da25cc5b2cb8ec8a4840ca3e3c558db5ac0e87187d167e32eed1dfd49d27b4a0b9a59e3d40edf67b35bf2e6633038e770837e702ac2b73c0ae0e5109f4738ebf0f45741d05dd3866cfbbdfd6a33447c15bdf5f38d3b181315b5f8",
  //   { path: "/" }
  // );
  // fetch data
  const url = "https://api.smartlist.tech/v2/public/oauth/fetch-app/";
  const { data, error } = useSWR(url, () =>
    fetcher(url, {
      method: "POST",
      body: new URLSearchParams({
        appId: window.location.pathname.split("oauth/")[1]
      })
    })
  );
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: (values) => {
      setButtonLoading(true);
      fetch("https://api.smartlist.tech/v2/public/oauth/auth/", {
        method: "POST",
        body: new URLSearchParams({
          appId: window.location.pathname.split("oauth/")[1],
          email: values.email,
          password: values.password
        })
      })
        .then((res) => res.json())
        .then((res) => {
          let styles = {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
              padding: "10px",
              paddingLeft: "20px"
            }
          };
          setButtonLoading(false);
          if (res.success === false) {
            toast.error(res.error, styles);
          } else {
            cookies.set("accessToken", res.data.access_token, { path: "/" });
            // toast.success("Success!", styles);
            window.location.href = `${res.data.redirect_uri}?token=${res.data.token}`;
            setLoading(true);
          }
        });
    }
  });
  if (error) return <div>An error has occured</div>;

  if (!data || loading)
    return (
      <Box sx={{ textAlign: "center", pt: 10 }}>
        <CircularProgress disableShrink sx={{ animationDuration: ".6s" }} />
      </Box>
    );

  // render data
  return (
    <>
      <Box sx={{ textAlign: "center", mt: { sm: 9, xs: 4 } }}>
        <Paper
          sx={{
            background: { sm: "rgba(255,255,255,.1)", xs: "transparent" },
            borderRadius: 5,
            mx: "auto",
            maxWidth: "100vw",
            width: "400px",
            p: 5
          }}
          elevation={0}
        >
          <Avatar
            sx={{
              width: 70,
              height: 70,
              margin: "auto",
              mb: 2
            }}
            src="https://smartlist.tech/app/img/logo/512x512.png"
          />
          <Typography gutterBottom variant="h4" sx={{ textAlign: "center" }}>
            Sign into {data.data.name}
          </Typography>
          <Typography sx={{ mb: 2, textAlign: "center" }}>
            With your Smartlist account
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              autoFocus
              label="Email"
              fullWidth
              name="email"
              type="email"
              autoComplete={"off"}
              onChange={formik.handleChange}
              value={formik.values.email}
              InputProps={{ sx: { borderRadius: 2 } }}
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
                  "&:hover": { textDecoration: "underline" }
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
                sx: { borderRadius: 2 }
              }}
            />
            <LoadingButton
              loading={buttonLoading}
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                borderRadius: 4,
                textTransform: "none",
                transition: "none"
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
              "&:hover": { textDecoration: "underline" }
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
