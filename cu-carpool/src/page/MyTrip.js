import React from "react";
import { MyHeader } from "../component/MyTitle";
import TripBox from "../component/TripBox";
import EmptyBox from "../component/EmptyBox";

class MyTrip extends React.Component {
  render() {
    return (
      <div>
        <MyHeader style={{ marginBottom: "30px" }}>My Trip</MyHeader>
        <TripBox />
        <EmptyBox data={[]} />
      </div>
    );
  }
}

export default MyTrip;
