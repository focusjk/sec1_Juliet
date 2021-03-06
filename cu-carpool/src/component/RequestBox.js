import React from "react";
import { withRouter } from "react-router-dom";
import { MyButton, MyWhiteButton } from "../component/MyButton";
import { Paper } from "@material-ui/core/";
import { MyTitle } from "../component/MyTitle";
import MapData from "./MapData";
import { Grid } from "@material-ui/core";
import moment from "moment";
import PhoneIcon from "@material-ui/icons/Phone";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import FlagIcon from "@material-ui/icons/Flag";
import axios from "axios";
import backend from "../ip";

const RequestBox = ({ history, data, fetch }) => {
  const {
    id,
    departure_latitude,
    departure_longitude,
    destination_latitude,
    destination_longitude,
    departure_detail,
    destination_detail,
    member_id,
    username,
    phone_number,
    photo,
  } = data;

  const handleApprove = async () => {
    axios
      .post(backend + "/driver/request-approve", {
        id,
      })
      .then((response) => {
        const { success } = response.data;
        if (success) {
          fetch();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleReject = async () => {
    axios
      .post(backend + "/driver/request-reject", {
        id,
      })
      .then((response) => {
        const { success } = response.data;
        if (success) {
          fetch();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

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
        marginBottom: "12px",
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
      <MapData
        fixed
        longitude={departure_longitude}
        latitude={departure_latitude}
      />

      <div
        style={{
          display: "flex",
          alignItems: "left",
          marginBottom: "8px",
          marginTop: "8px",
        }}
      >
        <FlagIcon fontSize="small" style={{ marginRight: "8px" }} />
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          {destination_detail}
        </div>
      </div>
      <MapData
        fixed
        longitude={destination_longitude}
        latitude={destination_latitude}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "12px",
        }}
      >
        <MyButton onClick={() => handleApprove()}>Accept</MyButton>
        <MyWhiteButton onClick={() => handleReject()}>Reject</MyWhiteButton>
      </div>
    </Paper>
  );
};

export default withRouter(RequestBox);
