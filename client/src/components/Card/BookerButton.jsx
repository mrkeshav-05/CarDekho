import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function BookerButton({user,curruser,currentChat,setCurrentChat}) {
    console.log(curruser)
    console.log("BookerButton props:", { setCurrentChat, currentChat });
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMessageClick = () => {
    const getConversation = async () => {
      try {
        const res = await axios.get(
          `${backendUrl}/api/conversation/getConversation/` +
            user._id
        );
        let conversations = res.data;
        console.log(res.data)

        let chatExists = conversations?.find((conversation) =>
          conversation.members.includes(curruser)
        );

        if (chatExists) {
            console.log("chatexists",chatExists)
          setCurrentChat(chatExists);
          if (currentChat) {
            navigate("/messenger");
          }
        } else {
          const res = await axios.post(
            `${backendUrl}/api/conversation/`,
            { senderId: curruser, receiverId: user._id }
          );
          console.log(res.data)
          setCurrentChat(res.data);
    console.log(currentChat)

          navigate("/messenger");
        }
      } catch (err) {
        console.log(err);
      }
    };
    getConversation();
  };
  console.log(currentChat)

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {user.name}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>navigate(`/profile/${user._id}`)}>View Profile</MenuItem>
        <MenuItem onClick={handleMessageClick}>Message</MenuItem>
      </Menu>
    </div>
  );
}