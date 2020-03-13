import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { MyHeader, MyHeaderWithArrow, MyTitle } from "../component/MyTitle";
import logo from '../logo.png';
import PhoneIcon from "@material-ui/icons/Phone";
import EmptyBox from '../component/EmptyBox'
import { Box, Input, Paper, Grid, Typography,Textfield} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { MyButton, MyGreyButton } from "../component/MyButton";
import MemberCardSmall from '../component/MemberCardSmall';
import LocationDetail from '../component/LocationDetail'


const MemberInfoCard = () => {  
  return (
    <div style={{ maxWidth: 740, display: 'flex', flexDirection: 'column', border: "1px solid #C4C4C4", padding: '16px 48px', marginBottom: '16px',marginTop: '16px'  }}>
              <div style={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexWrap: 'wrap', width: '150px', marginRight: '16px' }}>
                  <img
                    src={logo}
                    height={100}
                    width={100}
                    style={{ alignItems: 'center', borderRadius: "100%", marginBottom: "16px" }}
                  />
                  <div style={{ alignSelf: 'center' }}> Username </div>
                </div>
                <div style={{ maxWidth: 407, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div> <b> Member ID:</b>0</div>
                  <div> <b>Name:</b>Firstname} Lastname</div>
                  <div> <b>Email:</b>Test@test.com</div>
                  <div> <b>Phone number:</b>08x-xxx-xxxx</div>
                  <div> <b>BannedAt:</b>dd/mm/yyy</div>
		  <div> <b>BannedBy:</b>Admin Z</div>
                </div>
		<div style={{ display: 'flex', justifyContent: 'center', marginLeft: '16px' }}>
                <MyButton>Ban</MyButton>
		</div>
              </div>
     </div>
  );
};

export default withRouter(MemberInfoCard);
