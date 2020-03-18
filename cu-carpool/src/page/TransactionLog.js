import React from "react";
import { MyHeader, MyTitle,MyHeaderWithArrow } from "../component/MyTitle";
import TripBoxHis from "../component/TripBoxHis";
import EmptyBox from "../component/EmptyBox";
import { Box, Input, Paper, Grid, Typography } from "@material-ui/core";

class TransactionLog extends React.Component {
    render(){
        return (
            <div>
                <MyHeaderWithArrow goto="/wallet">Transaction history</MyHeaderWithArrow>
                <MyTitle style={{ alignItems: "left"}}>Date</MyTitle>
                <div style={{ display: "flex", alignItems: "center" ,border: '1px solid #ABB8C3'}}>
                    <MyTitle style={{ marginLeft: "8px",marginTop: "0px"  }}>Withdraw</MyTitle>
                    <div style={{ alignItems: "left",marginTop: "45px",marginLeft:"0px"}}>
                        <small className="text-muted">hr.mm</small>
                    </div>
                    <MyTitle style={{ marginLeft: "200px",marginTop: "35px" }}>Cash $</MyTitle>
                </div>
            </div>    
        );
    }        
}
export default TransactionLog;