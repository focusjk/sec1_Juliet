import React from "react";
import { MyTitle,MyHeaderWithArrow } from "../component/MyTitle";
import EmptyBox from "../component/EmptyBox";
import TransactionBox from "../component/TransactionBox";


class TransactionLog extends React.Component {
    render(){
        return (
            <div>
                <MyHeaderWithArrow goto="/wallet">Transaction history</MyHeaderWithArrow>
                <MyTitle style={{fontSize:20,marginBottom:"6px"}}>Date</MyTitle>
                {/* <EmptyBox data={this.state.list} /> */}
                    {/* {this.state.list.map((trip, index) => ( */}
                <TransactionBox  />
              {/* ))} */}
            </div>    
        );
    }        
}
export default TransactionLog;