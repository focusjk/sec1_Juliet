import React, { useState } from "react";
import PersonIcon from "@material-ui/icons/Person";
import MailIcon from "@material-ui/icons/Mail";
import PhoneIcon from "@material-ui/icons/Phone";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import LockIcon from "@material-ui/icons/Lock";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { Box, Input, Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import axios from "axios";
import {
  MyFullWidthButton,
  MyDisabledFullWidthButton
} from "../component/MyButton";
import { TextField } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import UploadIcon from "../component/UploadIcon";
import { MyHeader, MyTitle } from "../component/MyTitle";

const Profile = ({ history, user }) => {
  const [change, setChange] = useState(false);
  const [status, setStatus] = useState('');
  const [form, setForm] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    phone_number: user.phone_number,
    email: user.email,
    card_holder_name: user.card_holder_name,
    card_number: user.card_number,
    card_code: user.card_code,
    card_expiry_date: user.card_expiry_date,
    photo: user.photo
  });

  const update = async () => {
    try {
      setChange(false);
      const { id } = user;
      const { ...data } = form;
      const response = await axios.post("http://localhost:4000/user/", { id, ...data }
      );
      console.log(response.data);
      const { success, error, message } = response.data;
      if (success) {
        setStatus("Saved");
      } else {
        setStatus(error);
      }
    } catch (e) {
      console.log(e.response);
    }
  };
  return (
    <div>
      <MyHeader>Profile</MyHeader>
      <Grid
        container
        direction="row"
        alignItems="center"
        style={{ marginBottom: "40px" }}
      >
        <div
          style={{ display: "flex", marginLeft: "18px", marginRight: "24px" }}
        >
          <img
            src={form.photo}
            height={100}
            width={100}
            style={{ borderRadius: "100%" }}
          />
          <UploadIcon setPhoto={(e) => setForm({ ...form, photo: e })} />
        </div>
        <MyTitle>{user.username}</MyTitle>
        <MyTitle>{status}</MyTitle>
      </Grid>
      <Box
        style={{
          backgroundColor: "#F8F8F8",
          marginBottom: "40px",
          alignSelf: "center",
          padding: "8px 24px 24px 24px"
        }}
      >
        <MyTitle>Personal Info</MyTitle>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <PersonIcon />
          <TextField
            style={{ marginLeft: "8px" }}
            fullWidth
            placeholder="First Name"
            value={user.firstname}
            onChange={e => {
              setForm({ ...form, firstname: e.target.value });
              setChange(true);
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <PersonIcon />
          <TextField
            style={{ marginLeft: "8px" }}
            fullWidth
            placeholder="Last Name"
            value={user.lastname}
            onChange={e => {
              setForm({ ...form, lastname: e.target.value });
              setChange(true);
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <MailIcon />
          <TextField
            style={{ marginLeft: "8px" }}
            fullWidth
            placeholder="Email"
            value={user.email}
            onChange={e => {
              setForm({ ...form, email: e.target.value });
              setChange(true);
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <PhoneIcon />
          <TextField
            style={{ marginLeft: "8px" }}
            fullWidth
            placeholder="Telephone No."
            value={user.phone_number}
            onChange={e => {
              setForm({ ...form, phone_number: e.target.value });
              setChange(true);
            }}
          />
        </div>
      </Box>
      <Box
        style={{
          backgroundColor: "#F8F8F8",
          marginBottom: "40px",
          alignSelf: "center",
          padding: "8px 24px 24px 24px"
        }}
      >
        <MyTitle>Credit Card Info</MyTitle>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <PersonIcon />
          <TextField
            style={{ marginLeft: "8px" }}
            fullWidth
            placeholder="Cardholder Name"
            value={user.card_holder_name}
            onChange={e => {
              setForm({ ...form, card_holder_name: e.target.value });
              setChange(true);
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <CreditCardIcon />
          <TextField
            style={{ marginLeft: "8px" }}
            fullWidth
            placeholder="Card Number"
            value={user.card_number}
            onChange={e => {
              setForm({ ...form, card_number: e.target.value });
              setChange(true);
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <CalendarTodayIcon />
          <TextField
            style={{ marginLeft: "8px" }}
            fullWidth
            placeholder="Expiry date(ex. 12/2020)"
            value={user.card_expiry_date}
            onChange={e => {
              setForm({ ...form, card_expiry_date: e.target.value });
              setChange(true);
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <LockIcon />
          <TextField
            style={{ marginLeft: "8px" }}
            fullWidth
            placeholder="Security Code"
            onChange={e => {
              setForm({ ...form, card_code: e.target.value });
              setChange(true);
            }}
          />
        </div>
      </Box>
      <Switch>
        {!change && (
          <MyDisabledFullWidthButton
            style={{ margin: "10px 0" }}
            disabled={true}
          >
            Save
            </MyDisabledFullWidthButton>
        )}
        {change && (
          <MyFullWidthButton
            style={{ margin: "10px 0" }}
            onClick={update}
          >
            Save
            </MyFullWidthButton>
        )}
      </Switch>
    </div>
  );
};
export default withRouter(Profile);
