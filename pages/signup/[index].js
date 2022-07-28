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

export default function Render() {
  const [loading, setLoading] = useState(false);
  const [showPassword, toggleShowPassword] = useState(true);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: ""
    },
    onSubmit: (values) => {
      setLoading(true);
      let styles = {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          padding: "10px",
          paddingLeft: "20px"
        }
      };
      fetch("https://api.smartlist.tech/v2/public/oauth/signup/", {
        method: "POST",
        body: new URLSearchParams({
          name: values.name,
          email: values.email,
          password: values.password
        })
      })
        .then((res) => res.json())
        .then((res) => {
          setLoading(false);
          if (res.data) {
            // toast.success("", styles);
            // router.push(
            //   `/verify-your-email/${typeof window !== "undefined" &&
            //   window.location.pathname.split("signup/")[1]
            //   }/${res.data.id}`
            // );
            window.location.href = "https://my.smartlist.tech/onboarding"
          } else {
            toast.error(res.error, styles);
          }
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
          Let's get started!
        </Typography>
        <Typography sx={{ mb: 2 }}>
          Create a Smartlist account to track your finances, inventory, and
          access our apps
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Name"
            fullWidth
            sx={{ mb: 2 }}
            name="name"
            required
            autoComplete={"off"}
            onChange={formik.handleChange}
            value={formik.values.name}
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          <TextField
            label="Email"
            fullWidth
            sx={{ mb: 2 }}
            name="email"
            type="email"
            required
            autoComplete={"off"}
            onChange={formik.handleChange}
            value={formik.values.email}
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          <TextField
            label="Password"
            autoComplete={"off"}
            fullWidth
            sx={{ mb: 2 }}
            required
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
      <Box sx={{ textAlign: "center" }}>
        <Link
          href={
            "/oauth/" +
            (typeof window !== "undefined" &&
              window.location.pathname.split("signup/")[1])
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
