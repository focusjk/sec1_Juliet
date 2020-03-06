import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { MyHeader, MyHeaderWithArrow, MyTitle } from "../component/MyTitle";
import logo from '../logo.png';


const MemberCardSmall = ({data}) => {
  const {
    username,
    photo
  } = data;
  return (
    <div style={{ display: "flex", alignItems: "center"}}>
           <img
            src={photo}
            height={40}
            width={40}
            style={{ borderRadius: "100%", marginTop: "16px", marginBottom: "16px"}}
          />
	<MyTitle style={{marginLeft: "8px"}}>{username}</MyTitle>
     </div>
  );
};

export default withRouter(MemberCardSmall);
