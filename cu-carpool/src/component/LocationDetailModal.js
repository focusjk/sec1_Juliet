import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Link } from "@material-ui/core/";
import Button from "@material-ui/core/Button";
import { MyHeader } from "../component/MyTitle";
import MapData from "./MapData";

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
      width: '300px'
    },
    div: {
        display: "flex", 
        alignItems: "flex-end", 
        marginBottom:"10px"
    },
    button:{
        marginTop: "15px", 
        display: 'flex', 
        fontSize: 16, 
        flexGrow: 1
    },
  }));
  
  const LocationDetailModal = ({ history,data }) => {
    const{
        departure_detail,departure_longtitude,departure_latitude, 
        destination_detail,destination_longtitude,destination_latitude
    } = data;
  
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [err, setErr] = React.useState(null);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
        
    return (
      <div>
        <Link onClick={handleOpen} style={{ color: "#C78899", textDecoration: "underline", fontSize: 14}}>
            See location detail
        </Link>
        <Modal open={open} onClose={handleClose}>
            <div style={getModalStyle()} className={classes.paper}>
                <MyHeader style={{ marginBottom: "13px" }}>Location detail</MyHeader>
                <div className={classes.div}>Pick up: {departure_detail} </div>
                <MapData fixed longitude={departure_longtitude} latitude={departure_latitude}/>
                <div className={classes.div} style={{marginBottom:"10px"}}>Destination: {destination_detail} </div>
                <MapData fixed longitude={destination_longtitude} latitude={destination_latitude}/>
                <Button onClick={handleClose} color="secondary" className={classes.button}>OK</Button>
            </div>
        </Modal>
      </div>
    );
  }
  export default withRouter(LocationDetailModal)