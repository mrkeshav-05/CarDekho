import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar/Navbar.jsx";
import BookCard from "../../../components/Cards/book.jsx";
import axios from "axios";
import styled from "styled-components";
import { LinearProgress } from "@mui/material";

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #171717;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  margin-top: 2rem;
  color: #171717;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px; /* Adjust the gap between grid items */
`;

function Rider({ user, setCurrentChat, currentChat, setIsLoggedIn }) {
  const [bookings, setBookings] = useState([]);
  const [driverNames, setDriverNames] = useState({});
  const [driverPhones, setDriverPhones] = useState({});
  const [driver,setDriver] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDriverNames = async () => {
      const names = {};
      const phones = {};
      const driverid={};
      await Promise.all(
        bookings.map(async (booking) => {
          try {
            const res = await axios.get(
              `https://car-saathi.onrender.com/api/user/getUser/${booking.Driver}`
            );
            names[booking._id] = res.data.user.name;
            phones[booking._id] = res.data.user.phone;
            driverid[booking._id] = res.data.user._id;
          } catch (err) {
            console.error(err);
            names[booking._id] = '';
            phones[booking._id] = '';
            driverid[booking._id]= '';
          }
        })
      );
      setDriverNames(names);
      setDriverPhones(phones);
      setDriver(driverid);
    };

    fetchDriverNames();
  }, [bookings]);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await axios.get(
          `https://car-saathi.onrender.com/api/booking/mybookings/${user._id}`
        );
        console.log(response);
        console.log(response.data)
        setBookings(response.data.book);
        setIsLoading(false)
      } catch (err) {
        if (err.response && err.response.status === 400) {
          return;
        }
        if (err.response) {
          console.log(err);
        } else {
          console.log(err);
        }
      }
    };

    getBookings();
  }, []);
  const pastBooking = bookings.filter((book)=>{
    const bookDate = new Date(book.Date);
    return bookDate <= new Date();
  });

  const upcomingBooking = bookings.filter((book) => {
    const bookDate = new Date(book.Date);
    return bookDate > new Date();
  })

  const handleDeleteBooking = async (bookingId) => {
    try {
        await axios.delete(`https://car-saathi.onrender.com/api/booking/cancelbooking/${bookingId}`);
        // Update bookings state after successful deletion
        setBookings(bookings.filter(booking => booking._id !== bookingId));
    } catch (error) {
        console.error('Error deleting booking:', error);
    }
};

  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      {isLoading ? (
        <>
        <Navbar user={user} setIsLoggedIn={setIsLoggedIn} />
        <p><LinearProgress/></p>
        </>
      ) : (
        <>
          <Navbar user={user} setIsLoggedIn={setIsLoggedIn} />
          <div className="mx-auto px-8 py-8">
            <Title>Your Bookings</Title>

            <SectionTitle>Upcoming Bookings :</SectionTitle>
            {upcomingBooking.length===0 && <p className="text-slate-400 p-1">You have no upcoming bookings</p>}
            <GridContainer>
              {upcomingBooking.map((booking) => (
                <BookCard
                  key={booking._id}
                  driverid={driver[booking._id]}
                  booking={booking}
                  name={driverNames[booking._id] || ""}
                  phone={driverPhones[booking._id] || ""}
                  setCurrentChat={setCurrentChat}
                  currentChat={currentChat}
                  handleDeleteBooking={handleDeleteBooking}
                />
              ))}
            </GridContainer>

            <SectionTitle>Past Bookings :</SectionTitle>
            {pastBooking.length===0 && <p className="text-slate-400 p-1">You have no past bookings yet</p>}
            <GridContainer>
              {pastBooking.map((booking) => (
                <BookCard
                  key={booking._id}
                  driverid={driver[booking._id]}
                  booking={booking}
                  name={driverNames[booking._id] || ""}
                  phone={driverPhones[booking._id] || ""}
                  setCurrentChat={setCurrentChat}
                  currentChat={currentChat}
                />
              ))}
            </GridContainer>
          </div>
        </>
      )}
    </div>
  );
}

export default Rider;
