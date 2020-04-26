import React from "react";
import { MyHeader } from "../component/MyTitle";
import TripBox from "../component/TripBox";
import EmptyBox from "../component/EmptyBox";
import axios from "axios";
import backend from "../ip";
class MyTrip extends React.Component {
  state = { list: [] };
  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    const response = await axios.get(backend + "/driver/mytrip", {
      params: { member_id: this.props.user.id },
    });
    const { success, trip } = response.data;
    if (success) {
      this.setState({ list: trip });
    }
  };

  render() {
    return (
      <div>
        <MyHeader style={{ marginBottom: "25px" }}>My Trip</MyHeader>
        <EmptyBox data={this.state.list} />
        {this.state.list.map((trip, index) => (
          <TripBox key={index} data={trip} fetchData={this.fetchData} />
        ))}
      </div>
    );
  }
}

export default MyTrip;
