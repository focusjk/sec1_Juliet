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
import MemberCardSmall from '../component/MemberCardSmall'

const useStyles = makeStyles({
  box: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "column"
  },
  panel: { backgroundColor: "#EFEFEF", boxShadow: "none" }
});

const TripMemberforMember = () => {
  const classes = useStyles();
  return (
    <div>
      <MyHeaderWithArrow goto="">Trip Member</MyHeaderWithArrow>
      <MyTitle>Driver</MyTitle>
      <Paper
      square
      variant="outlined"
      style={{
        marginTop: "16px",
	marginButtom: "16px",
        padding: 10,
        display: "flex",
	flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <Typography style={{ display: "flex", flexDirection: "column", marginTop: "8px",marginButtom: "16px"}}>
        <div style={{ display: "flex", alignItems: "left" }}>
           <img
            src={logo}
            height={50}
            width={50}
            style={{ borderRadius: "100%" }}
          />
	<MyTitle style={{marginLeft: "8px", alignItems: "center"}}>Driver Username</MyTitle>
        </div>
        <div style={{ display: "flex", alignItems: "left", marginTop: "16px"}}>
          <PersonIcon fontSize="small" style={{ marginRight: "8px" }} />
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            Firstname Lastname
          </div>
        </div>
	<div style={{ display: "flex", alignItems: "left",marginTop: "16px"}}>
          <PhoneIcon fontSize="small" style={{ marginRight: "8px" }} />
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            08x-xxx-xxx
          </div>
        </div>
      </Typography>
    <MyButton style={{ alignSelf:"center" }}>Get in</MyButton>
    </Paper>
     <div  style={{
        marginTop: "16px",
	marginButtom: "16px",
        padding: 10,
        display: "flex",
	flexDirection: "column",
        justifyContent: "space-between"
      }}
	>
    <MyTitle>Member</MyTitle>
    <MemberCardSmall />
    <MemberCardSmall />
    </div>
    </div>
  );
};

export default TripMemberforMember;
