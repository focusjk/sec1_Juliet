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
  return (
    <div>
      <MyHeaderWithArrow goto="">Trip Member</MyHeaderWithArrow>
      <MyTitle>Member</MyTitle>
      <MemberCard />
      <MemberCard />
    </div>
  );
};

export default TripMemberforDriver;
