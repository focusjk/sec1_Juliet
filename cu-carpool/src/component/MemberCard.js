import React, { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { MyTitle } from "../component/MyTitle";
import PhoneIcon from "@material-ui/icons/Phone";
import { Paper } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { MyButton, MyGreyButton } from "../component/MyButton";
import LocationDetail from '../component/LocationDetail'

const MemberCard = ({ data, trip_id, fetchData }) => {
  const {
    username,
    firstname,
    lastname,
    phone_number,
    photo,
    request_id,
    request_status,
    departure_detail,
    destination_detail,
    departure_longitude,
    departure_latitude,
    destination_longitude,
    destination_latitude,
    driver_departed_at
  } = data;
  const [error, setError] = useState("");
  const PickUp = async () => {
    try {
      const response = await axios.post("http://localhost:4000/trip/pickupMember", { id: request_id, trip_id });
      const { success, error } = response.data;
      setError(error)
      if (success) {
        fetchData();
      }
    } catch (e) {
      console.log(e);
    }
  };
  const DropOff = async () => {
    try {
      const response = await axios.post("http://localhost:4000/trip/dropOffMember", { id: request_id, trip_id });
      const { success } = response.data;
      if (success) {
        fetchData();
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Paper
      square
      variant="outlined"
      style={{
        marginTop: "16px",
        padding: "16px 30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <div style={{ display: "flex", alignItems: 'center' }}>
        <img
          src={photo}
          height={50}
          width={50}
          style={{ borderRadius: "100%", marginRight: "8px" }}
        />
        <div>
          <MyTitle>{username}</MyTitle>
          <LocationDetail
            trip_id={trip_id}
            departure_detail={departure_detail}
            destination_detail={destination_detail}
            departure_longitude={departure_longitude}
            departure_latitude={departure_latitude}
            destination_longitude={destination_longitude}
            destination_latitude={destination_latitude}
          />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", marginTop: "16px" }}>
        <PersonIcon fontSize="small" style={{ marginRight: "8px" }} />
        <div>
          {firstname} {lastname}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", marginTop: "16px" }}>
        <PhoneIcon fontSize="small" style={{ marginRight: "8px" }} />
        <div>
          {phone_number}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "24px"
        }}
      >
        {driver_departed_at == null && (request_status == 'paid' || request_status == 'on going') && <MyButton onClick={PickUp} >Pick up</MyButton>}
        {!(driver_departed_at == null && (request_status == 'paid' || request_status == 'on going')) && <MyGreyButton disabled={true} >Pick up</MyGreyButton>}
        {request_status == 'on going' && driver_departed_at != null && <MyButton onClick={DropOff} >Drop off</MyButton>}
        {(request_status != 'on going' || driver_departed_at == null) && <MyGreyButton disabled={true} >Drop off</MyGreyButton>}
      </div>
    </Paper>
  );
};

export default withRouter(MemberCard);
