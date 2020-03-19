import React from "react";
import { MyTitle,MyHeaderWithArrow } from "../component/MyTitle";


class TransactionBox extends React.Component {
    render(){
        return (
                <div style={{ display: "flex",border: '1px solid #BDBDBD',height:57,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                        <div style={{ display: "flex",flexDirection:"column",marginLeft:"16px"}}>
                            <div style={{fontSize:16}}>
                                Withdraw
                            </div>
                            <div style={{fontSize:14,color:'#BDBDBD'}}>
                                hr.mm
                            </div>
                        </div>
                        <div style={{fontSize:20,marginRight:"16px"}}>
                            Cash ฿
                        </div>
                </div>   
        );
    }        
}
export default TransactionBox;