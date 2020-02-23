import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { MyButton } from "../component/MyButton";
import { Link, Divider, Paper, Typography } from "@material-ui/core/";
import { MyTitle, MyLink } from "../component/MyTitle";
import MapData from './MapData'

const TripBox = ({ history, data }) => {
  //   const {
  //     id,
  //     departure_detail,
  //     departure_province,
  //     destination_detail,
  //     destination_province,
  //     start_datetime,
  //     capacity,
  //     request,
  //     status,
  //     price
  //   } = data;
  //   const date = moment(start_datetime).format("MMMM Do YYYY");
  //   const time = moment(start_datetime).format("h:mm a");
  return (
    <Paper
      square
      variant="outlined"
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        borderColor: "#BDBDBD"
      }}
    >
      <Paper
        square
        // key={id}
        elevation={0}
        style={{
          padding: 3,
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#C78899"
        }}
      >
        <MyTitle
          style={{
            fontSize: "20px",
            color: "#FFFFFF",
            marginLeft: "6px"
          }}
        >
          Hi header
        </MyTitle>
      </Paper>

      <Paper
        square
        elevation={0}
        style={{
          padding: 12,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column"
        }}
      >
        <MyTitle style={{ color: "#C78899", marginBottom: "8px" }}>
          Status:
        </MyTitle>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", justifyContent: "flex-start", flexDirection: "column" }}>
            <div>License plate:</div>
            <div>Car brand:</div>
            <div>Capacity:</div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", flexDirection: "column" }}>
            <div style={{ fontSize: "20px" }}>200 ฿</div>
            <MyLink goto="/trip-request">see request</MyLink>
            <MyLink goto="/TripMemberforDriver">see trip member</MyLink>
	  <MyLink goto="/TripMemberforMember">see trip member</MyLink>

          </div>
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
          <MyButton>Cancel</MyButton>
          <MyButton>Review</MyButton>
        </div>
      </Paper>
    </Paper>
  );
};

export default withRouter(TripBox);
