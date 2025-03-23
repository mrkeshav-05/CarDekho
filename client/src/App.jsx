import Signup from './pages/Signup/Signup.jsx';
import SignIn from './pages/SignIn/SignIn.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Profile from './pages/Profile/Profile.jsx';
import BookingInfo from './pages/BookingInfo/Info.jsx';
import BookingPage from './pages/booking/book.jsx';
import { useState , useEffect} from 'react';
import { Messenger } from './pages/Messenger/Messenger.jsx';
import Search from './pages/Search-Car-Sharing/Search.jsx';
import PublishTrip from './pages/PublishTrip/PublishTrip.jsx';
import Rider from './pages/Rides/Rider/Rider.jsx';
import DriverRides from './pages/Rides/Driver/DriverRides.jsx';
import ResetPassword from './pages/Reset/Reset.jsx';
import { ContactUs } from './pages/ContactUs/contact.jsx';
import Inbox from './pages/Inbox/Inbox.jsx';
import { PersonalInfo } from './Routes.js';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
  const [currentChat,setCurrentChat] = useState(null)
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  console.log(isLoggedIn)
  // Update localStorage when user state changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    if(user){
      setIsLoggedIn(true);
    }
  }, [user]);
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/SignIn" element={<SignIn user={user} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>}/>
          <Route path="/Signup" element={<Signup user={user} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>}/>
          <Route path="/" element={<Dashboard user={user} setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
          <Route path='/resetPassword' element={<ResetPassword />}/>
          <Route path="/contactus" element={<ContactUs user={user} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/profile/:id" element={<Profile user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path='/personal' element={<PersonalInfo user={user} setUser= {setUser} setIsLoggedIn= {setIsLoggedIn}/>} />
            <Route path="/BookingInfo" element={<BookingInfo user={user} setUser={setUser} />} /> 
            <Route path="/booking" element={<BookingPage user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />} /> 
            <Route path="/messenger" element={<Messenger user={user} setUser={setUser} currentChat={currentChat} setCurrentChat={setCurrentChat} setIsLoggedIn={setIsLoggedIn}/>}></Route>
            <Route path="/createtrip" element={<PublishTrip user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn}/>}/>
            <Route path='/search' element={<Search user={user} setIsLoggedIn={setIsLoggedIn} />}/>
            <Route path="/mybooking" element={<Rider user={user} setCurrentChat={setCurrentChat} currentChat={currentChat} setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path="/myrides" element={<DriverRides user={user} setIsLoggedIn={setIsLoggedIn} currentChat={currentChat} setCurrentChat={setCurrentChat}/>} />
            <Route path="/inbox" element={<Inbox user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn}/>} />
    
          <Route path="*" element={<p>ERROR 404</p>}/>
        </Routes>
      </BrowserRouter>
    </> 
  );
}

export default App;