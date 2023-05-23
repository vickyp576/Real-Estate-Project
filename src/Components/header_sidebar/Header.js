import React, { useEffect } from "react";
import { useState } from "react";
import { HiOutlineUser } from "react-icons/hi";
import { AiFillCaretDown } from "react-icons/ai";
import Logout from "../Logout/Logout";
import "./Header.css";
import { Cookies } from "react-cookie";
import axios from "axios";

const Header = () => {
  const [show, setShow] = useState(false);
  const [userName_id, setUserName_id] = useState({});
  const cookies = new Cookies();
  const token = cookies.get("jwt");

  useEffect(() => {
    console.log("Header useEffect");
    const getUserData = () => {
      axios({
        method: "get",
        url: "https://real-esate-practice.onrender.com/property", //"https://realestate-backend-ulho.onrender.com/property",
        headers: {
          Accept: "application/json",
          authorization: token,
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => {
          setUserName_id({
            username: res.data.userData[0].username,
            id: res.data.userData[0]._id,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getUserData();
    // console.log(userName_id)
  }, [token]);

  return (
    <>
      <div className="main_header">
        <div className="header_row">
          <span className="user_id_text">USER ID :</span>
          <span className="user_id">CDPPD{userName_id.id}</span>
          <HiOutlineUser className="user_icon" />{" "}
          <span className="user_name">{userName_id.username}</span>
          <AiFillCaretDown
            className="drop_down"
            onClick={() => {
              setShow(!show);
            }}
          />
          {show ? <Logout /> : null}
        </div>
      </div>
      <hr className="line"></hr>
    </>
  );
};
export default Header;
