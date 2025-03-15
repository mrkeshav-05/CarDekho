import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import { useState, useEffect } from "react";

interface User {
  _id?: string;
  name?: string;
  email?: string;
}

const tempUser: User = {
  _id: "12345",
  name: "John Doe",
  email: "johndoe@example.com",
};

const App: React.FC = () => {
  const [user, setUser] = useState<User>(
    JSON.parse(localStorage.getItem("user") || JSON.stringify(tempUser))
  );
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!user._id);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    setIsLoggedIn(!!user._id);
  }, [user]);

  return (
    <BrowserRouter>
      <Routes>
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
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;