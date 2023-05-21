import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Signup-Login/Login";
import Signup from "./Components/Signup-Login/Signup";
import BasicInfo from "./Components/Add properties/BasicInfo";
import PropertyDetails from "./Components/Add properties/propertyDetails";
import GeneralInfo from "./Components/Add properties/generalinfo";
import LocationInfo from "./Components/Add properties/locationinfo";
import Property from "./Components/property/Property";
import Protected from "./Components/Protected/protected";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route
          path="/"
          element={
            <Protected>
              <Property />
            </Protected>
          }
        ></Route>
        <Route
          path="/basicinfo"
          element={
            <Protected>
              <BasicInfo />
            </Protected>
          }
        ></Route>
        <Route
          path="/propertydeatils"
          element={
            <Protected>
              <PropertyDetails />
            </Protected>
          }
        ></Route>
        <Route
          path="/generalinfo"
          element={
            <Protected>
              <GeneralInfo />
            </Protected>
          }
        ></Route>
        <Route
          path="/locationinfo"
          element={
            <Protected>
              <LocationInfo />
            </Protected>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
