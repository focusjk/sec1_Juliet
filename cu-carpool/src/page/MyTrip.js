import React from "react";
import { MyHeader } from "../component/MyTitle";
import { Link, Divider, Paper, Typography } from "@material-ui/core/";
import TripBox from "../component/TripBox";
import EmptyBox from "../component/EmptyBox";

class MyTrip extends React.Component {
  render() {
    return (
      <div>
        <MyHeader style={{ marginBottom: "30px" }}>My trip</MyHeader>
        <TripBox />
        <EmptyBox data={[]} />
      </div>
    );
  }
}

export default MyTrip;
