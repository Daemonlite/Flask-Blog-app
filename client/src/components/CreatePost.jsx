import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import {useState } from 'react'
import { Button } from '@mui/material';
const CreatePost = () => {
    const [title,setTitle] = useState("")
    const [content,setContent] = useState("")
    const user = localStorage.getItem("userInfo")
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
    >
      <TextField
        hiddenLabel
        id="filled-hidden-label-small"
        variant="filled"
        size="small"
        label='enter post title'
      />
      <textarea
        style={{height:"250px"}}
        className='form-control'
        placeholder='enter post body'
      />

      <Button variant='contained'>Post</Button>
    </Stack>
    
    </div>
  )
}

export default CreatePost