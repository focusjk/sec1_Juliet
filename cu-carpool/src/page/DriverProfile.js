import React from "react";
import profile from "../profile.jpg";
import { Box, Input, Grid } from "@material-ui/core";
import {
  MyFullWidthButton,
  MyDisabledFullWidthButton
} from "../component/MyButton";
import NoteIcon from "@material-ui/icons/Note";
import { BrowserRouter as Switch } from "react-router-dom";
import { MyHeader, MyTitle } from "../component/MyTitle";

class DriverProfile extends React.Component {
  state = { change: false };

  render() {
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
          <MyTitle>Name Name</MyTitle>
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
            <Input
              style={{ marginLeft: "8px" }}
              fullWidth
              placeholder="Driving License No."
              onChange={() => {
                this.setState({ change: true });
              }}
            />
          </div>
        </Box>
        <Switch>
          {!this.state.change && (
            <MyDisabledFullWidthButton
              style={{ margin: "10px 0" }}
              disabled={true}
            >
              Request
            </MyDisabledFullWidthButton>
          )}
          {this.state.change && (
            <MyFullWidthButton
              style={{ margin: "10px 0" }}
              onClick={() => {
                this.setState({ change: false });
              }}
            >
              Request
            </MyFullWidthButton>
          )}
        </Switch>
      </div>
    );
  }
}

export default DriverProfile;
