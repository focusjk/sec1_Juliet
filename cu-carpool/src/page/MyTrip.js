import React, { useState, useEffect } from "react";
import { MyHeader } from "../component/MyTitle";
import TripBox from "../component/TripBox";
import EmptyBox from "../component/EmptyBox";
import axios from "axios";

const MyTrip = () => {
  const [tripList, setTripList] = useState([]);
  const myTrip = async () => {
    try {
      const response = await axios.post("http://localhost:4000/trip/detail");
      const { trip, owner, passenger } = response.data;
      setTripList(trip);
    } catch (e) {
      console.log(e.response);
    }
  };

  return (
    <div>
      <MyHeader style={{ marginBottom: "30px" }}>My Trip</MyHeader>
      <EmptyBox data={tripList} />
      {tripList.map((trip, index) => (
        <TripBox key={index} data={trip} />
      ))}
      {/* <TripBox /> */}
    </div>
  );
};

export default MyTrip;
