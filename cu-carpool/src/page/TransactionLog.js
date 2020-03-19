import React from "react";
import { MyTitle,MyHeaderWithArrow } from "../component/MyTitle";
import EmptyBox from "../component/EmptyBox";
import TransactionBox from "../component/TransactionBox";
import axios from "axios";


class TransactionLog extends React.Component {
    state = { list: [] };
    componentDidMount() {
        this.fetchData();
    }
    fetchData = async () => {//ดึงข้อมูลจากแบลค//ไปเอาดาต้ามา
        const response = await axios.get("http://localhost:4000/transaction/log", {//รอ
        params: { member_id: this.props.user.id }//จะgetมา ต้องให้ para เขาส
        });
        const { success, transaction } = response.data;
        if (success) {
        this.setState({ list: transaction });
        }
    };
    render(){
        return (
            <div>
                <MyHeaderWithArrow goto="/wallet">Transaction history</MyHeaderWithArrow>
                <EmptyBox data={this.state.list} />
                {this.state.list.map((transaction,index) =>(
                <div> 
                    <MyTitle style={{fontSize:20,marginBottom:"6px"}}>{transaction.created_date}</MyTitle> 
                    <TransactionBox data={transaction} key={index} />
                </div>
                ))}
            </div>    
        );
    }        
}
export default TransactionLog;