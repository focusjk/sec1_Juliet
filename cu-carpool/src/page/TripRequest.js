import React from "react";
<<<<<<< HEAD
import { MyHeaderWithArrow,MyHeader } from "../component/MyTitle";
import { MyButton,MyWhiteButton } from "../component/MyButton";
=======
import { MyHeaderWithArrow, MyHeader } from "../component/MyTitle";
>>>>>>> master
import { Link, Divider, Paper, Typography } from "@material-ui/core/";
import RequestBox from "../component/RequestBox";
import EmptyBox from "../component/EmptyBox";
import axios from "axios";
import { useParams, withRouter } from "react-router-dom";

class TripRequest extends React.Component {
  state = { list: [] };
  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const { trip_id } = this.props.match.params;
    const response = await axios.get("http://localhost:4000/driver/tripRequest?id=" + trip_id);
    const { success, request } = response.data;
    //console.log(response);
    if (success) {
      this.setState({ list: request });
    }
  }  

  render() {

    return (
      <div>
<<<<<<< HEAD
      <MyHeaderWithArrow goto="/my-trip" >Trip Request</MyHeaderWithArrow >
      <EmptyBox data={this.state.list} />
      {this.state.list.map((request, index, fetchData) => (
        <RequestBox key={index} data={request} fetch={this.fetchData}>
        </RequestBox>
      ))}
=======
        <MyHeaderWithArrow goto="/my-trip" >Trip Request</MyHeaderWithArrow>
        <EmptyBox data={this.state.list} />
        {this.state.list.map((request, index) => (
          <RequestBox key={index} data={request} />
        ))}
>>>>>>> master
      </div>
    );
  }
}



export default withRouter(TripRequest);