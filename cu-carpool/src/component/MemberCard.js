import React, { useState,useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { MyHeader, MyHeaderWithArrow, MyTitle } from "../component/MyTitle";
import logo from '../logo.png';
import PhoneIcon from "@material-ui/icons/Phone";
import EmptyBox from '../component/EmptyBox'
import { Box, Input, Paper, Grid, Typography } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { MyButton, MyGreyButton } from "../component/MyButton";
import MemberCardSmall from '../component/MemberCardSmall'

const MemberCard = ({ data,id}) => {
  const { open, setOpen } = useState(false)
  const {
    username,
    firstname,
    lastname,
    phone_number,
    photo,
    request_id,
    request_status
  } = data;
  const [ approved, setApproved ] = useState(request_status=="approved")
  const [ pickup, setPickup ] = useState(request_status=="on going")
  const [ dropoff, setDropoff ] = useState(request_status=="done")
  const trip_id=id;  
  const PickUp = async () => {
    try {
      const response = await axios.post("http://localhost:4000/trip/pickupMember", { request_id,trip_id });
      const { success, error, message} = response.data;
    if(success){
	setApproved(false);
	setPickup(true)
    }
    } catch (e) {
      console.log(e);
    }
  };
  const DropOff = async () => {
    try {
      const response = await axios.post("http://localhost:4000/trip/dropOffMember", { request_id,trip_id });
      const { success, error, message} = response.data;
    if(success){
	setPickup(false);
	setDropoff(true)
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
          <div
            style={{ color: "#C78899", textDecoration: "underline", fontSize: 14 }}
            onClick={() => { setOpen(true) }}
          >
            see location detail
          </div>
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
	{approved&&(
	<div>
        <MyButton onClick={PickUp} style={{ alignSelf: "center" }}>Pick up</MyButton>
        <MyGreyButton disabled={true} style={{ alignSelf: "center" }}>Drop off</MyGreyButton>
	</div>
	)}
	{pickup&&(
        <div>
	<MyGreyButton disabled={true} style={{ alignSelf: "center" }}>Pick up</MyGreyButton>
        <MyButton onClick={DropOff} style={{ alignSelf: "center" }}>Drop off</MyButton>
	</div>
	)}
	{dropoff&&(
        <div>
	<MyGreyButton disabled={true} style={{ alignSelf: "center" }}>Pick up</MyGreyButton>
         <MyGreyButton disabled={true} style={{ alignSelf: "center" }}>Drop off</MyGreyButton>
	</div>
	)}
      </div>
    </Paper>
  );
};

export default withRouter(MemberCard);
