
import { useState,useEffect } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate()


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
    <div className="Login">
      <div className="signInDiv">
        
       

      </div>
    </div>
  );
};

export default Login;