import React, { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Box, TextField, Grid } from "@material-ui/core";
import {
  MyFullWidthButton,
  MyDisabledFullWidthButton
} from "../component/MyButton";
import NoteIcon from "@material-ui/icons/Note";
import { MyHeader, MyTitle } from "../component/MyTitle";
import moment from "moment";

const formatter = t => {
  return t ? moment(t).format("MMMM Do YYYY h:mm a") : null;
};

const DriverProfile = ({ user, updateUser }) => {
  const [form, setForm] = useState({
    driving_license: user.driving_license
  });
  const [status, setStatus] = useState(
    user.driver_status ? user.driver_status : "-"
  );
  const [time, setTime] = useState(formatter(user.edited_at));
  const [error, setError] = useState("");
  const [change, setChange] = useState(false);

  const request = async () => {
    try {
      setChange(false);
      const { id } = user;
      const { driving_license } = form;
      const response = await axios.post("http://localhost:4000/driver/", {
        id,
        driving_license
      });
      const { success, driver_status, edited_at, message } = response.data;
      if (success) {
        setStatus(driver_status);
        setTime(formatter(edited_at));
        setError('');
        updateUser({ driving_license, edited_at, driver_status: "pending" });
      } else {
        setError(message);
      }
    } catch (e) {
      console.log(e.response);
      setError('Invalid data, please check your input again');
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
          src={user.photo}
          height={100}
          width={100}
          style={{
            display: "flex",
            marginLeft: "18px",
            marginRight: "24px",
            borderRadius: "100%"
          }}
        />
        <MyTitle>{user.username}</MyTitle>
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
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <NoteIcon style={{ marginTop: "4px" }} />
          <TextField
            style={{ marginLeft: "8px" }}
            fullWidth
            placeholder="Driving License"
            value={form.driving_license}
            helperText="Please input value from QR code at back of driving license card"
            onChange={e => {
              setForm({ ...form, driving_license: e.target.value });
              setChange(
                e.target.value && e.target.value.length == 25
              );
            }}
          />
        </div>
      </Box>
      {time && <div style={{ color: "grey" }}>Modified at: {time}</div>}

      {status == "approved" && (
        <div style={{ color: "pink" }}>Status : Approved</div>
      )}
      {status == "pending" && (
        <div style={{ color: "grey" }}>Status : Pending</div>
      )}
      {status == "rejected" && (
        <div style={{ color: "red" }}>Status : Rejected</div>
      )}
      {status == "-" && <div style={{ color: "grey" }}>Status : -</div>}

      {!change && (
        <MyDisabledFullWidthButton style={{ margin: "10px 0" }} disabled={true}>
          Request
        </MyDisabledFullWidthButton>
      )}
      {change && (
        <MyFullWidthButton style={{ margin: "10px 0" }} onClick={request}>
          Request
        </MyFullWidthButton>
      )}
      {error !== "" && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default withRouter(DriverProfile);
