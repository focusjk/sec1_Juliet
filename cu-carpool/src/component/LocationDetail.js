import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import MapData from "../component/MapData"
import Button from "@material-ui/core/Button";
import { MyHeader } from "../component/MyTitle";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: 300
  },
  link: {
    color: "#C78899",
    textDecoration: "underline",
    fontSize: 14
  },
  margin: {
    margin: "16px 0 8px 0"
  }
}));

const LocationDetail = ({trip_id}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [trip, setTrip] = React.useState("");
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const fetchData = async () => {
    try {
      //TO-DO เดี๋ยวรอ backend แล้วเปี่ยนเป็นของ request
      const response = await axios.get("http://localhost:4000/trip/detail", {params: {
        tripId: trip_id
      } });
      const { success,trip } = response.data;
      if (success) {
        setTrip(trip);
      }
    } catch (e) {
      console.log(e);
    }
  };
   useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className={classes.link} onClick={handleOpen}>
        see location detail
      </div>

      <Modal
        open={open}
        onClose={handleClose}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <MyHeader>Location detail</MyHeader>
          <div className={classes.margin}>Pick up:{trip.departure_detail}</div>
          <MapData
            fixed
            longitude={100.493117}
            latitude={13.769059}
          />
          <div className={classes.margin}>Destination:{trip.destination_detail}</div>
          <MapData
            fixed
            longitude={100.493117}
            latitude={13.769059}
          />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={handleClose} color="secondary" style={{ marginTop: "16px", flexGrow: 1 }}>OK</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default LocationDetail