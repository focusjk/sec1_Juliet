import React from "react";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { MyFullWidthButton } from "../component/MyButton";
import moment from "moment";
import { MyHeader, MyTitle, MyHeaderWithArrow} from "../component/MyTitle";
import { Box, Input, Paper, Grid, Typography } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { MyButton } from "../component/MyButton";
import logo from '../logo.png';
import MapData from "../component/MapData"
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";
import { useParams, withRouter } from "react-router-dom";
import MemberCardSmall from '../component/MemberCardSmall'
import RequestJoin from '../component/RequestJoin'
import ReviewModal from "../component/ReviewModal"

class TripDetail extends React.Component {
  state = {
    trip: {
      departure_longtitude: 100.493117,
      departure_latitude: 13.747879,
      destination_longtitude: 100.493117,
      destination_latitude: 13.747879
    },
    owner: {},
    passenger: []
  }

  async componentDidMount() {
    const { trip_id } = this.props.match.params;
    const response = await axios.get("http://localhost:4000/trip/detail", {
      params: {
        tripId: trip_id
      }
    })
    const { success, trip, owner, passenger } = response.data
    if (success) {
      this.setState({ trip, owner, passenger })
    }
  }
  render() {
    const { trip, owner, passenger } = this.state
    const { joinable, user } = this.props
    return (
      <Grid container direction="column" justify="flex-direction">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <MyHeaderWithArrow goto={this.props.path}>Trip detail</MyHeaderWithArrow>

          <div style={{ margin: "8px 0" }}>
            <MyTitle style={{ margin: "8px 0" }}>Driver info</MyTitle>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={owner.photo} height={50} width={50} style={{ borderRadius: "100%" }} />
              <MyTitle style={{ marginLeft: "16px" }}>{owner.username}</MyTitle>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", marginBottom: 6 }}>
              Average rating:
            <Rating disabled name="half-rating" defaultValue={owner.avg_rating} precision={0.01} style={{ marginLeft: 8 }} />
            </div>
            <ReviewModal modeButton={false}/>
          </div>

          <div style={{ margin: "8px 0" }}>
            <MyTitle style={{ margin: "8px 0" }}>Car detail</MyTitle>
            <div style={{ margin: "4px 0" }}>License plate: {trip.plate_license}</div>
            <div style={{ margin: "4px 0" }}>Car brand: {trip.car_brand}</div>
          </div>

          <div style={{ margin: "8px 0" }}>
            <MyTitle style={{ margin: "8px 0" }}>Location detail</MyTitle>
            <div style={{ margin: "4px 0" }}>Pick up province: {trip.departure_province}</div>
            <div style={{ margin: "4px 0" }}>Pick up detail: {trip.departure_detail}</div>
            <div style={{ display: 'flex', margin: "4px 0" }}>
              <div style={{ flexGrow: 2 }}>
                Time: {moment(trip.start_datetime).format("h:mm a")}
              </div>
              <div style={{ flexGrow: 1 }}>
                Date: {moment(trip.start_datetime).format("MMMM Do YYYY")}
              </div>
            </div>
            <div style={{ margin: "8px 0" }}>
              <MapData fixed longitude={trip.departure_longtitude} latitude={trip.departure_latitude} />
            </div>
            <div style={{ margin: "4px 0" }}> Destination province: {trip.destination_province}</div>
            <div style={{ margin: "4px 0" }}>Destination detail: {trip.destination_detail}</div>
            <div style={{ margin: "8px 0" }}>
              <MapData fixed longitude={trip.destination_longtitude} latitude={trip.destination_latitude} style={{ margin: "8px 0" }} />
            </div>
          </div>
          <div style={{ margin: "8px 0" }}>
            <MyTitle style={{ margin: "8px 0" }}>Trip Member ({passenger.length}/{trip.capacity})</MyTitle>
            <div>
              {passenger.map((member, index) => <MemberCardSmall key={index} data={member} />)}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', margin: "8px 0", fontSize: 20 }}>
            <div style={{ margin: "8px 0" }}>{trip.price} ฿</div>
            {joinable && <RequestJoin trip_id={trip.id} member_id={user.id} />}
          </div>
        </div>

      </Grid>
    );
  }
}
export default withRouter(TripDetail);
