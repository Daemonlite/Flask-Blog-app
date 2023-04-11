import {useEffect,useState} from 'react'
import axios from 'axios'

const Home = () => {
const [posts,setPost] = useState([])

useEffect(()=>{
axios.get('http://127.0.0.1:5000/posts')
.then((res)=>console.log(res.data))
.catch((err)=>console.log(err))

},[posts])

  return (
    <div>

    </div>
  )
}

export default Home