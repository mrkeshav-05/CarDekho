import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const BookCard = ({
  booking,
  onDelete,
  driverid,
  name,
  phone,
  setCurrentChat,
  currentChat,
  handleDeleteBooking
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [refundOpen, setRefundOpen] = useState(false);
  const handleRefundOpen = () => setRefundOpen(true);
  const handleRefundClose = () => {
    setRefundOpen(false);
    handleClose();
    handleDelete();
  };
  const handleRefundCloseCancel = () => {
    setRefundOpen(false);
    handleClose();
  };
  const [per, setRefundPercentage] = useState(1);
  const [refund, setRefund] = useState(booking.fare * per);
  
  
  useEffect(() => {
    const today = new Date();
    const bookingDate = new Date(booking.Date);

    // Calculate the difference in days between today and the booking date
    const differenceInTime = bookingDate.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    
    // Set the refund percentage based on the difference in days
    if (differenceInDays >= 2) {
      setRefundPercentage(0.95);
    } else if (differenceInDays === 1) {
      setRefundPercentage(0.45);
    } else if (differenceInDays <= 0) {
      setRefundPercentage(0);
    }
    setRefund(booking.fare * per);
  }, [booking.Date, per]);

  const today = new Date();
  const bookDate = new Date(booking.Date);
  const textColorClass = bookDate < today ? 'text-red-900' : 'text-green-900';
  const navigate = useNavigate();
  
  const handleMessageClick = () => {
    const getConversation = async () => {
      try {
        const res = await axios.get(
          "https://car-saathi.onrender.com/api/conversation/getConversation/" +
            booking.Bookingperson
        );
        let conversations = res.data;

        // Find if conversation with the driver already exists
        let chatExists = conversations?.find((conversation) =>
          conversation.members.includes(booking.Driver)
        );

        if (chatExists) {
          setCurrentChat(chatExists);
          if (currentChat) {
            navigate("/messenger");
          }
        } else {
          const res = await axios.post(
            "https://car-saathi.onrender.com/api/conversation/",
            { senderId: booking.Bookingperson, receiverId: booking.Driver }
          );
          setCurrentChat(res.data);
          navigate("/messenger");
        }
      } catch (err) {
        console.log(err);
      }
    };
    getConversation();
  };

  const userProfile = () => {
    navigate(`/profile/${driverid}`);
  };

  const handleDelete = async () => {
    try {
      // await onDelete(booking._id);
      handleDeleteBooking(booking._id)
      toast.success("Booking removed successfully!");
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`border border-gray-300 rounded-lg p-6 transition-transform duration-500 ease-in-out transform hover:scale-105 ${textColorClass}`}
      style={{
        backgroundColor: "#f2f2f2",
        color: "#ffffff",
        padding: "20px",
        borderRadius: "10px",
        // marginBottom: "20px",
      }}
    >
    <div className="flex flex-col justify-between h-full">
      <div className="flex justify-between items-center">
        <div style={{ textAlign: "left", width: "100%" }}>
          <Typography
            variant="h5"
            className="font-bold text-gray-800"
            style={{ marginBottom: "16px" }}
          >
            Journey: {booking.source} to {booking.destination}
          </Typography>

          <Typography
            // variant="h6"
            className="text-gray-800"
            style={{ marginBottom: "5px" }}
          >
            Date of Travel:{" "}
            {new Date(booking.Date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Typography>

          <Typography
            // variant="h6"
            className="text-gray-800"
            style={{ marginBottom: "5px" }}
          >
            Fare Charges: ${booking.fare}
          </Typography>
          
        </div>
      </div>
      {/* <div className="flex justify-between items-center mb-3"> */}
        <div style={{ textAlign: "left", width: "50%" }}>
          <Typography 
          // variant="h6" 
          className="text-gray-800"
          style={{ marginBottom: "5px" }}
          
          >
            Driver Name: {name}
          </Typography>
        {/* </div> */}
      </div>
      <div className="flex justify-between items-center">
        <div style={{ textAlign: "left", width: "80%" }}>
          <Typography 
          // variant="h6" 
          className="text-gray-800"
          style={{ marginBottom: "5px" }}
          >
            Seats Booked: {booking.NoofBookedSeats}
          </Typography>
        </div>
      </div>

      <div className="flex justify-between space-x-2">
        <Button
          variant="outlined"
          color="primary"
          onClick={userProfile}
          style={{ flex: 1 }}
        >
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          View Profile
        </Button>
       {/* {(new Date() >= booking.Date) &&  
       (<Button
          variant="contained"
          color="error"
          onClick={handleOpen}
          style={{ flex: 1 }}
        >
          Cancel Booking
        </Button>)} */}
  <Button
    variant="contained"
    color="error"
    onClick={handleOpen}
    style={{ flex: 1 }}
  >
    Cancel Booking
  </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleMessageClick}
          style={{ flex: 1 }}
        >
          Message Driver
        </Button>
      </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ textAlign: "center", color: "red" }}
          >
            Confirm Cancellation?
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, textAlign: "center" }}
          >
            Are you sure you want to cancel/delete this booking?
          </Typography>
          <div className="flex justify-center mt-4" style={{ gap: "16px" }}>
            <Button
              variant="outlined"
              color="success"
              size="large"
              onClick={handleRefundOpen}
            >
              Yes
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="large"
              onClick={handleClose}
            >
              No
            </Button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={refundOpen}
        onClose={handleRefundClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md"
            style={{ backgroundColor: "#c5e1a5", color: "#000000" }}
          >
            <Typography
              variant="h6"
              className="font-semibold mb-4"
              style={{ textAlign: "center", color: "#ffeb3b" }}
            >
              Cancellation Policy
            </Typography>
            <ul className="list-disc pl-6 text-sm">
              <li className="mb-2">
                Cancellation made 2 or more days in advance: Full refund of the
                booking amount.
              </li>
              <li className="mb-2">
                Cancellation made 1 day in advance: 50% refund of the booking
                amount.
              </li>
              <li className="mb-2">
                Cancellation made on the same day: No refund will be provided.
              </li>
            </ul>
            <Typography variant="body2" className="mt-4">
              Please note that the refund processing times may vary depending on
              your payment method and financial institution.
            </Typography>
            <Typography variant="body2" className="mt-4">
              For any questions or assistance regarding cancellations, please
              contact our customer support team.
            </Typography>
            <Typography variant="body2" className="mt-4 font-bold">
              Your refund amount is ${refund}
            </Typography>
            <div className="flex justify-center mt-4">
              <Button
                variant="outlined"
                color="success"
                size="large"
                onClick={handleRefundClose}
              >
                Yes
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="large"
                onClick={handleRefundCloseCancel}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      <ToastContainer draggablePercent={60} autoClose={false} />
    </div>
  );
};

export default BookCard;
