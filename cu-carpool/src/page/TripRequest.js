import React from "react";
import { MyHeaderWithArrow,MyHeader } from "../component/MyTitle";
import { Link, Divider, Paper, Typography } from "@material-ui/core/";
import RequestBox from "../component/RequestBox";
import EmptyBox from "../component/EmptyBox";
import axios from "axios";

class TripRequest extends React.Component {
state = { list: [] };
componentDidMount() {
this.fetchData();
}

fetchData = async () => {
const response = await axios.get("http://localhost:4000/driver/tripRequest?id=2"); //TODO
const { success, request } = response.data;
if (success) {
  this.setState({ list: request });
}
}

  render() {
    return (
      <div>
      <MyHeaderWithArrow style={{marginBottom: "30px"}} goto="" >My Trip</MyHeaderWithArrow >
      <EmptyBox data={this.state.list} />
      {this.state.list.map((request, index) => (
        <RequestBox key={index} data={request} />
      ))}
      </div>
    );
  }
}



export default TripRequest;