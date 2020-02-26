import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { MyButton,MyWhiteButton } from "../component/MyButton";
import { Link, Divider, Paper, Typography } from "@material-ui/core/";
import { MyTitle, MyLink } from "../component/MyTitle";
import MapData from "./MapData"
import { Grid } from "@material-ui/core";
import moment from "moment";
import PhoneIcon from "@material-ui/icons/Phone";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import FlagIcon from "@material-ui/icons/Flag";


const TripBox = ({ history, data }) => {
  const {
    id,
    departure_latitude,
    departure_longtitude,
    destination_latitude,
    destination_longtitude,   
    departure_detail,
    destination_detail,                       
    member_id,
    username,
    phone_number,
    photo
} = data;    

  return (
      <Paper
        square
        variant="outlined"
        elevation={0}
        style={{
          padding: 12,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          marginBottom: "12px"
        }}
      >
      <Grid
        container
        direction="row"
        alignItems="center"
        style={{ marginBottom: "24px" }}
      >
        <div
          style={{ display: "flex", marginLeft: "0px", marginRight: "24px" }}
        >
          <img
            src={photo}
            height={50}
            width={50}
            style={{ borderRadius: "100%" }}
          />
        </div>
        <MyTitle>{username}</MyTitle>
      </Grid>      

       <div style={{ display: "flex", alignItems: "left", marginBottom: "8px" }}>
            <PhoneIcon fontSize="small" style={{ marginRight: "8px" }} />
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              {phone_number}
       </div>
       </div>

       <div style={{ display: "flex", alignItems: "left", marginBottom: "8px" }}>
            <LocationOnIcon fontSize="small" style={{ marginRight: "8px" }} />
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              {departure_detail}
            </div>
       </div>
       <MapData fixed longitude={departure_longtitude} latitude={departure_latitude} />

       <div style={{ display: "flex", alignItems: "left", marginBottom: "8px" , marginTop: "8px" }}>
            <FlagIcon fontSize="small" style={{ marginRight: "8px" }} />
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              {departure_detail}
            </div>
       </div>
       <MapData fixed longitude={destination_longtitude} latitude={destination_latitude} />

        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "12px"
          }}
        >
          <MyButton>Accept</MyButton>
          <MyWhiteButton>Reject</MyWhiteButton>
        </div>
      </Paper>
    // </Paper>
  );
};

export default withRouter(TripBox);
