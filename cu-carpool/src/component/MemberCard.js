import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { MyHeader, MyHeaderWithArrow, MyTitle } from "../component/MyTitle";
import logo from '../logo.png';
import PhoneIcon from "@material-ui/icons/Phone";
import EmptyBox from '../component/EmptyBox'
import { Box, Input, Paper, Grid , Typography  } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { MyButton, MyGreyButton} from "../component/MyButton";
import MemberCardSmall from '../component/MemberCardSmall'

const useStyles = makeStyles({
  list: {
    width: 250,
  }
});

const MemberCard = () => {
  const classes = useStyles();
  return (
    <Paper
      square
      variant="outlined"
      style={{
        marginTop: "16px",
	marginButtom: "16px",
        padding: 10,
        display: "flex",
	flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <Typography style={{ display: "flex", flexDirection: "column", marginTop: "8px",marginButtom: "16px"}}>
        <div style={{ display: "flex", alignItems: "left" }}>
           <img
            src={logo}
            height={50}
            width={50}
            style={{ borderRadius: "100%" }}
          />
	<MyTitle style={{marginLeft: "8px", alignItems: "center"}}>Username</MyTitle>
        </div>
        <div style={{ display: "flex", alignItems: "left", marginTop: "16px"}}>
          <PersonIcon fontSize="small" style={{ marginRight: "8px" }} />
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            Firstname Lastname
          </div>
        </div>
	<div style={{ display: "flex", alignItems: "left",marginTop: "16px"}}>
          <PhoneIcon fontSize="small" style={{ marginRight: "8px" }} />
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            08x-xxx-xxx
          </div>
        </div>
      </Typography> 
	<div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "12px"
          }}
        >
    <MyButton style={{ alignSelf:"center" }}>Pick up</MyButton>
    <MyGreyButton disabled={true} style={{ alignSelf:"center" }}>Drop off</MyGreyButton>
	</div>
    </Paper>
  );
};

export default withRouter(MemberCard);
