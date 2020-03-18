import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Paper } from "@material-ui/core/";
import { MyHeader,MyTitle } from "../component/MyTitle";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import RequestInfoModal from "./RequestInfoModal";
import LocationDetailModal from "./LocationDetailModal";

const TripMember = ({ history, data }) => {
  const {
    request_id,driver_departed_at,driver_arrived_at,departed_at,request_status,request_at,paid_at,
    departure_latitude,departure_longtitude,departure_detail,
    destination_latitude,destination_longtitude,destination_detail,        
    member_id,username,firstname,lastname,photo 
  } = data;

  function timeformat(time){
    if(time != null){
      return moment(time).format("MMMM Do YYYY h:mm a");
    }
    else{
      return "-";
    }
  }

  const requesttime = timeformat(request_at);
  const paidtime = timeformat(paid_at);
  const arrivetime = timeformat(driver_arrived_at);
  const departtime = timeformat(driver_departed_at);
  const departat = timeformat(departed_at);

  const useStyles = makeStyles(theme => ({
    paper: {
      width:"676px",
      padding:12,
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
      backgroundColor: "#f2f2f2"
    }
  }));

  const classes = useStyles();

  return (
        <Paper square elevation={0} className={classes.paper}>
            <img src={photo} height={50} width={50} style={{borderRadius: "100%"}}/>
            <div style={{ flexDirection: 'column',width: '150px' }}>
                <MyTitle style={{ color: "#C78899" }}>Status: {request_status}</MyTitle>
                <div style={{ alignSelf: 'center' }}>{username}</div>
            </div>
            <div style={{ flexDirection: 'column',width: '250px'}}>
                <div style={{marginBottom:'7px'}}> Request ID: {request_id}</div>
                <div> Name: {firstname} {lastname}</div>
            </div>
            <div style={{ display: "flex",flexDirection: 'column'}}>
            <LocationDetailModal data={{departure_detail,departure_longtitude,departure_latitude, 
                                 destination_detail,destination_longtitude,destination_latitude}}/>
            <RequestInfoModal data={{requesttime,paidtime,arrivetime,departtime,departat}}/>
            </div>
        </Paper>
  );
};

export default withRouter(TripMember);
