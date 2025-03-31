import React, { useState } from 'react';
import { TextField, Button, MenuItem, Box, Typography, Container, CssBaseline, Avatar, Grid } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const PersonalInfo = () => {
    const location = useLocation();
    const { Entry } = location.state || {};
    console.log('Entry: ', Entry);
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [prof, setProf] = useState("")
    const navigate = useNavigate();

    const handleAgeChange = (event) => {
        setAge(event.target.value);
    };
    const handleProf = (event) => {
        setProf(event.target.value);
    }
    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };
    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        if (!age || !address || !gender || !prof) {
            toast.error("Please fill out all fields");
            return;
        }
        if (age < 18) {
            return toast.info("Minimum age is 18");
        }
        const entry = { ...Entry, age, address, gender, prof };
        console.log(entry, '- entry');
        try {
            await axios.post(`${backendUrl}/api/auth/signup`, entry);
            navigate('/signin');
        } catch (err) {
            if (err.response && err.response.status === 400) {
                toast.error(err.response.data.message);
            } else {
                console.log(err);
            }
        }
    }

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
                <Box
                    sx={{
                        marginTop: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'red' }}>
                        <PersonIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{ marginBottom: 5 }}>
                        Please tell us more about you 😁
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="age"
                                    label="Age"
                                    name="age"
                                    value={age}
                                    autoComplete="age"
                                    type="number"
                                    onChange={handleAgeChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="profession"
                                    label="Profession"
                                    name="profession"
                                    autoComplete="profession"
                                    rows={4}
                                    onChange={handleProf}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="address"
                                    label="Address"
                                    name="address"
                                    autoComplete="address"
                                    multiline
                                    rows={4}
                                    onChange={handleAddressChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    required
                                    fullWidth
                                    id="gender"
                                    label="Gender"
                                    name="gender"
                                    value={gender}
                                    onChange={handleGenderChange}
                                >
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
                <ToastContainer />
            </Container>
        </Box>
    );
};

export default PersonalInfo;
