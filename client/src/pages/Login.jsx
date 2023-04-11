import { useState, useEffect } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID Token : ", response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    const Password = `${userObject.given_name}wegvfejwy1@`;
    // Use the decoded JWT ID token to log the user in
    axios
      .post("http://127.0.0.1:5000/login", {
        email: userObject.email,
        password: Password,
      })
      .then((res) => {
        toast.success("login successful");
        if (res.data) {
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          navigate("/");
        }
      })
      .catch((err) => {
        toast.error("Login failed check credentials");
      });
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "224073338639-us7klguo2oge970dmf953r2s79kvtt6n.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    if (document.getElementById("signInDiv")) {
      google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        theme: "outline",
        size: "large",
      });
    }
  }, []);

  return (
    <div className="log">
      <h2 className="head">Login to Continue</h2>
      <div className="Login">
        <div id="signInDiv"></div>
        
      </div>
      <p>don't have an account ? <a href="/register">register</a></p>
    </div>
  );
};

export default Login;

