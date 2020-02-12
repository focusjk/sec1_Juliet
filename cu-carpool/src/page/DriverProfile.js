import React, { useState, useEffect } from "react";
import profile from "../profile.jpg";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Box, Input, Grid } from "@material-ui/core";
import {
  MyFullWidthButton,
  MyDisabledFullWidthButton
} from "../component/MyButton";
import { makeStyles } from "@material-ui/core/styles";
import NoteIcon from "@material-ui/icons/Note";
import { BrowserRouter as Switch } from "react-router-dom";
import { MyHeader, MyTitle } from "../component/MyTitle";
import { TextField } from "@material-ui/core";

const DriverProfile = ({ history, user }) => { 
  const [form, setForm] = useState({
    driving_license: ''
  });
  const [status, setStatus] = useState('');
  const [time, setTime] = useState('');
  const [change, setChange] = useState(false);
  
   const request = async () => {
     try {
    setChange(false);
    const { id,driver_status,edited_at} = user;
    const {driving_license} = form;
    const response = await axios.post("http://localhost:4000/driver/",{id,driving_license}
	);
    console.log(response.data);
    const { success, error, message} = response.data;
    if (success) { 
      setStatus(driver_status);
      setTime(edited_at);
    } else { 
     setStatus(message);
    }
    }catch (e) {
       console.log(e.response);
    }
  };
  
    return (
      <div>
        <MyHeader>Driver's Profile</MyHeader>
        <Grid
          container
          direction="row"
          alignItems="center"
          style={{ marginBottom: "40px" }}
        >
          <img
            src={profile}
            height={100}
            width={100}
            style={{
              display: "flex",
              marginLeft: "18px",
              marginRight: "24px",
              borderRadius: "100%"
            }}
          />
          <MyTitle>{user.id}</MyTitle>
        </Grid>
        <Box
          style={{
            backgroundColor: "#F8F8F8",
            marginBottom: "40px",
            alignSelf: "center",
            padding: "8px 24px 24px 24px"
          }}
        >
          <MyTitle>Driver's Info</MyTitle>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <NoteIcon />
            <TextField
              style={{ marginLeft: "8px" }}
              fullWidth
              placeholder="Driving License No."
	      value={form.driving_license}
	      onChange={e => {
		 setForm({ ...form,driving_license: e.target.value });
            	 setChange(true);
            	
          }}
            />
          </div>
        </Box>
	<Switch>
	{time!='' && (    
	    <div style={{ color: "grey" }}>Modified at: {time}</div>
          )}
	</Switch>
	<Switch>
	{(user.driver_status=='approved') && (
	    <div style={{ color: "pink" }}>Status : Approved</div>  
          )}
	{(user.driver_status=='pending') && (       
	    <div style={{ color: "grey" }}>Status : Pending</div>
          )}
	{(user.driver_status=='rejected') && (       
	    <div style={{ color: "red" }}>Status : Rejected</div>
          )}
	</Switch>
	<div style={{ color: "red" }}>{user.edited_at}</div>
	<Switch>
          {change==false && (
            <MyDisabledFullWidthButton
              style={{ margin: "10px 0" }}
              disabled={true}
            >
              Requested
            </MyDisabledFullWidthButton>
          )}
          {change==true && (
            <MyFullWidthButton
              style={{ margin: "10px 0" }}
              onClick={request}
            >
              Request
            </MyFullWidthButton>
          )}
        </Switch>
      </div>
    );
};

export default withRouter(DriverProfile);
