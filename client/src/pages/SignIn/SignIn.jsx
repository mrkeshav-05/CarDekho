import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, provider } from "../firebase.js";
import { signInWithPopup } from "firebase/auth";
import GoogleButton from 'react-google-button';

export default function SignInSide({ user, setUser, isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const formdata = { email, password };
    try {
      const res = await axios.post("/auth/signin", formdata);
      setUser(res.data.others);
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(res.data.others));
      if (res.data.message) {
        alert(res.data.message);
        console.log("error in if")
      } else {
        navigate("/");
      }
    } catch (err) {
      if ((err.response && err.response.status === 400) || err.response.status === 500) {
        toast.error(err.response.data.message);
      } else {
        console.log(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const googlesekar = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        axios.post("/api/auth/google", {
          username: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        }).then((res) => {
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
          navigate("/");
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://cdn.blablacar.com/kairos/assets/images/driver-c3bdd70e6a29c6af9ef1.svg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) => t.palette.grey[50],
          backgroundSize: "contain", // Adjusted to make image smaller
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box sx={{ my: 8, mx: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">Sign in</Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField margin="normal" required fullWidth onChange={(e) => setEmail(e.target.value)} id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
            <TextField required margin="normal" fullWidth name="password" label="Password" onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} id="password" autoComplete="new-password" InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
                </InputAdornment>
              ),
            }} />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="/Signup" variant="body2">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
            <div className="w-full flex justify-center my-6">
              <GoogleButton onClick={googlesekar} />
            </div>
          </Box>
        </Box>
      </Grid>
      <ToastContainer />
    </Grid>
  );
}
