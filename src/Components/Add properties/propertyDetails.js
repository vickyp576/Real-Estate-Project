import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./propertDetails.css";
import Header from "../header_sidebar/Header";
import Sidebar from "../header_sidebar/Sidebar";

function PropertyDetails() {
  let navigate = useNavigate();
  const [data, setdata] = useState({
    length: "",
    breadth: "",
    total_area: "",
    area_unit: "",
    no_of_bhk: "",
    no_of_floors: "",
    attached: "",
    western_toilet: "",
    furnished: "",
    car_parking: "",
    lift: "",
    electricity: "",
    facing: "",
  });

  const handleproperty = (e) => {
    e.preventDefault();
    localStorage.setItem("PROPERTY_DETAILS", JSON.stringify(data));
    navigate("/generalinfo");
    console.log(data);
  };

  return (
    <>
      <Header />
      <div className="prime">
        <Sidebar />
        <div className="main_section">
          <div className="heading">
            <h2>ADD NEW PROPERTY</h2>
          </div>

          <div className="nav_section">
            <div className="navbar">
              <div className="nav_one1">
                <div className="basic">
                  <span className="oa">1</span>
                  <span> Basic Info</span>
                </div>
              </div>
              <div className="nav_two">
                <div className="property">
                  <span className="oa">2</span>
                  <span> Property Details</span>
                </div>
              </div>
              <div className="nav_3">
                <div className="general">
                  <span className="oa">3</span>
                  <span>General Info</span>
                </div>
              </div>
              <div className="nav_fo">
                <div className="loc">
                  <span className="oa">4</span>
                  <span>Location Info</span>
                </div>
              </div>
            </div>
          </div>

          <div className="form_section">
            <form className="propertform" onSubmit={handleproperty}>
              <div className="form_row">
                <div className="form_row_one">
                  <div className="len">
                    <label for="length">Length</label>
                    <div>
                      <input
                        className="length"
                        type="number"
                        required={true}
                        placeholder="Example :1000"
                        onChange={(e) =>
                          setdata({ ...data, length: e.target.value })
                        }
                      ></input>
                    </div>
                  </div>

                  <div className="breath">
                    <label for="breath">Breath</label>
                    <div>
                      <input
                        className="bre"
                        placeholder="Example :1000"
                        required={true}
                        type="number"
                        onChange={(e) =>
                          setdata({ ...data, breadth: e.target.value })
                        }
                      ></input>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form_row_two">
                <div className="Total-area">
                  <label for="area">Total Area</label>
                  <div>
                    <input
                      className="area1"
                      type="number"
                      required={true}
                      placeholder="Example :7500"
                      onChange={(e) =>
                        setdata({ ...data, total_area: e.target.value })
                      }
                    ></input>
                  </div>
                </div>

                <div className="area-unit">
                  <lable for="unit" id="unit">
                    Area Unit
                  </lable>
                  <div>
                    <select
                      className="areaunit"
                      name="unit"
                      required={true}
                      onChange={(e) =>
                        setdata({ ...data, area_unit: e.target.value })
                      }
                    >
                      <option value="" selected={true} disabled>
                        Not selected yet
                      </option>
                      <option value="meter">Meter Square</option>
                      <option value="yard">Yard Square</option>
                      <option value="cm">CM Square</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form_row_three">
                <div className="noofBHK">
                  <lable for="bhk" id="bhk">
                    No of BHK
                  </lable>
                  <div>
                    <select
                      className="bhk"
                      name="bhk"
                      required={true}
                      onChange={(e) =>
                        setdata({ ...data, no_of_bhk: e.target.value })
                      }
                    >
                      <option value="" selected={true} disabled>
                        Not selected yet
                      </option>
                      <option value="1-bhk">1 BHK</option>
                      <option value="2-bhk">2 BHK</option>
                      <option value="3-bhk">3 BHK</option>
                    </select>
                  </div>
                </div>

                <div className="nooffloor">
                  <lable for="floor" id="floor">
                    No of Floors
                  </lable>
                  <div>
                    <select
                      className="floor"
                      name="floor"
                      required={true}
                      onChange={(e) =>
                        setdata({ ...data, no_of_floors: e.target.value })
                      }
                    >
                      <option value="" selected={true} disabled>
                        Not selected yet
                      </option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form_row_four">
                <div className="attached">
                  <lable for="attach" id="attach">
                    Attached
                  </lable>
                  <div>
                    <select
                      className="attach"
                      required={true}
                      name="attach"
                      onChange={(e) =>
                        setdata({ ...data, attached: e.target.value })
                      }
                    >
                      <option value="" selected={true} disabled>
                        Not selected yet
                      </option>
                      <option value="2-bhk">Not Attached</option>
                      <option value="3-bhk">Attached</option>
                    </select>
                  </div>
                </div>

                <div className="western">
                  <lable for="toilet" id="toilet">
                    Western Toliet
                  </lable>
                  <div>
                    <select
                      className="toilet"
                      required={true}
                      name="attach"
                      onChange={(e) =>
                        setdata({ ...data, western_toilet: e.target.value })
                      }
                    >
                      <option value="" selected={true} disabled>
                        Not selected yet
                      </option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form_row_five">
                <div className="furnished">
                  <lable for="furn" id="furn">
                    Furnished
                  </lable>
                  <div>
                    <select
                      className="furnish"
                      name="furn"
                      required={true}
                      onChange={(e) =>
                        setdata({ ...data, furnished: e.target.value })
                      }
                    >
                      <option value="" selected={true} disabled>
                        Not selected yet
                      </option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>

                <div className="carparking">
                  <lable for="car" id="car">
                    Car Parking
                  </lable>
                  <div>
                    <select
                      className="car"
                      name="car"
                      required={true}
                      onChange={(e) =>
                        setdata({ ...data, car_parking: e.target.value })
                      }
                    >
                      <option value="" selected={true} disabled>
                        Not selected yet
                      </option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form_row_six">
                <div className="liftStatus">
                  <lable for="lift" id="furn">
                    Lift
                  </lable>
                  <div>
                    <select
                      className="lift"
                      name="lift"
                      required={true}
                      onChange={(e) =>
                        setdata({ ...data, lift: e.target.value })
                      }
                    >
                      <option value="" selected={true} disabled>
                        Not selected yet
                      </option>
                      <option value="present">Present</option>
                      <option value="absent">Not Present</option>
                    </select>
                  </div>
                </div>

                <div className="electricity">
                  <label for="ele">Electricity</label>
                  <div>
                    <input
                      className="ele"
                      required={true}
                      placeholder="Example :3 Phase"
                      onChange={(e) =>
                        setdata({ ...data, electricity: e.target.value })
                      }
                    ></input>
                  </div>
                </div>
              </div>

              <div className="form_row_seven">
                <div className="face">
                  <lable for="facing" id="facing">
                    Facing
                  </lable>
                  <div>
                    <select
                      className="facing"
                      name="facing"
                      required={true}
                      onChange={(e) =>
                        setdata({ ...data, facing: e.target.value })
                      }
                    >
                      <option value="" selected={true} disabled>
                        Not selected yet
                      </option>
                      <option value="south">South</option>
                      <option value="north">North</option>
                      <option value="east">East</option>
                      <option value="west">West</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="button_section">
                <Link to="/basicinfo">
                  <button type="button" className="cancel">
                    Previous
                  </button>
                </Link>
                <button type="submit" className="save2">
                  Save & Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PropertyDetails;
