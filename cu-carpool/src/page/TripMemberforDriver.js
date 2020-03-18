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
import { MyButton } from "../component/MyButton";
import MemberCard from '../component/MemberCard'


const TripMemberforDriver = () => {
  const { trip_id } = useParams();
  const [memberList, setMemberList] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/trip/passenger", { params: { trip_id } });
      const { success, passenger } = response.data;
      if (success) {
        setMemberList(passenger);
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
      <MyHeaderWithArrow goto="/my-trip">Trip Member</MyHeaderWithArrow>
      <MyTitle>Member</MyTitle>
      <EmptyBox data={memberList} />
      {memberList.map((member, index) => (
        <MemberCard key={index} data={member} trip_id={trip_id} fetchData={fetchData}/>
      ))}
    </div>
  );
};

export default TripMemberforDriver;