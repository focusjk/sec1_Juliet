import React from "react";
import { MyHeader } from "../component/MyTitle";
import TripBoxHis from "../component/TripBoxHis";
import EmptyBox from "../component/EmptyBox";
import axios from "axios";

class TripHistory extends React.Component {
  state = { list: [] };
  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    const response = await axios.get("http://localhost:4000/user/triphistory"); // TODO
    const { success, trip } = response.data;
    // console.log(response.data);
    if (success) {
      this.setState({ list: trip });
    }
  };

  render() {
    return (
      <div>
        <MyHeader style={{ marginBottom: "30px" }}>Trip History</MyHeader>
        <EmptyBox data={this.state.list} />
        {this.state.list.map((trip, index) => (
          <TripBoxHis key={index} data={trip} />
        ))}
      </div>
    );
  }
}

export default TripHistory;
