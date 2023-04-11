
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode'
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const [profile, setProfile] = useState("");

  

  const navigate = useNavigate();

  
  

 

  
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
      <div className="signInDiv"></div>
    </div>
  );
};

export default Register;