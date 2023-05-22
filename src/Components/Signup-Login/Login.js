import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies, Cookies } from "react-cookie";
import axios from "axios";
import "./Login.css";

export default function Login() {
  const [loginDetails, setLoginDetails] = useState({});
  const [dataSent, setDataSent] = useState(false);
  const [cookies, setCookie] = useCookies([]);
  let navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginDetails({
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    });
    setDataSent(true);
    // console.log(e.target.elements.email.value)
    // console.log(e.target.elements.password.value)
  };

  useEffect(() => {
    const cookies = new Cookies();
    console.log("Token in login => " + cookies.get("jwt"));

    const userLogin = () => {
      axios({
        method: "post",
        url: "https://real-esate-practice.onrender.com/login",
        data: loginDetails,
      })
        .then((response) => {
          let token = response.data.authToken;
          setCookie("jwt", token, {
            path: "/",
            expires: new Date(Date.now() + 3.6e6),
          });

          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data === "User doesn't exists!") {
            window.alert("User doesn't exists!");
          } else if (err.response.data === "Incorrect password") {
            window.alert("Incorrect password");
          }
        });
    };
    if (dataSent) {
      userLogin();
      console.log("Inside useEffect login function");

      setDataSent(false);
      // console.log( `This is cookie from useEffect => ${cookies}`)
    }
    console.log("Inside useEffect");
  }, [loginDetails, dataSent, navigate, cookies, setCookie]);

  return (
    <>
      <div className="L-container">
        <div className="L-formDiv">
          <h1>Realestate</h1>
          <p>Enter your credentials to access your account</p>
          <form action="/login" method="POST" onSubmit={handleLogin}>
            <input
              id="L-userid"
              type="email"
              required={true}
              name="email"
              placeholder="USER ID"
            />
            <input
              id="L-password"
              name="password"
              required={true}
              type="password"
              placeholder="PASSWORD"
            />
            <button type="submit" id="L-signin">
              Sign In
            </button>
          </form>
          <Link className="L-signup" to="/signup">
            Signup
          </Link>
        </div>

        <h3 id="L-afterForm">
          Don't have an account?{" "}
          <Link className="signup" to="/signup">
            Signup
          </Link>
        </h3>
      </div>
    </>
  );
}
