import React from "react";
import { MyHeader } from "../component/MyTitle";
import TripBoxHis from "../component/TripBoxHis";
import EmptyBox from "../component/EmptyBox";

class TripHistory extends React.Component {
  render() {
    return (
      <div>
        <MyHeader style={{ marginBottom: "30px" }}>My trip</MyHeader>
        <TripBoxHis />
        <EmptyBox data={[]} />
      </div>
    );
  }
}

export default TripHistory;
