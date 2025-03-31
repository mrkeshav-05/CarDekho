import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import "./book.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

function BookingPage({ user, setUser, setIsLoggedIn }) {
  const [seatsToBook, setSeatsToBook] = useState();
  const [seatPreference, setSeatPreference] = useState("");
  const [remarks, setRemarks] = useState("");
  const state = useLocation();
  const { trip } = state.state || {};
  const navigate = useNavigate();

  const handleSeatsToBookChange = (e) => {
    setSeatsToBook(e.target.value);
  };

  const handleSeatPreferenceChange = (e) => {
    setSeatPreference(e.target.value);
  };

  const handleRemarksChange = (e) => {
    setRemarks(e.target.value);
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const bookingConfirm = async (di, order, signature) => {
    const data = {
      Driver: trip.driver,
      Bookingperson: user,
      trip: trip._id,
      NoofBookedSeats: seatsToBook,
      source: trip.source,
      destination: trip.destination,
      Date: trip.time,
      fare: trip.fare,
      PaymentMethod: `Online- Card /UPI /Net Banking`,
      Payment_id: di,
      Payment_order_id: order,
      Payment_signature: signature,
      Remark: remarks,
    };

    try {
      const response = await axios.post(`${backendUrl}/api/booking/booktrip`, data);
      navigate("/mybooking");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert("Not enough seats");
      } else {
        console.error(err);
      }
    }
  };

  const initiatePayment = async () => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert("Failed to load Razorpay SDK. Please check your connection.");
      return;
    }

    if (trip.availableSeats - seatsToBook < 0) {
      alert("Not enough seats");
      return;
    }

    const body2 = {
      amount: seatsToBook * trip.fare , // Razorpay expects amount in paise
      currency: "INR",
    };

    try {
      const res = await axios.post(`${backendUrl}/api/payment/create-order`, body2);
      const { orderId, amount } = res.data;

      const options = {
        key: "rzp_test_i44QxKNFFcOiCg", // Your Razorpay test key
        amount: amount,
        currency: "INR",
        name: "CarPool",
        description: "Payment for CarPooling Booking",
        order_id: orderId,
        handler: function (response) {
          bookingConfirm(
            response.razorpay_payment_id,
            response.razorpay_order_id,
            response.razorpay_signature
          );
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone,
        },
        notes: {
          address: "Customer Address",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert("Payment failed. Please try again.");
      });

      rzp1.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <div className="booking-page relative">
      {/* Navbar */}
      <Navbar user={user} setIsLoggedIn={setIsLoggedIn} />

      {/* Background Image (Below Navbar) */}
      <div className="absolute top-[10px] bottom-0 left-30 right-30 h-full mx-15 bg-center bg-no-repeat bg-cover opacity-30 -z-10 rounded-2xl bg-[url('https://img.freepik.com/free-photo/online-payment-security-concept-3d-phone-bill_107791-16722.jpg?t=st=1743356421~exp=1743360021~hmac=23c31ebd539fa501cc7ed8f3ebfa44112c74f8ebf6fb0b8eb024fd8cbdc5712e&w=1800')]"></div>      {/* Content */}
      <div className="booking-container bg-transparent bg-opacity-10 p-6">
        {/* Booking Container (Unchanged) */}
      {/* Booking Container */}
<div className="booking-container  bg-amber-100">
  <h2 className="text-2xl font-bold text-black mb-4 text-center">
    🎟 Book Your Seats
  </h2>

  {/* Seats Input */}
  <div className="input-group mb-4">
    <label htmlFor="seatsToBook" className="text-black block font-medium">
      Seats To Book:
    </label>
    <input
      type="number"
      id="seatsToBook"
      value={seatsToBook}
      min="0"
      onChange={(e) => {
        const value = Math.max(0, parseInt(e.target.value) || 0); 
        handleSeatsToBookChange({ target: { value } });
      }}
      className="w-full px-4 py-2 rounded-lg bg-blue-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
    />
  </div>

  {/* Seat Preference */}
  <div className="input-group mb-4">
    <label htmlFor="seatPreference" className="text-black block font-medium">
      Seat Preference:
    </label>
    <select
      id="seatPreference"
      value={seatPreference}
      onChange={handleSeatPreferenceChange}
      className="w-full px-4 py-2 rounded-lg bg-blue-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
    >
      <option value="">Select Preference</option>
      <option value="front">Front</option>
      <option value="back">Back</option>
      <option value="middle">Middle</option>
      <option value="rightWindow">Right Side Window</option>
      <option value="leftWindow">Left Side Window</option>
    </select>
  </div>

  {/* Remarks */}
  <div className="input-group mb-4">
    <label htmlFor="remarks" className="text-black block font-medium">
      Any Other Remarks:
    </label>
    <input
      type="text"
      id="remarks"
      value={remarks}
      onChange={handleRemarksChange}
      className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
    />
  </div>

  {/* Payment Button */}
  <button
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
    onClick={initiatePayment}
  >
    Proceed to Payment 💳
  </button>
</div>
      </div>
    </div>
  );
}

export default BookingPage;
