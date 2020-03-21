import React from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { MyHeader } from '../component/MyTitle'
import EmptyBox from '../component/EmptyBox';
import TripLogBox from "../component/TripLogBox";

class AdminTripLog extends React.Component {
  state = { list: [] }
  componentDidMount() {
    this.fetchData()
  }
  fetchData = async () => {
    const response = await axios.get("http://localhost:4000/admin/trip");
    const { success, trip } = response.data
    if (success) {
      this.setState({ list: trip })
    }
  }

  render() {
    return (
      <Grid container direction="column" justify="center" style={{ width: "100%" }}>
        <MyHeader style={{ justifyContent: 'left' }}>
          > Trip Log
        </MyHeader>
        <Grid container direction="column" justify="center" alignItems="center" >
          <EmptyBox data={this.state.list} />
          {this.state.list.map((trip, index) => (
            <TripLogBox key={index} data={trip} />
          ))}
        </Grid>
      </Grid>
    )
  }
}

export default AdminTripLog;