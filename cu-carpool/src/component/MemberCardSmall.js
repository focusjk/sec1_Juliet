import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { MyHeader, MyHeaderWithArrow, MyTitle } from "../component/MyTitle";
import { Link, Divider, Paper, Typography } from "@material-ui/core/";
import logo from '../logo.png';

const useStyles = makeStyles({
  list: {
    width: 250,
  }
});

const MemberCardSmall = () => {
  const classes = useStyles();
  return (
    <div style={{ display: "flex", alignItems: "left"}}>
           <img
            src={logo}
            height={40}
            width={40}
            style={{ borderRadius: "100%", marginTop: "16px", marginButtom: "16px"}}
          />
	<MyTitle style={{marginLeft: "8px", alignItems: "center"}}>UserName</MyTitle>
     </div>
  );
};

export default withRouter(MemberCardSmall);
