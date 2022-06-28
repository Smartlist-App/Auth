import { useState } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import Link from "next/link";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import router from "next/router";

export default function Render() {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      code: ""
    },
    onSubmit: (values) => {
      setLoading(true);
      fetch(
        "https://api.smartlist.tech/v2/public/oauth/signup/verify-account/",
        {
          method: "POST",
          body: new URLSearchParams({
            id: window.location.pathname
              .split("verify-your-email/")[1]
              .split("/")[1],
            code: values.code
          })
        }
      )
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
          if (res.success) {
            toast.success("Welcome to Smartlist!", styles);
            router.push(
              "/oauth/" + window &&
              window.location.pathname
                .split("verify-your-email/")[1]
                .split("/")[0]
            );
          } else {
            toast.error(res.error, styles);
          }
          setLoading(false);
        });
    }
  });
  return (
    <Box sx={{ textAlign: "left" }}>
      <Paper
        sx={{
          mx: "auto",
          background: "rgba(255,255,255,.1)",
          borderRadius: 5,
          mt: 10,
          maxWidth: "100vw",
          width: { sm: "400px" },
          p: 5
        }}
        elevation={0}
      >
        <Typography gutterBottom variant="h5">
          Verify your email
        </Typography>
        <Typography sx={{ mb: 2 }}>
          We sent a six-digit code to your email. Please enter the code below to
          continue
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Code"
            fullWidth
            sx={{ mb: 2 }}
            name="code"
            required
            autoComplete={"off"}
            onChange={formik.handleChange}
            value={formik.values.code}
            InputProps={{ sx: { borderRadius: 2 } }}
          />

          <LoadingButton
            loading={loading}
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              borderRadius: 4,
              mt: 2,
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

      <Paper
        sx={{
          mx: "auto",
          background: "rgba(255,255,255,.1)",
          borderRadius: 5,
          mt: 1,
          maxWidth: "100vw",
          width: { sm: "400px" },
          p: 5
        }}
        elevation={0}
      >
        <Typography gutterBottom variant="h5">
          Didn't recieve a code?
        </Typography>
        <Typography sx={{ mb: 2 }}>
          Before retrying, make sure you check your spam folder
        </Typography>
        <Box
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            width: "300px",
            height: "75px",
            boxShadow: 4
          }}
        >
          <HCaptcha
            sitekey="4b05f226-a990-40e5-a723-41be82be021e"
            onVerify={(token, ekey) => {
              let styles = {
                style: {
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
                  padding: "10px",
                  paddingLeft: "20px"
                }
              };
              fetch(
                "https://api.smartlist.tech/v2/public/oauth/signup/email/",
                {
                  method: "POST",
                  body: new URLSearchParams({
                    id: window.location.pathname
                      .split("verify-your-email/")[1]
                      .split("/")[1],
                    "h-captcha-response": token
                  })
                }
              )
                .then((res) => res.json())
                .then((res) => {
                  // alert(JSON.stringify(res));
                  if (res.success) {
                    toast.success("Resent email!", styles);
                  } else {
                    toast.error(res.error, styles);
                  }
                });
            }}
          />
        </Box>
        <Typography sx={{ mt: 2 }}>
          Still didn't recieve an email? Contact us at hello@smartlist.tech
        </Typography>
      </Paper>

      <Box sx={{ textAlign: "center" }}>
        <Link
          href={
            "/oauth/" +
            (typeof window !== "undefined" &&
              window.location.pathname
                .split("verify-your-email/")[1]
                .split("/")[0])
          }
        >
          <Button
            sx={{
              textTransform: "none",
              mt: 1,
              py: 0,
              transition: "none",
              "&:hover": { textDecoration: "underline" }
            }}
          >
            Back to login
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
