import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import { MyButton, MyGreyButton } from "../component/MyButton";
import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core/";
import { MyHeader,MyTitle } from "../component/MyTitle";
import MapData from "./MapData";
import moment from "moment";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@material-ui/core/";

const TripMember = ({ history, data }) => {
  const {
    request_id,driver_departed_at,driver_arrived_at,departed_at,request_status,request_at,paid_at,
    departure_latitude,departure_longtitude,departure_detail,destination_latitude,destination_longtitude,destination_detail,        
    member_id,username,firstname,lastname,photo 
  } = data;
  const requesttime = moment(request_at).format("MMMM Do YYYY h:mm a");
  const paidtime = moment(paid_at).format("MMMM Do YYYY h:mm a");
  const arrivetime = moment(driver_arrived_at).format("MMMM Do YYYY h:mm a");  
  const departtime = moment(driver_departed_at).format("MMMM Do YYYY h:mm a");
  const departat = moment(departed_at).format("MMMM Do YYYY h:mm a");

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

  const [openLocation, setOpenLocation] = React.useState(false);

  const handleOpenLocation = () => {
    setOpenLocation(true);
  };

  const handleCloseLocation = () => {
    setOpenLocation(false);
  };

  const [openInfo, setOpenInfo] = React.useState(false);

  const handleOpenInfo = () => {
    setOpenInfo(true);
  };

  const handleCloseInfo = () => {
    setOpenInfo(false);
  };

  return (
    <Paper square elevation={0} variant="outlined"
      style={{display: "flex",justifyContent: "space-between",flexDirection: "column",borderColor: "#BDBDBD",
            marginBottom: "16px", width:650}}>
        <Paper square elevation={0} style={{padding: 12,display: "flex",justifyContent: "space-between",flexDirection: "row",backgroundColor: "#f2f2f2"}}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <img src={photo} height={50} width={50} style={{ alignItems: 'center', borderRadius: "100%"}}/>
            </div>
            <div style={{  flexDirection: 'column',width: '150px' }}>
                <MyTitle style={{ color: "#C78899" }}>Status: {request_status}</MyTitle>
                <div style={{ alignSelf: 'center' }}>{username}</div>
            </div>
            <div style={{  flexDirection: 'column',width: '250px'}}>
                <div style={{marginBottom:'7px'}}> Request ID: {request_id}</div>
                <div> Name: {firstname} {lastname}</div>
            </div>
            <div style={{ display: "flex",flexDirection: 'column'}}>
            <Link onClick={handleOpenLocation} style={{ color: "#C78899", textDecoration: "underline", fontSize: 14,marginBottom: "7px"}}>
              see location detail
            </Link>
            <Modal open={openLocation} onClose={handleCloseLocation}>
              <div style={getModalStyle()} className={classes.paper}>
                <MyHeader style={{ marginBottom: "13px" }}>Location detail</MyHeader>
                <div style={{ display: "flex", alignItems: "flex-end", marginBottom:"10px" }}>Pick up: {departure_detail} </div>
                <MapData fixed longitude={departure_longtitude} latitude={departure_latitude}/>
                <div style={{ display: "flex", alignItems: "flex-end", marginTop:"10px" ,marginBottom:"10px" }}>Destination: {destination_detail} </div>
                <MapData fixed longitude={destination_longtitude} latitude={destination_latitude}/>
                <Button onClick={handleCloseLocation} color="secondary" style={{ marginTop: "15px", display: 'flex', fontSize: 16, flexGrow: 1 }}>OK</Button>
              </div>
            </Modal>
            <Link onClick={handleOpenInfo} style={{ color: "#C78899", textDecoration: "underline", fontSize: 14}}>
              see trip info
            </Link>
            <Modal open={openInfo} onClose={handleCloseInfo}>
              <div style={getModalStyle()} className={classes.paper}>
                <MyHeader style={{ marginBottom: "13px" }}>Trip Info</MyHeader>
                <div style={{ display: "flex", alignItems: "flex-end", marginBottom:"10px" }}>RequestedAt: {requesttime} </div>
                <div style={{ display: "flex", alignItems: "flex-end", marginBottom:"10px" }}>PaidAt: {paidtime} </div>
                <div style={{ display: "flex", alignItems: "flex-end", marginBottom:"10px" }}>DriverArrivedAt: {arrivetime} </div>
                <div style={{ display: "flex", alignItems: "flex-end", marginBottom:"10px" }}>DriverDepartedAt: {departtime} </div>
                <div style={{ display: "flex", alignItems: "flex-end", marginBottom:"10px" }}>DepartedAt: {departat} </div>
                <Button onClick={handleCloseInfo} color="secondary" style={{ marginTop: "15px", display: 'flex', fontSize: 16, flexGrow: 1 }}>OK</Button>
              </div>
            </Modal>
            </div>
        </Paper>
    </Paper>
  );
};

export default withRouter(TripMember);
