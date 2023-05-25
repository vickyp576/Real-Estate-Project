import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./locationinfo.css";
import Header from "../header_sidebar/Header";
import axios from "axios";
import { Cookies } from "react-cookie";
import Sidebar from "../header_sidebar/Sidebar";

function LocationInfo() {
  let navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("jwt");
  const [allData, setAllData] = useState({});
  const [dataSent, setDataSent] = useState(false);

  const random_views = Math.floor(Math.random() * 100 + 1);
  let random_days;
  const arr = ["Sold", "Unsold"];
  const random_string = arr[Math.floor(Math.random() * arr.length)];
  if (random_string === "Sold") {
    random_days = 0;
  } else if (random_string === "Unsold") {
    random_days = Math.floor(Math.random() * 100 + 1);
  }

  const [data, setdata] = useState({
    email: "",
    city: "",
    area: "",
    pincode: "",
    address: "",
    landmark: "",
    latitude: "",
    longitude: "",
    views: random_views,
    status: random_string,
    days_left: random_days,
  });

  useEffect(() => {
    // const basicInfoFromLocalstorage = JSON.parse(localStorage.getItem('BASIC_INFO'));
    // console.log(itemsFromLocalstorage)
    const sendData = () => {
      axios({
        method: "post",
        url: "https://real-esate-practice.onrender.com/addproperty", //"https://realestate-backend-ulho.onrender.com/addproperty",
        headers: {
          Accept: "application/json",
          authorization: token,
          "Content-Type": "application/json",
        },
        data: allData,
      })
        .then((res) => {
          window.alert("Data posted successfully!");
          localStorage.removeItem("BASIC_INFO");
          localStorage.removeItem("PROPERTY_DETAILS");
          localStorage.removeItem("GENERAL_INFO");
          console.log(res);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (dataSent) {
      sendData();
      setDataSent(false);
    }
  }, [allData, dataSent, navigate, token]);

  const handlelocation = (e) => {
    e.preventDefault();
    const basicInfoFromLocalstorage = JSON.parse(
      localStorage.getItem("BASIC_INFO")
    );
    const propertyInfoFromLS = JSON.parse(
      localStorage.getItem("PROPERTY_DETAILS")
    );
    const generalInfoFromLS = JSON.parse(localStorage.getItem("GENERAL_INFO"));
    // localStorage.setItem('LOCATION_INFO', JSON.stringify(data));
    const ALLDATA = {
      ...basicInfoFromLocalstorage,
      ...propertyInfoFromLS,
      ...generalInfoFromLS,
      ...data,
    };

    console.log(ALLDATA);
    setAllData(ALLDATA);
    setDataSent(true);
  };

  return (
    <>
      <Header />
      <Sidebar />
      <div className="main_section">
        <div className="heading">
          <h2>ADD NEW PROPERTY</h2>
        </div>

        <div className="nav_section">
          <div className="navbar">
            <div className="nav_first">
              <div className="basic">
                <span className="oa">1</span>
                <span> Basic Info</span>
              </div>
            </div>
            <div className="nav_second">
              <div className="property">
                <span className="oa">2</span>
                <span> Property Details</span>
              </div>
            </div>
            <div className="nav_third">
              <div className="general">
                <span className="oa">3</span>
                <span>General Info</span>
              </div>
            </div>
            <div className="nav_four">
              <div className="loc">
                <span className="oa">4</span>
                <span> Location Info</span>
              </div>
            </div>
          </div>
        </div>

        <form className="locationform" onSubmit={handlelocation}>
          <div className="box12">
            <div className="email1">
              <label for="email">Email</label>
              <div>
                <input
                  className="email"
                  required={true}
                  placeholder="Email"
                  onChange={(e) => setdata({ ...data, email: e.target.value })}
                ></input>
              </div>
            </div>
            <div className="address">
              <label for="add">Address</label>
              <div>
                <input
                  className="add"
                  required={true}
                  placeholder="Address"
                  onChange={(e) =>
                    setdata({ ...data, address: e.target.value })
                  }
                ></input>
              </div>
            </div>
          </div>

          <div className="box13">
            <div className="city">
              <lable for="city" id="city">
                City
              </lable>
              <div>
                <select
                  name="city"
                  required={true}
                  className="select14"
                  onChange={(e) => setdata({ ...data, city: e.target.value })}
                >
                  <option value="" selected={true} disabled>
                    Not selected yet
                  </option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="delhi">Delhi</option>
                  <option value="hydrbad">Hydrabad</option>
                  <option value="kolkata">Kolkata</option>
                </select>
              </div>
            </div>

            <div className="area">
              <lable for="area" id="area">
                Area
              </lable>
              <div>
                <select
                  name="area"
                  required={true}
                  className="select15"
                  onChange={(e) => setdata({ ...data, area: e.target.value })}
                >
                  <option value="" selected={true} disabled>
                    Not selected yet
                  </option>
                  <option value="pune">Area 1</option>
                  <option value="jodhpur">Area 2</option>
                  <option value="goa">Area 3</option>
                </select>
              </div>
            </div>
          </div>

          <div className="box14">
            <div className="pincode">
              <lable for="pincode" id="pincode">
                Pincode
              </lable>
              <div>
                <select
                  name="pincode"
                  className="select16"
                  required={true}
                  onChange={(e) =>
                    setdata({ ...data, pincode: e.target.value })
                  }
                >
                  <option value="" selected={true} disabled>
                    Not selected yet
                  </option>
                  <option value="512468">512468</option>
                  <option value="987456">987456</option>
                  <option value="123456">123456</option>
                </select>
              </div>
            </div>
            <div className="landmark">
              <label for="land">Landmark</label>
              <div>
                <input
                  className="land"
                  required={true}
                  placeholder="Landmark"
                  onChange={(e) =>
                    setdata({ ...data, landmark: e.target.value })
                  }
                ></input>
              </div>
            </div>
          </div>

          <div className="box15">
            <div className="lat">
              <label for="latitude">Latitude</label>
              <div>
                <input
                  className="latitude"
                  required={true}
                  type="Number"
                  placeholder="Latitude"
                  onChange={(e) =>
                    setdata({ ...data, latitude: e.target.value })
                  }
                ></input>
              </div>
            </div>

            <div className="long">
              <label for="longitude">Longitude</label>
              <div>
                <input
                  className="longitude"
                  required={true}
                  type="Number"
                  placeholder="Longitude"
                  onChange={(e) =>
                    setdata({ ...data, longitude: e.target.value })
                  }
                ></input>
              </div>
            </div>
          </div>
          <Link to="/generalinfo">
            <button className="cancel">Previous</button>
          </Link>
          <button className="save2" type="submit">
            Add Property
          </button>
        </form>
      </div>
    </>
  );
}

export default LocationInfo;
