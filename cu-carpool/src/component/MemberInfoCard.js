import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { MyHeader, MyHeaderWithArrow, MyTitle } from "../component/MyTitle";
import logo from '../logo.png';
import PhoneIcon from "@material-ui/icons/Phone";
import EmptyBox from '../component/EmptyBox'
import { Box, Input, Paper, Grid, Typography,Textfield} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { MyButton, MyWhiteButton } from "../component/MyButton";
import MemberCardSmall from '../component/MemberCardSmall';
import LocationDetail from '../component/LocationDetail'
import moment from 'moment';

const formatter = date => moment(date).format('MMMM Do YYYY, h:mm a');

const MemberInfoCard = ({ data,admin_name,fetchData }) => {

  const {
    id,
    username,
    firstname,
    lastname,
    phone_number,
    photo,
    email,
    banned_at,
    banned_by,
    driver_status,
    driving_license,
    approved_at, 
    approved_by,
    rejected_at,
    rejected_by
  } = data;
  
  const Ban = async () => {
    try {
      const response = await axios.post("http://localhost:4000/admin/banmember", { admin_name,id });
      const { success, error } = response.data;
      if (success) {
        fetchData();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const UnBan = async () => {
    try {
      const response = await axios.post("http://localhost:4000/admin/unbanmember", {id });
      const { success, error } = response.data;
      if (success) {
        fetchData();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div style={{ width: '45%', display: 'flex', alignItems: 'center',border: "1px solid #C4C4C4", padding: '16px 48px', margin: '16px 0'}}>
                <div style={{ display: 'flex', flexDirection:'column',alignItems: 'center', flexWrap: 'wrap', width: '150px', marginRight: '16px' }}>
                  <img
                    src={photo}
                    height={100}
                    width={100}
                    style={{ borderRadius: "100%", marginBottom: "16px" }}
                  />
                  <div style={{ alignSelf: 'center' }}>{username}</div>
                </div>
                <div style={{ width: '70%', display: 'flex', flexDirection: 'column'}}>
                  <div> <b> Member ID:</b> {id}</div>
                  <div> <b>Name:</b> {firstname} {lastname}</div>
                  <div> <b>Email:</b> {email}</div>
                  <div> <b>Phone number:</b> {phone_number}</div>
                  {(driver_status!=null)&&(<div> <b>Driver Status:</b> {driver_status}</div>)}
		  {(driving_license!=null)&&(<div> <b>Driving License:</b> {driving_license}</div>)}
	          {(approved_at!=null)&&(<div> <b>Approved at:</b> {formatter(approved_at)}</div>)}
		  {(approved_by!=null)&&(<div> <b>Approved by:</b> {approved_by}</div>)}
		  {(rejected_at!=null)&&(<div> <b>Rejected at:</b> {formatter(rejected_at)}</div>)}
		  {(rejected_by!=null)&&(<div> <b>Rejected by:</b> {rejected_by}</div>)}
                  {(banned_at!=null)&&(<div> <b>Banned At:</b> {formatter(banned_at)}</div>)}
		  {(banned_by!=null)&&(<div> <b>Banned By:</b> {banned_by}</div>)}
                </div>
		<div style={{ display: 'flex-center',alignItems: 'center', marginLeft: '16px' }}>
                {(banned_at==null)&&(<MyButton onClick={Ban}>Ban</MyButton>)}
		{(banned_at!=null)&&(<MyWhiteButton onClick={UnBan}>Unban</MyWhiteButton>)}
		</div>
   </div>
  );
};

export default MemberInfoCard;
