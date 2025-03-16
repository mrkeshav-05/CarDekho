import React from "react";
import Hero from "../../Components/Hero/Hero";
import Navbar from "../../Components/Navbar/NavBar";
import Footer from "../../Components/Footer/Footer";
import Analytic from "../../Components/Analytics/Analytic";
import Analytic2 from "../../Components/Analytics/Analytics2";

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
      <Analytic2 />
      <Analytic />
      <Footer />
    </>
  );
};

export default Dashboard;