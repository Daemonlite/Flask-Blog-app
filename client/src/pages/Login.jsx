import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useState,useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode'
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");


  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login/", {
        email,
        password,
      })
      .then((res) => {
        toast.success("login successful");
        if (res.data) {
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          navigate("/");
        }
        setpassword("");
        setEmail("");
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID Token : ",response.credential)
    var userObject = jwt_decode(response.credential)
    console.log(userObject)
    const Password = `${userObject.given_name}wegvfejwy1@`
    // Use the decoded JWT ID token to log the user in
    axios
      .post("http://localhost:5000/login/", {
        email: userObject.email,
        password: Password,
      })
      .then((res) => {
        toast.success("login successful");
        if (res.data) {
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          navigate("/");
        }
        setpassword("");
        setEmail("");
      })
      .catch((err) => {
       toast.error("Login failed check credentials");
      });
  }
  

  useEffect(()=>{
    /* global google */
    google.accounts.id.initialize({
      client_id : '224073338639-us7klguo2oge970dmf953r2s79kvtt6n.apps.googleusercontent.com',
      callback:handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme:"outline",size:"large"}
    )

    
  },[])
  google.accounts.id.prompt()
 
  return (
    <div>
      <div className="land">
        <header>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "45ch" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            className="login"
          >
            <TextField
              id="outlined-basic"
              label="Enter Email"
              variant="outlined"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="field"
            />
            <br />
            <br />
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setpassword(e.target.value)}
                className="field"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <br />
            <a href="/reset">forgot password?</a>
            <br />
            <Button
              variant="contained"
              style={{ width: "435px" }}
              type="submit"
            >
              sign In
            </Button>
            <br />
            <p style={{ textAlign: "center" }}>or</p>
            <br />
            <div className="google">
  			
          <div id='signInDiv'>
      
          </div>
            </div>
            <a href="/register" className="google">
              New to Daemonhq? signUp
            </a>
          </Box>
        </header>

      </div>
    </div>
  );
};

export default Login;