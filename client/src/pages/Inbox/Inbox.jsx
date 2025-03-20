import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import axios from "axios";

const Inbox = ({ user, setUser,setIsLoggedIn }) => {
  const [notifications, setNotifications] = useState([]);
  const [inboxuser, setInboxUser] = useState({});
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const getBookings = async () => {
        try{
          const data = { userId: user._id }; // Pass user ID as an object with userId property
    console.log(user._id);
    const response = await axios.post('https://car-saathi.onrender.com/api/notifications/booknotify', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
          console.log('response is sent')
          console.log(response.data);
        }catch(err){
          console.log(err)
        }
      }
    getBookings();
  }, []);

  useEffect(()=>{
    const getNotifications = async()=>{
      try{
        const res = await axios.get(`https://car-saathi.onrender.com/api/notifications/getnotifications/${user._id}`)
        console.log(res.data.notifications);
        setNotifications(res.data.notifications)
      }
      catch(e){
        console.log(e);
      }
    }
    getNotifications() 
  },[])
  console.log(notifications)

  return (
    <div className=" min-h-screen">
      <Navbar user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
      <div className="font-extrabold text-5xl mx-4 mt-4 underline underline-offset-8 text-[#171717]">
        Inbox
      </div>
      <div className="mt-8 mx-4">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div key={index} className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md mb-2">
              <span className="font-bold">New booking:</span> {notification.content}
            </div>
          ))
        ) : (
          <div className="bg-[#cae7da] border border-[#cdf6e3] text-[#f0f0f0] dark:text-[#121212] px-4 py-2 rounded-md shadow-lg">
            No notifications yet
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;
