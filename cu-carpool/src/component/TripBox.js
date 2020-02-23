import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { MyButton } from "../component/MyButton";
import { Link, Divider, Paper, Typography } from "@material-ui/core/";
<<<<<<< HEAD
import { MyTitle } from "../component/MyTitle";
import moment from "moment";
=======
import { MyTitle, MyLink } from "../component/MyTitle";
import MapData from './MapData'
>>>>>>> master

const TripBox = ({ history, data }) => {
  const {
    id,
    start_datetime,
    status,
    plate_license,
    car_brand,
    capacity,
    price
    // departure_latitude,
    // departure_longtitude,
    // destination_latiude,
    // destination_longitude
  } = data;
  const date = moment(start_datetime).format("MMMM Do YYYY");
  const time = moment(start_datetime).format("h:mm a");

  return (
    <Paper
      key={id}
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
          {date} {time}
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
        <MyTitle
          style={{
            color: "#C78899",
            marginBottom: "8px"
          }}
        >
          Status: {status}
        </MyTitle>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column"
            }}
          >
            <div style={{ marginBottom: 6 }}>
              License plate: {plate_license}
            </div>
            <div style={{ marginBottom: 6 }}>Car brand: {car_brand}</div>
            <div style={{ marginBottom: 6 }}>Capacity: {capacity}</div>
            <div style={{ marginBottom: 6 }}>Pick up:</div>
            <div style={{ marginBottom: 6 }}>Destination:</div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column"
            }}
          >
            <Link
              style={{
                color: "#C78899",
                textDecoration: "underline",
                fontSize: 14,
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: 6
              }}
              onClick={() => {
                history.push("/");
              }}
            >
              see request
            </Link>
            <Link
              style={{
                color: "#C78899",
                textDecoration: "underline",
                fontSize: 14,
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: 6
              }}
              onClick={() => {
                history.push("/");
              }}
            >
              see trip member
            </Link>
          </div>
        </div>
        <div>Pick up:</div>
        <MapData fixed longitude={100.493117} latitude={13.769059} />
        <div>Destination:</div>
        <MapData fixed longitude={100.493117} latitude={13.769059} />

        <div
          style={{
            fontSize: 20,
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 6
          }}
        >
          {price} ฿
        </div>

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
