import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import { useState, useEffect } from 'react';
import { ContactUs } from './pages/ContactUs/contact.jsx';


function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;