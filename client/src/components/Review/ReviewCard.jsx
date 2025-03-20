import React,{useState,useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Rating } from '@mui/material';
import OptionsPopover from '../OptionsPopover';
import { useParams } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
// import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24,

  p: 4,
};

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({data,review,setOpenSnack,setOpenEditSnack}) {
  const [expanded, setExpanded] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(review.Rating);
  const [comment, setComment] = useState(review.Comment);
  const params = useParams()

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleEdit = async() => {
    // Handle edit functionality
    try{
      const newreview = {
        _id: review._id,
        Reviewer: review.Reviewer,
        ReviewedUser: review.ReviewedUser,
        ReviewerName: review.ReviewerName,
        Rating: rating,
        Comment: comment,
        Date: review.Date
    }
      console.log("edited review input",review)
      const res = await axios.patch(`https://car-saathi.onrender.com/api/reviews/editReview/${params.id}`,{editedReview:newreview});
      console.log(res.data);
      setOpenEditSnack(true)
      handleClose();

    }catch(err){
      console.log(err)
    }

};

const handleDelete = async() => {
    // Handle delete functionality
    try{
      const res = await axios.delete(`https://car-saathi.onrender.com/api/reviews/deleteReview/${params.id}/${review._id}`);
      console.log(res.data);
      setOpenSnack(true)


    }catch(err){
      console.log(err)
    }
};

  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* If review card is not about the currently logged in person */}
     { data._id != review.ReviewedUser && (<CardHeader
        avatar={
          <Avatar 
          src={`https://ui-avatars.com/api/?name=${review?.ReviewerName}&background=random`}
          >
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            {/* <MoreVertIcon /> */}
            <OptionsPopover onEdit={handleEdit} onDelete={handleDelete} handleModalOpen={handleOpen}/>
          </IconButton>
        }
        title={review?.ReviewerName}
        subheader={review?.Date.slice(0,10)}
      />)
      }
      {/* If it is about the currently logged in person */}
      {
        data._id == review.ReviewedUser && (
         <CardHeader
         avatar={
           <Avatar 
           src={`https://ui-avatars.com/api/?name=${review?.ReviewerName}&background=random`}
           >
           </Avatar>
         }
         title={review?.ReviewerName}
         subheader={review?.Date.slice(0,10)}
       />
        )
      }

      {/* <CardContent> */}
      <div className='mx-5'>
      <Rating name="read-only" value={review.Rating} precision={0.5} readOnly/>
        <Typography variant="body2" color="text.secondary" className='px-1 pb-2'>
           {review?.Comment}
        </Typography>
      </div>
      {/* </CardContent> */}
      <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Typography component="legend" variant="subtitle1">Edit your review</Typography>
                    <div className='flex flex-col justify-around'>
                    <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={(event, newValue) => {
                        setRating(newValue);
                        }}
                        className='mb-4 mt-2'
                        aria-required
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Review"
                        multiline
                        rows={4}
                        className='my-2'
                        value={comment}
                        onChange={(e) => {
                        setComment(e.target.value);
                        }}

                    />

                    </div>
                    <div className='flex justify-end mt-4'>
                    <Button variant='outlined' size="large" onClick={handleEdit}>Edit Review</Button>
                    </div>
                    
                    </Box>
                </Modal>
    </Card>
    
  );
}