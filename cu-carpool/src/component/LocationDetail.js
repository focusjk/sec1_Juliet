import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import MapData from "../component/MapData"
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import { MyHeader, MyTitle } from "../component/MyTitle";

function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

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
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width:'70%',
    height:'80%'
  }
}));

const LocationDetail = () => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Location Detail
      </button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Location detail</h2>
        <MyTitle style={{ marginTop: "30px" }}>Pick up:xxxxxxxx</MyTitle>
	<MapData
          fixed
          longitude={100.493117}
          latitude={13.769059}
        />
	<MyTitle style={{ marginTop: "30px" }}>Destination:xxxxxxxx</MyTitle>
	<MapData
          fixed
          longitude={100.493117}
          latitude={13.769059}
        />
	<div style={{ marginTop: "30px" }}>
	<Button onClick={handleClose} color="secondary">OK</Button>
	</div>
	</div>
      </Modal>
    </div>
  );
}
export default LocationDetail