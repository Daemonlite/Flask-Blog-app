import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import jwt_decode from 'jwt-decode'
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [profile, setProfile] = useState("");

  

  const navigate = useNavigate();
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ztzo5rzi");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dxt2sumzc/image/upload",
        formData
      );
      const imageUrl = res.data.secure_url;
      setProfile(imageUrl);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/register/", {
        name:fullName,
        email,
        password,
        profile,
      })
      .then((res) => {
        toast.success("Register successful");
        if (res.data) {
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          navigate("/");
        }
        setpassword("");
        setEmail("");
      })
      .catch((err) => {
        toast.error(err.message);
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
    axios
    .post("http://localhost:5000/register/", {
      email: userObject.email,
      password: Password,
      profile:userObject.picture,
      name:userObject.name,
      

    })
    .then((res) => {
      toast.success("Register successful");
      if (res.data) {
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        navigate("/home");
      }
      setpassword("");
      setEmail("");
    })
    .catch((err) => {
      toast.error(err.message)
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

  return (
    <div className="back">
      <div>
        <header>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "45ch" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            className="register"
          >
            <TextField
              id="outlined-basic"
              label="Enter your full Name"
              variant="outlined"
              type="text"
              onChange={(e) => setFullName(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Enter  Email"
              variant="outlined"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="profile">Choose profile photo</label>
            <TextField
              id="outlined-basic"
              type="file"
              variant="outlined"
              onChange={handleFileChange}
            />
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setpassword(e.target.value)}
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

            <Button
              variant="contained"
              style={{ width: "425px" }}
              type="submit"
            >
              Submit
            </Button>
            <p style={{ textAlign: "center" }}>or</p>

            <div className="google">
            <div id='signInDiv'>
      
      </div>
            </div>
            <a href="/" className="google">
              Have an account? Login
            </a>
          </Box>
        </header>
      </div>
    </div>
  );
};

export default Register;