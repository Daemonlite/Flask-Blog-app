import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import {useState } from 'react'
import { Button } from '@mui/material';
import axios from 'axios'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [title,setTitle] = useState("")
    const [content,setContent] = useState("")
    const User = JSON.parse(localStorage.getItem("userInfo"))
    const navigate = useNavigate();
    const  id = User.user.id

    const handlesubmit = (e) => {
      e.preventDefault()
        axios.post('http://127.0.0.1:5000/posts/create',{
            title,
            content,
            user_id:id
        })
        .then((res)=>{
            console.log(res.data)
            toast.success('post created')
            navigate('/')
        })
        .catch((err)=>console.log(err))
    }


  return (
    <div style={{marginTop:"100px"}}>
<h2 style={{textAlign:"center"}}> CreatePost</h2>

<Stack
      component="form"
      sx={{
        width: '45ch',
      }}
      spacing={2}
      noValidate
      autoComplete="off"
      className='form-group fis'
      onSubmit={handlesubmit}
    >
      <TextField
        hiddenLabel
        id="filled-hidden-label-small"
        variant="filled"
        size="small"
        label='enter post title'
        onChange={(e)=>setTitle(e.target.value)}
      />
      <textarea
        style={{height:"250px"}}
        className='form-control'
        placeholder='enter post body'
        onChange={(e)=>setContent(e.target.value)}
      />

      <Button variant='contained' type='submit'>Post</Button>
    </Stack>
    
    </div>
  )
}

export default CreatePost