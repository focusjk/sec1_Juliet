import React from "react";
import Button from '@material-ui/core/Button';
import { MyFullWidthButton, MyGreyButton } from "../component/MyButton";
import { MyHeader, MyTitle } from "../component/MyTitle";
import { Box, Input, Paper, Grid, Typography } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { MyButton } from "../component/MyButton";
import logo from '../logo.png';
import PhoneIcon from "@material-ui/icons/Phone";
import { TiStarOutline } from "react-icons/ti";

class TripDetail extends React.Component {
  render() {
    return (
      <Grid container direction="column" justify="flex-direction">
      <div style={{ display: "flex", flexDirection: "column" }}>
      <MyHeader>Trip detail</MyHeader>
      <MyTitle>Driver info</MyTitle>
      <Paper
        square
        variant="outlined"
        style={{
          marginTop: "16px",
          padding: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <Typography style={{ display: "flex", flexDirection: "column", marginTop: "8px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={logo}
              height={50}
              width={50}
              style={{ borderRadius: "100%" }}
            />
            <MyTitle style={{ marginLeft: "8px" }}>Driver Username</MyTitle>
          </div>
          <div style={{ display: "flex", alignItems: "left", marginTop: "16px" }}>
            <TiStarOutline fontSize="big" style={{ marginRight: "80px" }} />
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              Firstname Lastname
          </div>
          </div>
          <div style={{ display: "flex", alignItems: "left", marginTop: "16px" }}>
            <PhoneIcon fontSize="small" style={{ marginRight: "8px" }} />
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              08x-xxx-xxx
          </div>
          </div>
        </Typography>
        <MyButton style={{ alignSelf: "center" }}>Get in</MyButton>
      </Paper>
     
      
      
      </div>
      </Grid>
    );
  }
}
export default TripDetail;
