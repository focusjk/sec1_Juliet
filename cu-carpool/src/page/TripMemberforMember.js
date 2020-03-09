import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { MyHeader, MyHeaderWithArrow, MyTitle } from "../component/MyTitle";
import logo from '../logo.png';
import PhoneIcon from "@material-ui/icons/Phone";
import EmptyBox from '../component/EmptyBox'
import { Box, Input, Paper, Grid, Typography } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { MyButton, MyGreyButton } from "../component/MyButton";
import MemberCardSmall from '../component/MemberCardSmall'

const TripMemberforMember = ({ user, updateUser }) => {
  const { trip_id } = useParams();
  const [memberList, setMemberList] = useState([]);
  const [driver, setDriver] = useState('');
  const [request_id, setRequest_id] = useState(null);
  const [request_status, setRequest_status] = useState(null);
  const [departed_at, setDeparted_at] = useState(null);
  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:4000/trip/member", { trip_id });
      const { success, member, driver } = response.data;
      if (success) {
        setMemberList(member);
        setDriver(driver);
        const temp = member.filter(i => i.id == user.id);
        if (temp[0] != null) {
          setRequest_status(temp[0].request_status);
          setRequest_id(temp[0].request_id);
          setDeparted_at(temp[0].departed_at);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getIn = async () => {
    try {
      const response = await axios.post("http://localhost:4000/trip/getInTheCar", { id: request_id });
      const { success } = response.data;
      if (success) {
        fetchData();
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <MyHeaderWithArrow goto="/trip-history">Trip Member</MyHeaderWithArrow>
      <MyTitle>Driver</MyTitle>
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
        <Typography style={{ display: "flex", flexDirection: "column", marginTop: "8px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={driver.photo}
              height={50}
              width={50}
              style={{ borderRadius: "100%" }}
            />
            <MyTitle style={{ marginLeft: "8px" }}>{driver.username}</MyTitle>
          </div>
          <div style={{ display: "flex", alignItems: "left", marginTop: "16px" }}>
            <PersonIcon fontSize="small" style={{ marginRight: "8px" }} />
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              {driver.firstname} {driver.lastname}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "left", marginTop: "16px" }}>
            <PhoneIcon fontSize="small" style={{ marginRight: "8px" }} />
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              {driver.phone_number}
            </div>
          </div>
        </Typography>
        {
          (departed_at == null && request_status == 'paid') &&
          <MyButton onClick={getin} style={{ alignSelf: "center", marginTop: "24px" }}>Get in</MyButton>
        }
        {
          !(departed_at == null && request_status == 'paid') &&
          <MyGreyButton disabled={true} style={{ alignSelf: "center", marginTop: "24px" }}>Get in</MyGreyButton>
        }
      </Paper>
      <div style={{
        marginTop: "16px",
        padding: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
      >
        <MyTitle>Member</MyTitle>
        <EmptyBox data={memberList} />
        {memberList.map((member, index) => (
          <MemberCardSmall key={index} data={member} />
        ))}
      </div>
    </div>
  );
};

export default TripMemberforMember;
