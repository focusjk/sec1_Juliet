import React from "react";
import { MyHeader, MyTitle,MyHeaderWithArrow } from "../component/MyTitle";


class WithdrawalLog extends React.Component {
    render(){
        return (
            <div>
                <MyHeaderWithArrow goto="/wallet">Withdrawal history</MyHeaderWithArrow>
                <MyTitle style={{ alignItems: "left"}}>Date</MyTitle>
                <div style={{ display: "flex", alignItems: "center" ,border: '1px solid #ABB8C3'}}>
                    <MyTitle style={{ marginLeft: "8px",marginTop: "0px"  }}>Status: </MyTitle>
                    <div style={{ alignItems: "left",marginTop: "45px",marginLeft:"0px"}}>
                        <small className="text-muted">hr.mm</small>
                    </div>
                    <MyTitle style={{ marginLeft: "200px",marginTop: "0px" }}>Cash $</MyTitle>
                    <div style={{ display: "flex", alignItems: "center" ,border: '1px solid #ABB8C3'}}>
                        
                    </div>
                </div>
            </div>  
            
        );
    }        
}
export default WithdrawalLog;