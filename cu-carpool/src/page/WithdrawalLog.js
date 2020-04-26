import React from "react";
import { MyTitle, MyHeaderWithArrow } from "../component/MyTitle";
import EmptyBox from "../component/EmptyBox";
import WithdrawalBox from "../component/WithdrawalBox";
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
class WithdrawalLog extends React.Component {
  state = { withdrawal: {} };
  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const response = await axios.get(backend + "/withdrawal/log", {
      params: { member_id: this.props.user.id },
    });
    const { success, withdrawal } = response.data;
    if (success) {
      this.setState({ withdrawal });
    }
  };

  render() {
    return (
      <div>
        <MyHeaderWithArrow goto="/wallet">Withdrawal history</MyHeaderWithArrow>
        <EmptyBox data={this.state.withdrawal} />
        {formatter(this.state.withdrawal).map((index) => (
          <div key={index} style={{ marginBottom: "16px" }}>
            <MyTitle style={{ fontSize: 20, marginBottom: "10px" }}>
              {index}
            </MyTitle>
            <WithdrawalBox data={this.state.withdrawal[index]} />
          </div>
        ))}
      </div>
    );
  }
}
export default WithdrawalLog;
