import Signup from './pages/Signup/Signup.jsx';
import SignIn from './pages/SignIn/SignIn.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Profile from './pages/Profile/Profile.jsx';
import BookingInfo from './pages/BookingInfo/Info.jsx';
import BookingPage from './pages/booking/book.jsx';
import { useState, useEffect } from 'react';
import Search from './pages/Search-Car-Sharing/Search.jsx';
import PublishTrip from './pages/PublishTrip/PublishTrip.jsx';
import Rider from './pages/Rides/Rider/Rider.jsx';
import DriverRides from './pages/Rides/Driver/DriverRides.jsx';
import ResetPassword from './pages/Reset/Reset.jsx';
import { ContactUs } from './pages/ContactUs/contact.jsx';
import { PersonalInfo } from './Routes.js';

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/SignIn" element={<SignIn user={user} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
        <Route path="/Signup" element={<Signup user={user} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
        <Route path="/contactus" element={<ContactUs user={user} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/" element={<Dashboard user={user} setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/createtrip" element={<PublishTrip user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/BookingInfo" element={<BookingInfo user={user} setUser={setUser} />} />
        <Route path="/booking" element={<BookingPage user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/search" element={<Search user={user} setIsLoggedIn={setIsLoggedIn} />} />

        {/* Added Profile Route */}
        <Route path="/profile/:id" element={<Profile user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />} />

        <Route path="/personal" element={<PersonalInfo user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/myrides" element={<DriverRides user={user} setIsLoggedIn={setIsLoggedIn} currentChat={currentChat} setCurrentChat={setCurrentChat} />} />
        <Route path="/mybooking" element={<Rider user={user} setCurrentChat={setCurrentChat} currentChat={currentChat} setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;