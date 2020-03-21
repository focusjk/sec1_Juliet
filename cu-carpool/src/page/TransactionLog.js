import React from "react";
import { MyTitle, MyHeaderWithArrow } from "../component/MyTitle";
import EmptyBox from "../component/EmptyBox";
import TransactionBox from "../component/TransactionBox";
import axios from "axios";

class TransactionLog extends React.Component {
  state = { transaction: {} };
  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    const response = await axios.get("http://localhost:4000/transaction/log", {
      params: { member_id: this.props.user.id }
    });
    const { success, transaction } = response.data;
    if (success) {
      this.setState({ transaction });
    }
  };
  render() {
    return (
      <div>
        <MyHeaderWithArrow goto="/wallet">
          Transaction history
        </MyHeaderWithArrow>
        <EmptyBox data={this.state.transaction} />
        {Object.keys(this.state.transaction).map(index => (
          <div key={index} style={{ marginBottom: "16px" }}>
            <MyTitle style={{ fontSize: 20, marginBottom: "10px" }}>
              {index}
            </MyTitle>
            <TransactionBox data={this.state.transaction[index]} />
          </div>
        ))}
      </div>
    );
  }
}
export default TransactionLog;
