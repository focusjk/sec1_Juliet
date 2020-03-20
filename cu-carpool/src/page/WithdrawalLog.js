import React from "react";
import { MyTitle,MyHeaderWithArrow } from "../component/MyTitle";
import { Text } from 'react';



class WithdrawalLog extends React.Component {
    render(){
        return (
            <div>
                <MyHeaderWithArrow goto="/wallet">Withdrawal history</MyHeaderWithArrow>
                <MyTitle style={{fontSize:20,marginBottom:"6px"}}>Date</MyTitle> 
                <div style={{ display: "flex",border: '1px solid #BDBDBD',padding: "32px 16px",flexDirection:"row",alignItems:"flex-start"}}>
                    <div style={{ display: "flex",flexDirection:"column"}}>
                        <div style={{fontSize:16}}>
                            Status:
                        </div>
                        <div style={{ borderBottom: '1px solid #BDBDBD',alignItems:"center",width:"25",marginTop:"12px",marginBottom:"12px"}}></div>
                        <div style={{fontSize:16}}>
                            Bank    account number
                        </div>
                        <div style={{fontSize:16}}>
                            Firstname Lastname
                        </div>
                        <div style={{fontSize:14,color:'#BDBDBD'}}>
                            hr.mm
                        </div>
                    </div>
                    <div style={{displat:"flex",fontSize:20,alignItems:"right"}}>
                        Cash ฿
                    </div>
                    <div style={{ borderBottom: '1px solid #BDBDBD',alignItems:"center",width:"100"}}></div>
                </div>
            </div>     
        );
    }        
}
export default WithdrawalLog;