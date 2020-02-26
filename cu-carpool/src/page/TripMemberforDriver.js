import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { MyHeader, MyHeaderWithArrow, MyTitle } from "../component/MyTitle";
import logo from '../logo.png';
import PhoneIcon from "@material-ui/icons/Phone";
import EmptyBox from '../component/EmptyBox'
import { Box, Input, Paper, Grid , Typography  } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { MyButton } from "../component/MyButton";
import MemberCard from '../component/MemberCard'


const TripMemberforDriver = () => { 
  const [passengerList, setPassengerList] = useState([]);
  const [state, setState] = useState("---");
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/trip/detail");
      const { success,error,message,passenger } = response.data;
      if(success){
      setPassengerList(passenger);
      setState("Success");
      }
      else{
	setState(error);
      }
    } catch (e) {
      console.log(e.response);
    }
  };
  useEffect(() => {
    fetchData();
   });
  return (
    <div>
      <MyHeaderWithArrow goto="">Trip Member</MyHeaderWithArrow>
      <MyTitle>Member</MyTitle>
       <MyTitle>{state}</MyTitle>
      <EmptyBox data={passengerList} />
      {passengerList.map((passenger, index) => (
        <MemberCard key={index} data={passenger} />
      ))}
    </div>
  );
};

export default TripMemberforDriver;
