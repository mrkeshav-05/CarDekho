import React, {  useState } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import "./book.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

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
      const response = await axios.post('/api/booking/booktrip', data);
      navigate('/mybooking');
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
      amount: seatsToBook * trip.fare * 100, // Razorpay expects amount in paise
      currency: "INR",
    };

    try {
      const res = await axios.post(
        "/api/payment/create-order",
        body2
      );
      const { orderId, amount } = res.data;

      const options = {
        key: "rzp_test_i44QxKNFFcOiCg", // Your Razorpay test key
        amount: amount,
        currency: "INR",
        name: "Car-Saathi",
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
    <div
      className="booking-page"
      style={{
        backgroundImage: `url('https://cdn.pixabay.com/photo/2014/04/27/00/43/traffic-332857_1280.jpg')`,
      }}
    >
      <Navbar user={user} setIsLoggedIn={setIsLoggedIn} />
      <div className="booking-container">
        <div className="input-group">
          <label htmlFor="seatsToBook">Seats To Book:</label>
          <input
            type="number"
            id="seatsToBook"
            value={seatsToBook}
            onChange={handleSeatsToBookChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="seatPreference">Seat Preference:</label>
          <select
            id="seatPreference"
            value={seatPreference}
            onChange={handleSeatPreferenceChange}
          >
            <option value="">Select Preference</option>
            <option value="front">Front</option>
            <option value="back">Back</option>
            <option value="middle">Middle</option>
            <option value="rightWindow">Right Side Window</option>
            <option value="leftWindow">Left Side Window</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="remarks">Any Other Remarks:</label>
          <input
            type="text"
            id="remarks"
            value={remarks}
            onChange={handleRemarksChange}
          />
        </div>
        <button className="proceed-payment-btn" onClick={initiatePayment}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

export default BookingPage;
