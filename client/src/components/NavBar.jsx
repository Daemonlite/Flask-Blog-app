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
    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Dark offcanvas</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/post/create">Create Post</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">Link</a>
          </li>
         {!user ? ( <li className="nav-item">
            <a className="nav-link" href="/login">Login</a>
          </li>):(   <li className="nav-item">
            <Button variant='contained' className='nav-link' onClick={()=>logout()}>Logout</Button>
          </li>)}
       
        </ul>
     
      </div>
    </div>
  </div>
</nav>
    </div>
  )
}

export default NavBar