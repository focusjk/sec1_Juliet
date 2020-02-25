import React from "react";
import { MyHeaderWithArrow } from "../component/MyTitle";
import { Link, Divider, Paper, Typography } from "@material-ui/core/";
import RequestBox from "../component/RequestBox";
import EmptyBox from "../component/EmptyBox";

class TripRequest extends React.Component {
  render() {
    return (
      <div>
        <MyHeaderWithArrow goto="">Trip Request</MyHeaderWithArrow>
        <RequestBox />
        <EmptyBox data={[]} />
      </div>
    );
  }
}

export default TripRequest;