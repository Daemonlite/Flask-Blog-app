import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profile, setProfile] = useState("");
  const navigate = useNavigate();

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID Token : ", response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    const Password = `${userObject.given_name}wegvfejwy1@`;
    axios
      .post("http://localhost:5000/register/", {
        email: userObject.email,
        password: Password,
        profile: userObject.picture,
        name: userObject.name,
      })
      .then((res) => {
        toast.success("Register successful");
        if (res.data) {
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          navigate("/"); // Make sure the route for '/home' is defined in your application
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "224073338639-us7klguo2oge970dmf953r2s79kvtt6n.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <div className="log">
    <h2 className="head">Create account to Continue</h2>
    <div className="Login">
      <div id="signInDiv"></div>
      
    </div>
    <p>already have an account ? <a href="/login">login</a></p>
  </div>
  );
};

export default Register;
