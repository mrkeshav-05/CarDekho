import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Link, Grid, Box, Typography, Container, CssBaseline, Avatar, IconButton, InputAdornment } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function SignUp({ setUser, setIsLoggedIn }) {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phonee, setPhonee] = useState();
  const [confirmpass, setConformpass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const navigate = useNavigate();
  const [isValidPhone, setIsValidPhone] = useState(true);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailRegex.test(email));
  }, [email]);

  useEffect(() => {
    const isValid =
      password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && 
      /\d/.test(password) && /[!@#$%^&*]/.test(password); 
    setIsValidPassword(isValid);
  }, [password]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !username || !email || !phonee || !countryCode || !password || !confirmpass) {
      return toast.error("All fields are required.");
    }    
    if (!isValid) {
      return toast.error("Invalid Email");
    }
    if (!isValidPassword) {
      return toast.warning("Password must be at least 8 characters long and contain at least one uppercase letter, one digit, and one special character.");
    }
    if (confirmpass !== password) {
      return toast.info("Password and confirmed password didn't match");
    }
    if(!isValidPhone){
      return toast.error('Invalid Contact Number');
    }
    let phone = countryCode + phonee;
    const Entry = { name, username, password, email, phone };
    navigate('/personal', {
      state: { Entry }
    });
    setEmail("");
    setPassword("");
    setUsername("");
    setConformpass("");    
  };

  return (
    <Box
      bgcolor="fff"
      color="black"
      height="100vh"
      width="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding="0px"
    >
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'red' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField required fullWidth label="Name" name="name" onChange={(e) => setName(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField required fullWidth label="Username" name="username" onChange={(e) => setUsername(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth label="Email Address" name="email" onChange={(e) => setEmail(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField select label="Country Code" value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
                  <MenuItem value="+44">+44 (UK)</MenuItem>
                  <MenuItem value="+1">+1 (US)</MenuItem>
                  <MenuItem value="+91">+91 (IN)</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField required fullWidth label="Phone number" name="phone" onChange={(e) => setPhonee(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth label="Password" type={showPassword ? "text" : "password"} name="password" onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth label="Confirm Password" type={showPassword2 ? "text" : "password"} name="confirmpass" onChange={(e) => setConformpass(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword2(!showPassword2)}>
                          {showPassword2 ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, bgcolor: 'red' }}>
              Next
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/SignIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <ToastContainer />
      </Container>
    </Box>
  );
}