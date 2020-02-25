import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { MyButton,MyWhiteButton } from "../component/MyButton";
import { Link, Divider, Paper, Typography } from "@material-ui/core/";
import { MyTitle, MyLink } from "../component/MyTitle";
import MapData from './MapData'
import { Grid } from "@material-ui/core";

const TripBox = ({ history, data }) => {

  return (
      <Paper
        square
        variant="outlined"
        elevation={0}
        style={{
          padding: 12,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column"
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
            src={window.location.origin + "/Test.jpg"}
            height={50}
            width={50}
            style={{ borderRadius: "100%" }}
          />
        </div>
        <MyTitle>Wang_Yiren</MyTitle>
      </Grid>      

       <div style={{ display: "flex", justifyContent: "flex-start", flexDirection: "column",marginBottom: "8px" }}>
            <div>Phone Number:</div>
       </div>


        <div>Pick up:</div>
        <MapData fixed longitude={100.493117} latitude={13.769059} />
        <div>Destination:</div>
        <MapData fixed longitude={100.493117} latitude={13.769059} />

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
