import React from "react";
import { MyHeaderWithArrow, MyHeader } from "../component/MyTitle";
import { MyButton, MyWhiteButton } from "../component/MyButton";
import { Link, Divider, Paper, Typography } from "@material-ui/core/";
import RequestBox from "../component/RequestBox";
import EmptyBox from "../component/EmptyBox";
import axios from "axios";
import { useParams, withRouter } from "react-router-dom";
import backend from "../ip";
class TripRequest extends React.Component {
  state = { list: [] };
  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const { trip_id } = this.props.match.params;
    const response = await axios.get(
      backend + "/driver/tripRequest?id=" + trip_id
    );
    const { success, request } = response.data;
    if (success) {
      this.setState({ list: request });
    }
  };

  render() {
    return (
      <div>
        <MyHeaderWithArrow goto="/my-trip">Trip Request</MyHeaderWithArrow>
        <EmptyBox data={this.state.list} />
        {this.state.list.map((request, index) => (
          <RequestBox key={index} data={request} fetch={this.fetchData} />
        ))}
      </div>
    );
  }
}

export default withRouter(TripRequest);
