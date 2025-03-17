import React from 'react'
import Hero from '../../components/Hero/Hero.jsx'
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';
function Dashboard ({user,setUser,setIsLoggedIn}){
  return (
    <>
    <Navbar user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn}/>
    <Hero/>
    <Footer/>
    </>
  )
}
export default Dashboard