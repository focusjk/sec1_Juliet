import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { MyHeader, MyHeaderWithArrow, MyTitle } from "../component/MyTitle";
import logo from '../logo.png';
import PhoneIcon from "@material-ui/icons/Phone";
import EmptyBox from '../component/EmptyBox'
import { Box, Input, Paper, Grid, Typography } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { MyButton, MyGreyButton } from "../component/MyButton";
import MemberCardSmall from '../component/MemberCardSmall';
import LocationDetail from '../component/LocationDetail'

const MemberCard = ({ data, trip_id,fetchData }) => {
  const {
    username,
    firstname,
    lastname,
    phone_number,
    photo,
    request_id,
    request_status,
    departure_detail,
    destination_detail
  } = data;
  const PickUp = async () => {
    try {
      const response = await axios.post("http://localhost:4000/trip/pickupMember", { id: request_id, trip_id });
      const { success } = response.data;
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
          <LocationDetail trip_id={trip_id} departure_detail={departure_detail} destination_detail={destination_detail} />
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
        {request_status == 'paid' && <MyButton onClick={PickUp} >Pick up</MyButton>}
        {request_status != 'paid' && <MyGreyButton disabled={true} >Pick up</MyGreyButton>}
        {request_status == 'on going' && <MyButton onClick={DropOff} >Drop off</MyButton>}
        {request_status != 'on going' && <MyGreyButton disabled={true} >Drop off</MyGreyButton>}
      </div>
    </Paper>
  );
};

export default withRouter(MemberCard);
