import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar.jsx";
import ReviewCard from "../../components/Review/ReviewCard.jsx";
import Avatar from "@mui/material/Avatar";
import "./Profile.css"; // Import your CSS file
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { v4 as uuidv4 } from "uuid";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

const Profile = ({ user, setUser, setIsLoggedIn }) => {
  const params = useParams();
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [profileRating, setProfileRating] = useState(0);
  const [reviews, setReviews] = useState(null);
  const [openSnack, setOpenSnack] = useState(false);
  const [openEditSnack, setOpenEditSnack] = useState(false);
  const [newPhoto, setNewPhoto] = useState(null);
  const [flag,setflag]=useState(false)

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `https://car-saathi.onrender.com/api/user/getUser/${params.id}`
        );
        setData(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };

    const getRating = async () => {
      try {
        const res = await axios.get(
          `https://car-saathi.onrender.com/api/reviews/getRating/${params.id}`
        );
        setProfileRating(res.data.rating);
      } catch (err) {
        console.log(err);
      }
    };

    const getReviews = async () => {
      try {
        const res = await axios.get(
          `https://car-saathi.onrender.com/api/reviews/getReviews/${params.id}`
        );
        // console.log(res.data)
        setReviews(res.data.reviews);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
    getRating();
    getReviews();
  }, [params.id,flag]);

  const handleSubmit = async () => {
    try {
      const review = {
        _id: uuidv4(),
        Reviewer: user._id,
        ReviewedUser: params.id,
        ReviewerName: user.name,
        Rating: rating,
        Comment: comment,
        Date: new Date(),
      };
      const res = await axios.post(
        `https://car-saathi.onrender.com/api/reviews/addReview/${params.id}`,
        review
      );
      setflag((p)=>!(p))
      setComment("");
      setRating(0);
      handleClose();
      toast.success("Review added successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };
  const handleCloseEditSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenEditSnack(false);
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnack}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  const actionedit = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseEditSnack}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setNewPhoto(file);
  };

  const handlePhotoUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("photo", newPhoto);
      await axios.post(
        `https://car-saathi.onrender.com/api/user/updatePhoto/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar user={user} setIsLoggedIn={setIsLoggedIn} />
      <div className="p-20 backg">
        <div className=" p-6 rounded-md bg-white bg-opacity-30 z-20 text-[#171717]">
        <div className="flex w-full justify-between">
          <div className=" p-4 ">
              <div className="font-bold text-lg">{data?.username}</div>
              <div className="">Name: {data?.name}</div>
              <div className="email">Email: {data?.email}</div>
              <div className="age">Age: {data?.age}</div>
              <div className="location">Location: {data?.location}</div>
              <div className="gender">Gender: {data?.gender}</div>
          </div>
          <div className=" flex flex-col p-10"> 
          <label htmlFor="photo-upload" className="">
            <input
              type="file"
              id="photo-upload"
              accept="image/*"
              onChange={handlePhotoChange}
              style={{ display: "none" }}
            />
            <Avatar src={`https://ui-avatars.com/api/?name=${data?.name}&background=random`} sx={{ width: 60, height: 60 }} className="avatar" />
          </label>
          <div className="p-4 text-center">{Math.round(profileRating * 100) / 100}⭐</div>
          </div>

        </div>

        <div className=""></div>
        <div className="">
          <div className="w-1/2 float-left mr-4">
          </div>
            <div className="p-4">
                        <div className="font-bold text-xl">Reviews</div>
                      { user._id!=params.id && <button onClick={handleOpen} className="bg-[#1976d2] text-[#f2f2f2] p-2 rounded-md my-2">Add review</button>}
                      <div className="grid grid-cols-3 gap-3 mt-3">
                        {
                            reviews?.map(review=>{
                                return (
                                    <div className="review-card">
                                       <ReviewCard review={review} setOpenSnack={setOpenSnack} setOpenEditSnack={setOpenEditSnack} data={data}/>
                                    </div>
                                )
                            })
                        }

                        {reviews?.length==0 && <div className="text-slate-400">No reviews yet</div>}
                        </div>
                        
                    </div>
        </div>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography component="legend" variant="subtitle1">
              How is {data.name} as a driver/rider? Leave a review!
            </Typography>
            <div className="flex flex-col justify-around">
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
                className="mb-4 mt-2"
                aria-required
              />
              <TextField
                id="outlined-multiline-static"
                label="Review"
                multiline
                rows={4}
                className="my-2"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
            </div>
            <div className="flex justify-end mt-5">
              <Button onClick={handleSubmit} color="primary" variant="contained" >
                Add Review
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
      <ToastContainer />
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        action={action}
        onClose={handleCloseSnack}
        message="Review deleted"
      />
      <Snackbar
        open={openEditSnack}
        autoHideDuration={6000}
        action={actionedit}
        onClose={handleCloseEditSnack}
        message="Review edited"
      />
    </div>
  );
};

export default Profile;