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
.then((res)=>setPost(res.data))
.catch((err)=>console.log(err))

},[])

  return (
    <div>

    </div>
  )
}

export default Home