import useSWR from "swr";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import CircularProgress from "@mui/material/CircularProgress";
import toast from "react-hot-toast";
import Link from "next/link";

function App() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

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
      // alert(JSON.stringify(values, null, 2));
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
          if (res.success === false) {
            toast.error(res.error, styles);
          } else {
            toast.success("Success!", styles);
          }
        });
    }
  });
  if (error) return <div>An error has occured</div>;

  if (!data)
    return <CircularProgress disableShrink sx={{ animationDuration: ".6s" }} />;

  // render data
  return (
    <Box sx={{ textAlign: "center" }}>
      <Paper
        sx={{
          background: "rgba(255,255,255,.1)",
          borderRadius: 5,
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
            label="Email"
            fullWidth
            name="email"
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
            onChange={formik.handleChange}
            value={formik.values.password}
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ borderRadius: 4, textTransform: "none", transition: "none" }}
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
          </Button>
        </form>
      </Paper>
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
    </Box>
  );
}

export default App;