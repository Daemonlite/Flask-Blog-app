import {useEffect,useState} from 'react'
import axios from 'axios'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useNavigate } from 'react-router-dom';


const Home = () => {
const [posts,setPost] = useState([])
const navigate = useNavigate()
const user = JSON.parse(localStorage.getItem("userInfo"))
useEffect(()=>{
axios.get('http://127.0.0.1:5000/posts')
.then((res)=>setPost(res.data.posts))
.catch((err)=>console.log(err))

},[])

if(!user){
  navigate('/login')
}
  return (
    <div>
<div>
{posts.map((res)=>

<Card sx={{ maxWidth: 545,marginTop:"100px",display:"flex",flexDirection:"column",flexWrap:"wrap",marginLeft:"370px" }}>

<CardContent>
  <Typography gutterBottom variant="h5" component="div">
    {res.title}
  </Typography>
  <Typography gutterBottom variant="h6" component="div">
    {res.created_at}
  </Typography>
  <Typography variant="body2" color="text.secondary">
   {res.content}
  </Typography>
</CardContent>
<CardActions>
<IconButton aria-label="add to favorites">
 {res.likes.length} <FavoriteIcon />
</IconButton>
  <IconButton aria-label="add to favorites">
  {res.comments.length} <ChatBubbleOutlineIcon/>
</IconButton>
</CardActions>
</Card>
)}
</div>
    </div>
  )
}

export default Home