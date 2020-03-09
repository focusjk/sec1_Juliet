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
          <div style={{ display: "flex", alignItems: "flex-end" }}>
          Average rating :
            
          </div> 
          <div>
            <MyTitle style={{ marginLeft: "8px" }}>Driver Username</MyTitle>
          </div>
           
        
          
    
          </div>
          
          
        
        <MyButton style={{ alignSelf: "center" }}>Join</MyButton>
     
     
      
      
      </div>
      </Grid>
    );
  }
}
export default TripDetail;
