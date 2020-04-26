import React from "react";
import { MyTitle, MyHeaderWithArrow } from "../component/MyTitle";
import EmptyBox from "../component/EmptyBox";
import TransactionBox from "../component/TransactionBox";
import axios from "axios";
import moment from "moment";
import backend from "../ip";
const formatter = (a) => {
  let b = Object.keys(a);
  b.sort((i, j) => {
    const ii = new moment(i, "DD MMM YYYY").format("x");
    const jj = new moment(j, "DD MMM YYYY").format("x");
    return jj - ii;
  });
  return b;
};

class TransactionLog extends React.Component {
  state = { transaction: {} };
  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    const response = await axios.get(backend + "/transaction/log", {
      params: { member_id: this.props.user.id },
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
        {formatter(this.state.transaction).map((index) => (
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
