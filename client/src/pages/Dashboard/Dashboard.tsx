import React from "react";
import Hero from "../../Components/Hero/Hero";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

interface DashboardProps {
  user: any; // Change 'any' to a proper user type if available
  setUser: React.Dispatch<React.SetStateAction<any>>; // Update type accordingly
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dashboard: React.FC<DashboardProps> = ({ user, setUser, setIsLoggedIn }) => {
  return (
    <>
      <Navbar user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
      <Hero />
      <Footer />
    </>
  );
};

export default Dashboard;