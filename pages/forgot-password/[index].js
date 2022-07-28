import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import Link from "next/link";

export default function Render() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: (values) => {
      let styles = {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          padding: "10px",
          paddingLeft: "20px"
        }
      };
      toast.error("Password reset feature coming soon!", styles);
    }
  });
  return (
    <Box sx={{ textAlign: "center", mt: 5 }}>
      <Paper
        sx={{
          background: "rgba(255,255,255,.1)",
          borderRadius: 5,
          maxWidth: "100vw",
          width: { sm: "400px" },
          p: 5,
          mx: "auto"
        }}
        elevation={0}
      >
        <Typography gutterBottom variant="h5">
          Forgot your password?
        </Typography>
        <Typography sx={{ mb: 2 }}>
          Enter your email, and we&apos;ll send you a link to reset your password
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
          <Button
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
          </Button>
        </form>
      </Paper>
      <Box sx={{ textAlign: "center" }}>
        <Link
          href={
            "/oauth/" +
            (typeof window !== "undefined" &&
              window.location.pathname.split("forgot-password/")[1])
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
