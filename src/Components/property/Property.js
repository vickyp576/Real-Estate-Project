import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { BsSearch } from "react-icons/bs";
import { BiShow, BiPencil } from "react-icons/bi";
import { FaImages } from "react-icons/fa";
import axios from "axios";
import { Cookies } from "react-cookie";
import Header from "../header_sidebar/Header";
import Sidebar from "../header_sidebar/Sidebar";
import "./Property.css";

const Property = () => {
  const [value, setValue] = useState("");
  const [users, setUsers] = useState([]);
  // const [userName_id, setUserName_id] = useState({})
  const cookies = new Cookies();
  const token = cookies.get("jwt");
  let navigate = useNavigate();

  const deb = debounce((text) => {
    setValue(text);
  }, 1000);

  const onChange = (e) => {
    // e.prventDefault();
    const text = e.target.value;
    // setDataval(text);
    // console.log(e.target.elements.searchtext.value);
    deb(text);
  };

  const onSearch = (searchTerm) => {
    console.log(searchTerm);
    const ppd_arr = searchTerm.split(" ");
    console.log(ppd_arr);
    const ppd_id = parseInt(ppd_arr[1]);

    // axios.get("http://localhost:5000/property")
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
        let post = res.data.property;
        //console.log(post);
        const result = post.filter((val) => val._id === ppd_id);
        //console.log(res);
        setUsers(result);
        if (result.length === 0) {
          window.alert(`Oops! Please provide the correct "PPD ID".`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const afterLogin = () => {
      console.log("Inside afterLogin function property.js useEffect");
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
          console.log("Inside then block of property.js");
          setUsers(res.data.property);
        })
        .catch((err) => {
          console.log("Inside catch block of property.js");
          console.log(err);

          if (
            err.response.data === "Unauthorized user" ||
            err.response.status === 409
          ) {
            navigate("/login");
          }
        });
    };

    afterLogin();
  }, [token, navigate, value]);

  return (
    <>
      <Header />
      <Sidebar />
      <div className="row_search_bar">
        <div className="boxContainer">
          <table className="elementsContainer">
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Search PPD ID (e.g. PPD 0000)"
                  className="search"
                  name="searchtext"
                  onChange={onChange}
                />
              </td>

              <td>
                <span className="stand">|</span>
              </td>

              <td>
                <button className="search_btn" onClick={() => onSearch(value)}>
                  <BsSearch className="search_icon" />
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div className="button_div">
        <Link to="/basicinfo">
          {" "}
          <button className="btn_add">
            <span className="plus">+</span>
            <span className="text_btn">Add Property</span>
          </button>{" "}
        </Link>
      </div>

      <div className="main_row">
        <p className="head_column_one">PPDID</p>
        <p className="head_column_two">Image</p>
        <p className="head_column_three">Property</p>
        <p className="head_column_four">Contact</p>
        <p className="head_column_five">Area</p>
        <p className="head_column_six">Views</p>
        <p className="head_column_seven">Status</p>
        <p className="head_column_eight">DaysLeft</p>
        <p className="head_column_nine">Action</p>
      </div>

      {[...users].map((user, i) => {
        return (
          <div key={i} className="property_row">
            <p className="property_column_one">PPD {user._id}</p>
            <p className="property_column_two">
              <FaImages className="image" />
            </p>
            <p className="property_column_three">{user.property_type}</p>
            <p className="property_column_four">{user.mobile}</p>
            <p className="property_column_five">{user.total_area}</p>
            <p className="property_column_six">{user.views}</p>
            <p className="property_column_seven">
              <button className="btn">{user.status}</button>
            </p>
            <p className="property_column_eight">{user.days_left}</p>
            <p className="property_column_nine">
              <BiShow className="show" />
              <BiPencil className="edit" />
            </p>
          </div>
        );
      })}
    </>
  );
};

export default Property;
