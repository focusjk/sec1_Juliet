import React from "react";
import { MyTitle,MyHeaderWithArrow } from "../component/MyTitle";
import { Text } from 'react';
import Divider from '@material-ui/core/Divider';

class WithdrawalLog extends React.Component {
    render(){
        return (
            <div>
                <MyHeaderWithArrow goto="/wallet">Withdrawal history</MyHeaderWithArrow>
                <MyTitle style={{fontSize:20,marginBottom:"6px"}}>Date</MyTitle> 
                <div style={{ border: '1px solid #BDBDBD',padding: "/20px 16px",flexDirection:"column",alignItems:"flex-start"}}>
                    <div style={{ display: "flex",flexDirection:"row",justifyContent:"space-between"}}>
                        <div style={{fontSize:16,marginTop:'6px',marginBottom:'6px'}}>
                            Status:
                        </div>
                        <div style={{fontSize:20}}>
                        Cash ฿
                        </div>
                    </div>
                    <Divider/>
                    <div style={{fontSize:16,marginTop:'6px'}}>
                        Bank    account number
                    </div>
                    <div style={{fontSize:16}}>
                        Firstname Lastname
                    </div>
                    <div style={{fontSize:14,color:'#BDBDBD'}}>
                        hr.mm
                    </div>
                </div>
            </div>     
        );
    }        
}
export default WithdrawalLog;