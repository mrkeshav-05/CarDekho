// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Dashboard from './pages/Dashboard/Dashboard.jsx';
// import { useState, useEffect } from 'react';
// import { ContactUs } from './pages/ContactUs/contact.jsx';
// import PublishTrip from './pages/PublishTrip/PublishTrip.jsx';


// function App() {
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     localStorage.setItem("user", JSON.stringify(user));
//     if (user) {
//       setIsLoggedIn(true);
//     }
//   }, [user]);

//   return (
//     <BrowserRouter>
//       <Routes>
//       <Route path="/contactus" element={<ContactUs user={user} setIsLoggedIn={setIsLoggedIn} />} />
//       <Route path="/" element={<Dashboard user={user} setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
//       <Route path="/createtrip" element={<PublishTrip user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn}/>}/>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import { useState, useEffect } from "react";
import { ContactUs } from "./pages/ContactUs/contact.jsx";
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Dashboard from './pages/Dashboard/Dashboard.jsx';
// import { useState, useEffect } from 'react';
// import { ContactUs } from './pages/ContactUs/contact.jsx';
import PublishTrip from './pages/PublishTrip/PublishTrip.jsx';

import DriverRides from "./components/Rides/Driver/DriverRides.jsx";
import Rider from "./components/Rides/Rider/Rider.jsx";
import BookingPage from "./pages/booking/book.jsx";
import DriverInfoPage from "./pages/BookingInfo/info.jsx";


function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentChat,setCurrentChat] = useState(null);
  // const [isLoggedIn,setIsLoggedIn] = useState(false)

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/contactus" element={<ContactUs user={user} setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/" element={<Dashboard user={user} setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/createtrip" element={<PublishTrip user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn}/>}/>
      <Route path="/BookingInfo" element={<DriverInfoPage user={user} setUser={setUser} />} /> 
            <Route path="/booking" element={<BookingPage user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />} /> 
           
        {/* <Route
          path="/contactus"
          element={<ContactUs user={user} setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/"
          element={
            <Dashboard
              user={user}
              setUser={setUser}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        /> */}
        <Route
          path="/mybooking"
          element={
            <Rider
              user={user}
              setCurrentChat={setCurrentChat}
              currentChat={currentChat}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route
          path="/myrides"
          element={
            <DriverRides
              user={user}
              setIsLoggedIn={setIsLoggedIn}
              currentChat={currentChat}
              setCurrentChat={setCurrentChat}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
