import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import { MyButton, MyGreyButton } from "../component/MyButton";
import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core/";
import { MyHeader,MyTitle, MyLink } from "../component/MyTitle";
import MapData from "./MapData";
import moment from "moment";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { makeStyles } from "@material-ui/core/styles";

const TripLogBox = ({ history, data, fetchData }) => {
  const {
    trip_id,driver_id,start_datetime,status,car_brand,plate_license,price,created_at,departure_latitude,
    departure_longtitude,departure_detail,destination_latitude,destination_longtitude,destination_detail,username,firstname,lastname,photo
  } = data;
  const starttime = moment(start_datetime).format("MMMM Do YYYY h:mm a");
  const createtime = moment(start_datetime).format("MMMM Do YYYY h:mm a");

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
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: '350px'
    },
    margin: {
      marginBottom: 16
    }
  }));

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper square variant="outlined"
      style={{display: "flex",justifyContent: "space-between",flexDirection: "column",borderColor: "#BDBDBD",
            marginBottom: "16px",maxWidth:700}}>
        <Paper square elevation={0} style={{padding: 3,display: "flex",justifyContent: "space-between",backgroundColor: "#C78899"}}>
            <MyTitle style={{fontSize: "20px",color: "#FFFFFF",marginLeft: "6px"}}>{status}</MyTitle>
            <MyTitle style={{fontSize: "20px",color: "#FFFFFF",marginRight: "6px"}}>{starttime}</MyTitle>
        </Paper>
        <Paper square elevation={0} style={{padding: 12,display: "flex",justifyContent: "space-between",flexDirection: "row"}}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '150px', marginRight: '16px' }}>
                <img src={photo} height={100} width={100} style={{ alignItems: 'center', borderRadius: "100%", marginBottom: "16px" }}/>
                <div style={{ alignSelf: 'center' }}>{username}</div>
            </div>
            <div style={{ flexGrow: 4, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div> Trip ID: {trip_id}</div>
                <div> Driver's Name: {firstname} {lastname}</div>
                <div> License Plate: {plate_license}</div>
                <div> Car Brand: {car_brand}</div>
                <div> Price: {price}</div>
                <div> Trip Created At: {createtime}</div>
            </div>
            <MyLink onClick={handleOpen} style={{ marginBottom: 6 }} > see trip location detail </MyLink>
            <Modal open={open} onClose={handleClose}>
              <div style={getModalStyle()} className={classes.paper}>
                <MyHeader style={{ marginBottom: "13px" }}>Location detail</MyHeader>
                <div style={{ display: "flex", alignItems: "flex-end", marginBottom:"10px" }}>Pick up: {departure_detail} </div>
                <MapData fixed longitude={departure_longtitude} latitude={departure_latitude}/>
                <div style={{ display: "flex", alignItems: "flex-end", marginTop:"10px" ,marginBottom:"10px" }}>Destination: {destination_detail} </div>
                <MapData fixed longitude={destination_longtitude} latitude={destination_latitude}/>
                <Button onClick={handleClose} color="secondary" style={{ marginTop: "15px", display: 'flex', fontSize: 16, flexGrow: 1 }}>OK</Button>
              </div>
            </Modal>
        </Paper>
        <Paper square style={{display: "flex",justifyContent: "center",borderTop: '1px solid #BDBDBD'}}>
            <ExpandMoreIcon fontSize="large"/>
        </Paper>
    </Paper>
  );
};

export default withRouter(TripLogBox);
