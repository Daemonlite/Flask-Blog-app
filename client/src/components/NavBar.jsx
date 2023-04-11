import { Button } from '@mui/material'
import {useNavigate} from 'react-router-dom'

const NavBar = () => {
    const user = JSON.parse(localStorage.getItem("userInfo"))
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("userInfo")
        navigate('/login')
    }
  return (
    <div>
        <nav className="navbar navbar-dark bg-dark fixed-top">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Flask Blog App</a>
{user &&     <ul className="links">
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/post/create">Create Post</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/trending">Trending posts</a>
          </li>
        </ul>}
        <ul className='buts'>
        {!user ? ( <li className="nav-item">
            <a className="nav-link" href="/login">Login</a>
          </li>):(   <li className="nav-item">
            <Button variant='contained' className='nav-link' onClick={()=>logout()}>Logout</Button>
          </li>)}
        </ul>
  
  </div>
</nav>
    </div>
  )
}

export default NavBar