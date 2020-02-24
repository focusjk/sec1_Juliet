import React, { useState, useEffect } from "react";
import { MyHeader } from "../component/MyTitle";
import TripBox from "../component/TripBox";
import EmptyBox from "../component/EmptyBox";
import axios from "axios";

class MyTrip extends React.Component {
  state = { list: [] };
  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    const response = await axios.get("http://localhost:4000//user/mytrip");
    const { success, trip } = response.data;
    console.log(response.data);
    if (success) {
      this.setState({ list: trip });
    }
  };

  render() {
    return (
      <div>
        <MyHeader style={{ marginBottom: "30px" }}>My Trip</MyHeader>
        <EmptyBox data={this.state.list} />
        {this.state.list.map(
          ({
            trip_id,
            start_datetime,
            car_brand,
            plate_license,
            capacity,
            status
          }) => (
            <TripBox
              key={trip_id}
              data={{
                start_datetime,
                car_brand,
                plate_license,
                capacity,
                status
              }}
            />
          )
        )}
      </div>
    );
  }
}

export default MyTrip;
