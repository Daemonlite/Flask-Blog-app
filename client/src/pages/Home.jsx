import {useEffect,useState} from 'react'
import axios from 'axios'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const Home = () => {
const [posts,setPost] = useState([])

useEffect(()=>{
axios.get('http://127.0.0.1:5000/posts')
.then((res)=>setPost(res.data.posts))
.catch((err)=>console.log(err))

},[])

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
  <Button size="small">{res.comments.length} comments</Button>
  <Button size="small">Learn More</Button>
</CardActions>
</Card>
)}
</div>
    </div>
  )
}

export default Home